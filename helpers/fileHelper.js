import fs from 'fs';
import { EventEmitter } from 'events';

export const EVENTS = {
    readFIle: 'readFile',
}

class FileHelper extends EventEmitter {
    readFromFile(pathToFile, emitter, event) {
        fs.readFile(pathToFile, 'utf8', (err, data) => {
            if (err) emitter.emit('error', err);
            const readedData = JSON.parse(data);
            emitter.emit(event, readedData);
        });
    }

    writeToFile(path, data, emitter, event) {
        this.readFromFile(path, this, EVENTS.readFIle);
        this.on(EVENTS.readFIle, (sourceData) => {
            const newData = this.concatArrData(sourceData, data);
            try {
                const writableData = JSON.stringify(newData);
                fs.writeFile(path, writableData, (err) => {
                    if (err) emitter.emit('error', err);
                    emitter.emit(event, data);
                });
            } catch (err) {
                emitter.emit('error', err);
            }
        });
    }

    concatArrData(sourceData, newData) {
        try {
            const data = Array.isArray(newData) ? [...newData, ...sourceData] : [...[newData], ...sourceData];
            const uniqueData = data.reduce((acc, val) => {
                return acc[val.id] ? acc : { ...acc, [val.id]: val };
            }, {});
            return Object.values(uniqueData);

        } catch (err) {
            console.error('error from concat data: \r\n', err)
        }
    }
}

const fileHelper = new FileHelper();
export default fileHelper;
