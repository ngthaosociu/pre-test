function getAge(birthDate, today) {
    const birth = String(birthDate).slice(0, 10).split("-").map(Number);

    let current;

    if (today instanceof Date) {
        current = [
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate()
        ];
    } else {
        current = String(today).slice(0, 10).split("-").map(Number);
    }

    let age = current[0] - birth[0];

    if (
        current[1] < birth[1] ||
        (current[1] === birth[1] && current[2] < birth[2])
    ) {
        age--;
    }

    return age;
}

function getFirstName(fullName) {
    const words = fullName.trim().split(/\s+/);
    return words[words.length -1];
}

function countByFirstLetter(users, letter) {
    const firstLetter = letter.trim().toLowerCase();

    if (firstLetter === "") {
        return 0;
    }

    return users.filter(function(user) {
        const name = getFirstName(user.fullName).toLowerCase();
        return name.startsWith(firstLetter);
    }).length;
}

function countAdults(users, today) {
    return users.filter(function(user) {
        return getAge(user.birthDate, today) >= 18;
    }).length;
}

function findOldest(users, today) {
    if (users.length === 0) {
        return null;
    }

    return users.reduce(function(oldest, user) {
        if (user.birthDate < oldest.birthDate) {
            return user;
        }
        return oldest;
    });
}

function findYoungest(users, today) {
    if (users.length === 0) {
        return null;
    }

    return users.reduce(function(youngest, user) {
        if (user.birthDate > youngest.birthDate) {
            return user;
        }
        return youngest;
    });
}

function getAverageAge(users, today) {
    if (users.length === 0) {
        return 0;
    }

    const totalAge = users.reduce(function(total, user) {
        return total + getAge(user.birthDate, today);
    }, 0);

    return Number((totalAge / users.length).toFixed(1));
}

function sortByAge(users, today) {
    const newUsers = [...users];

    return newUsers.sort(function(a, b) {
        const ageA = getAge(a.birthDate, today);
        const ageB = getAge(b.birthDate, today);

        if (ageA !== ageB) {
            return ageA - ageB;
        }

        return b.birthDate.localeCompare(a.birthDate);
    });
}

function searchByName(users, keyword) {
    const key = keyword.trim().replace(/\s+/g, " ").toLowerCase();

    if (key === "") {
        return [];
    }

    return users.filter(function(user) {
        const name = user.fullName
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();

        return name.includes(key);
    });
}

function countByAgeGroup(users, today) {
    return users.reduce(function(result, user) {
        const age = getAge(user.birthDate, today);

        if (age < 18) {
            result.under18++;
        } else if (age <= 30) {
            result.from18to30++;
        } else {
            result.over30++;
        }

        return result;
    }, {
        under18: 0,
        from18to30: 0,
        over30: 0
    });
}
