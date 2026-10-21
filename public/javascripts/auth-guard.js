import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export async function guardAuth() {
    const response = await fetch('/accounts/api/config');
    const firebaseConfig = await response.json();
    
    const app = initializeApp(firebaseConfig, "sherman");
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        const currentPath = window.location.pathname;
        
        if (!user) {
            window.location.href = "/accounts/";
            return;
        }

        const role = localStorage.getItem('user_role');
        const isSellerDash = currentPath === "/accounts/seller/dashboard" || currentPath === "/accounts/seller/dashboard/";

        if (role === 'admin') {
            return; // Do nothing, let the admin browse freely
        }

        if (role === 'seller' && !isSellerDash) {
            window.location.href = "/accounts/seller/dashboard";
        }
        
        if (role !== 'seller' && role !== 'admin' && isSellerDash) {
            window.location.href = "/";
        }
    });

    return auth;
}

export {signOut};
await guardAuth()