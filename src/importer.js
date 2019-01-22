import fs from 'fs';
import { EventEmitter } from 'events';
import parse from 'csv-parse/lib/sync';
import { ACTIONS } from './dirwatcher';

export const IMPORTER_EVENTS = {
    CHANGED_DIRWATCHER: 'dirwatcher:changed'
};
export default class Importer extends EventEmitter {
    constructor() {
        super();
        this.listeningPaths = [];
    }

    handleReadError(err) {
        if (err.code = 'ENOENT') {
            console.error('File not found!');
        } else {
            throw err;
        }
    }

    listenChanges() {
        if (!this.eventNames().includes(IMPORTER_EVENTS.CHANGED_DIRWATCHER)) {
            this.on(IMPORTER_EVENTS.CHANGED_DIRWATCHER, (data) => {
                const paths = this.filterListeningPaths(data);
                paths.forEach(path => {
                    this.import(path).then(data => console.log(data, 'import if data change async'));
                    console.log(this.importSync(path), 'import if data change sync');
                });
            });
        }
    }

    filterListeningPaths(changes) {
        return changes.filter(change => change.action !== ACTIONS.DELETED)
            .reduce((acc, change) => {
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
            .then(data => this.convertFromCSV(data.toString()))
            .catch(err => this.handleReadError(err));
    }

    importSync(path) {
        try {
            this.addListenedPath(path);
            const data = fs.readFileSync(path).toString();
            return this.convertFromCSV(data);
        } catch (err) {
            this.handleReadError(err)
        }
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
