import { initLayout } from './routes/layout.js';
import { AuthenticateComponent } from './components/Authenticate.js';
import { SellerDashboardComponent } from './components/SellerDashboard.js';
import { SellProductComponent } from './components/SellProduct.js';

const appContainer = document.getElementById('app') || document.body;
const path = window.location.pathname;

const layoutElement = initLayout({
    childrenRenderer: () => {
        const wrapper = document.createElement('div');

        if (path === '/accounts/seller/sellProduct' || path === '/accounts/seller/sellProduct/') {
            new SellProductComponent(wrapper); 
        } else if (path === '/accounts/seller/dashboard' || path === '/accounts/seller/dashboard/') {
            new SellerDashboardComponent(wrapper);
        } else {
            new AuthenticateComponent(wrapper);
        }

        return wrapper;
    },
    faviconUrl: '/accounts/lib/assets/sherman-logo-title.png'
});

appContainer.appendChild(layoutElement);