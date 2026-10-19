import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "../lib/firebase/firebase.js";
class VanillaStore {
    state = {
        user: null,
        loading: true,
        data: {}
    };
    listeners = new Set();
    constructor(initialState) {
        this.state = initialState;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.state);
        return () => {
            this.listeners.delete(listener);
        };
    }
    update(updater) {
        this.state = updater(this.state);
        this.listeners.forEach(listener => listener(this.state));
    }
    set(newState) {
        this.state = newState;
        this.listeners.forEach(listener => listener(this.state));
    }
    get() {
        return this.state;
    }
}
export const authStore = new VanillaStore({
    user: null,
    loading: true,
    data: {}
});
export const authHandlers = {
    signup: async (email, pass) => {
        await createUserWithEmailAndPassword(auth, email, pass);
    },
    login: async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass);
    },
    logout: async () => {
        await signOut(auth);
    }
};
//# sourceMappingURL=store.js.map