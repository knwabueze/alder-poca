import { default as createAuthStore } from './auth.store'
import * as firebase from './firebase'

export default {
    auth: createAuthStore(firebase.auth, firebase.googleProvider)
}