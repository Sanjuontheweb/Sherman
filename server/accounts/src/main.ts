import { initLayout } from './routes/layout.js';
import { AuthenticateComponent } from './components/Authenticate.js';

const appContainer = document.getElementById('app') || document.body;
const path = window.location.pathname;

const layoutElement = initLayout({
    childrenRenderer: () => {
        const wrapper = document.createElement('div');
        new AuthenticateComponent(wrapper);
        
        return wrapper;
    },
    faviconUrl: '/accounts/lib/assets/sherman-logo-title.png'
});

appContainer.appendChild(layoutElement);