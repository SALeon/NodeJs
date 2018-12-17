import fs from 'fs';
import mainEventEmmiter from './mainEventImitter';

class Dirwatcher {
    watch(path, delay) {
        this.initWather(path);
        setInterval(() =>
            fs.readdir(path, (err, files) => {
                if (this.files.lenght !== files.lenght) {
                    mainEventEmmiter.emit('changed');
                }
            }), 10000);
    }

    initWather(path) {
        fs.readdir(path, (err, files) => this.files = files);
        mainEventEmmiter.on('changed', () => { console.log('- changed -') });
    }
}

const dirwatcher = new Dirwatcher();
export default dirwatcher;
