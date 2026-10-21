import { initLayout } from './routes/layout.js';
import { AuthenticateComponent } from './components/Authenticate.js';
import { SellerDashboardComponent } from './components/SellerDashboard.js';
const appContainer = document.getElementById('app') || document.body;
const path = window.location.pathname;
const layoutElement = initLayout({
    childrenRenderer: () => {
        const wrapper = document.createElement('div');
        if (path.includes('/seller')) {
            new SellerDashboardComponent(wrapper);
        }
        else {
            new AuthenticateComponent(wrapper);
        }
        // add the sellproduct compoent also
        return wrapper;
    },
    faviconUrl: '/accounts/lib/assets/sherman-logo-title.png'
});
appContainer.appendChild(layoutElement);
//# sourceMappingURL=main.js.map