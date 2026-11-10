
const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const dashboardSection = document.getElementById("dashboard-section");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const logoutBtn = document.getElementById("logout-btn");

const searchInput = document.getElementById("search-name");
const searchResults = document.getElementById("search-results");

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
        if (
            users[i].username.toLowerCase() ===
            username.toLowerCase()
        ) {
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

    document.getElementById("welcome-name").textContent =
        foundUser.fullName;

    searchInput.value = "";
    searchResults.innerHTML = "";

    renderStats();

    loginForm.reset();
});

logoutBtn.addEventListener("click", function() {
    dashboardSection.hidden = true;
    registerSection.hidden = true;
    loginSection.hidden = false;

    loginForm.reset();

    searchInput.value = "";
    searchResults.innerHTML = "";
});

function renderStats() {
    const statsList = document.getElementById("stats-list");

    const total = users.length;
    const countA = countByFirstLetter(users, "A");
    const adults = countAdults(users, TODAY);

    const oldest = findOldest(users, TODAY);
    const youngest = findYoungest(users, TODAY);

    const average = getAverageAge(users, TODAY);
    const groups = countByAgeGroup(users, TODAY);

    let oldestText = "Chưa có dữ liệu";

    if (oldest !== null) {
        oldestText = oldest.fullName + " (" +
            getAge(oldest.birthDate, TODAY) + " tuổi)";
    }

    let youngestText = "Chưa có dữ liệu";

    if (youngest !== null) {
        youngestText = youngest.fullName + " (" +
            getAge(youngest.birthDate, TODAY) + " tuổi)";
    }

    const stats = [
        "Tổng số người dùng: " + total,
        'Số người có tên bắt đầu bằng "A": ' + countA,
        "Số người từ 18 tuổi trở lên: " + adults,
        "Lớn tuổi nhất: " + oldestText,
        "Nhỏ tuổi nhất: " + youngestText,
        "Tuổi trung bình: " + average.toFixed(1),
        "Dưới 18: " + groups.under18 +
        " · 18–30: " + groups.from18to30 +
        " · Trên 30: " + groups.over30
    ];

    statsList.innerHTML = "";

    stats.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent = item;
        statsList.appendChild(li);
    });
}

function renderSearchResults() {
    const keyword = searchInput.value.trim();

    searchResults.innerHTML = "";

    if (keyword === "") {
        return;
    }

    const results = searchByName(users, keyword);

    if (results.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Không tìm thấy người dùng";
        searchResults.appendChild(li);
        return;
    }

    results.forEach(function(user) {
        const li = document.createElement("li");

        li.textContent = user.fullName + " (" +
            getAge(user.birthDate, TODAY) + " tuổi)";

        searchResults.appendChild(li);
    });
}

searchInput.addEventListener("input", renderSearchResults);
