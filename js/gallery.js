/* ==========================================================================
   GALERIA DE FOTOS - CENTRO OESTE AGROINDÚSTRIA
   Responsabilidade: Filtros, lightbox com navegação, lazy-loading.
   ========================================================================== */

import { SITE_DATA } from '../data/site-data.js';
import { setupSwipe } from './swipe-helper.js';

/**
 * Inicializa a galeria de fotos: renderização, filtros e lightbox.
 * Chamado uma vez após DOMContentLoaded no main.js.
 */
export function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  const filterContainer = document.getElementById('galleryFilters');
  const lightbox = document.getElementById('galleryLightbox');

  if (!galleryGrid) return;

  const images = SITE_DATA.galleryImages ?? [];
  let currentIndex = 0;
  let filteredImages = [...images];

  // ==========================================
  // RENDERIZAÇÃO DA GALERIA
  // ==========================================
  const renderGallery = (filter = 'todos') => {
    galleryGrid.innerHTML = '';

    filteredImages = filter === 'todos'
      ? [...images]
      : images.filter((img) => img.category === filter);

    filteredImages.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-index', index.toString());
      item.setAttribute('data-category', img.category);
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `Abrir foto: ${img.alt}`);

      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      imgEl.loading = 'lazy';
      imgEl.className = 'gallery-item-img';

      const overlay = document.createElement('div');
      overlay.className = 'gallery-item-overlay';
      overlay.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
        </svg>
        <span>Ampliar</span>
      `;

      item.appendChild(imgEl);
      item.appendChild(overlay);
      galleryGrid.appendChild(item);
    });
  };

  renderGallery();

  // ==========================================
  // FILTROS POR CATEGORIA
  // ==========================================
  if (filterContainer) {
    // Event delegation no container de filtros
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-filter-btn');
      if (!btn) return;

      const filter = btn.getAttribute('data-filter');

      // Atualiza botão ativo (acessibilidade: aria-pressed)
      filterContainer.querySelectorAll('.gallery-filter-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      renderGallery(filter);
    });
  }

  // ==========================================
  // LIGHTBOX
  // ==========================================
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('#galleryLightboxImg');
  const lightboxCaption = lightbox.querySelector('#galleryLightboxCaption');
  const lightboxCounter = lightbox.querySelector('#galleryLightboxCounter');
  const btnClose = lightbox.querySelector('#galleryLightboxClose');
  const btnPrev = lightbox.querySelector('#galleryLightboxPrev');
  const btnNext = lightbox.querySelector('#galleryLightboxNext');

  const openLightbox = (index) => {
    if (index < 0 || index >= filteredImages.length) return;

    currentIndex = index;
    const img = filteredImages[currentIndex];

    lightboxImg.setAttribute('src', img.src);
    lightboxImg.setAttribute('alt', img.alt);

    if (lightboxCaption) {
      lightboxCaption.textContent = img.alt;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Foca no lightbox para acessibilidade por teclado
    btnClose?.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    lightboxImg.setAttribute('src', '');
  };

  const navigateLightbox = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      openLightbox(newIndex);
    }
  };

  // Event delegation — abertura da lightbox via clique ou teclado (Enter/Space)
  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const index = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(index);
    }
  });

  galleryGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.gallery-item');
      if (item) {
        e.preventDefault();
        const index = parseInt(item.getAttribute('data-index'), 10);
        openLightbox(index);
      }
    }
  });

  // Controles do lightbox
  btnClose?.addEventListener('click', closeLightbox);
  btnPrev?.addEventListener('click', () => navigateLightbox(-1));
  btnNext?.addEventListener('click', () => navigateLightbox(1));

  // Fechar ao clicar fora da imagem (no overlay escuro)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navegação por teclado: Escape (fechar), ArrowLeft/Right (navegar)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox(-1);
        break;
      case 'ArrowRight':
        navigateLightbox(1);
        break;
    }
  });

  // ==========================================
  // SWIPE PARA MOBILE (Touch Events)
  // ==========================================
  setupSwipe(
    lightbox,
    lightboxImg,
    () => navigateLightbox(-1),
    () => navigateLightbox(1)
  );
}
