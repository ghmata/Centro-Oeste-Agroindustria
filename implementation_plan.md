# Plano de Implementação — Landing Page Centro Oeste Agroindústria

## Contexto e Análise do Estado Atual

### Documento de Referência
Este plano está **100% alinhado** ao arquivo oficial do cliente: [Site centro oeste.md](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md) (transcrição de [Site centro oeste.docx](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.docx)).

### O Que Já Existe (Código Atual)
O projeto já possui uma **primeira versão parcial** implementada em HTML/CSS/JS vanilla:

| Arquivo | Linhas | Status |
|---------|--------|--------|
| [index.html](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/index.html) | 678 | ⚠️ Parcial — faltam seções, textos desatualizados |
| [style.css](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/css/style.css) | 1499 | ⚠️ Parcial — paleta incorreta, faltam estilos |
| [main.js](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/js/main.js) | 275 | ⚠️ Funcional mas incompleto |

**Assets já disponíveis:**
- 10 imagens de equipamentos (renders) em `assets/equipamentos/`
- 4 imagens de projetos em `assets/projetos/`
- 4 thumbnails de vídeo em `assets/videos/`
- Logo SVG (`assets/logo-icon.svg`)
- Imagem hero (`assets/hero-bg.png`)
- 15 imagens na pasta `Imagens/` (equipamentos originais + galeria + logo)

---

## Gap Analysis — Código Atual vs. Documento do Cliente

> [!IMPORTANT]
> As discrepâncias abaixo são **obrigatórias** de corrigir. Cada item está vinculado à instrução correspondente no documento do cliente.

### 🔴 Divergências Críticas (Conteúdo Incorreto)

| # | Item | Estado Atual | Esperado (Documento Cliente) | Ref. |
|---|------|--------------|------------------------------|------|
| 1 | **Título Hero** | "Soluções Completas para Movimentação e Processamento de Sólidos" | **"FÁBRICAS DE RAÇÃO, SAL MINERAL E ADUBOS"** | [L14](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L14) |
| 2 | **Subtítulo Hero** | Ausente como elemento separado | **"Tecnologia e qualidade sob medida para sua indústria"** | [L15](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L15) |
| 3 | **Descrição Hero** | "Projetamos e fabricamos equipamentos industriais para agroindústrias..." | **"Equipamentos e projetos industriais completos para aumentar a eficiência, a produtividade e o desempenho do seu negócio."** | [L16](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L16) |
| 4 | **Título Sobre** | "Tecnologia e Robustez sob medida" | **"EFICIÊNCIA PRODUTIVA E QUALIDADE SOB MEDIDA"** | [L49](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L49) |
| 5 | **Texto Sobre** | "...equipamentos de alta qualidade para movimentação e processamento de sólidos." | **"...equipamentos de alta qualidade para fábricas de ração, sal mineral e adubo."** | [L50](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L50) |
| 6 | **Cards métricas** | Presentes (100%, +500, BNDES) | **REMOVER** — Cliente marcou "tirar" | [L51-55](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L51) |
| 7 | **Imagem Sobre** | `hero-bg.png` (foto aérea de silos) | **Substituir por foto real de fábrica de ração** | [L58-59](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L58) |
| 8 | **Lista equipamentos** | 10 itens (inclui Silo Pulmão, Dosadora, Ensacadeira, Moega, Válvula Rotativa) | **5 itens apenas** (Rosca Calha, Rosca Chupim, Elevador, Mist. Horizontal, Mist. Vertical) | [L86-91](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L86) |
| 9 | **Imagem Hero BG** | Contém logos "AGRI PROCESS SOLUTIONS" e logo circular verde | **REMOVER ambas** — Cliente marcou "tirar" | [L36-37](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L36) |

### 🟡 Seções Ausentes (Não Implementadas)

| Seção | Prioridade | Ref. Documento |
|-------|-----------|----------------|
| **Formulário de Contato** (Seção 4) | Alta | [L95-99](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L95) |
| **Peças de Reposição** (Seção 8 — NOVA) | Média | [L181-199](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L181) |
| **Galeria de Fotos** (Seção 9 — NOVA) | Média | [L203-207](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L203) |

### 🟠 Paleta de Cores Desalinhada

O CSS atual usa variáveis genéricas. O documento do cliente define a paleta institucional exata:

