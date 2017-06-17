import { extendObservable, action } from 'mobx'
import _ from 'lodash'

// Data
/* 
{
    "id": GUID,
    "title": String,
    "description": String
} */
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
                    this.selectedNote = snapshot.key;
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
            }
        });

        extendObservable(this, {
            notes: [],
            selectedNote: null,
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
                    const index = _.findIndex(this.notes, i => i.key === key);
                    if (this.notes.length === 1) {
                        this.selectedNote = null;
                    } else if (index === this.notes.length - 1) {
                        this.selectedNote = this.notes[index - 1].key;
                    } else {
                        this.selectedNote = this.notes[index + 1].key;
                    }
                    this.ref.child(this.currentUser.uid).child(key).remove();
                }
            }),
            currentUser: auth.currentUser,
            changeSelectedNote: action(val => {
                this.selectedNote = val;
            })
        })
    }

    const list = new NotesList(db, auth);
    list.addNote('Hello', 'Kamsi Nwabueze');
    return list;
}

export default createStore;