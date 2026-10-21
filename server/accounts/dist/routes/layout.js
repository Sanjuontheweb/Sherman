import { auth, db } from '../lib/firebase/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { authStore } from '../store/store.js';
export function initLayout({ childrenRenderer, faviconUrl }) {
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
    mainContainer.className = 'mainContainer';
    mainContainer.appendChild(childrenRenderer());
    auth.onAuthStateChanged(async (user) => {
        const currentPath = window.location.pathname;
        let role = localStorage.getItem('user_role');
        // 1. Force unauthenticated users to the login page (Fixes the '/' landing issue)
        if (!user) {
            localStorage.removeItem('user_role'); // Clean up stale data
            authStore.update((curr) => ({ ...curr, user: null, loading: false }));
            // Redirect anyone who isn't on the accounts page
            if (currentPath !== "/accounts" && currentPath !== "/accounts/") {
                window.location.href = "/accounts/";
            }
            return;
        }
        // 2. Fetch role if not in localStorage (Fixes role missing on page refresh/auto-login)
        if (!role && user.email) {
            try {
                const res = await fetch(`/accounts/api/users/${user.email}`);
                if (res.ok) {
                    const data = await res.json();
                    role = data.role;
                    if (role) {
                        // TS now knows 'role' is strictly a string here
                        localStorage.setItem('user_role', role);
                    }
                }
            }
            catch (err) {
                console.error("Error fetching role:", err);
            }
        }
        const isAccountsLogin = currentPath === "/accounts" || currentPath === "/accounts/";
        const isSellerDash = currentPath === "/accounts/seller/dashboard" || currentPath === "/accounts/seller/dashboard/";
        if (role === 'admin') {
            // Admins can go anywhere. Just keep them off the login page.
            if (isAccountsLogin) {
                window.location.href = "/";
                return;
            }
        }
        else if (role === 'seller') {
            // Sellers are ONLY allowed on the seller dashboard.
            if (!isSellerDash) {
                window.location.href = "/accounts/seller/dashboard";
                return;
            }
        }
        else {
            // Customers cannot access the login page OR the seller dashboard.
            if (isAccountsLogin || isSellerDash) {
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