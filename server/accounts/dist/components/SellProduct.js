import { authHandlers } from "../store/store.js";
export class SellProductComponent {
    container;
    constructor(parent) {
        this.container = document.createElement('div');
        this.container.className = 'mainContainer';
        this.render();
        parent.appendChild(this.container);
    }
    render() {
        this.container.innerHTML = `
            <div class="selling-container"></div>
        `;
    }
}
//# sourceMappingURL=SellProduct.js.map