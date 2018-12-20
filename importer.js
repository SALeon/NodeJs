import csv from "csvtojson";

export default class Importer {

    import(path) {
        console.log(path, 'path from promise of import file')
        return csv().fromFile(path)
            .then((data) => {
                console.log(data);
            })
    }

    importSync(path) {
        
    }
}
