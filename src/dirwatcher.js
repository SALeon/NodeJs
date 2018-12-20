import fs from 'fs';
import nodePath from 'path';
import { EventEmitter } from 'events';

export const ACTIONS = {
    DELETED: 'DELETED',
    ADDED: 'ADDED',
    CHANGED: 'CHANGED',
};

export const DIRWATCHER_EVENTS = {
    CHANGED: 'changed',
};

export default class Dirwatcher extends EventEmitter{
    constructor() {
        super()
        /*
        form for dirInfo
        {
            'some directory': [{
               path: 'pathFile',
               action: 'some action'
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
            const viewedFile = files.find(innerFile => innerFile.path === file.path);
            if (!viewedFile) {
                accum.push({
                    action: isDeleted ? ACTIONS.DELETED : ACTIONS.ADDED,
                    path: file.path
                });
            }

            if (viewedFile && (`${viewedFile.changedTime}` !== `${file.changedTime}`)) {
                accum.push({
                    action: ACTIONS.CHANGED,
                    path: file.path
                });
            }
            return [...accum];
        }, []);
    }

    watchFiles(path) {

        this.getFilesInfo(path).then(filesInfo => {
            const changedFilesInfo = this.getChangedFilesInfo(path, filesInfo);
            if (changedFilesInfo.length) {
                this.emit(DIRWATCHER_EVENTS.CHANGED, changedFilesInfo);
            }

            this.dirInfo[path] = filesInfo;
        });
    }

    getChangedFilesInfo(path, files) {
        const dif = this.dirInfo[path].length - files.length;
        if (dif > 0) {
            return this.getFileActions(this.dirInfo[path], files, true);
        } else {
            return this.getFileActions(files, this.dirInfo[path]);
        }
    }

    getFilesInfo(path) {
        return fs.promises.readdir(path)
            .then(files => {
                const statFiles = files.reduce((acc, fileName) => {
                    const filePath = nodePath.join(path, fileName);
                    return [...acc,
                        fs.promises.stat(filePath).then(statInfo =>
                            ({
                                path: filePath,
                                changedTime: statInfo.ctime
                            })
                        )
                    ]
                }, []);
                return Promise.all(statFiles);
            });
    }
}
