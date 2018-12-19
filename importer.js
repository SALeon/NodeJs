import emitterController, { EVENTS } from './emitterController';

export default class Importer {

    import(path) {
        return new Promise((res, rej) => {
            emitterController.on(EVENTS.changedDirwatcher, (data) => {
                res(data);
            });
        });


    }

    importSync(path) {

    }

    // listenDirwatcherEvent() {
    //     // emitterController.listenChangedDirwatcherEvent(path);
    //     emitterController.on(EVENTS.changedDirwatcher, (data) => {
    //         res(data);
    //     });
    // }
}
