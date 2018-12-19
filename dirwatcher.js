import fs from 'fs';
import nodePath from 'path';
import process from 'process';
import eventEmmiter from './emitterController';
import {
    timingSafeEqual
} from 'crypto';
import {
    runInNewContext
} from 'vm';


export default class Dirwatcher {
    constructor() {
        /*
        form for dirInfo
        {
            'some path name': [{
               fileName: 'name1',
               changedTime: time
               },
               ....
            ],
            ...
        }
         */
        this.dirInfo = {};
    }

    watch(path, delay) {
        this.initWather(path);
        setInterval(() => this.watchFiles(path), delay);
    }

    initWather(path) {
        if (!this.dirInfo[path]) {
            this.dirInfo[path] = [];
            this.getFilesInfo(path)
                .then(files => this.dirInfo[path] = files);
        }
    }

    getFileActions(mainFiles, files, isDeleted = false) {
        return mainFiles.reduce((accum, file) => {
            const viewedFile = files.find(innerFile => innerFile.fileName === file.fileName);
            if (!viewedFile) {
                accum.push({
                    action: isDeleted ? 'deleted' : 'added',
                    fileName: file.fileName
                });
            }

            if (viewedFile && (`${viewedFile.changedTime}` !== `${file.changedTime}`)) {
                console.log(viewedFile)
                console.log(file)

                accum.push({
                    action: 'changed',
                    fileName: file.fileName
                });
            }

            return [...accum];
        }, []);
    }

    watchFiles(path) {
        this.getFilesInfo(path).then(filesInfo => {
            const changedFilesInfo = this.getChangedFilesInfo(path, filesInfo);
            if (changedFilesInfo) {
                eventEmmiter.emitChangedEvent(changedFilesInfo);
            }
            this.dirInfo[path] = filesInfo;
        });
    }

    getChangedFilesInfo(path, files) {
        const dif = this.dirInfo[path].length - files.length;
        if (dif > 0) {
            return this.getFileActions(this.dirInfo[path], files, true);
        } else if (dif < 0) {
            return this.getFileActions(files, this.dirInfo[path]);
        }
        return null;
    }

    getFilesInfo(path) {
        return fs.promises.readdir(path)
            .then(files => {
                const statFiles = files.reduce((acc, fileName) => {
                    const filePath = nodePath.join(path, fileName);
                    return [...acc,
                        fs.promises.stat(filePath).then(statInfo =>
                            ({
                                fileName,
                                changedTime: statInfo.ctime
                            })
                        )
                    ]
                }, []);
                return Promise.all(statFiles);
            })
    }
}
