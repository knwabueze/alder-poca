import { extendObservable, action, computed } from 'mobx'
import _ from 'lodash'

const createStore = (db, auth) => {

    function NotesList(db, auth) {
        this.ref = db.ref('notes')

        auth.onAuthStateChanged(user => {
            this.currentUser = user;
            if (!!user) {
                this.ref.child(user.uid).once('value', snapshot => {
                    const data = snapshot.val();
                    const values = _.values(data);
                    const keys = _.keys(data);
                    const notes = _.map(values, (value, idx) => ({ key: keys[idx], ...value }));
                    this.notes = notes;
                });
                this.ref.child(user.uid).on('child_added', snapshot => {
                    this.notes.push({
                        key: snapshot.key,
                        title: snapshot.val().title,
                        description: snapshot.val().description
                    });
                });
                this.ref.child(user.uid).on('child_removed', snapshot => {
                    this.notes = _.filter(this.notes, i => i.key !== snapshot.key);
                });
                this.ref.child(user.uid).on('child_changed', snapshot => {
                    this.notes[_.findIndex(this.notes, i => i.key === snapshot.key)] = {
                        key: snapshot.key,
                        title: snapshot.val().title,
                        description: snapshot.val().description
                    }
                })

                this.finishedSetup = true;
            }
        });

        extendObservable(this, {
            notes: [],
            finishedSetup: false,
            addNote: action((title, content) => {
                if (!!this.currentUser) {
                    this.ref.child(this.currentUser.uid).push({
                        title,
                        description: content
                    })
                }
            }),
            removeNote: action(key => {
                if (!!this.currentUser) {
                    this.ref.child(this.currentUser.uid).child(key).remove();
                }
            }),
            currentUser: auth.currentUser,
            changeSelectedNote: action(val => {
                this.selectedNote = val;
            }),
            findNote: key => {
                if (this.notes.length !== 0) {
                    const val = _.find(this.notes, n => n.key === key)
                    return val;
                }
            },
            updateNoteTitle: action((key, title) => {
                this.ref.child(this.currentUser.uid).child(key).update({
                    title
                })
            }),
            updateNoteDescription: action((key, description) => {
                this.ref.child(this.currentUser.uid).child(key).update({
                    description
                })
            }),
            isEmpty: computed(() => this.notes.length === 0),
            detatch: () => {
                this.ref.off()
            }
        })
    }

    const list = new NotesList(db, auth);
    return list;
}

export default createStore;