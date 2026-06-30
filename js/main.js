/* ==========================================================================
   JAVASCRIPT PRINCIPAL - LANDING PAGE CENTRO OESTE AGROINDÚSTRIA
   Responsabilidade: Navegação, scroll, renderização de dados, animações.
   ========================================================================== */

import { SITE_DATA } from '../data/site-data.js';
import { initContactForm } from './form.js';
import { initGallery } from './gallery.js';
import { initVideoModal } from './video-modal.js';

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. INICIALIZAÇÃO DE DADOS DINÂMICOS
  // ==========================================
  const initDynamicData = () => {
    // 0.1 Atualizar Contatos
    // Telefone
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.setAttribute('href', `tel:${SITE_DATA.contact.phoneRaw}`);
      const svg = link.querySelector('svg');
      link.textContent = '';
      if (svg) link.appendChild(svg);
      link.appendChild(document.createTextNode(' ' + SITE_DATA.contact.phone));
    });

    // E-mail
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      link.setAttribute('href', `mailto:${SITE_DATA.contact.email}`);
      const svg = link.querySelector('svg');
      link.textContent = '';
      if (svg) link.appendChild(svg);
      link.appendChild(document.createTextNode(' ' + SITE_DATA.contact.email));
    });

    // WhatsApp — atualiza número de todas as URLs wa.me via site-data.js
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
      let currentHref = link.getAttribute('href') || '';
      let text = SITE_DATA.contact.whatsappMessage;
      try {
        if (currentHref.includes('?text=')) {
          const urlParts = currentHref.split('?text=');
          if (urlParts[1]) {
            text = decodeURIComponent(urlParts[1]);
          }
        }
      } catch (err) {
        console.error('[WhatsApp URL Parse Error]:', err);
      }
      link.setAttribute('href', `https://wa.me/${SITE_DATA.contact.phoneRaw}?text=${encodeURIComponent(text)}`);
    });

    // Endereço — atualiza em todos os spans de endereço
    const addressSpans = document.querySelectorAll('#footerAddressText, #contactAddressText');
    addressSpans.forEach(span => {
      span.textContent = SITE_DATA.contact.address;
    });

    // Redes sociais
    const socialFacebook = document.querySelector('.social-links a[aria-label="Facebook"]');
    if (socialFacebook) socialFacebook.setAttribute('href', SITE_DATA.social.facebook);
    const socialInstagram = document.querySelector('.social-links a[aria-label="Instagram"]');
    if (socialInstagram) socialInstagram.setAttribute('href', SITE_DATA.social.instagram);
    const socialYoutube = document.querySelector('.social-links a[aria-label="YouTube"]');
    if (socialYoutube) socialYoutube.setAttribute('href', SITE_DATA.social.youtube);
    const socialLinkedin = document.querySelector('.social-links a[aria-label="LinkedIn"]');
    if (socialLinkedin) socialLinkedin.setAttribute('href', SITE_DATA.social.linkedin);

    // 0.2 Renderizar Equipamentos (Grid e Footer)
    const equipmentsGrid = document.getElementById('equipmentsGrid');
    if (equipmentsGrid) {
      equipmentsGrid.innerHTML = '';
      SITE_DATA.equipments.forEach(eq => {
        const card = document.createElement('div');
        card.className = 'card-equipment';
        card.id = `eq-${eq.id}`;

        const title = document.createElement('h3');
        title.className = 'card-equipment-title';
        title.textContent = eq.name;

        // Container do viewer (3D ou imagem diretamente)
        const viewerDiv = document.createElement('div');
        viewerDiv.className = 'card-equipment-viewer';

        if (eq.model3d) {
          // Modelo 3D disponível — usa model-viewer
          const modelViewer = document.createElement('model-viewer');
          modelViewer.setAttribute('src', eq.model3d);
          modelViewer.setAttribute('alt', `Modelo 3D - ${eq.name}`);
          modelViewer.setAttribute('camera-controls', '');
          modelViewer.setAttribute('touch-action', 'pan-y');
          modelViewer.setAttribute('loading', 'lazy');
          modelViewer.setAttribute('poster', eq.image);
          modelViewer.setAttribute('shadow-intensity', '1');
          modelViewer.setAttribute('auto-rotate', '');
          modelViewer.className = 'equipment-model-viewer';
          viewerDiv.appendChild(modelViewer);
        } else {
          // Apenas a imagem estática do render 3D do equipamento
          const imgEl = document.createElement('img');
          imgEl.src = eq.image;
          imgEl.alt = eq.name;
          imgEl.loading = 'lazy';
          imgEl.className = 'viewer-fallback-img';
          viewerDiv.appendChild(imgEl);
        }

        card.appendChild(title);
        card.appendChild(viewerDiv);

        equipmentsGrid.appendChild(card);
      });
    }

    const footerEquipments = document.getElementById('footerEquipments');
    if (footerEquipments) {
      footerEquipments.innerHTML = '';
      SITE_DATA.equipments.forEach(eq => {
        const a = document.createElement('a');
        a.href = '#equipamentos';
        a.textContent = eq.name;
        footerEquipments.appendChild(a);
      });
    }

    // 0.3 Renderizar Peças de Reposição
    const sparePartsGrid = document.getElementById('sparePartsGrid');
    if (sparePartsGrid) {
      sparePartsGrid.innerHTML = '';
      SITE_DATA.spareParts.forEach(part => {
        const item = document.createElement('div');
        item.className = 'spare-part-item';

        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'spare-part-icon';
        iconWrapper.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        `;

        const text = document.createElement('span');
        text.className = 'spare-part-text';
        text.textContent = part;

        item.appendChild(iconWrapper);
        item.appendChild(text);
        sparePartsGrid.appendChild(item);
      });
    }



    // 0.5 Renderizar Vídeos
    const videosGrid = document.getElementById('videosGrid');
    if (videosGrid) {
      videosGrid.innerHTML = '';
      SITE_DATA.videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'card-video';
        card.setAttribute('data-video', video.id);
        card.id = `card-${video.id}`;

        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'card-video-thumb';

        const img = document.createElement('img');
        img.src = video.thumbnail;
        img.alt = `${video.title} - ${video.status}`;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'play-btn-overlay';
        overlay.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;

        thumbDiv.appendChild(img);
        thumbDiv.appendChild(overlay);

        const info = document.createElement('div');
        info.className = 'card-video-info';

        const title = document.createElement('h3');
        title.className = 'card-video-title';
        title.textContent = video.title;

        const subtitle = document.createElement('span');
        subtitle.className = 'card-video-sub';
        subtitle.textContent = video.status;

        info.appendChild(title);
        info.appendChild(subtitle);

        card.appendChild(thumbDiv);
        card.appendChild(info);

        videosGrid.appendChild(card);
      });
    }
  };

  // Inicializa a injeção dos dados antes de registrar os comportamentos interativos
  initDynamicData();

  // Inicializa módulos dedicados (separação de responsabilidades)
  initContactForm();
  initGallery();
  initVideoModal();

  // ==========================================
  // 1. STICKY HEADER
  // ==========================================
  const header = document.querySelector('header');
  const stickyScrollLimit = 50;

  const handleScroll = () => {
    if (window.scrollY > stickyScrollLimit) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Executa ao carregar a página caso já esteja rolada

  // ==========================================
  // 2. MENU MOBILE (HAMBÚRGUER)
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      
      // Atualiza aria-expanded para acessibilidade (WCAG 2.1 AA)
      menuToggle.setAttribute('aria-expanded', isActive.toString());

      // Animação visual do botão hambúrguer — usa transform (performático)
      const spans = menuToggle.querySelectorAll('span');
      if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.click(); // Reverte a animação e fecha
      }
    });
  }

  // ==========================================
  // 3. SCROLL SUAVE PARA LINKS ÂNCORA E MENU
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .footer-links a, .footer-equipments a, .hero-btns .btn, .logo');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Só aplica se for um link interno (#...)
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Se o menu mobile estiver aberto, fecha antes de rolar
          if (navMenu && navMenu.classList.contains('active')) {
            menuToggle.click();
          }

          // Ajusta a distância de rolagem baseada no cabeçalho sticky
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - (headerHeight - 15);

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Atualiza a URL sem recarregar
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // ==========================================
  // 4. ATUALIZAR LINK ATIVO NO SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id], header[id]');
  const mainNavLinks = document.querySelectorAll('.nav-menu > .nav-item > .nav-link');

  const updateActiveLink = () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120; // Offset para detectar antes de chegar no topo

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    mainNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}` || (currentSectionId === 'inicio' && href === '#inicio')) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Executa na carga inicial






  // ==========================================
  // 7. ANIMAÇÕES DE ENTRADA (INTERSECTION OBSERVER)
  // ==========================================
  const animateOnScroll = () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Seleciona elementos para animar — inclui galeria e formulário (Fase 3)
    const animTargets = document.querySelectorAll(
      '.card-equipment, .card-video, .feature-item, ' +
      '.section-header, .videos-sidebar, .spare-part-item, ' +
      '.gallery-item, .contact-info, .contact-form-wrapper, ' +
      '.about-content, .about-visual'
    );

    animTargets.forEach((el) => {
      // Animações direcionais para a seção "Sobre" (plano: slide-in-left/right)
      if (el.classList.contains('about-content')) {
        el.classList.add('anim-slide-left');
      } else if (el.classList.contains('about-visual')) {
        el.classList.add('anim-slide-right');
      } else {
        el.classList.add('anim-fade-up');
      }
      
      // Adiciona delay escalonado para cards em grid
      if (el.classList.contains('card-equipment') || 
          el.classList.contains('card-video') ||
          el.classList.contains('feature-item') ||
          el.classList.contains('spare-part-item') ||
          el.classList.contains('gallery-item')) {
        const siblings = el.parentElement.children;
        const index = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = `${index * 60}ms`;
      }
      observer.observe(el);
    });
  };

  animateOnScroll();

  // ==========================================
  // 7.5 LIGHTBOX DE IMAGEM GENÉRICA (EQUIPAMENTOS)
  // ==========================================
  const imageLightbox = document.getElementById('imageLightbox');
  const imageLightboxImg = document.getElementById('imageLightboxImg');
  const imageLightboxCaption = document.getElementById('imageLightboxCaption');
  const imageLightboxClose = document.getElementById('imageLightboxClose');
  const equipmentsGridEl = document.getElementById('equipmentsGrid');

  if (imageLightbox && imageLightboxImg && imageLightboxCaption && imageLightboxClose && equipmentsGridEl) {
    equipmentsGridEl.addEventListener('click', (e) => {
      // Abre ao clicar no card ou na imagem do equipamento
      const card = e.target.closest('.card-equipment');
      if (card) {
        const img = card.querySelector('.card-equipment-viewer img');
        const title = card.querySelector('.card-equipment-title');
        
        if (img) {
          imageLightboxImg.setAttribute('src', img.getAttribute('src'));
          imageLightboxImg.setAttribute('alt', img.getAttribute('alt') || 'Equipamento');
          
          if (imageLightboxCaption && title) {
            imageLightboxCaption.textContent = title.textContent;
          }
          
          imageLightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Trava o scroll da página
          imageLightboxClose.focus(); // Acessibilidade
        }
      }
    });

    const closeImageLightbox = () => {
      imageLightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
      imageLightboxImg.setAttribute('src', '');
    };

    imageLightboxClose.addEventListener('click', closeImageLightbox);

    // Fecha ao clicar fora da imagem (no overlay escuro)
    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox) {
        closeImageLightbox();
      }
    });

    // Fecha ao pressionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageLightbox.classList.contains('active')) {
        closeImageLightbox();
      }
    });
  }

  // ==========================================
  // 8. LAZY LOADING DE IMAGENS
  // ==========================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  }

});
