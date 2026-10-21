import { authHandlers } from "../store/store.js";

export class SellerDashboardComponent {
    private container: HTMLElement;

    constructor(parent: HTMLElement) {
        this.container = document.createElement('div');
        this.container.className = 'mainContainer'; 
        this.render();
        parent.appendChild(this.container);
    }

    private render(): void {
        this.container.innerHTML = `
            <div class="dashboardContainer">
            <div class="headerContainer">
                <div class="titleBox">
                <h1>Dashboard</h1>
                </div>
                <div class="headerBtns">
                <button id="logout-btn">
                    <p>⏻</p>
                </button>
                </div>
            </div>

            <div class="dashboardBody">
                <aside class="productListPanel">
                <ul class="productList">
                    <!-- Empty state - shown when there are no products -->
                    <li class="productListEmpty">No products yet</li>

                    <!-- One of these per product, in place of the empty state above:
                    <li class="productListItem active">
                    <span class="productListName">Product name</span>
                    </li>
                    -->
                </ul>

                <button class="addProductBtn" type="button" onclick="window.location.href = '/accounts/seller/sellProduct'">
                    <i class="fa-solid fa-plus"></i>
                    <span>Add Product</span>
                </button>
                </aside>

                <section class="productDisplayPanel">
                <h2 class="productDisplayTitle">Products</h2>

                <button class="panelNav panelNav-prev" type="button" aria-label="Previous product">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <div class="productStage">
                    <!-- Empty state - shown when there are no products -->
                    <p class="productEmptyMessage">You currently have no products listed.</p>

                    <!-- The selected product's card, in place of the empty state above:
                    <article class="productCard">
                    <div class="productCardImage">
                        <img src="" alt="">
                    </div>
                    <h3 class="productCardName">Product name</h3>
                    <div class="productCardRating">★★★★☆</div>
                    <div class="productCardKeywords">
                        <span class="keywordChip">keyword</span>
                        <span class="keywordChip">keyword</span>
                    </div>
                    <p class="productCardDescription">Description text goes here.</p>
                    </article>
                    -->
                </div>

                <button class="panelNav panelNav-next" type="button" aria-label="Next product">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                </section>
            </div>
            </div>
        `;

        const logoutBtn = this.container.querySelector('#logout-btn');
        logoutBtn?.addEventListener('click', async () => {
            localStorage.removeItem('user_role');
            await authHandlers.logout();
            window.location.href = "/accounts/";
        });
    }
}