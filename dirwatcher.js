import fs from 'fs';
import mainEventEmmiter from './mainEventImitter';

class Dirwatcher {
    watch(path, delay) {
        this.initWather(path);
        setInterval(() => readDerictory(path), delay);
    }

    initWather(path) {
    // TODO eventOnce create for init
        fs.readdir(path, (err, files) => this.files = files);
        mainEventEmmiter.on('changed', (stream) => {
            console.log(stream);
            console.log('- changed -');
        });
    }

    readDerictory(path) {
        fs.readdir(path, (err, files) => {
            const isRemoved = this.files.length - files.length;
            if (isRemoved) {
                const changedFiles = this.getChangedFiles(files);
                mainEventEmmiter.emit('changed', {
                    changedFiles,
                    isRemoved
                });
                this.files = files;
            }
        });
    }

    getChangedFiles(newFiles, isRemoved) {
        return isRemoved ? newFiles.filter(value => this.files.includes(value)) :
            this.files.filter(value => newFiles.includes(value));
    }
}

const dirwatcher = new Dirwatcher();
export default dirwatcher;
