import EventEmitter from 'events';

const EMMITTERS = {
    changed: 'changed', 
    initDirwatcher: 'dirwatcher:init',
};
class EmitterController extends EventEmitter {

    init() {
        this.on(EMMITTERS.changed, (stream) => {
            console.log(stream);
            console.log('- changed -');
        });

        this.once(EMMITTERS.initDirwatcher, (stream) => {
            
        });
    }

    addSignleEmmiter() { 

    }

    emitChanged(data) { 
        this.emit(EMMITTERS.changed, data);
    }

    emitInitialRead(data) { 
        this.emit(EMMITTERS.initDirwatcher, data);
    }
}

const emitterController = new EmitterController();
emitterController.init();
export default emitterController;
