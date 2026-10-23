export class SellProductComponent {
    container;
    constructor(parent) {
        this.container = parent;
        this.render();
    }
    async render() {
        try {
            const res = await fetch('/accounts/routes/sell/sell.html');
            if (res.ok) {
                const htmlText = await res.text();
                this.container.innerHTML = htmlText;
                this.bindEvents();
            }
            else {
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
        }
        catch (error) {
            console.error("Failed to load seller template:", error);
        }
    }
    bindEvents() {
        const form = this.container.querySelector('#detailsForm');
        const fileInput = this.container.querySelector('#productImage');
        const dropzone = this.container.querySelector('#dropzone');
        const imageError = this.container.querySelector('#imageError');
        const dropThumb = this.container.querySelector('#dropThumb');
        const dropMain = this.container.querySelector('#dropMain');
        const dropSub = this.container.querySelector('#dropSub');
        let uploadedImagePath = "";
        function isPng(file) {
            return !!(file && file.type === 'image/png' && /\.png$/i.test(file.name));
        }
        function resetImage(message) {
            fileInput.value = '';
            dropzone.classList.remove('hasFile');
            dropzone.classList.toggle('hasError', !!message);
            dropThumb.textContent = 'PNG';
            dropMain.textContent = 'Click to upload an image';
            dropSub.textContent = 'A transparent .png looks best';
            imageError.textContent = message || '';
        }
        fileInput.addEventListener('change', (e) => {
            const target = e.target;
            const file = target.files ? target.files[0] : null;
            if (!file) {
                resetImage('');
                return;
            }
            if (!isPng(file)) {
                resetImage('Only .png files are allowed.');
                return;
            }
            uploadedImagePath = `/images/products/${file.name}`;
            dropzone.classList.remove('hasError');
            dropzone.classList.add('hasFile');
            imageError.textContent = '';
            dropMain.textContent = file.name;
            dropSub.textContent = (file.size / 1024).toFixed(0) + ' KB \u00b7 click to replace';
            const reader = new FileReader();
            reader.onload = function (ev) {
                dropThumb.innerHTML = '';
                const img = document.createElement('img');
                img.src = ev.target?.result;
                img.alt = '';
                dropThumb.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
        this.container.addEventListener('input', (e) => {
            const target = e.target;
            if (target.closest && target.closest('#keywordGrid')) {
                target.value = target.value.replace(/[#\s]/g, '');
            }
        });
        form.addEventListener('submit', async (e) => {
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
    async createProduct(productImage) {
        const sellerName = this.container.querySelector('#sellerName');
        const productName = this.container.querySelector('#productName');
        const productPrice = this.container.querySelector('#productPrice');
        const fileInput = this.container.querySelector('#productImage');
        const productDesc = this.container.querySelector('#productDescription');
        const keywordInputs = this.container.querySelectorAll('.keywordss');
        const createBtn = this.container.querySelector('.createBtn');
        const currentUid = localStorage.getItem('uid');
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
            }
            else {
                console.error("Server error:", response.status);
                createBtn.disabled = false;
                createBtn.textContent = 'Create';
            }
        }
        catch (error) {
            console.error("Request failed:", error);
            createBtn.disabled = false;
            createBtn.textContent = 'Create';
        }
    }
}
//# sourceMappingURL=SellProduct.js.map