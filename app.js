const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const dashboardSection = document.getElementById("dashboard-section");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

showRegister.addEventListener("click", function(event) {
    event.preventDefault();

    loginSection.hidden = true;
    registerSection.hidden = false;
    dashboardSection.hidden = true;
});

showLogin.addEventListener("click", function(event) {
    event.preventDefault();

    registerSection.hidden = true;
    loginSection.hidden = false;
    dashboardSection.hidden = true;
});

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("reg-fullname").value.trim();
    const birthDate = document.getElementById("reg-birthdate").value;
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm").value;

    if (fullName === "") {
        alert("Vui lòng nhập Họ và tên");
        return;
    }

    if (birthDate === "") {
        alert("Vui lòng nhập Ngày sinh");
        return;
    }

    if (username === "") {
        alert("Vui lòng nhập Tên đăng nhập");
        return;
    }

    if (password.trim() === "") {
        alert("Vui lòng nhập Mật khẩu");
        return;
    }

    if (confirmPassword.trim() === "") {
        alert("Vui lòng nhập lại Mật khẩu");
        return;
    }

    let todayString;

    if (TODAY instanceof Date) {
        const year = TODAY.getFullYear();
        const month = String(TODAY.getMonth() + 1).padStart(2, "0");
        const day = String(TODAY.getDate()).padStart(2, "0");
        todayString = year + "-" + month + "-" + day;
    } else {
        todayString = String(TODAY).slice(0, 10);
    }

    if (birthDate > todayString) {
        alert("Ngày sinh không hợp lệ");
        return;
    }

    let isExist = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username.toLowerCase() === username.toLowerCase()) {
            isExist = true;
            break;
        }
    }

    if (isExist) {
        alert("Tên đăng nhập đã tồn tại");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }
    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp");
        return;
    }

    const newUser = {
        username: username,
        password: password,
        fullName: fullName,
        birthDate: birthDate
    };

    users.push(newUser);

    alert("Đăng ký thành công!");
    registerForm.reset();
    registerSection.hidden = true;
    loginSection.hidden = false;
});

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (username === "") {
        alert("Vui lòng nhập Tên đăng nhập");
        return;
    }

    if (password.trim() === "") {
        alert("Vui lòng nhập Mật khẩu");
        return;
    }
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].username.toLowerCase() === username.toLowerCase() &&
            users[i].password === password
        ) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser === null) {
        alert("Tên đăng nhập hoặc mật khẩu không đúng");
        return;
    }

    loginSection.hidden = true;
    registerSection.hidden = true;
    dashboardSection.hidden = false;

    document.getElementById("welcome-name").textContent = foundUser.fullName;

    loginForm.reset();
});

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", function() {
    dashboardSection.hidden = true;
    registerSection.hidden = true;
    loginSection.hidden = false;

    loginForm.reset();
});