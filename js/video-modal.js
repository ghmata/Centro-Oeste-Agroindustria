/* ==========================================================================
   MODAL DE VÍDEO - CENTRO OESTE AGROINDÚSTRIA
   Responsabilidade: Abertura, reprodução e fechamento do modal de vídeo.
   Extraído do main.js para separação de responsabilidades (SRP).
   ========================================================================== */

import { SITE_DATA } from '../data/site-data.js';

/**
 * Inicializa o modal de vídeo com lazy-loading de iframes.
 * Usa event delegation no grid de vídeos.
 * Chamado uma vez após DOMContentLoaded no main.js.
 */
export function initVideoModal() {
  const videoModal = document.getElementById('videoModal');
  const videoModalFrame = document.getElementById('videoModalFrame');
  const videoModalClose = document.getElementById('videoModalClose');
  const videosGridEl = document.getElementById('videosGrid');

  if (!videoModal || !videoModalFrame || !videoModalClose || !videosGridEl) return;

  // Referência para gerenciar o foco ao abrir/fechar o modal (WCAG 2.1 AA)
  let previouslyFocusedElement = null;

  const openModal = (embedUrl) => {
    previouslyFocusedElement = document.activeElement;

    // Lazy-loading: só carrega o iframe quando o modal é ativado
    videoModalFrame.setAttribute('src', embedUrl);
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Foco no botão de fechar para acessibilidade
    videoModalClose.focus();
  };

  const closeModal = () => {
    videoModal.classList.remove('active');
    // Limpa a URL do iframe para parar a reprodução do vídeo
    videoModalFrame.setAttribute('src', '');
    document.body.style.overflow = 'auto';

    // Restaura o foco no elemento anterior (acessibilidade)
    previouslyFocusedElement?.focus();
  };

  // Event delegation — clique nos cards de vídeo
  videosGridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.card-video');
    if (!card) return;

    const videoKey = card.getAttribute('data-video');
    const videoObj = SITE_DATA.videos.find((v) => v.id === videoKey);

    if (videoObj?.embedUrl) {
      openModal(videoObj.embedUrl);
    } else {
      // Fallback: Redireciona para o WhatsApp pedindo o vídeo
      const message = `Olá! Gostaria de ver o vídeo do equipamento: ${videoObj?.title ?? 'equipamento industrial'}.`;
      const whatsappUrl = `https://wa.me/${SITE_DATA.contact.phoneRaw}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  });

  // Fechar ao clicar no botão X
  videoModalClose.addEventListener('click', closeModal);

  // Fechar ao clicar fora da janela de vídeo (overlay escuro)
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal();
  });

  // Fechar ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeModal();
    }
  });
}
