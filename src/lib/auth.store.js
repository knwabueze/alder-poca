import { extendObservable, action, computed } from 'mobx'

const createStore = (auth, googleAuthProvider) => {
    function Store() {
        this.auth = auth
        this.googleAuthProvider = googleAuthProvider;

        auth.onAuthStateChanged(user => {
            this.currentUser = user;
        });

        extendObservable(this, {
            currentUser: null,
            signOut: action(() => this.auth.signOut()),
            signInWithGoogle: action(() => this.auth.signInWithPopup(this.googleAuthProvider)),
            authed: computed(() => !!this.currentUser)
        })
    };

    return new Store();
}

export default createStore;