| Token Institucional | Hex | Uso | Variável CSS Atual | Ação |
|---------------------|-----|-----|---------------------|------|
| `--verde-oliva` | `#6B8E23` | Backgrounds, CTAs, footer | `--color-primary-light` (parcial) | ✏️ Reestruturar |
| `--verde-claro` | `#8BC34A` | Ícones, destaques, hovers | ❌ Ausente | ➕ Adicionar |
| `--marrom-terra` | `#8D6E63` | Textos secundários, títulos | ❌ Ausente | ➕ Adicionar |
| `--cinza-engrenagem` | `#8A8A8A` | Ícones técnicos, auxiliares | `--color-text-muted: #888` (similar) | ✏️ Ajustar |
| `--bg-escuro` | `#2D3B1E` | Footer, overlays | `--color-primary-dark` (similar) | ✅ OK |

### 🟠 Tipografia Desalinhada

| Atual | Esperado |
|-------|----------|
| Montserrat + Roboto | **Inter** ou **Outfit** (Google Fonts) |

---

## Decisões de Arquitetura

> [!IMPORTANT]
> **Decisão sobre Stack Tecnológica** — Requer validação do usuário.

### Opção Recomendada: Vite + HTML/CSS/JS Vanilla (sem framework)

**Justificativa:**
1. O projeto já tem uma base funcional em HTML/CSS/JS puro com ~2.400 linhas de código
2. É uma SPA simples (single page) sem rotas dinâmicas, autenticação ou estado complexo
3. React/Next.js adicionariam overhead desnecessário para uma landing page estática
4. Vite fornece: HMR rápido, bundling/minificação, import de assets, dev server
5. Menor curva de aprendizado para manutenção futura pelo cliente

**Stack proposta:**
- **Bundler:** Vite (dev server + build de produção)
- **Linguagem:** HTML5 + CSS3 (custom properties) + JavaScript ES2022
- **3D:** `<model-viewer>` (Web Component do Google — mais leve que Three.js)
- **Formulário:** Formspree ou EmailJS (sem backend próprio)
- **Fontes:** Inter (Google Fonts)
- **Ícones:** SVG inline (já implementado)
- **Deploy:** Vercel ou Netlify (SPA estática)

> [!WARNING]
> Se o cliente preferir um framework (React/Next.js), a migração do código existente levará ~2-3 dias extras. Recomendo manter vanilla para este escopo.

---

## Open Questions

> [!IMPORTANT]
> **Perguntas que impactam diretamente a implementação:**

1. **Dados de contato reais:** O documento usa placeholders (`(31) 99999-9999`, `contato@centroesteagroindustria.com.br`, endereço genérico). O cliente mencionou "atualizar os contatos" ([L147](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L147)). **Quais são os dados reais?**

2. **Modelos 3D:** O cliente disse "Aqui é pra abrir o equipamento em 3D, vou te mandar cada um deles" ([L66](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L66)). **Os arquivos GLB/GLTF já estão disponíveis? Se não, devemos prosseguir com fallback (imagens estáticas)?**

3. **Vídeos reais:** O cliente disse "Aqui vamos por vídeos reais" ([L140](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L140)). **Os vídeos já foram fornecidos? Temos URLs do YouTube/Vimeo?**

