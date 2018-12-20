import fs from 'fs';
import nodePath from 'path';
import dirController from './dirController';

export const ACTIONS = {
    deleted: 'DELETED',
    added: 'ADDED',
    changed: 'CHANGED',
};
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
            const viewedFile = files.find(innerFile => innerFile.path === file.path);
            if (!viewedFile) {
                accum.push({
                    action: isDeleted ? ACTIONS.deleted : ACTIONS.added,
                    path: file.path
                });
            }

            if (viewedFile && (`${viewedFile.changedTime}` !== `${file.changedTime}`)) {
                accum.push({
                    action: ACTIONS.changed,
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
                dirController.emitChangedEvent(changedFilesInfo);
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
