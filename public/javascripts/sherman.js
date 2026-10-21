import { products } from "./products.js"
import { guardAuth, signOut } from './auth-guard.js';

let productHTML = '';

products.forEach((product) => {
  productHTML += `<div class="product-container" onclick="window.location.href = '/details/${product.id}'">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-spacer"></div>

        </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;

async function logoutUser() {
    const auth = await guardAuth();
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        localStorage.removeItem('user_role'); 
        
        try {
            await signOut(auth);
            window.location.href = "/accounts/";
        } catch (error) {
            console.error("Error logging out:", error);
        }
      });
    }
}

// Execute the setup
logoutUser();