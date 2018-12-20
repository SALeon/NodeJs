import fs from 'fs';
import { EventEmitter } from 'events';
import parse from 'csv-parse/lib/sync';

export const IMPORTER_EVENTS = {
    CHANGED_DIRWATCHER: 'dirwatcher:changed'
};
export default class Importer extends EventEmitter{
    setPath(path) {
        this.on(IMPORTER_EVENTS.CHANGED_DIRWATCHER, ([data]) => {
            this.chaingedFilePath = data.path;
            this.import(path).then(data => console.log(data, 'assync readed'));
             console.log(this.importSync(path), 'sync readed');
        });
    }

    import(path) {
        return fs.promises.readFile(this.chaingedFilePath)
            .then(data => this.convertFromCSV(data.toString()));
    }

    importSync(path) {
        const data = fs.readFileSync(this.chaingedFilePath).toString();
        return this.convertFromCSV(data);
    }

    convertFromCSV(data) {
        return parse(data, {
            columns: true,
            skip_empty_lines: true
        });
    }
}
