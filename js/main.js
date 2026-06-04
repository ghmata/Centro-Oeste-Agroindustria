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

        // Container do viewer (3D ou imagem com fallback)
        const viewerDiv = document.createElement('div');
        viewerDiv.className = 'card-equipment-viewer';
        viewerDiv.setAttribute('data-active-tab', '3d');

        // Painel da aba 3D
        const panel3d = document.createElement('div');
        panel3d.className = 'viewer-panel viewer-panel-3d active';
        panel3d.setAttribute('data-tab-panel', '3d');

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
          panel3d.appendChild(modelViewer);
        } else {
          // Fallback: imagem estática com overlay "Modelo 3D em breve"
          const fallbackDiv = document.createElement('div');
          fallbackDiv.className = 'viewer-3d-fallback';

          const fallbackImg = document.createElement('img');
          fallbackImg.src = eq.image;
          fallbackImg.alt = eq.name;
          fallbackImg.loading = 'lazy';
          fallbackImg.className = 'viewer-fallback-img';

          const fallbackOverlay = document.createElement('div');
          fallbackOverlay.className = 'viewer-fallback-overlay';
          // Ícone de cubo 3D
          fallbackOverlay.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.13-.52.14h-.1c-.18-.01-.36-.05-.52-.14l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.14.52-.14h.1c.18 0 .36.05.52.14l7.9 4.44c.32.17.53.5.53.88v9z" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <line x1="3.27" y1="6.96" x2="12" y2="12.01" stroke="currentColor" stroke-width="1.5"/>
              <line x1="12" y1="12.01" x2="20.73" y2="6.96" stroke="currentColor" stroke-width="1.5"/>
              <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <span>Modelo 3D em breve</span>
          `;
          // <!-- TODO: Pendente fornecimento pelo cliente -->

          fallbackDiv.appendChild(fallbackImg);
          fallbackDiv.appendChild(fallbackOverlay);
          panel3d.appendChild(fallbackDiv);
        }

        // Painel da aba Fotos (mostra a imagem estática do equipamento)
        const panelFotos = document.createElement('div');
        panelFotos.className = 'viewer-panel viewer-panel-fotos';
        panelFotos.setAttribute('data-tab-panel', 'fotos');

        const fotosImg = document.createElement('img');
        fotosImg.src = eq.image;
        fotosImg.alt = `${eq.name} - Foto`;
        fotosImg.loading = 'lazy';
        fotosImg.className = 'viewer-fotos-img';
        panelFotos.appendChild(fotosImg);

        // Painel da aba Vídeos (placeholder com CTA para WhatsApp)
        const panelVideos = document.createElement('div');
        panelVideos.className = 'viewer-panel viewer-panel-videos';
        panelVideos.setAttribute('data-tab-panel', 'videos');

        const videosPlaceholder = document.createElement('div');
        videosPlaceholder.className = 'viewer-videos-placeholder';
        videosPlaceholder.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>Solicitar vídeo</span>
        `;
        panelVideos.appendChild(videosPlaceholder);

        viewerDiv.appendChild(panel3d);
        viewerDiv.appendChild(panelFotos);
        viewerDiv.appendChild(panelVideos);

        // Abas de navegação
        const tabsDiv = document.createElement('div');
        tabsDiv.className = 'card-equipment-tabs';
        tabsDiv.setAttribute('role', 'tablist');
        tabsDiv.setAttribute('aria-label', `Abas de visualização - ${eq.name}`);

        const tabs = [
          { key: '3d', label: 'Render 3D' },
          { key: 'fotos', label: 'Fotos' },
          { key: 'videos', label: 'Vídeos' },
        ];

        tabs.forEach((tab, i) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `tab-btn${i === 0 ? ' active' : ''}`;
          btn.setAttribute('role', 'tab');
          btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
          btn.setAttribute('data-tab', tab.key);
          btn.textContent = tab.label;
          tabsDiv.appendChild(btn);
        });

        card.appendChild(title);
        card.appendChild(viewerDiv);
        card.appendChild(tabsDiv);

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

    // 0.4 Renderizar Projetos
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
      projectsGrid.innerHTML = '';
      SITE_DATA.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card-project';
        card.id = `project-${project.id}`;

        const imgDiv = document.createElement('div');
        imgDiv.className = 'card-project-img';
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.loading = 'lazy';
        imgDiv.appendChild(img);

        // Criar overlay interativo "Clique aqui"
        const overlay = document.createElement('div');
        overlay.className = 'card-project-overlay';
        
        const overlayIcon = document.createElement('span');
        overlayIcon.className = 'card-project-overlay-icon';
        overlayIcon.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
          </svg>
        `;
        
        const overlayText = document.createElement('span');
        overlayText.className = 'card-project-overlay-text';
        overlayText.textContent = 'Clique aqui';
        
        overlay.appendChild(overlayIcon);
        overlay.appendChild(overlayText);
        imgDiv.appendChild(overlay);

        const info = document.createElement('div');
        info.className = 'card-project-info';

        const title = document.createElement('h3');
        title.className = 'card-project-title';
        title.textContent = project.title;

        const subtitle = document.createElement('span');
        subtitle.className = 'card-project-sub';
        subtitle.textContent = project.subtitle;

        info.appendChild(title);
        info.appendChild(subtitle);

        card.appendChild(imgDiv);
        card.appendChild(info);

        projectsGrid.appendChild(card);
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
  // 5. LIGHTBOX / MODAL DE IMAGEM (EVENT DELEGATION - PROJETOS)
  // ==========================================
  const imageModal = document.getElementById('imageModal');
  const imageModalSource = document.getElementById('imageModalSource');
  const imageModalClose = document.getElementById('imageModalClose');
  const projectsGridEl = document.getElementById('projectsGrid');

  if (imageModal && imageModalSource && imageModalClose && projectsGridEl) {
    projectsGridEl.addEventListener('click', (e) => {
      const card = e.target.closest('.card-project');
      if (card) {
        const img = card.querySelector('.card-project-img img');
        if (img) {
          // Define a imagem e o texto alt correspondente para acessibilidade (WCAG 2.1 AA)
          imageModalSource.setAttribute('src', img.getAttribute('src'));
          imageModalSource.setAttribute('alt', img.getAttribute('alt') || 'Visualização do projeto em tamanho cheio');
          imageModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Bloqueia o scroll de fundo
        }
      }
    });

    const closeImageModal = () => {
      imageModal.classList.remove('active');
      imageModalSource.setAttribute('src', '');
      imageModalSource.setAttribute('alt', '');
      document.body.style.overflow = 'auto'; // Restaura o scroll de fundo
    };

    imageModalClose.addEventListener('click', closeImageModal);

    // Fecha ao clicar fora da imagem (no overlay escuro)
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        closeImageModal();
      }
    });

    // Fecha ao pressionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeImageModal();
      }
    });
  }

  // ==========================================
  // 6. SISTEMA DE ABAS DOS EQUIPAMENTOS (EVENT DELEGATION — FASE 4)
  // ==========================================
  const equipmentsGridEl = document.getElementById('equipmentsGrid');
  if (equipmentsGridEl) {
    equipmentsGridEl.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('.tab-btn');
      if (!tabBtn) return;

      e.preventDefault();
      e.stopPropagation();

      const card = tabBtn.closest('.card-equipment');
      if (!card) return;

      const tabKey = tabBtn.getAttribute('data-tab');
      const viewer = card.querySelector('.card-equipment-viewer');

      // Aba de vídeos redireciona para WhatsApp (vídeos ainda não disponíveis inline)
      if (tabKey === 'videos') {
        const cardTitle = card.querySelector('.card-equipment-title')?.textContent?.trim() ?? 'equipamento industrial';
        const message = `Olá! Gostaria de assistir a vídeos do equipamento: *${cardTitle}*.`;
        const whatsappUrl = `https://wa.me/${SITE_DATA.contact.phoneRaw}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        return;
      }

      // Alternar aba ativa — botões
      const allTabs = card.querySelectorAll('.tab-btn');
      allTabs.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabBtn.classList.add('active');
      tabBtn.setAttribute('aria-selected', 'true');

      // Alternar painel ativo — conteúdo
      if (viewer) {
        viewer.setAttribute('data-active-tab', tabKey);
        const allPanels = viewer.querySelectorAll('.viewer-panel');
        allPanels.forEach(panel => panel.classList.remove('active'));

        const targetPanel = viewer.querySelector(`[data-tab-panel="${tabKey}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      }
    });
  }

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
      '.card-equipment, .card-project, .card-video, .feature-item, ' +
      '.section-header, .projects-sidebar, .videos-sidebar, .spare-part-item, ' +
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
          el.classList.contains('card-project') || 
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
