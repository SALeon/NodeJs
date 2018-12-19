import fs from 'fs';
import eventEmmiter from './emitterController';

export default class Dirwatcher {
    constructor() {
        this.directoriesFiles = {};
    }

    watch(path, delay) {
        this.initWather(path);
        setInterval(() => this.readDerictory(path), delay);
    }

    initWather(path) {

        if (!this.directoriesFiles[path]) {
            fs.readdir(path, (err, files) => {
                this.directoriesFiles[path] = files;

            });
        }
    }

    readDerictory(path) {

        this.watchCountFiles(path);
    }

    getMovedFiles(path, newFiles, isRemoved) {
        return isRemoved ? newFiles.filter(value => !this.directoriesFiles[path].includes(value)) :
            this.directoriesFiles[path].filter(value => !newFiles.includes(value));
    }

    watchCountFiles(path) {

        fs.readdir(path, (err, files) => {
            const isRemoved = this.directoriesFiles[path].length - files.length;
            if (isRemoved) {
                const changedFiles = this.getMovedFiles(path, files, isRemoved);
                eventEmmiter.emitChangedEvent({
                    [path]: {
                        changedFiles,
                        moved: isRemoved > 0 ? 'removed' : 'added'
                    }
                });
                this.directoriesFiles[path] = files;
            }
        });
    }
}
