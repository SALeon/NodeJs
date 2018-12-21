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

    listenChanges(changes) {
        this.on(IMPORTER_EVENTS.CHANGED_DIRWATCHER, (paths) => {
            paths.forEach(path => {
                this.import(path).then(data => console.log(data, 'import if data change async'));
                console.log(this.importSync(path), 'import if data change sync');
            });
        });

        this.filtterListeningPaths(changes);
    }

    filtterListeningPaths(changes) {
        const changedPaths = changes.reduce((acc, change) => {
            const changedPath = this.listeningPaths.find(path => path === change.path);
            if (changedPath) {
                return [...acc, changedPath];
            }
            return acc;
        }, []);

        if (changedPaths.length) {
            this.emit(IMPORTER_EVENTS.CHANGED_DIRWATCHER, changedPaths);
        }
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
