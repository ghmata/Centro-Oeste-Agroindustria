/* ==========================================================================
   FORMULÁRIO DE CONTATO - CENTRO OESTE AGROINDÚSTRIA
   Responsabilidade: Validação, máscara, envio e feedback visual.
   ========================================================================== */

import { SITE_DATA } from '../data/site-data.js';

/**
 * Inicializa toda a lógica do formulário de contato.
 * Chamado uma vez após DOMContentLoaded no main.js.
 */
export function initContactForm() {
  const form = document.getElementById('formContato');
  if (!form) return;

  const fields = {
    nome: form.querySelector('#fieldNome'),
    email: form.querySelector('#fieldEmail'),
    telefone: form.querySelector('#fieldTelefone'),
    cidade: form.querySelector('#fieldCidade'),
    equipamento: form.querySelector('#fieldEquipamento'),
    mensagem: form.querySelector('#fieldMensagem'),
  };

  const btnSubmit = form.querySelector('#btnEnviarContato');
  const feedbackContainer = document.getElementById('formFeedback');

  // ==========================================
  // MÁSCARA DE TELEFONE — Formato BR: (XX) XXXXX-XXXX
  // ==========================================
  if (fields.telefone) {
    fields.telefone.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');

      // Limita a 11 dígitos (DDD + 9 dígitos)
      if (value.length > 11) {
        value = value.slice(0, 11);
      }

      // Aplica a máscara progressivamente
      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

  // ==========================================
  // VALIDAÇÃO INLINE EM TEMPO REAL
  // ==========================================
  const validationRules = {
    nome: {
      validate: (v) => v.trim().length >= 3,
      message: 'Informe seu nome completo (mín. 3 caracteres)',
    },
    email: {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Informe um e-mail válido',
    },
    telefone: {
      // Valida o número limpo (apenas dígitos), aceita 10 ou 11 dígitos
      validate: (v) => {
        const digits = v.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 11;
      },
      message: 'Informe um telefone válido com DDD',
    },
    cidade: {
      validate: (v) => v.trim().length >= 3,
      message: 'Informe sua cidade/estado (mín. 3 caracteres)',
    },
    mensagem: {
      validate: (v) => v.trim().length >= 10,
      message: 'Escreva uma mensagem (mín. 10 caracteres)',
    },
  };

  /**
   * Valida um campo individual e exibe/esconde mensagem de erro.
   * Usa textContent para segurança (nunca innerHTML com dados do usuário).
   */
  const validateField = (fieldName) => {
    const field = fields[fieldName];
    if (!field) return true;

    const rule = validationRules[fieldName];
    if (!rule) return true; // Campo opcional (ex: equipamento)

    const wrapper = field.closest('.form-group');
    const errorEl = wrapper?.querySelector('.form-error');

    const isValid = rule.validate(field.value);

    if (isValid) {
      wrapper?.classList.remove('has-error');
      wrapper?.classList.add('is-valid');
      if (errorEl) errorEl.textContent = '';
    } else {
      wrapper?.classList.add('has-error');
      wrapper?.classList.remove('is-valid');
      if (errorEl) errorEl.textContent = rule.message;
    }

    return isValid;
  };

  // Registra listeners de blur para validação inline
  Object.keys(validationRules).forEach((fieldName) => {
    const field = fields[fieldName];
    if (field) {
      field.addEventListener('blur', () => validateField(fieldName));
      // Limpa o erro enquanto o usuário digita (feedback positivo)
      field.addEventListener('input', () => {
        const wrapper = field.closest('.form-group');
        if (wrapper?.classList.contains('has-error')) {
          validateField(fieldName);
        }
      });
    }
  });

  // ==========================================
  // ENVIO DO FORMULÁRIO
  // ==========================================
  let isSubmitting = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Rate limiting visual — previne double-submit
    if (isSubmitting) return;

    // Valida todos os campos obrigatórios
    const requiredFields = ['nome', 'email', 'telefone', 'cidade', 'mensagem'];
    let allValid = true;

    requiredFields.forEach((fieldName) => {
      const isValid = validateField(fieldName);
      if (!isValid) allValid = false;
    });

    if (!allValid) {
      // Foca no primeiro campo com erro para acessibilidade
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      firstError?.focus();
      return;
    }

    // Verifica honeypot anti-spam (se o campo hidden foi preenchido, é bot)
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      // Silenciosamente ignora o envio — bots não recebem feedback
      showFeedback('success');
      return;
    }

    // Ativa estado de loading
    isSubmitting = true;
    btnSubmit?.classList.add('is-loading');
    btnSubmit?.setAttribute('disabled', 'true');
    btnSubmit?.setAttribute('aria-busy', 'true');

    try {
      const formData = new FormData(form);

      // Integração com Formspree
      // TODO: Substituir pelo ID real do formulário Formspree do cliente
      const formspreeEndpoint = 'https://formspree.io/f/xpzzpqkg';

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        showFeedback('success');
        form.reset();
        // Limpa estados de validação visual
        form.querySelectorAll('.form-group').forEach((g) => {
          g.classList.remove('is-valid', 'has-error');
        });
      } else {
        const data = await response.json().catch(() => null);
        console.error('[Form] Resposta de erro do Formspree:', data);
        showFeedback('error');
      }
    } catch (error) {
      console.error('[Form] Falha ao enviar formulário:', error);
      showFeedback('error');
    } finally {
      // Rate limiting visual — desabilita por 3 segundos após envio
      setTimeout(() => {
        isSubmitting = false;
        btnSubmit?.classList.remove('is-loading');
        btnSubmit?.removeAttribute('disabled');
        btnSubmit?.removeAttribute('aria-busy');
      }, 3000);
    }
  });

  // ==========================================
  // FEEDBACK VISUAL (SUCESSO / ERRO)
  // ==========================================
  const showFeedback = (type) => {
    if (!feedbackContainer) return;

    feedbackContainer.className = `form-feedback form-feedback-${type}`;

    if (type === 'success') {
      feedbackContainer.innerHTML = `
        <div class="form-feedback-icon">
          <svg viewBox="0 0 52 52" class="checkmark-svg" aria-hidden="true">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h3 class="form-feedback-title">Mensagem enviada com sucesso!</h3>
        <p class="form-feedback-text">Em breve nossa equipe entrará em contato.</p>
      `;
    } else {
      feedbackContainer.innerHTML = `
        <div class="form-feedback-icon form-feedback-icon-error">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="2"/>
            <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3 class="form-feedback-title">Erro ao enviar mensagem</h3>
        <p class="form-feedback-text">Por favor, tente novamente ou entre em contato pelo WhatsApp.</p>
      `;
    }

    feedbackContainer.classList.add('is-visible');
    feedbackContainer.setAttribute('role', 'alert');

    // Remove feedback após 6 segundos
    setTimeout(() => {
      feedbackContainer.classList.remove('is-visible');
    }, 6000);
  };
}
