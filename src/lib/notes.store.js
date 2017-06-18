import { extendObservable, action, computed, ObservableMap } from 'mobx'
import _ from 'lodash'

const createStore = (db, auth) => {

    function NotesList(db, auth) {
        this.ref = db.ref('notes');

        extendObservable(this, {
            notes: new ObservableMap({}),
            finishedSetup: false,
            addNote: action(description => {
                if (!!this.currentUser) {
                    this.ref.child(this.currentUser.uid).push({
                        description
                    })
                }
            }),
            removeNote: action(key => {
                if (!!this.currentUser) {
                    this.ref.child(this.currentUser.uid).child(key).remove();
                }
            }),
            currentUser: auth.currentUser,
            findNote: key => this.notes.get(key),
            updateNote: action((key, description) => {
                this.ref.child(this.currentUser.uid).child(key).update({
                    description
                })
            }),
            isEmpty: computed(() => this.notes.size === 0),
            detatch: () => this.ref.off(),
            json: computed(() => this.notes.toJS())
        })

        auth.onAuthStateChanged(user => {
            this.currentUser = user;
            this.finishedSetup = false;
            if (!!user) {
                this.ref.child(user.uid).once('value', snapshot => {
                    const data = snapshot.val();
                    _.map(data, (value, key) => {
                        this.notes.set(key, value);
                    })
                });
                this.ref.child(user.uid).on('child_added', snapshot => {
                    this.notes.set(snapshot.key, snapshot.val());
                });
                this.ref.child(user.uid).on('child_removed', snapshot => {
                    this.notes.delete(snapshot.key);
                });
                this.ref.child(user.uid).on('child_changed', snapshot => {
                    this.notes.set(snapshot.key, snapshot.val());
                })
                this.finishedSetup = true;
            }
        });


    }

    const list = new NotesList(db, auth);
    return list;
}

export default createStore;