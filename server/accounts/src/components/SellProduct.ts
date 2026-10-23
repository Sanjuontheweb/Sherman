export class SellProductComponent {
    private container: HTMLElement;

    constructor(parent: HTMLElement) {
        this.container = parent
        this.render();
    }

    private async render(): Promise<void> {
        try {
            const res = await fetch('/accounts/routes/sell/sell.html');
            if (res.ok) {
                const htmlText = await res.text();
                this.container.innerHTML = htmlText;

                this.bindEvents();
            } else {
                this.container.innerHTML = `
                    <p style="color:white;">Error loading form.</p>
                `;
                console.error("Fetch failed with status:", res.status);
            }

            const cssPath = '/accounts/routes/sell/sell.css';
            if (!document.querySelector(`link[href="${cssPath}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = cssPath;
                document.head.appendChild(link);
            }
        } catch (error) {
            console.error("Failed to load seller template:", error);
        }
    }

    private bindEvents(): void {
        const form = this.container.querySelector('#detailsForm') as HTMLFormElement;
        const fileInput = this.container.querySelector('#productImage') as HTMLInputElement;
        const dropzone = this.container.querySelector('#dropzone') as HTMLElement;

        const imageError = this.container.querySelector('#imageError') as HTMLElement;
        const dropThumb = this.container.querySelector('#dropThumb') as HTMLElement;
        const dropMain = this.container.querySelector('#dropMain') as HTMLElement;
        const dropSub = this.container.querySelector('#dropSub') as HTMLElement;

        let uploadedImagePath = ""; 

        function isPng(file: File | null | undefined): boolean {
            return !!(file && file.type === 'image/png' && /\.png$/i.test(file.name));
        }

        function resetImage(message: string) {
            fileInput.value = '';
            dropzone.classList.remove('hasFile');
            dropzone.classList.toggle('hasError', !!message);
            dropThumb.textContent = 'PNG';
            dropMain.textContent = 'Click to upload an image';
            dropSub.textContent = 'A transparent .png looks best';
            imageError.textContent = message || '';
        }

        fileInput.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;
            
            if (!file) {
                 resetImage(''); return;
            }

            if (!isPng(file)) { 
                resetImage('Only .png files are allowed.'); return; 
            }

            uploadedImagePath = `/images/products/${file.name}`;

            dropzone.classList.remove('hasError');
            dropzone.classList.add('hasFile');
            imageError.textContent = '';
            dropMain.textContent = file.name;
            dropSub.textContent = (file.size / 1024).toFixed(0) + ' KB \u00b7 click to replace';

            const reader = new FileReader();
            reader.onload = function (ev: ProgressEvent<FileReader>) {
                dropThumb.innerHTML = '';

                const img = document.createElement('img');
                img.src = ev.target?.result as string;
                img.alt = '';

                dropThumb.appendChild(img);
            };
            reader.readAsDataURL(file);
        });

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;

            if (target.closest && target.closest('#keywordGrid')) {
                target.value = target.value.replace(/[#\s]/g, '');
            }
        });

        form.addEventListener('submit', async (e: Event) => {
            e.preventDefault(); // Prevent page refresh

            if (!isPng(fileInput.files ? fileInput.files[0] : null)) {
                imageError.textContent = 'Please upload a .png image.';
                dropzone.classList.add('hasError');
                return;
            }
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            await this.createProduct(uploadedImagePath);
        });
    }

    private async createProduct(productImage: string): Promise<void> {
        const sellerName = this.container.querySelector('#sellerName') as HTMLInputElement;
        const productName = this.container.querySelector('#productName') as HTMLInputElement;
        const productPrice = this.container.querySelector('#productPrice') as HTMLInputElement;

        const fileInput = this.container.querySelector('#productImage') as HTMLInputElement;
        const productDesc = this.container.querySelector('#productDescription') as HTMLTextAreaElement;
        const keywordInputs = this.container.querySelectorAll('.keywordss') as NodeListOf<HTMLInputElement>;
        const createBtn = this.container.querySelector('.createBtn') as HTMLButtonElement;

        const currentUid = localStorage.getItem('uid') as string;

        createBtn.disabled = true;
        createBtn.textContent = 'Creating...';

        const stars = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        const count = Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
        
        const keywordsss = Array.from(keywordInputs)
            .map(input => input.value)
            .filter(val => val.trim() !== "");

        const formData = new FormData();
        
        if (fileInput.files && fileInput.files[0]) {
            formData.append('productImage', fileInput.files[0]);
        }

        formData.append('id', crypto.randomUUID());
        formData.append('name', productName.value);
        formData.append('price', productPrice.value);
        formData.append('description', productDesc.value);
        
        formData.append('sellerId', currentUid);
        formData.append('seller', sellerName.value);
        formData.append('rating', JSON.stringify({ stars: stars, count: count }));
        formData.append('keywords', JSON.stringify(keywordsss));

        try {
            const response = await fetch(`/accounts/api/products/create`, {
                method: 'POST',
                body: formData 
            });

            if (response.ok) {
                window.location.href = '/accounts/seller/dashboard';
            } else {
                console.error("Server error:", response.status);
                createBtn.disabled = false;
                createBtn.textContent = 'Create';
            }
        } catch (error) {
            console.error("Request failed:", error);
            createBtn.disabled = false;
            createBtn.textContent = 'Create';
        }
    }
}