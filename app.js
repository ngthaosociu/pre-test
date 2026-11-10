
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

const searchBirthDate = document.getElementById("search-birthDate");
const searchAge = document.getElementById("search-age");
const birthDateBtn = document.getElementById("birthDate-btn");
const nearestBirthdayBtn = document.getElementById("nearest-birthday-btn");
const advancedResults = document.getElementById("advanced-results");

const STORAGE_KEY = "registeredUsers";

let registeredUsers = [];

try {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (Array.isArray(savedData)) {
        registeredUsers = savedData.filter(function(user) {
            return user &&
                typeof user.username === "string" &&
                typeof user.password === "string" &&
                typeof user.fullName === "string" &&
                typeof user.birthDate === "string";
        });
    }
} catch (error) {
    registeredUsers = [];
}

registeredUsers.forEach(function(savedUser) {
    const exists = users.some(function(user) {
        return user.username.toLowerCase() ===
            savedUser.username.toLowerCase();
    });

    if (!exists) {
        users.push(savedUser);
    }
});

function getTodayDate() {
    if (TODAY instanceof Date) {
        return new Date(
            TODAY.getFullYear(),
            TODAY.getMonth(),
            TODAY.getDate()
        );
    }

    const parts = String(TODAY).slice(0, 10).split("-").map(Number);

    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function parseBirthDate(value) {
    if (typeof value !== "string") {
        return null;
    }

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}

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

    const validBirthDate = parseBirthDate(birthDate);
    const today = getTodayDate();

    if (!validBirthDate || validBirthDate > today) {
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

    const updatedUsers = registeredUsers.concat(newUser);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
        alert("Không thể lưu tài khoản vào trình duyệt");
        return;
    }

    registeredUsers = updatedUsers;
    users.push(newUser);

    alert("Đăng ký thành công!");

    registerForm.reset();

    registerSection.hidden = true;
    loginSection.hidden = false;
    dashboardSection.hidden = true;

    document.getElementById("login-username").value = username;
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

    searchInput.value = "";
    searchBirthDate.value = "";
    searchAge.value = "";

    searchResults.innerHTML = "";
    advancedResults.innerHTML = "";

    renderStats();
    renderSearchResults();

    loginForm.reset();
});

logoutBtn.addEventListener("click", function() {
    dashboardSection.hidden = true;
    registerSection.hidden = true;
    loginSection.hidden = false;

    loginForm.reset();
});

function formatUserResult(user) {
    return user.fullName + " (" +
        getAge(user.birthDate, TODAY) + " tuổi)";
}

function formatOldestResult(result) {
    if (Array.isArray(result)) {
        if (result.length === 0) {
            return "Chưa có dữ liệu";
        }

        return result.map(formatUserResult).join(", ");
    }

    return result ? formatUserResult(result) : "Chưa có dữ liệu";
}

function renderStats() {
    const statsList = document.getElementById("stats-list");

    const total = users.length;
    const countA = countByFirstLetter(users, "A");
    const adults = countAdults(users, TODAY);

    const oldest = findOldest(users, TODAY);
    const youngest = findYoungest(users, TODAY);

    const average = getAverageAge(users, TODAY);
    const groups = countByAgeGroup(users, TODAY);

    const oldestText = formatOldestResult(oldest);

    const youngestText = youngest
        ? formatUserResult(youngest)
        : "Chưa có dữ liệu";

    const stats = [
        "Tổng số người dùng: " + total,
        'Số người có tên bắt đầu bằng "A": ' + countA,
        "Số người từ 18 tuổi trở lên: " + adults,
        "Lớn tuổi nhất: " + oldestText,
        "Nhỏ tuổi nhất: " + youngestText,
        "Tuổi trung bình: " + average.toFixed(1),
        "Dưới 18: " + groups.under18 +
        " | 18-30: " + groups.from18to30 +
        " | Trên 30: " + groups.over30
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

        li.textContent = formatUserResult(user);

        searchResults.appendChild(li);
    });
}

searchInput.addEventListener("input", renderSearchResults);

function showAdvancedResults(results, showBirthday = false) {
    advancedResults.innerHTML = "";

    if (results.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Không tìm thấy người dùng";
        advancedResults.appendChild(li);
        return;
    }

    results.forEach(function(user) {
        const li = document.createElement("li");

        let content = user.fullName +
            " - Ngày sinh: " +
            user.birthDate.split("-").reverse().join("/") +
            " - " + getAge(user.birthDate, TODAY) + " tuổi";

        if (showBirthday) {
            if (user.daysUntilBirthday === 0) {
                content += " - Sinh nhật hôm nay!";
            } else {
                content += " - Còn " +
                    user.daysUntilBirthday + " ngày đến sinh nhật";
            }
        }

        li.textContent = content;
        advancedResults.appendChild(li);
    });
}

function searchByBirthYearAndAge() {
    const year = searchBirthDate.value.trim();
    const age = searchAge.value.trim();

    if (year === "" && age === "") {
        advancedResults.innerHTML = "";

        const li = document.createElement("li");
        li.textContent = "Vui lòng nhập năm sinh hoặc số tuổi";
        advancedResults.appendChild(li);
        return;
    }

    if (year !== "" && !/^\d{4}$/.test(year)) {
        advancedResults.textContent = "Năm sinh phải gồm 4 chữ số";
        return;
    }

    if (age !== "" && !/^\d+$/.test(age)) {
        advancedResults.textContent = "Số tuổi không hợp lệ";
        return;
    }

    const results = users.filter(function(user) {
        const birthDate = parseBirthDate(user.birthDate);

        if (!birthDate || birthDate > getTodayDate()) {
            return false;
        }

        const matchYear = year === "" ||
            birthDate.getFullYear() === Number(year);

        const matchAge = age === "" ||
            getAge(user.birthDate, TODAY) === Number(age);

        return matchYear && matchAge;
    });

    showAdvancedResults(results);
}

birthDateBtn.addEventListener("click", searchByBirthYearAndAge);

function getDaysUntilBirthday(birthDate, today) {
    const birth = parseBirthDate(birthDate);

    if (!birth) {
        return null;
    }

    const year = today.getFullYear();
    const month = birth.getMonth();
    const day = birth.getDate();

    const todayUTC = Date.UTC(
        year,
        today.getMonth(),
        today.getDate()
    );

    let nextBirthday = Date.UTC(year, month, day);

    if (nextBirthday < todayUTC) {
        nextBirthday = Date.UTC(year + 1, month, day);
    }

    return Math.round((nextBirthday - todayUTC) / 86400000);
}

function findNearestBirthday() {
    const today = getTodayDate();

    const birthdayUsers = users
        .filter(function(user) {
            const date = parseBirthDate(user.birthDate);
            return date !== null && date <= today;
        })
        .map(function(user) {
            return {
                ...user,
                daysUntilBirthday: getDaysUntilBirthday(
                    user.birthDate,
                    today
                )
            };
        });

    if (birthdayUsers.length === 0) {
        showAdvancedResults([]);
        return;
    }

    birthdayUsers.sort(function(a, b) {
        return a.daysUntilBirthday - b.daysUntilBirthday;
    });

    const nearestDays = birthdayUsers[0].daysUntilBirthday;

    const nearestUsers = birthdayUsers.filter(function(user) {
        return user.daysUntilBirthday === nearestDays;
    });

    showAdvancedResults(nearestUsers, true);
}

nearestBirthdayBtn.addEventListener("click", findNearestBirthday);
