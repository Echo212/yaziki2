document.addEventListener('DOMContentLoaded', () => {
    const passwordList = document.getElementById('password-list');
    const passwordForm = document.getElementById('password-form');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const urlInput = document.getElementById('url');

    function showPasswords() {
        passwordList.innerHTML = '';
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.forEach((password, index) => {
            const passwordItem = document.createElement('div');
            passwordItem.className = 'password-item';
            passwordItem.innerHTML = `
                <p><strong>Login:</strong> ${password.login}</p>
                <p><strong>Password:</strong> <span class="password" data-password="${password.password}">********</span>
                    <button class="show-password" data-index="${index}">Show</button>
                </p>
                <p><strong>URL:</strong> <a href="${password.url}" target="_blank">${password.url}</a></p>
                <button data-index="${index}">Delete</button>
            `;
            passwordList.appendChild(passwordItem);
        });
    }

    function addPassword(login, password, url) {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ login, password, url });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        showPasswords();
    }

    function deletePassword(index) {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        showPasswords();
    }

    function hidePassword(index) {
        const passwordSpans = document.querySelectorAll('.password');
        const passwordSpan = passwordSpans[index];
        const showPasswordButtons = document.querySelectorAll('.show-password');
        const button = showPasswordButtons[index];

        if (passwordSpan.innerText === '********') {
            passwordSpan.innerText = passwordSpan.dataset.password;
            button.innerText = 'Hide';
        } else {
            passwordSpan.innerText = '********';
            button.innerText = 'Show';
        }
    }

    passwordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const login = loginInput.value;
        const password = passwordInput.value;
        const url = urlInput.value;
        addPassword(login, password, url);
        passwordForm.reset();
    });

    passwordList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('show-password')) {
            const index = event.target.getAttribute('data-index');
            hidePassword(index);
        } else if (event.target.tagName === 'BUTTON' && !event.target.classList.contains('show-password')) {
            const index = event.target.getAttribute('data-index');
            deletePassword(index);
        }
    });

    showPasswords();
});