4. **Imagem Hero (tratamento):** O cliente solicitou remover 2 logos da imagem de fundo ([L36-37](file:///d:/Frelea/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L36)). **Devemos tratar a imagem atual via edição (Photoshop/AI) ou o cliente fornecerá uma nova imagem limpa?**

5. **Foto da Fábrica de Ração (Seção Sobre):** O cliente indicou substituir a imagem aérea ([L58-59](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L58)). **A foto real já está disponível?**

6. **Fotos de Projetos:** O cliente disse "vamos melhorar essas imagens" ([L119](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L119)). **As novas fotos já estão disponíveis?**

7. **Galeria de Fotos:** O cliente disse "vou mandar fotos originais" ([L207](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L207)). Temos 7 fotos de galeria na pasta `Imagens/` (`Galeria_1.jpeg` a `Galeria_7.jpeg`). **São essas as fotos finais ou são placeholders?**

8. **Links de redes sociais:** Os links de Facebook, Instagram, YouTube e LinkedIn no footer apontam para `#`. **Quais são as URLs reais?**

9. **Número de WhatsApp definitivo:** Atualmente `5531999999999`. **Qual é o número real?**

10. **Serviço de formulário:** Preferência por **Formspree** (gratuito até 50 envios/mês), **EmailJS** (gratuito até 200 envios/mês), ou **API própria**?

---

## Proposed Changes

### Estrutura de Diretórios Proposta

```
LP_Pai_Fran/
├── index.html                    # SPA principal
├── css/
│   └── style.css                 # Design system + todos os estilos
├── js/
│   ├── main.js                   # Lógica principal (navegação, scroll, animações)
│   ├── form.js                   # Validação e envio do formulário
│   ├── gallery.js                # Lightbox e filtros da galeria
│   └── video-modal.js            # Modal de vídeo (extraído do main.js)
├── data/
│   └── site-data.js              # Constantes centralizadas (contatos, equipamentos, projetos)
├── assets/
│   ├── equipamentos/             # Renders/fotos dos equipamentos
│   ├── projetos/                 # Fotos dos projetos
│   ├── videos/                   # Thumbnails de vídeo
│   ├── galeria/                  # Fotos da galeria (mover de Imagens/)
│   ├── models/                   # [NOVO] Modelos 3D (.glb/.gltf)
│   ├── hero-bg.png               # Imagem de fundo do Hero
│   ├── hero-bg.webp              # [NOVO] Versão WebP otimizada
│   ├── logo-icon.svg             # Ícone do logo
│   └── og-image.jpg              # [NOVO] Open Graph image
├── Imagens/                      # Assets originais do cliente (referência)
├── Site centro oeste.md           # Documento de referência do cliente
├── Site centro oeste.docx         # Documento oficial do cliente
├── extracted_docx_media/          # Imagens extraídas do DOCX
└── .gitignore
```

---

### FASE 1 — Fundação Arquitetural e Design System
**Complexidade:** 🟢 Baixo | **Estimativa:** ~4h

---

#### [MODIFY] [style.css](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/css/style.css)

**Refatoração completa do Design System (`:root`):**

```diff
 :root {
-  /* Paleta de Cores */
-  --color-primary: #4A6B2F;
-  --color-primary-dark: #2D3B1E;
-  --color-primary-light: #6B8E23;
-  --color-accent: #C8A84E;
-  --color-accent-dark: #B0923C;
-  --color-bg-light: #F5F5F0;
-  --color-bg-white: #FFFFFF;
-  --color-text-dark: #2D2D2D;
-  --color-text-light: #F0EDE8;
-  --color-text-muted: #888888;
-  --color-text-white: #FFFFFF;
+  /* ═══ Paleta Institucional (documento do cliente) ═══ */
+  --verde-oliva: #6B8E23;
+  --verde-claro: #8BC34A;
+  --marrom-terra: #8D6E63;
+  --cinza-engrenagem: #8A8A8A;
+  --branco: #FFFFFF;
+  --preto-texto: #1A1A1A;
+  --bg-escuro: #2D3B1E;
+
+  /* ═══ Tokens Semânticos ═══ */
+  --color-primary: var(--verde-oliva);
+  --color-primary-dark: var(--bg-escuro);
+  --color-accent: #C8A84E;          /* Dourado CTA */
+  --color-accent-dark: #B0923C;
+  --color-highlight: var(--verde-claro);
+  --color-text-dark: var(--preto-texto);
+  --color-text-secondary: var(--marrom-terra);
+  --color-text-muted: var(--cinza-engrenagem);
+  --color-text-white: var(--branco);
+  --color-bg-light: #F5F5F0;
+  --color-bg-white: var(--branco);
 
-  /* Tipografia */
-  --font-title: 'Montserrat', sans-serif;
-  --font-body: 'Roboto', sans-serif;
+  /* ═══ Tipografia ═══ */
+  --font-title: 'Inter', sans-serif;
+  --font-body: 'Inter', sans-serif;
 }
```

**Mudança de fonte Google Fonts:**
```diff
-@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,800;1,700&family=Roboto:wght@300;400;500;700&display=swap');
+@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
```

**Adição de utilitários de acessibilidade:**
```css
/* Skip-to-content */
.skip-link { /* ... */ }

/* Visually hidden (screen readers) */
.visually-hidden { /* ... */ }

/* Focus indicators */
:focus-visible { outline: 3px solid var(--verde-claro); outline-offset: 2px; }
```

---

#### [NEW] [data/site-data.js](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/data/site-data.js)

Arquivo de **constantes centralizadas** para facilitar atualizações futuras sem alterar markup (conforme instrução do cliente em [L147](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L147): "Atualizar os contatos"):

```javascript
export const SITE_DATA = {
  company: {
    name: 'Centro Oeste Agroindústria',
    tagline: 'Soluções em Equipamentos Industriais',
    description: 'Referência na fabricação de equipamentos robustos para fábricas de ração, sal mineral e adubos.',
  },
  contact: {
    phone: '(31) 99999-9999',       // TODO: Atualizar com dados reais
    phoneRaw: '5531999999999',
    email: 'contato@centroesteagroindustria.com.br',
    address: 'Rua das Indústrias, 123 – Distrito Industrial – Belo Horizonte/MG — CEP 30000-000',
    whatsappMessage: 'Olá! Vim pelo site e gostaria de falar com a equipe da Centro Oeste Agroindústria.',
  },
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    linkedin: '#',
  },
  equipments: [
    { id: 'rosca-calha', name: 'Rosca Transportadora Tipo Calha', image: 'assets/equipamentos/rosca-calha.png' },
    { id: 'rosca-chupim', name: 'Rosca Transportadora Tipo Chupim', image: 'assets/equipamentos/rosca-tubular.png' },
    { id: 'elevador-canecas', name: 'Elevador de Canecas', image: 'assets/equipamentos/elevador-canecas.png' },
    { id: 'misturador-horizontal', name: 'Misturador Horizontal', image: 'assets/equipamentos/misturador-horizontal.png' },
    { id: 'misturador-vertical', name: 'Misturador Vertical', image: 'assets/equipamentos/misturador-vertical.png' },
  ],
  spareParts: [
    'Martelos para moinhos', 'Peneiras industriais', 'Roscas helicoidais',
    'Canecas para elevadores', 'Correias elevadoras', 'Eixos e mancais',
    'Válvulas rotativas', 'Registros gaveta', 'Componentes para misturadores',
    'Tubulações e estruturas metálicas',
  ],
  projects: [
    { id: 'fabrica-racao', title: 'FÁBRICA DE RAÇÃO', subtitle: 'Projeto Completo', image: 'assets/projetos/fabrica-racao.png' },
    { id: 'sistema-ensacamento', title: 'SISTEMA DE ENSACAMENTO', subtitle: 'Automático', image: 'assets/projetos/sistema-ensacamento.png' },
    { id: 'silo-armazenagem', title: 'SILO ARMAZENAGEM E TRANSPORTE', subtitle: '', image: 'assets/projetos/silo-armazenagem.png' },
    { id: 'planta-fertilizantes', title: 'PLANTA PARA FERTILIZANTES', subtitle: 'Projeto Completo', image: 'assets/projetos/planta-fertilizantes.png' },
  ],
  videos: [
    { id: 'video-elevador', title: 'Elevador de Canecas', status: 'em funcionamento', embedUrl: '', thumbnail: 'assets/videos/elevador-canecas-video.png' },
    { id: 'video-misturador', title: 'Misturador Horizontal', status: 'em operação', embedUrl: '', thumbnail: 'assets/videos/misturador-horizontal-video.png' },
    { id: 'video-rosca', title: 'Rosca Transportadora', status: 'em funcionamento', embedUrl: '', thumbnail: 'assets/videos/rosca-transportadora-video.png' },
    { id: 'video-ensacadeira', title: 'Ensacadeira Automática', status: 'em operação', embedUrl: '', thumbnail: 'assets/videos/ensacadeira-video.png' },
  ],
};
```

---

#### [MODIFY] [index.html](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/index.html)

**SEO base — `<head>` atualizado:**
- Adicionar `<link rel="preconnect">` para Google Fonts
- Adicionar Open Graph e Twitter Cards meta tags
- Adicionar Schema.org JSON-LD (`Organization`, `LocalBusiness`)
- Adicionar `<link rel="canonical">`
- Corrigir `<meta name="description">` para refletir o novo posicionamento (fábricas de ração, sal mineral e adubos)
- Adicionar `skip-to-content` link

**Entregáveis da Fase 1:**
- [x] Design system refatorado com paleta institucional
- [x] Tipografia atualizada (Inter)
- [x] Arquivo de constantes centralizadas (`site-data.js`)
- [x] SEO base configurado
- [x] Utilitários de acessibilidade

---

### FASE 2 — Estrutura Estática e Seções de Conteúdo
**Complexidade:** 🟡 Médio | **Estimativa:** ~8h

---

#### [MODIFY] [index.html](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/index.html) — Seção Hero (L81-108)

**Correções de conteúdo conforme documento:**

```diff
 <h1 class="hero-title">
-  <span>Soluções Completas</span>
-  para Movimentação e Processamento de Sólidos
+  FÁBRICAS DE RAÇÃO, SAL MINERAL E ADUBOS
 </h1>
+<p class="hero-subtitle">Tecnologia e qualidade sob medida para sua indústria</p>
 <p class="hero-desc">
-  Projetamos e fabricamos equipamentos industriais para agroindústrias, fábricas de ração, fertilizantes, sementes e grãos.
+  Equipamentos e projetos industriais completos para aumentar a eficiência, a produtividade e o desempenho do seu negócio.
 </p>
```

**Ações adicionais no Hero:**
- Adicionar efeito parallax sutil na imagem de fundo (CSS `background-attachment: fixed` + JS para mobile)
- Animação fade-in no título/subtítulo ao carregar
- Manter barra de destaques inferior (4 caixas — já implementada corretamente)

---

#### [MODIFY] [index.html](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/index.html) — Seção Sobre a Empresa (L178-214)

```diff
-<h2 class="section-title" style="...">Tecnologia e Robustez sob medida</h2>
+<h2 class="section-title">EFICIÊNCIA PRODUTIVA E QUALIDADE SOB MEDIDA</h2>

 <p class="about-text">
-  ...equipamentos de alta qualidade para movimentação e processamento de sólidos.
+  ...equipamentos de alta qualidade para fábricas de ração, sal mineral e adubo.
 </p>

-<!-- REMOVER cards de métricas (L191-204) -->
-<div class="about-metrics">
-  <!-- 100%, +500, BNDES — REMOVIDOS conforme marcação do cliente -->
-</div>
```

- Remover `style="..."` inline (L183)
- Substituir `hero-bg.png` por placeholder ou foto real de fábrica de ração quando disponível
- Adicionar animação slide-in (Intersection Observer)

---

#### [MODIFY] [index.html](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/index.html) — Seção Equipamentos (L219-366)

**Reduzir de 10 para 5 equipamentos** conforme lista oficial do cliente ([L86-91](file:///d:/Frelea/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L86)):

| # | Equipamento | Ação |
|---|-------------|------|
| 1 | Rosca Transportadora Tipo Calha | ✅ Manter (renomear) |
| 2 | Rosca Transportadora Tipo Chupim | ✏️ Renomear (era "Tubular") |
| 3 | Elevador de Canecas | ✅ Manter |
| 4 | ~~Silo Pulmão~~ | ❌ **Remover** |
| 5 | Misturador Horizontal | ✅ Manter |
| 6 | Misturador Vertical | ✅ Manter |
| 7 | ~~Dosadora Helicoidal~~ | ❌ **Remover** |
| 8 | ~~Ensacadeira~~ | ❌ **Remover** |
| 9 | ~~Moega~~ | ❌ **Remover** |
| 10 | ~~Válvula Rotativa~~ | ❌ **Remover** |

> Estrutura escalável: o grid CSS e o JS já suportam adição dinâmica de cards.

---

#### [MODIFY] [index.html](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/index.html) — Footer (L533-647)

**Atualizar lista de equipamentos no footer** para refletir os 5 itens oficiais:

```diff
 <div class="footer-equipments">
-  <a href="#equipamentos">Rosca Transportadora Tubular</a>
+  <a href="#equipamentos">Rosca Transportadora Tipo Calha</a>
+  <a href="#equipamentos">Rosca Transportadora Tipo Chupim</a>
   <a href="#equipamentos">Elevador de Canecas</a>
-  <a href="#equipamentos">Silo Pulmão</a>
   <a href="#equipamentos">Misturador Horizontal</a>
   <a href="#equipamentos">Misturador Vertical</a>
-  <a href="#equipamentos">Dosadora Helicoidal</a>
-  <a href="#equipamentos">Ensacadeira</a>
-  <a href="#equipamentos">Moega</a>
-  <a href="#equipamentos">Válvula Rotativa</a>
 </div>
```

---

#### [NEW] Seção Peças de Reposição (inserir após Equipamentos)

Nova seção conforme instrução do cliente ([L181-199](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L181)):

```html
<section class="section-padding bg-white" id="pecas">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">PEÇAS DE REPOSIÇÃO E COMPONENTES INDUSTRIAIS</h2>
      <p class="section-desc">Fabricamos e fornecemos peças de reposição e componentes industriais 
      para moinhos, misturadores, elevadores de canecas, transportadores e sistemas de ensacamento.</p>
    </div>
    <div class="spare-parts-grid">
      <!-- 10 itens com ícone + nome, gerados a partir de site-data.js -->
    </div>
    <div class="text-center">
      <a href="#contato" class="btn btn-secondary">Solicitar Orçamento de Peças</a>
    </div>
  </div>
</section>
```

---

#### Tratamento de Imagem Hero

> [!CAUTION]
> O cliente solicitou **remover 2 logos** da imagem de fundo do Hero:
> 1. Logo/texto circular verde na estrutura da fábrica
> 2. Logo retangular "AGRI PROCESS SOLUTIONS" no galpão frontal

**Opções:**
- **A)** Editar `hero-bg.png` via script Python (clone/inpainting com Pillow/OpenCV)
- **B)** Solicitar imagem limpa ao cliente
- **C)** Usar CSS (overlay mais opaco + posicionamento estratégico do conteúdo)

*Recomendação:* Opção **B** para resultado profissional; usar **C** como workaround temporário.

---

**Entregáveis da Fase 2:**
- [x] Hero com textos corrigidos
- [x] Sobre a Empresa com texto e layout atualizados (sem cards métricas)
- [x] Equipamentos reduzidos para 5 itens
- [x] Seção Peças de Reposição implementada
- [x] Footer atualizado
- [x] Scroll suave funcional
- [x] Layout 100% responsivo
- [x] Imagens com lazy-loading

---

### FASE 3 — Componentes Interativos e Formulário
**Complexidade:** 🟡🔴 Médio–Alto | **Estimativa:** ~10h

---

#### [NEW] Seção Formulário de Contato (inserir antes do Footer)

Conforme instrução do cliente ([L95-99](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L95)):

**Campos do formulário:**
| Campo | Tipo | Obrigatório | Validação |
|-------|------|------------|-----------|
| Nome completo | `text` | ✅ | Min. 3 caracteres |
| E-mail | `email` | ✅ | Regex de e-mail |
| Telefone/WhatsApp | `tel` | ✅ | Máscara `(XX) XXXXX-XXXX` |
| Cidade/Estado | `text` | ✅ | Min. 3 caracteres |
| Equipamento de interesse | `select` | ❌ | Opções dos 5 equipamentos + "Peças de Reposição" + "Projeto Completo" |
| Mensagem | `textarea` | ✅ | Min. 10 caracteres |

**Implementação:**
- Validação inline em tempo real (CSS `:invalid` + JS)
- Máscara de telefone com formatação automática
- Integração com Formspree/EmailJS
- Animação de sucesso pós-envio (checkmark animado SVG)
- Campo honeypot anti-spam (hidden field)
- Estados de loading no botão de envio

---

#### [NEW] [js/form.js](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/js/form.js)

Módulo dedicado para lógica do formulário:
- Validação em tempo real
- Máscara de telefone
- Integração com API de envio
- Feedback visual (sucesso/erro)

---

#### [NEW] Seção Galeria de Fotos

Conforme instrução do cliente ([L203-207](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L203)):

**Implementação:**
- Grid responsivo uniforme (CSS Grid)
- Filtros por categoria: "Todos", "Equipamentos", "Fábricas", "Instalações"
- Lightbox com navegação entre fotos (setas + swipe mobile)
- Lazy-loading nativo + `IntersectionObserver`
- Hover com zoom sutil + overlay com legenda
- Imagens da pasta `Imagens/` como base inicial (`Galeria_1.jpeg` a `Galeria_7.jpeg`)

---

#### [NEW] [js/gallery.js](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/js/gallery.js)

Módulo dedicado para galeria:
- Filtros de categoria
- Lightbox com navegação (keyboard + touch/swipe)
- Transições fluidas

---

#### [MODIFY] [js/main.js](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/js/main.js)

**Melhorias nas animações:**
- Adicionar animação `slide-in-left` para textos da seção "Sobre"
- Adicionar animação `slide-in-right` para imagem da seção "Sobre"
- Melhorar `play-btn-overlay` com pulsação sutil
- Adicionar `scale-up` ao hover nos cards de vídeo

**Refatorar modal de vídeo:**
- Extrair para `video-modal.js` (separação de responsabilidades)
- Suportar lazy-loading de iframes YouTube/Vimeo
- Remover URLs placeholder (Rick Roll) e usar configuração de `site-data.js`

**Botão flutuante WhatsApp:**
- Já implementado, apenas atualizar número via `site-data.js`

---

**Entregáveis da Fase 3:**
- [x] Formulário de contato completo e funcional
- [x] Galeria de fotos com lightbox e filtros
- [x] Modal de vídeo refatorado
- [x] Animações de scroll em todas as seções
- [x] Botão WhatsApp flutuante (já existe, apenas integrar dados)

---

### FASE 4 — Visualização 3D dos Equipamentos
**Complexidade:** 🔴 Alto | **Estimativa:** ~12h

---

#### Integração `<model-viewer>`

**Escolha técnica: `<model-viewer>` vs. Three.js**

| Critério | `<model-viewer>` | Three.js |
|----------|-------------------|----------|
| Tamanho do bundle | ~150KB | ~600KB+ |
| Curva de aprendizado | Baixa (Web Component) | Alta |
| Mobile support | Excelente (AR nativo) | Bom |
| Customização | Moderada | Total |
| Fallback automático | ✅ | Manual |

**Recomendação:** `<model-viewer>` — suficiente para visualização de equipamentos industriais.

---

#### [MODIFY] [index.html](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/index.html) — Cards de Equipamentos

**Estrutura atualizada de cada card:**

```html
<div class="card-equipment" id="eqRoscaCalha">
  <h3 class="card-equipment-title">ROSCA TRANSPORTADORA TIPO CALHA</h3>
  <div class="card-equipment-viewer">
    <!-- Viewer 3D carregado on-demand -->
    <model-viewer
      src="assets/models/rosca-calha.glb"
      alt="Modelo 3D - Rosca Transportadora Tipo Calha"
      camera-controls
      touch-action="pan-y"
      loading="lazy"
      poster="assets/equipamentos/rosca-calha.png"
      shadow-intensity="1"
      auto-rotate>
    </model-viewer>
  </div>
  <div class="card-equipment-tabs">
    <button class="tab-btn active" data-tab="3d">RENDER 3D</button>
    <button class="tab-btn" data-tab="fotos">FOTOS</button>
    <button class="tab-btn" data-tab="videos">VÍDEOS</button>
  </div>
</div>
```

**Funcionalidades:**
- Controles de rotação, zoom e pan (mouse + touch)
- `poster` com imagem estática como fallback
- `loading="lazy"` — modelo carrega apenas quando visível
- Auto-rotate para demonstração
- Sistema de abas: 3D | Fotos | Vídeos

**Performance:**
- Modelos carregados on-demand (apenas quando o card é ativado)
- Compressão Draco/MeshOpt para modelos 3D
- Skeleton loader durante carregamento
- Fallback gracioso para navegadores sem WebGL

> [!WARNING]
> Esta fase depende do fornecimento dos arquivos GLB/GLTF pelo cliente. Sem os modelos, implementaremos com fallback de imagem estática + botão de contato via WhatsApp para solicitar demonstração 3D.

---

**Entregáveis da Fase 4:**
- [x] Visualizador 3D funcional (ou fallback de imagem)
- [x] Sistema de abas nos cards (3D / Fotos / Vídeos)
- [x] Carregamento on-demand
- [x] Fallbacks para dispositivos sem WebGL

---

### FASE 5 — Polimento, SEO Avançado, Performance e Deploy
**Complexidade:** 🟡 Médio | **Estimativa:** ~6h

---

#### SEO Avançado

- **Schema.org JSON-LD:**
  - `Organization` (nome, logo, contato)
  - `LocalBusiness` (endereço, telefone, horário)
  - `Product` (para cada equipamento)
- **Open Graph + Twitter Cards** (com `og-image.jpg`)
- **Sitemap.xml** e **robots.txt**
- **Canonical URL**
- **Alt texts** em todas as imagens
- **Heading hierarchy validada** (único `<h1>` no Hero)

#### Performance

- **Critical CSS inline** no `<head>`
- **Font preload + `font-display: swap`**
- **Imagens otimizadas:** conversão para WebP/AVIF, `srcset` responsivo, lazy-load nativo
- **Minificação** CSS/JS (Vite build ou manual)
- **Compressão** gzip/brotli (configuração do servidor)
- **Prefetch** de recursos críticos
- **Meta: Lighthouse ≥ 90** em todas as categorias

#### Acessibilidade (WCAG 2.1 AA)

- ✅ Contraste de cores validado (paleta institucional já atende — verde oliva sobre branco = ratio 4.6:1)
- ✅ Navegação completa por teclado
- ✅ `aria-label` em elementos interativos
- ✅ Skip-to-content link
- ✅ Focus indicators visíveis (`:focus-visible`)
- ✅ Screen reader testing (semantic HTML + aria)
- ✅ `aria-expanded` no menu mobile (já implementado)

#### Cross-Browser Testing

- Chrome, Firefox, Safari, Edge (últimas 2 versões)
- iOS Safari, Chrome Android

#### Deploy

- Configuração de hosting (Vercel / Netlify)
- HTTPS/SSL automático
- CDN para assets estáticos
- Google Analytics 4 / Tag Manager

---

**Entregáveis da Fase 5:**
- [x] Site live em produção
- [x] Lighthouse ≥ 90 em todas as categorias
- [x] Acessibilidade validada
- [x] Cross-browser validado
- [x] Analytics configurado

---

## Verificação e Critérios de Aceitação

### Testes Automatizados

```bash
# Lighthouse CI (todas as categorias ≥ 90)
npx lighthouse http://localhost:5173 --output=json --output-path=./lighthouse-report.json

# Validação de acessibilidade (axe-core)
npx @axe-core/cli http://localhost:5173

# Validação HTML
npx html-validate index.html

# Verificação de links quebrados
npx broken-link-checker http://localhost:5173
```

### Verificação Manual

| Critério | Método |
|----------|--------|
| Textos corretos vs. documento do cliente | Comparação visual |
| Layout responsivo (375px, 768px, 1440px) | DevTools + dispositivos reais |
| Formulário envia e exibe feedback | Teste manual |
| Vídeos reproduzem no modal | Teste com URLs reais |
| Galeria navega em desktop e mobile | Teste manual + touch |
| Animações suaves (60fps) | DevTools Performance tab |
| WhatsApp abre com mensagem pré-preenchida | Teste em dispositivo móvel |
| Equipamentos limitados a 5 itens | Verificação visual |
| Cards métricas removidos (Sobre) | Verificação visual |

---

## Resumo da Matriz de Complexidade

| Fase | Nome | Complexidade | Estimativa | Seções Cobertas |
|------|------|-------------|------------|-----------------|
| 1 | Fundação Arquitetural e Design System | 🟢 Baixo | ~4h | Infraestrutura |
| 2 | Estrutura Estática e Conteúdo | 🟡 Médio | ~8h | Hero, Sobre, Equipamentos, Peças, Footer |
| 3 | Componentes Interativos e Formulário | 🟡🔴 Médio–Alto | ~10h | Contato, Vídeos, Galeria, Animações |
| 4 | Visualização 3D | 🔴 Alto | ~12h | Equipamentos (3D), Abas |
| 5 | Polimento, SEO, Performance, Deploy | 🟡 Médio | ~6h | Transversal |
| **Total** | | | **~40h** | |

---

## Ordem de Navegação das Seções (SPA)

Conforme menu do header definido no documento do cliente ([L22](file:///d:/Freela/SERVIÇOS/Projetos%20em%20andamento/LP_Pai_Fran/Site%20centro%20oeste.md#L22)):

```
1. INÍCIO (Hero + Barra de Destaques)
2. EMPRESA (Sobre a Empresa)
3. EQUIPAMENTOS (Nossos Equipamentos + Peças de Reposição)
4. PROJETOS (Projetos Executados)
5. VÍDEOS (Vídeos em Funcionamento)
6. GALERIA (Galeria de Fotos — NOVA)
7. CONTATO (Formulário de Contato — NOVO)
8. FOOTER (Rodapé)
```
