document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const registerMsg = document.getElementById('registerMsg');
  const loginMsg = document.getElementById('loginMsg');

  const USERS_KEY = 'users';
  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)); }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(pwd) {
    return pwd.length >= 8 && /[A-Za-z]/.test(pwd) && /[0-9]/.test(pwd);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (registerForm.name?.value || document.getElementById('reg-name')?.value || '').trim();
      const email = (registerForm.email?.value || document.getElementById('reg-email')?.value || '').trim();
      const password = (registerForm.password?.value || document.getElementById('reg-password')?.value || '');
      const passwordConfirm = (registerForm.passwordConfirm?.value || document.getElementById('reg-password-confirm')?.value || '');

      if (!name) { registerMsg.textContent = 'Ingrese su nombre.'; registerMsg.style.color = 'var(--danger)'; return; }
      if (!validateEmail(email)) { registerMsg.textContent = 'Correo no válido.'; registerMsg.style.color = 'var(--danger)'; return; }
      if (!validatePassword(password)) { registerMsg.textContent = 'La contraseña debe tener mínimo 8 caracteres, incluir letras y números.'; registerMsg.style.color = 'var(--danger)'; return; }
      if (password !== passwordConfirm) { registerMsg.textContent = 'Las contraseñas no coinciden.'; registerMsg.style.color = 'var(--danger)'; return; }

      const users = loadUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        registerMsg.textContent = 'Ya existe una cuenta con ese correo.'; registerMsg.style.color = 'var(--danger)'; return;
      }

      const user = { name, email, password, createdAt: new Date().toISOString() };
      users.push(user);
      saveUsers(users);

      registerMsg.textContent = 'Cuenta creada correctamente.'; registerMsg.style.color = 'var(--primary)';
      registerForm.reset();
      setTimeout(() => { registerMsg.textContent = ''; }, 4000);
      console.log('User registered', user);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = (loginForm.email?.value || document.getElementById('login-email')?.value || '').trim();
      const password = (loginForm.password?.value || document.getElementById('login-password')?.value || '');

      if (!validateEmail(email)) { loginMsg.textContent = 'Correo no válido.'; loginMsg.style.color = 'var(--danger)'; return; }
      if (!password) { loginMsg.textContent = 'Ingrese su contraseña.'; loginMsg.style.color = 'var(--danger)'; return; }

      const users = loadUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) { loginMsg.textContent = 'Credenciales incorrectas.'; loginMsg.style.color = 'var(--danger)'; return; }

      const session = { email: user.email, name: user.name, loggedAt: new Date().toISOString() };
      localStorage.setItem('currentUser', JSON.stringify(session));

      loginMsg.textContent = 'Ingreso exitoso.'; loginMsg.style.color = 'var(--primary)';
      loginForm.reset();
      setTimeout(() => { loginMsg.textContent = ''; }, 3000);
      console.log('User logged in', session);
    });
  }
});
