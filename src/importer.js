import fs from 'fs';
import parse from 'csv-parse/lib/sync';

export default class Importer {
    import(path) {
        return fs.promises.readFile(path)
            .then(data => this.convertFromCSV(data.toString()))
    }

    importSync(path) {
        const data = fs.readFileSync(path).toString();
        return this.convertFromCSV(data);
    }

    convertFromCSV(data) {
        return parse(data, {
            columns: true,
            skip_empty_lines: true
        });
    }
}
