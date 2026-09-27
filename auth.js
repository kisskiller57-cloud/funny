// ============ MESSAGE BOX ============
function showMessage(text, type) {
    type = type || 'error';
    var box = document.getElementById('messageBox');
    if (!box) {
        alert(text);
        return;
    }
    box.textContent = text;
    box.className = 'message-box show ' + type;
    setTimeout(function() {
        box.className = 'message-box';
    }, 2500);
}

// ============ REGISTER ============
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!username || !password || !confirmPassword) {
            showMessage('အားလုံး ဖြည့်ပါ။');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Password နှစ်ခု မတူဘူး။');
            return;
        }

        if (password.length < 6) {
            showMessage('Password အနည်းဆုံး ၆ လုံး ရှိရမယ်။');
            return;
        }

        const user = {
            username: username,
            password: password
        };

        localStorage.setItem('user', JSON.stringify(user));

        showMessage('Register အောင်မြင်ပါပြီ။ Login ဝင်ပါ။', 'success');

        setTimeout(function() {
            window.location.href = 'login.html';
        }, 1500);
    });
}

// ============ LOGIN ============
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const savedUser = localStorage.getItem('user');

        if (!savedUser) {
            showMessage('Account မရှိသေးဘူး။ Register အရင် လုပ်ပါ။');
            return;
        }

        const user = JSON.parse(savedUser);

        if (user.username !== username) {
            showMessage('Username မှားနေတယ်။');
            return;
        }

        if (user.password !== password) {
            showMessage('Password မှားနေတယ်။');
            return;
        }

        localStorage.setItem('isLoggedIn', 'true');
        showMessage('Login အောင်မြင်ပါပြီ။', 'success');

        setTimeout(function() {
            window.location.href = 'home.html';
        }, 1000);
    });
}

// ============ HOME PROTECTION ============
const homeContainer = document.querySelector('.home-container');

if (homeContainer) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}