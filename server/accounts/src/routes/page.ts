import { AuthenticateComponent } from "../components/Authenticate.js";

export function initAuthPage(parent: HTMLElement): void {
    new AuthenticateComponent(parent);
}