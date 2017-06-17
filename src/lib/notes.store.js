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

                    const notes = _.map(values, (value, idx) => {
                        value.key = keys[idx];
                        return value;
                    });

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
                    console.log(this.notes);
                    this.notes = _.filter(this.notes, i => i.key !== snapshot.key);
                });
                this.ref.child(user.uid).on('child_changed', snapshot => {
                    
                })
            }
        });

        extendObservable(this, {
            notes: [],
            addNote: action((title, content) => {
                if (!!this.currentUser) {
                    this.ref.child(this.currentUser.uid).push({
                        title,
                        description: content
                    })
                }
            }),
            removeNote: action(id => {
            }),
            currentUser: auth.currentUser
        })
    }

    const list = new NotesList(db, auth);
    list.addNote('Hello', 'Kamsi Nwabueze');
    return list;
}

export default createStore;