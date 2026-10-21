import { authHandlers } from "../store/store.js";

export class AuthenticateComponent {
    private container: HTMLElement;
    private email: string = '';
    private password: string = '';
    private confirmPass: string = '';
    private error: boolean = false;
    private register: boolean = false;
    private authenticating: boolean = false;

    private emailInput!: HTMLInputElement;
    private passwordInput!: HTMLInputElement;
    private confirmPassInput!: HTMLInputElement | null;
    private submitBtn!: HTMLButtonElement;

    constructor(parent: HTMLElement) {
        this.container = document.createElement('div');
        this.container.className = 'authContainer';
        this.render();
        parent.appendChild(this.container);
        window.addEventListener('keydown', this.handleKeys.bind(this));
    }

    private getSelectedRole(): string {
        if (!this.register) return "";
        const checked = this.container.querySelector('input[name="role"]:checked') as HTMLInputElement;
        return checked ? checked.value : "customer";
    }

    private async handleRedirection(): Promise<void> {
        if (this.email === 'admin@gmail.com') {
            window.location.href = "/"; // Send Admin to root
            return;
        }

        try {
            // Check users.json via Express API for the user's role
            const res = await fetch(`/accounts/api/users/${this.email}`);
            if (res.ok) {
                const data = await res.json();

                const role = data.role as string;
                if (role) {
                    localStorage.setItem('user_role', role);
                }
                
                // Store role locally to enforce route locks
                localStorage.setItem('user_role', data.role);

                if (role === 'seller') {
                    window.location.href = "/accounts/seller/dashboard"; // Seller dashboard
                    return;
                }
            }
        } catch (err) {
            console.error("Error fetching role:", err);
        }

        window.location.href = "/"; // Customers go to root
    }

    private async handleAuthenticate(): Promise<void> {
        if (this.authenticating) return;
        
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
                await this.handleRedirection();
            } else {
                if (this.email === 'admin@gmail.com') {
                    throw new Error("Admin already exists");
                }

                await authHandlers.signup(this.email, this.password);
                
                // Get the newly generated UID from Firebase
                const { auth } = await import('../lib/firebase/firebase.js');
                const user = auth.currentUser;
                
                if (user) {
                    const username = this.email.split('@')[0];
                    const role = this.getSelectedRole();
                    
                    // Post details to Express server to save in users.json
                    await fetch('/accounts/api/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            uid: user.uid,
                            username: username,
                            email: this.email,
                            role: role
                        })
                    });
                }
                await this.handleRedirection();
            }
        } catch (error) {
            console.error(error);
            this.error = true;
            this.authenticating = false;
            this.updateView();
        }
    }

    private handleRegister(): void {
        this.register = !this.register;
        this.render();
    }

    private handleKeys(e: KeyboardEvent): void {
        if (e.key === 'Enter') {
            this.handleAuthenticate();
        }
    }

    private render(): void {
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
                </label>
                
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
                ` : ''}

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

    private bindEvents(): void {
        this.emailInput = this.container.querySelector('#email-input') as HTMLInputElement;
        this.passwordInput = this.container.querySelector('#password-input') as HTMLInputElement;
        this.confirmPassInput = this.container.querySelector('#confirm-input') as HTMLInputElement | null;
        this.submitBtn = this.container.querySelector('#submit-btn') as HTMLButtonElement;
        const toggleAction = this.container.querySelector('#toggle-action');

        this.emailInput.addEventListener('input', (e) => {
            this.email = (e.target as HTMLInputElement).value;
            this.updateLabels();
        });

        this.passwordInput.addEventListener('input', (e) => {
            this.password = (e.target as HTMLInputElement).value;
            this.updateLabels();
        });

        if (this.confirmPassInput) {
            this.confirmPassInput.addEventListener('input', (e) => {
                this.confirmPass = (e.target as HTMLInputElement).value;
                this.updateLabels();
            });
        }

        this.submitBtn.addEventListener('click', () => this.handleAuthenticate());
        toggleAction?.addEventListener('click', () => this.handleRegister());
    }

    private updateLabels(): void {
        const emailP = this.container.querySelector('#email-label-p');
        if (emailP) emailP.className = this.email ? "above" : "center";
        const passP = this.container.querySelector('#password-label-p');
        if (passP) passP.className = this.password ? "above" : "center";
        if (this.confirmPassInput) {
            const confirmP = this.container.querySelector('#confirm-label-p');
            if (confirmP) confirmP.className = this.confirmPass ? "above" : "center";
        }
    }

    private updateView(): void {
        const errDiv = this.container.querySelector('#error-container');
        if (errDiv) errDiv.innerHTML = this.error ? `<p class="error">The info you have entered is incorrect</p>` : '';
        if (this.submitBtn) this.submitBtn.innerHTML = this.authenticating ? '<i class="fa-solid fa-spiral spur"></i>' : 'Submit';
    }
}