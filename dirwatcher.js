import fs from 'fs';
import { EventEmitter } from 'events';

class Dirwatcher {
    initEmmiter() {
        class MyEmitter extends EventEmitter {}
        this.emiter = new MyEmitter();
        this.emiter.on('changed', () => { console.log('​------- changed ---------') });
    }

    watch(path, delay) {
        this.initWather(path);
        setInterval(() => {
            fs.readdir(path, (err, files) => {
                // if (this.files.lenght !== files.lenght) {
                

                // }
            });
            // console.log('from interval');
            this.emiter.emit('​changed');
        }, 1000);
    }

    initWather(path) {
        fs.readdir(path, (err, files) => this.files = files);
    }

    addEvent(eventName, handler) {
        this.emiter.on(name, handler);
    }

    // readDirectory() {
    //     fs.readdir(path, (err, files) => {
    //         this.files = files;
    //     });
    // }
}

const dirwatcher = new Dirwatcher();
dirwatcher.initEmmiter();
export default dirwatcher;
