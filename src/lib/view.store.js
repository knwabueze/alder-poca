import { extendObservable, action, computed } from "mobx";

const createStore = (auth, googleProvider) => {
    function Store() {
        this.auth = auth;
        this.googleProvider = googleProvider;

        auth.onAuthStateChanged(user => {
            this.currentUser = user;
        });

        extendObservable(this, {
            currentUser: null,
            theme: 'light',
            signOut: action(() => this.auth.signOut()),
            signInWithGoogle: action(() => this.auth.signInWithPopup(this.googleAuthProvider)),
            authed: computed(() => !!this.currentUser),
            toggleTheme: action(() => this.theme === 'dark' ? this.theme = 'light' : this.theme = 'dark')
        });
    }

    return new Store();
}

export default createStore;