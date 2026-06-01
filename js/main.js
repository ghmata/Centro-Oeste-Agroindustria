/* ==========================================================================
   JAVASCRIPT PRINCIPAL - LANDING PAGE CENTRO OESTE AGROINDÚSTRIA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
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
      navMenu.classList.toggle('active');
      
      // Animação visual do botão hambúrguer
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
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
  // 4. SCROLL SUAVE PARA LINKS ÂNCORA E MENU
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
  // 5. ATUALIZAR LINK ATIVO NO SCROLL
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
  // 6. LIGHTBOX / MODAL DE VÍDEO
  // ==========================================
  const videoModal = document.getElementById('videoModal');
  const videoModalFrame = document.getElementById('videoModalFrame');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoCards = document.querySelectorAll('.card-video');

  // Fontes de vídeo simuladas (YouTube Embeds ou vídeos representativos)
  const videoSources = {
    'video-elevador': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', // Substituir por vídeos reais do cliente ou representativos
    'video-misturador': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    'video-rosca': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    'video-ensacadeira': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  };

  if (videoModal && videoModalFrame && videoModalClose) {
    videoCards.forEach(card => {
      card.addEventListener('click', function() {
        const videoKey = this.getAttribute('data-video');
        const embedUrl = videoSources[videoKey];

        if (embedUrl) {
          // Define a URL do iframe e ativa o modal
          videoModalFrame.setAttribute('src', embedUrl);
          videoModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
        }
      });
    });

    const closeModal = () => {
      videoModal.classList.remove('active');
      // Limpa a URL do iframe para parar a reprodução do vídeo
      videoModalFrame.setAttribute('src', '');
      document.body.style.overflow = 'auto'; // Restaura o scroll
    };

    videoModalClose.addEventListener('click', closeModal);
    
    // Fecha clicando fora da janela de vídeo
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    // Fecha ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ==========================================
  // 7. INTERAÇÕES DAS TAGS DE EQUIPAMENTOS
  // ==========================================
  // Simular visualização de fotos/videos/render dos equipamentos através de alertas ou links do WhatsApp
  const tagBtns = document.querySelectorAll('.tag-btn');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Evita interações do card pai
      
      const actionType = this.textContent.trim().toUpperCase();
      const cardTitle = this.closest('.card-equipment').querySelector('.card-equipment-title').textContent.trim();
      
      // Cria uma mensagem personalizada para o WhatsApp
      let message = `Olá! Tenho interesse no equipamento *${cardTitle}*. `;
      if (actionType === 'RENDER 3D') {
        message += `Gostaria de ver o render 3D técnico detalhado deste equipamento.`;
      } else if (actionType === 'FOTOS') {
        message += `Gostaria de solicitar mais fotos em alta resolução deste equipamento em campo.`;
      } else if (actionType === 'VÍDEOS') {
        message += `Gostaria de assistir a vídeos deste equipamento em funcionamento.`;
      }
      
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5531999999999?text=${encodedMsg}`;
      
      // Abre o link do WhatsApp em uma nova aba
      window.open(whatsappUrl, '_blank');
    });
  });

  // ==========================================
  // 8. ANIMAÇÕES DE ENTRADA (INTERSECTION OBSERVER)
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

    // Seleciona elementos para animar
    const animTargets = document.querySelectorAll(
      '.card-equipment, .card-project, .card-video, .feature-item, ' +
      '.section-header, .projects-sidebar, .videos-sidebar'
    );

    animTargets.forEach((el, i) => {
      el.classList.add('anim-fade-up');
      // Adiciona delay escalonado para cards em grid
      if (el.classList.contains('card-equipment') || 
          el.classList.contains('card-project') || 
          el.classList.contains('card-video') ||
          el.classList.contains('feature-item')) {
        const siblings = el.parentElement.children;
        const index = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = `${index * 60}ms`;
      }
      observer.observe(el);
    });
  };

  animateOnScroll();

  // ==========================================
  // 9. LAZY LOADING DE IMAGENS
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
