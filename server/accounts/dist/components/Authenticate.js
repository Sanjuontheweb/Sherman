import { authHandlers } from "../store/store.js";
export class AuthenticateComponent {
    container;
    email = '';
    password = '';
    confirmPass = '';
    error = false;
    register = false;
    authenticating = false;
    emailInput;
    passwordInput;
    confirmPassInput;
    errorContainer;
    titleElement;
    submitBtn;
    toggleText;
    constructor(parent) {
        this.container = document.createElement('div');
        this.container.className = 'authContainer';
        this.render();
        parent.appendChild(this.container);
        window.addEventListener('keydown', this.handleKeys.bind(this));
    }
    async handleAuthenticate() {
        if (this.authenticating)
            return;
        if (!this.email || !this.password || (this.register && !this.confirmPass)) {
            this.error = true;
            this.updateView();
            return;
        }
        this.authenticating = true;
        this.updateView();
        try {
            if (!this.register) {
                await authHandlers.login(this.email, this.password);
            }
            else {
                await authHandlers.signup(this.email, this.password);
            }
            window.location.href = "/";
        }
        catch (error) {
            console.error(error);
            this.error = true;
            this.authenticating = false;
            this.updateView();
        }
    }
    handleRegister() {
        this.register = !this.register;
        this.render();
    }
    handleKeys(e) {
        if (e.key === 'Enter') {
            this.handleAuthenticate();
        }
    }
    render() {
        this.container.innerHTML = `
            <form id="auth-form">
                <h1 id="auth-title">${this.register ? "Register" : "Login"}</h1>
                <div id="error-container"></div>
                <label>
                    <p id="email-label-p" class="${this.email ? "above" : "center"}">Email</p>
                    <input id="email-input" type="email" placeholder="Email" value="${this.email}" />
                </label>
                <label>
                    <p id="password-label-p" class="${this.password ? 'above' : 'center'}">Password</p>
                    <input id="password-input" type="password" placeholder="Password" value="${this.password}" />
                </label>
                ${this.register ? `
                <label>
                    <p id="confirm-label-p" class="${this.confirmPass ? 'above' : 'center'}">Confirm Password</p>
                    <input id="confirm-input" type="password" placeholder="Confirm password" value="${this.confirmPass}" />
                </label>` : ''}

                <div class="role-selector">
                    <label class="radio-label">
                        <input type="radio" name="role" value="customer" checked />
                        Customer
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="role" value="seller" />
                        Seller
                    </label>
                </div>

                <button id="submit-btn" type="button" class="submitBtn">
                    ${this.authenticating ? '<i class="fa-solid fa-spiral spur"></i>' : 'Submit'}
                </button>
            </form>
            <div class="options">
                <p>Or</p>
                <div id="toggle-container">
                    <p>${this.register ? "Already have an acc?" : "Don't have an acc?"}</p>
                    <p id="toggle-action" style="cursor: pointer; color: rgb(245, 161, 248);">${this.register ? "Login" : "Register"}</p>
                </div>
            </div>
        `;
        this.bindEvents();
    }
    bindEvents() {
        this.emailInput = this.container.querySelector('#email-input');
        this.passwordInput = this.container.querySelector('#password-input');
        this.confirmPassInput = this.container.querySelector('#confirm-input');
        this.submitBtn = this.container.querySelector('#submit-btn');
        const toggleAction = this.container.querySelector('#toggle-action');
        this.emailInput.addEventListener('input', (e) => {
            this.email = e.target.value;
            this.updateLabels();
        });
        this.passwordInput.addEventListener('input', (e) => {
            this.password = e.target.value;
            this.updateLabels();
        });
        if (this.confirmPassInput) {
            this.confirmPassInput.addEventListener('input', (e) => {
                this.confirmPass = e.target.value;
                this.updateLabels();
            });
        }
        this.submitBtn.addEventListener('click', () => this.handleAuthenticate());
        toggleAction?.addEventListener('click', () => this.handleRegister());
    }
    updateLabels() {
        const emailP = this.container.querySelector('#email-label-p');
        if (emailP)
            emailP.className = this.email ? "above" : "center";
        const passP = this.container.querySelector('#password-label-p');
        if (passP)
            passP.className = this.password ? "above" : "center";
        if (this.confirmPassInput) {
            const confirmP = this.container.querySelector('#confirm-label-p');
            if (confirmP)
                confirmP.className = this.confirmPass ? "above" : "center";
        }
    }
    updateView() {
        const errDiv = this.container.querySelector('#error-container');
        if (errDiv) {
            errDiv.innerHTML = this.error ? `<p class="error">The info you have entered is incorrect</p>` : '';
        }
        if (this.submitBtn) {
            this.submitBtn.innerHTML = this.authenticating ? '<i class="fa-solid fa-spiral spur"></i>' : 'Submit';
        }
    }
}
//# sourceMappingURL=Authenticate.js.map