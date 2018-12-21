import fs from 'fs';
import {
    EventEmitter
} from 'events';
import parse from 'csv-parse/lib/sync';

export const IMPORTER_EVENTS = {
    CHANGED_DIRWATCHER: 'dirwatcher:changed'
};
export default class Importer extends EventEmitter {
    constructor() {
        super();
        this.listeningPaths = [];
    }

    listenChanges() {
        if (!this.eventNames().includes(IMPORTER_EVENTS.CHANGED_DIRWATCHER)) {
            this.on(IMPORTER_EVENTS.CHANGED_DIRWATCHER, (changes) => {
               const paths = this.filtterListeningPaths(changes);
                paths.forEach(path => {
                    this.import(path).then(data => console.log(data, 'import if data change async'));
                    console.log(this.importSync(path), 'import if data change sync');
                });
            });
        }
    }

    filtterListeningPaths(changes) {
        return changes.reduce((acc, change) => {
            const changedPath = this.listeningPaths.find(path => path === change.path);
            if (changedPath) {
                return [...acc, changedPath];
            }
            return acc;
        }, []);
    }

    import(path) {
        this.addListenedPath(path);
        return fs.promises.readFile(path)
            .then(data => this.convertFromCSV(data.toString()));
    }

    importSync(path) {
        this.addListenedPath(path);
        const data = fs.readFileSync(path).toString();
        return this.convertFromCSV(data);
    }

    addListenedPath(path) {
        if (this.listeningPaths.some(value => value !== path) || !this.listeningPaths.length) {
            this.listeningPaths.push(path);
        }
    }

    convertFromCSV(data) {
        return parse(data, {
            columns: true,
            skip_empty_lines: true
        });
    }
}
