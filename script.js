/* Basic interactivity: hamburger, mobile nav, modal, toast, form validation, small accessible helpers */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    // toggle mobile nav
    nav.classList.toggle('mobile-open');
  });

  /* Modal */
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('open-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalOk = document.getElementById('modal-ok');
  const modalCancel = document.getElementById('modal-cancel');

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    // set focus to dialog
    modal.querySelector('.modal-dialog').focus();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
  }
  if(openModalBtn) openModalBtn.addEventListener('click', openModal);
  if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if(modalOk) modalOk.addEventListener('click', () => { closeModal(); showToast('Ação confirmada'); });
  if(modalCancel) modalCancel.addEventListener('click', closeModal);

  // close modal with ESC
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });

  /* Toast */
  const toast = document.getElementById('toast');
  let toastTimeout = null;
  function showToast(msg, ms = 3000){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toast.classList.remove('show') }, ms);
  }

  /* Form validation */
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      let valid = true;

      // simple validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      // reset errors
      form.querySelectorAll('.field-error').forEach(el => el.textContent = '');

      if(!name.value || name.value.trim().length < 2){
        setError(name, 'Informe um nome válido (mín. 2 caracteres)');
        valid = false;
      }
      if(!email.value || !/^\S+@\S+\.\S+$/.test(email.value)){
        setError(email, 'Informe um email válido');
        valid = false;
      }
      if(!message.value || message.value.trim().length < 5){
        setError(message, 'Mensagem muito curta');
        valid = false;
      }

      if(valid){
        // Simula envio
        showToast('Formulário enviado com sucesso!');
        form.reset();
      } else {
        showToast('Corrija os campos destacados', 2500);
      }
    });

    function setError(inputEl, msg){
      const errorEl = inputEl.closest('.form-row').querySelector('.field-error');
      if(errorEl) errorEl.textContent = msg;
      inputEl.focus();
    }
  }

  /* Accessible enhancements: trap focus inside modal when open (basic) */
  document.addEventListener('focusin', (e) => {
    if(modal.getAttribute('aria-hidden') === 'false'){
      if(!modal.contains(e.target)){
        // move focus back to modal
        modal.querySelector('.modal-dialog').focus();
      }
    }
  });

});
