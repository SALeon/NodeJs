import EventEmitter from 'events';

export const EVENTS = {
    changed: 'changed',
    changedDirwatcher: 'dirwatcher:changed'
};
class EmitterController extends EventEmitter {

    init() {
        this.on(EVENTS.changed, (data) => {
            this.emit(EVENTS.changedDirwatcher, data);
        });

        // this.on(EVENTS.changedDirwatcher, (stream) => {

        //     // console.log(stream);
        //     // console.log('- changed -');
        // });
    }

    emitChangedEvent(data) {
        this.emit(EVENTS.changed, data);
    }

    // listenChangedDirwatcherEvent() {
    //     this.on(EVENTS.changed, (data) => {
    //         this.emit(EVENTS.changedDirwatcher, data);
    //     });

        // this.on(EVENTS.changedDirwatcher, (data) => {

        //     // console.log(stream);
        //     // console.log('- changed -');
        // });

    // }
}

const emitterController = new EmitterController();
emitterController.init();
export default emitterController;
