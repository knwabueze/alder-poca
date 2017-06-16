import { extendObservable, action, computed } from 'mobx'
import { generateUUID } from './uuid'

const createStore = (auth, googleAuthProvider) => {
    function Store() {
        this.id = generateUUID()
        this.auth = auth
        this.googleAuthProvider = googleAuthProvider;

        auth.onAuthStateChanged(user => {
            this.currentUser = user;
        });

        extendObservable(Store.prototype, {
            currentUser: null,
            signOut: action(() => this.auth.signOut()),
            signInWithGoogle: action(() => this.auth.signInWithPopup(this.googleAuthProvider)),
            authed: computed(() => !!this.currentUser)
        })
    };

    return new Store();
}

export default createStore;