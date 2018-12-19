import fs from 'fs';
import nodePath from 'path';
import eventEmmiter from './emitterController';
import {
    timingSafeEqual
} from 'crypto';

export default class Dirwatcher {
    constructor() {
        /*
        form for directoriesFiles 
        {
            'some path name': {
               files: 'lis of file names',
               stats: {
                    'some data stats'
               } 
            },
            ...
        }
         */
        this.directoriesFiles = {};
    }

    watch(path, delay) {
        this.initWather(path);
        setInterval(() => this.checkDirectory(path), delay);
    }

    initWather(path) {
        if (!this.directoriesFiles[path]) {
            this.getFilesInfo(path, this.directoriesFiles[path]);
        }
    }

    checkDirectory(path) {
        this.watchCountFiles(path);
        this.watchChaingedFiles(path);
    }

    getMovedFiles(path, newFiles, isRemoved) {
        return isRemoved ? newFiles.filter(value => !this.directoriesFiles[path].includes(value)) :
            this.directoriesFiles[path].files.filter(value => !newFiles.includes(value));
    }

    watchCountFiles(path) {
        const failsContainer = [];
        this.getFilesInfo(path, failsContainer);

        const changedFiles = this.getMovedFiles(path, files, isRemoved);
        eventEmmiter.emitChangedEvent({
            [path]: {
                changedFiles,
                action: isRemoved > 0 ? 'removed' : 'added'
            }
        });
        this.directoriesFiles[path] = files;
    }

    watchChaingedFiles(path) {
        if (isObjectEquals(this.directoriesFiles[path].stats))
            eventEmmiter.emitChangedEvent({
                [path]: {
                    changedFiles,
                    changed: 'changed'
                }
            });
    }

    // Current comparison is only one level deep
    isObjectEquals(a, b) {
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);

        if (aProps.length !== bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }

    getFilesInfo(path, container = []) {
        fs.readdir(path, (err, files) => {
            if (err) {
                console.log(err);
                return;
            }

            files.forEach(fileName => {
                const filePath = nodePath.join(path, fileName);

                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    container.push({
                        fileName,
                        changedData: stats.ctime
                    });
                });
            });
        });
    }

    convertFiles() {

    }
}
