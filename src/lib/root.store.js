import createAuthStore from './auth.store'
import createNotesStore from './notes.store'
import * as firebase from './firebase'

export default {
    auth: createAuthStore(firebase.auth, firebase.googleProvider),
    notes: createNotesStore(firebase.db, firebase.auth)
}