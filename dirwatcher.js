import fs from 'fs';
import eventEmmiter from './emitterController';

class Dirwatcher {
    constructor() { 
        this.files = [];
    }

    watch(path, delay) {
        this.initWather(path);
        setInterval(() => this.readDerictory(path), delay);
    }

    initWather(path) {
        fs.readdir(path, (err, files) => {
            this.files = files;
            eventEmmiter.emitInitialRead(files);
        });
    }

    readDerictory(path) {
        fs.readdir(path, (err, files) => {
            const isRemoved = this.files.length - files.length;
            // TODO remove if, change it to 
            if (isRemoved) {
                const changedFiles = this.getChangedFiles(files);
                eventEmmiter.emitChanged({
                    changedFiles,
                    isRemoved: isRemoved > 0
                });
                this.files = files;
            }
        });
    }

    getChangedFiles(newFiles, isRemoved) {
        return isRemoved ? newFiles.filter(value => !this.files.includes(value)) :
            this.files.filter(value => !newFiles.includes(value));
    }
}

const dirwatcher = new Dirwatcher();
export default dirwatcher;
