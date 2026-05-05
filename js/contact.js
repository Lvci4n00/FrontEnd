document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('contactSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = (form.name.value || '').trim();
    const email = (form.email.value || '').trim();
    const subject = (form.subject.value || '').trim();
    const message = (form.message.value || '').trim();

    if (!subject || !message) {
      successEl.textContent = 'Por favor complete el asunto y el mensaje.';
      successEl.hidden = false;
      successEl.style.color = 'var(--danger)';
      return;
    }

    const entry = {
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    const key = 'contactMessages';
    try {
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(entry);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (err) {
      console.error('Error saving contact message', err);
    }

    successEl.textContent = 'Mensaje guardado correctamente.';
    successEl.style.color = 'var(--primary)';
    successEl.hidden = false;
    form.reset();

    setTimeout(() => {
      successEl.hidden = true;
    }, 3500);

    console.log('Contact saved:', entry);
  });
});
