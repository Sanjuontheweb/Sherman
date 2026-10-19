export interface AuthState {
    user: any;
    loading: boolean;
    data: any;
}
type Listener = (state: AuthState) => void;
declare class VanillaStore {
    private state;
    private listeners;
    constructor(initialState: AuthState);
    subscribe(listener: Listener): () => void;
    update(updater: (curr: AuthState) => AuthState): void;
    set(newState: AuthState): void;
    get(): AuthState;
}
export declare const authStore: VanillaStore;
export declare const authHandlers: {
    signup: (email: string, pass: string) => Promise<void>;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
};
export {};
//# sourceMappingURL=store.d.ts.map