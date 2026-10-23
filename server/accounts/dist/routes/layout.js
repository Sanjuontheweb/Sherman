import { auth, db } from '../lib/firebase/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { authStore } from '../store/store.js';
export function initLayout({ childrenRenderer, faviconUrl, className }) {
    if (faviconUrl) {
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.type = 'image/png';
        link.href = faviconUrl;
    }
    const mainContainer = document.createElement('div');
    mainContainer.className = className !== undefined ? className : 'mainContainer';
    mainContainer.appendChild(childrenRenderer());
    auth.onAuthStateChanged(async (user) => {
        const currentPath = window.location.pathname;
        let role = localStorage.getItem('user_role');
        let uid = localStorage.getItem('uid');
        if (!user) {
            localStorage.removeItem('user_role');
            localStorage.removeItem('uid');
            authStore.update((curr) => ({ ...curr, user: null, loading: false }));
            if (currentPath !== "/accounts" && currentPath !== "/accounts/") {
                window.location.href = "/accounts/";
            }
            return;
        }
        if (!role && user.email) {
            try {
                const res = await fetch(`/accounts/api/users/${user.email}`);
                if (res.ok) {
                    const data = await res.json();
                    role = data.role;
                    uid = data.uid;
                    if (role) {
                        localStorage.setItem('user_role', role);
                    }
                    if (uid) {
                        localStorage.setItem('uid', uid);
                    }
                }
            }
            catch (err) {
                console.error("Error fetching role & uid:", err);
            }
        }
        const isAccountsLogin = currentPath === "/accounts" || currentPath === "/accounts/";
        const isSellProduct = currentPath === "/accounts/seller/sellProduct" || currentPath === "/accounts/seller/sellProduct/";
        const isSellerDash = currentPath === "/accounts/seller/dashboard" || currentPath === "/accounts/seller/dashboard/";
        const isSellerRoute = isSellerDash || isSellProduct;
        if (role === 'admin') {
            if (isAccountsLogin) {
                window.location.href = "/";
                return;
            }
        }
        else if (role === 'seller') {
            if (!isSellerRoute) {
                window.location.href = "/accounts/seller/dashboard";
                return;
            }
        }
        else {
            if (isAccountsLogin || isSellerRoute) {
                window.location.href = "/";
                return;
            }
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
        }
        else {
            dataToSetToStore = docSnap.data();
        }
        authStore.update((curr) => ({
            ...curr,
            user: user,
            data: dataToSetToStore,
            loading: false
        }));
    });
    return mainContainer;
}
//# sourceMappingURL=layout.js.map