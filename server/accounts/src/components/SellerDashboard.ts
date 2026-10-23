import { authHandlers } from "../store/store.js";

export class SellerDashboardComponent {
    private container: HTMLElement;
    private myProducts: any[] = [];     // Stores this seller's products
    private currentIndex: number = 0;

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
                    <li class="productListEmpty">Loading...</li>
                </ul>

                <button class="addProductBtn" type="button">
                    <i class="fa-solid fa-plus"></i>
                    <span>Add Product</span>
                </button>
                </aside>

                <section class="productDisplayPanel">
                <h2 class="productDisplayTitle">Products</h2>

                <button class="panelNav panelNav-prev" type="button" aria-label="Previous product" disabled>
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <div class="productStage" style="overflow: hidden; position: relative; display: flex;">
                    <p class="productEmptyMessage">Loading products...</p>
                </div>

                <button class="panelNav panelNav-next" type="button" aria-label="Next product" disabled>
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

        const addProductBtn = this.container.querySelector('.addProductBtn');
        addProductBtn?.addEventListener('click', () => {
            window.location.href = "/accounts/seller/sellProduct";
        });

        this.setupNavigation();
        this.fetchAndRenderProducts();
    }

    private setupNavigation(): void {
        const nextBtn = this.container.querySelector('.panelNav-next') as HTMLButtonElement;
        const prevBtn = this.container.querySelector('.panelNav-prev') as HTMLButtonElement;

        nextBtn?.addEventListener('click', () => {
            if (this.currentIndex < this.myProducts.length - 1) {
                this.currentIndex++;
                this.updateCarouselView();
            }
        });

        prevBtn?.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateCarouselView();
            }
        });
    }

    private async fetchAndRenderProducts(): Promise<void> {
        const productStage = this.container.querySelector('.productStage') as HTMLElement;
        const productList = this.container.querySelector('.productList') as HTMLElement;
        
        if (!productStage || !productList) return;

        try {
            const currentUid = localStorage.getItem('uid') || "";
            const response = await fetch('/accounts/api/products');
            const allProducts = await response.json();

            this.myProducts = allProducts.filter((product: any) => product.sellerId === currentUid);

            if (this.myProducts.length === 0) {
                productStage.innerHTML = `<p class="productEmptyMessage">You currently have no products listed.</p>`;
                productList.innerHTML = `<li class="productListEmpty">No products yet</li>`;
                return;
            }

            const trackHTML = `
                <div class="carouselTrack" 
                style="display: flex;
                 transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                 width: 100%;
                 align-items: center;">

                    ${this.myProducts.map((product: any) => {
                        const starCount = product.rating?.stars || 0;
                        const starString = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
                        const keywordsHTML = (product.keywords || []).map((kw: string) => `<span class="keywordChip">${kw}</span>`).join('');

                        return `
                            <div style="min-width: 100%; flex-shrink: 0; padding: 10px; box-sizing: border-box;">
                                <article class="productCard" style="margin: 0 auto;">

                                    <div class="productCardImage">
                                        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
                                    </div>

                                    <h3 class="productCardName">${product.name}</h3>
                                    <div class="productCardRating">
                                        ${starString} (${product.rating?.count || 0})
                                    </div>

                                    <div class="productCardKeywords">${keywordsHTML}</div>
                                    <p class="productCardDescription">${product.description}</p>
                                </article>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            productStage.innerHTML = trackHTML;

            productList.innerHTML = this.myProducts.map((product: any, index: number) => `
                <li class="productListItem">
                    <span class="productListName">${product.name}</span>
                </li>
            `).join('');

            this.updateCarouselView();

        } catch (error) {
            console.error("Failed to load products:", error);
            productStage.innerHTML = 
              `<p class="productEmptyMessage" style="color:#e5484d;">
                  Error loading products.
                </p>`;
        }
    }

    private updateCarouselView(): void {
        const track = this.container.querySelector('.carouselTrack') as HTMLElement;
        const nextBtn = this.container.querySelector('.panelNav-next') as HTMLButtonElement;
        const prevBtn = this.container.querySelector('.panelNav-prev') as HTMLButtonElement;
        const listItems = this.container.querySelectorAll('.productListItem');

        if (track) {
            track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }

        if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
        if (nextBtn) nextBtn.disabled = this.currentIndex === (this.myProducts.length - 1);

        // Highlight the corresponding name in the sidebar
        listItems.forEach((item, index) => {
            if (index === this.currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}