import EventEmitter from 'events';
import { ACTIONS } from './dirwatcher';

export const EVENTS = {
    changed: 'changed',
    changedDirwatcher: 'dirwatcher:changed', 
    removeAdedChanges: 'FILTER_ADED_CHANGES'
};
class DirController extends EventEmitter {
    init() {
        this.on(EVENTS.changed, (data) => {
            this.emit(EVENTS.removeAdedChanges, data);
        });

        this.on(EVENTS.removeAdedChanges, (data) => {
            const notDeleltedChanges = data.filter(change =>
            change.action !== ACTIONS.deleted);
            this.emit(EVENTS.changedDirwatcher, notDeleltedChanges)
        });
    }

    emitChangedEvent(data) {
        this.emit(EVENTS.changed, data);
    }
}

const dirController = new DirController();
dirController.init();
export default dirController;
