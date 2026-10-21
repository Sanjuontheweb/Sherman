import { authHandlers } from "../store/store.js";

export class SellProductComponent {
    private container: HTMLElement;

    constructor(parent: HTMLElement) {
        this.container = document.createElement('div');
        this.container.className = 'mainContainer'; 
        this.render();
        parent.appendChild(this.container);
    }

    private render(): void {
        this.container.innerHTML = `
            <div class="selling-container"></div>
        `;
    }
}