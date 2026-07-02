/* ==========================================================================
   SWIPE HELPER - CENTRO OESTE AGROINDÚSTRIA
   Responsabilidade: Adicionar suporte a gestos touch com feedback visual
   ========================================================================== */

/**
 * Adiciona suporte a gestos de deslizar (swipe) com feedback visual a uma imagem em um modal lightbox.
 * 
 * @param {HTMLElement} lightboxEl O container do modal (para ouvir os toques)
 * @param {HTMLImageElement} imgEl A imagem que receberá a transição de movimento
 * @param {Function} onPrev Callback para retroceder
 * @param {Function} onNext Callback para avançar
 */
export function setupSwipe(lightboxEl, imgEl, onPrev, onNext) {
  if (!lightboxEl || !imgEl) return;

  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  const THRESHOLD = 80; // Distância mínima para mudar de imagem

  // Define a transição padrão da imagem
  imgEl.style.transition = 'transform 0.25s ease, opacity 0.25s ease';

  lightboxEl.addEventListener('touchstart', (e) => {
    // Apenas toques de um único dedo
    if (e.touches.length !== 1) return;
    
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    imgEl.style.transition = 'none'; // Desativa transição durante o arrasto físico
  }, { passive: true });

  lightboxEl.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    
    // Limita o arrasto horizontal para não quebrar a tela
    const constrainedX = Math.max(-window.innerWidth, Math.min(window.innerWidth, diffX));
    
    // Movimento sutil de rotação e opacidade dinâmica
    const opacity = Math.max(0.65, 1 - Math.abs(constrainedX) / 350);
    imgEl.style.transform = `translateX(${constrainedX}px) rotate(${constrainedX * 0.015}deg)`;
    imgEl.style.opacity = opacity.toString();
  }, { passive: true });

  lightboxEl.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    
    const diffX = currentX - startX;
    
    // Restaura a transição suave para finalizar a ação
    imgEl.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease';

    if (Math.abs(diffX) > THRESHOLD) {
      if (diffX > 0) {
        // Desliza para a direita (imagem anterior)
        imgEl.style.transform = 'translateX(100%)';
        imgEl.style.opacity = '0';
        
        setTimeout(() => {
          onPrev();
          // Configura a nova imagem para entrar vinda da esquerda (-100%)
          imgEl.style.transition = 'none';
          imgEl.style.transform = 'translateX(-100%)';
          imgEl.style.opacity = '0';
          
          // Força reflow para o navegador registrar a posição inicial antes de animar
          imgEl.offsetHeight; 
          
          // Entra suavemente para o centro (0)
          imgEl.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease';
          imgEl.style.transform = 'translateX(0) rotate(0deg)';
          imgEl.style.opacity = '1';
        }, 150);
      } else {
        // Desliza para a esquerda (próxima imagem)
        imgEl.style.transform = 'translateX(-100%)';
        imgEl.style.opacity = '0';
        
        setTimeout(() => {
          onNext();
          // Configura a nova imagem para entrar vinda da direita (100%)
          imgEl.style.transition = 'none';
          imgEl.style.transform = 'translateX(100%)';
          imgEl.style.opacity = '0';
          
          // Força reflow
          imgEl.offsetHeight;
          
          imgEl.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease';
          imgEl.style.transform = 'translateX(0) rotate(0deg)';
          imgEl.style.opacity = '1';
        }, 150);
      }
    } else {
      // Caso não atinja a distância necessária, retorna suavemente para o centro
      imgEl.style.transform = 'translateX(0) rotate(0deg)';
      imgEl.style.opacity = '1';
    }
    
    startX = 0;
    currentX = 0;
  });
}
