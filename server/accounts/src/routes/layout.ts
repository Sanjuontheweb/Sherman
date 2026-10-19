import { auth, db } from '../lib/firebase/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { authStore } from '../store/store.js';

interface LayoutOptions {
    childrenRenderer: () => HTMLElement;
    faviconUrl?: string;
}

export function initLayout({ childrenRenderer, faviconUrl }: LayoutOptions): HTMLElement {
    if (faviconUrl) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.type = 'image/png';
        link.href = faviconUrl;
    }

    const mainContainer = document.createElement('div');
    mainContainer.className = 'mainContainer';
    mainContainer.appendChild(childrenRenderer());

    auth.onAuthStateChanged(async (user) => {
        const currentPath = window.location.pathname;

        if (user && (currentPath === "/accounts" || currentPath === "/accounts/")) {
            window.location.href = "/";
            return;
        }

        if (!user) {
            authStore.update((curr: any) => ({
                ...curr,
                user: null,
                loading: false
            }));
            return;
        }

        let dataToSetToStore;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            const userRef = doc(db, "users", user.uid);
            dataToSetToStore = {
                email: user.email,
                todos: []
            };
            await setDoc(userRef, dataToSetToStore, { merge: true });
        } else {
            dataToSetToStore = docSnap.data();
        }

        authStore.update((curr: any) => ({
            ...curr,
            user: user,
            data: dataToSetToStore,
            loading: false
        }));
    });

    return mainContainer;
}