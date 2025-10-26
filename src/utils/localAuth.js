// src/utils/localAuth.js
const USERS_KEY = "learnify_users_v1";
const CURRENT_KEY = "learnify_current_user_v1";

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function seedDummyUsers() {
  const users = getUsers();
  // only seed if not present
  if (!users.find(u => u.email === "student@example.com")) {
    users.push({
      name: "Sam Student",
      email: "student@example.com",
      password: "StudentPass1",
      role: "student",
      id: "u-student-1",
    });
  }
  if (!users.find(u => u.email === "teacher@example.com")) {
    users.push({
      name: "Tina Teacher",
      email: "teacher@example.com",
      password: "TeacherPass1",
      role: "teacher",
      id: "u-teacher-1",
    });
  }
  saveUsers(users);
}

export function createUser({ name, email, password, role }) {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  const newUser = {
    name,
    email,
    password, // note: plain text for local dev only
    role,
    id: `u-${Date.now()}`,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function authenticate(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) throw new Error("Invalid credentials");
  // set current
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY);
}
