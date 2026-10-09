(() => {
  'use strict';

  const config = window.PROTABLE_CONFIG || {};
  const whatsappNumber = String(config.whatsapp || '').replace(/\D/g, '');
  const whatsappUrl = (message) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  if (whatsappNumber) {
    document.querySelectorAll('[data-whatsapp]').forEach((link) => {
      link.href = whatsappUrl('Hola Protable Chile, me gustaría conocer sus mesas y solicitar una cotización.');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navigation = document.getElementById('site-nav');

  if (menuToggle && navigation) {
    const setMenuOpen = (isOpen) => {
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      navigation.classList.toggle('is-open', isOpen);
    };

    setMenuOpen(false);
    menuToggle.addEventListener('click', () => {
      setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });
  }

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const products = [...document.querySelectorAll('[data-product]')];
  const catalogStatus = document.getElementById('catalog-status');

  const filterProducts = (category) => {
    let visibleCount = 0;
    products.forEach((product) => {
      const visible = category === 'all' || product.dataset.category === category;
      product.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    });
    if (catalogStatus) {
      catalogStatus.textContent = visibleCount === 1
        ? 'Mostrando 1 modelo.'
        : `Mostrando ${visibleCount} modelos.`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => filterProducts(button.dataset.filter));
  });
  if (filterButtons.length && products.length) filterProducts('all');

  const modelSelect = document.getElementById('modelo');
  document.querySelectorAll('[data-quote-model]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!modelSelect) return;
      const selectedModel = link.dataset.quoteModel;
      if ([...modelSelect.options].some((option) => option.value === selectedModel)) {
        modelSelect.value = selectedModel;
        modelSelect.dispatchEvent(new Event('change', { bubbles: true }));
        modelSelect.focus({ preventScroll: true });
      }
    });
  });

  const quoteForm = document.getElementById('quote-form');
  const quoteFeedback = document.getElementById('quote-feedback');

  if (quoteForm && whatsappNumber) {
    const submitButton = document.getElementById('quote-submit');
    if (submitButton) submitButton.disabled = false;
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;

      const formData = new FormData(quoteForm);
      const value = (name) => String(formData.get(name) || '').trim();
      const modelNames = {
        standard: 'Mesa estándar',
        personalizada: 'Mesa personalizada',
        'no-se': 'Necesito ayuda para elegir'
      };
      const model = modelNames[value('modelo')];
      const quantity = Number(value('cantidad'));
      const commune = value('comuna');
      const details = value('detalle');

      if (!model || !Number.isInteger(quantity) || quantity < 1 || quantity > 99 ||
          !commune || commune.length > 80 || details.length > 800) {
        if (quoteFeedback) {
          quoteFeedback.textContent = 'Revisa el modelo, la cantidad (1 a 99) y la comuna antes de continuar.';
        }
        return;
      }

      const message = [
        'Hola Protable Chile, me gustaría solicitar una cotización:',
        '',
        `Modelo: ${model}`,
        `Cantidad: ${quantity}`,
        `Comuna: ${commune}`,
        ...(details ? [`Detalles: ${details}`] : []),
        '',
        '¿Me pueden confirmar el precio, la disponibilidad y las opciones de entrega?'
      ].join('\n');

      window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
      if (quoteFeedback) {
        quoteFeedback.textContent = 'Revisa el borrador en WhatsApp y presiona enviar para solicitar tu cotización. Si no se abrió, usa el enlace directo a WhatsApp.';
      }
    });
  }
})();
