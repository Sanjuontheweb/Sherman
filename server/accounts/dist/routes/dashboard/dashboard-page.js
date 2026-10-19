import { auth, db } from "../../lib//firebase/firebase.js";
import { authHandlers, authStore } from "../../store/store.js";
import { doc, setDoc } from 'firebase/firestore';
export class DashboardComponent {
    parent;
    todoList = [];
    currentTodo = "";
    error = false;
    isLoading = true;
    unsubscribeStore = null;
    constructor(parent) {
        this.parent = parent;
        this.initStoreSubscription();
        window.addEventListener('keydown', this.handleKeys.bind(this));
    }
    initStoreSubscription() {
        this.unsubscribeStore = authStore.subscribe((current) => {
            this.isLoading = current.loading;
            if (current.data && current.data.todos) {
                this.todoList = current.data.todos;
            }
            this.render();
        });
    }
    addTodo() {
        this.error = false;
        if (!this.currentTodo) {
            this.error = true;
        }
        else {
            this.todoList = [...this.todoList, this.currentTodo];
            this.currentTodo = "";
        }
        this.render();
    }
    editTodo(index) {
        const newTodoList = this.todoList.filter((_, i) => i !== index);
        this.currentTodo = this.todoList[index] ?? "";
        this.todoList = newTodoList;
        this.render();
    }
    async saveTodo() {
        try {
            let currentUser = null;
            authStore.subscribe((curr) => { currentUser = curr.user; })();
            if (!currentUser)
                return;
            const userRef = doc(db, "users", currentUser.uid);
            await setDoc(userRef, { todos: this.todoList }, { merge: true });
        }
        catch (err) {
            console.log("There was an error in saving your information. Please try again");
        }
    }
    removeTodo(index) {
        this.todoList = this.todoList.filter((_, i) => i !== index);
        this.render();
    }
    handleKeys(event) {
        if (event.key === "Enter") {
            this.addTodo();
        }
    }
    destroy() {
        if (this.unsubscribeStore) {
            this.unsubscribeStore();
        }
    }
    render() {
        if (this.isLoading) {
            this.parent.innerHTML = `<i class="fa-solid fa-spiral pageLoad"></i>`;
            return;
        }
        this.parent.innerHTML = `
            <div class="mainContainer">
                <div class="headerContainer">
                    <h1>Todo List</h1>
                    <div class="headerBtns">
                        <button id="save-btn"><i class="fa-solid fa-floppy-disk"></i><p>Save</p></button>
                        <button id="logout-btn"><i class="fa-solid fa-right-from-bracket"></i><p>Logout</p></button>
                    </div>
                </div>
                <main id="todo-main-section">
                    ${this.todoList.length === 0 ? `<p>You are Jobless?</p>` : ''}
                    ${this.todoList.map((todo, index) => `
                        <div class="todo">
                            <p>${index + 1}.${escapeHtml(todo)}</p>
                            <div class="actions">
                                <i class="fa-solid fa-pen-nib edit-btn" data-index="${index}"></i>
                                <i class="fa-solid fa-trash-can delete-btn" data-index="${index}"></i>
                            </div>
                        </div>
                    `).join('')}
                </main>
                <div class="enterTodo ${this.error ? "errorBordr" : ""}">
                    <input id="todo-input" type="text" placeholder="Enter todo" value="${escapeHtml(this.currentTodo)}">
                    <button id="add-todo-btn">ADD</button>
                </div>
            </div>
        `;
        this.bindEvents();
    }
    bindEvents() {
        const saveBtn = this.parent.querySelector('#save-btn');
        const logoutBtn = this.parent.querySelector('#logout-btn');
        const addBtn = this.parent.querySelector('#add-todo-btn');
        const todoInput = this.parent.querySelector('#todo-input');
        saveBtn?.addEventListener('click', () => this.saveTodo());
        logoutBtn?.addEventListener('click', () => authHandlers.logout());
        addBtn?.addEventListener('click', () => this.addTodo());
        todoInput?.addEventListener('input', (e) => {
            this.currentTodo = e.target.value;
        });
        this.parent.querySelectorAll('.edit-btn').forEach((el) => {
            el.addEventListener('click', (e) => {
                const idx = Number(e.currentTarget.getAttribute('data-index'));
                this.editTodo(idx);
            });
        });
        this.parent.querySelectorAll('.delete-btn').forEach((el) => {
            el.addEventListener('click', (e) => {
                const idx = Number(e.currentTarget.getAttribute('data-index'));
                this.removeTodo(idx);
            });
        });
    }
}
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//# sourceMappingURL=dashboard-page.js.map