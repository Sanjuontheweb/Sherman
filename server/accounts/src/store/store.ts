import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "../lib/firebase/firebase.js";

export interface AuthState {
    user: any;
    loading: boolean;
    data: any;
}

type Listener = (state: AuthState) => void;

class VanillaStore {
    private state: AuthState = {
        user: null,
        loading: true,
        data: {}
    };
    private listeners: Set<Listener> = new Set();

    constructor(initialState: AuthState) {
        this.state = initialState;
    }

    public subscribe(listener: Listener): () => void {
        this.listeners.add(listener);

        listener(this.state);
        
        return () => {
            this.listeners.delete(listener);
        };
    }

    public update(updater: (curr: AuthState) => AuthState): void {
        this.state = updater(this.state);
        this.listeners.forEach(listener => listener(this.state));
    }

    public set(newState: AuthState): void {
        this.state = newState;
        this.listeners.forEach(listener => listener(this.state));
    }

    public get(): AuthState {
        return this.state;
    }
}

export const authStore = new VanillaStore({
    user: null,
    loading: true,
    data: {}
});

export const authHandlers = {
    signup: async (email: string, pass: string) => {
        await createUserWithEmailAndPassword(auth, email, pass);
    },
    login: async (email: string, pass: string) => {
        await signInWithEmailAndPassword(auth, email, pass);
    },
    logout: async () => {
        await signOut(auth);
    }
};