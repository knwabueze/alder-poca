import createViewStore from './view.store'
import createNotesStore from './notes.store'
import * as firebase from './firebase'

export default {
    view: createViewStore(firebase.auth, firebase.googleProvider),
    notes: createNotesStore(firebase.db, firebase.auth)
}