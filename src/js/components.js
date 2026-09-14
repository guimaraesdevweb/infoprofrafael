/* ============================================================
   components.js
   Contém os componentes reutilizáveis do site (Web Components).
   Basta importar este arquivo em qualquer página e usar a tag
   <site-header></site-header> no HTML.
   ============================================================ */

class SiteHeader extends HTMLElement {
  connectedCallback() {

    // HTML do cabeçalho, extraído das páginas existentes
    this.innerHTML = `
      <header class="site-header">
        <div class="container">
          <a href="../../matematica/index.html" class="brand">
            <img src="../../../src/img/Logos/Logo_GuimaraesDevWeb_200px.png" alt="Logo">
            <span class="brand-text">
              <strong>Rafael Guimarães</strong>
              <span>Matemática Interativa</span>
            </span>
          </a>
          
          <div class="header-actions">
          <a href="../index.html" class="btn btn-ghost btn-sm">← Voltar às Aulas</a>
            <button id="theme-toggle" type="button" class="icon-btn" aria-label="Alternar tema">
              <svg id="theme-toggle-dark-icon" class="hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              <svg id="theme-toggle-light-icon" class="hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.951.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
      </header>
    `;

    this.setupThemeToggle();
  }

  // Controla a lógica do botão de dark mode
  setupThemeToggle() {
    const toggleBtn = this.querySelector('#theme-toggle');
    const darkIcon = this.querySelector('#theme-toggle-dark-icon');
    const lightIcon = this.querySelector('#theme-toggle-light-icon');

    // Mostra o ícone certo dependendo do tema atual
    const updateIcon = (isDark) => {
      darkIcon.classList.toggle('hidden', !isDark);
      lightIcon.classList.toggle('hidden', isDark);
    };

    // Ao carregar a página, aplica o tema salvo anteriormente (se houver)
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    document.body.classList.toggle('dark-mode', isDark);
    updateIcon(isDark);

    // Ao clicar no botão, alterna entre claro e escuro
    toggleBtn.addEventListener('click', () => {
      const nowDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
      updateIcon(nowDark);
    });
  }
}

// Registra a tag <site-header> para o navegador reconhecer
customElements.define('site-header', SiteHeader);





/* ============================================================
   SiteFooter
   Segundo componente do mesmo arquivo. Funciona exatamente
   com a mesma lógica do SiteHeader: uma classe que estende
   HTMLElement e é registrada como uma nova tag HTML.
   ============================================================ */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    // HTML do rodapé, extraído das páginas existentes
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <a href="https://guimaraesdevweb.com.br" target="_blank" rel="noopener noreferrer" aria-label="Site do Professor Rafael Guimarães">
              <img src="../../../src/img/Logos/Logo_GuimaraesDevWeb_200px.png" alt="Logo">
            </a>
            <a href="https://guimaraesdevweb.com.br/aulas/matematica" target="_blank" rel="noopener noreferrer" class="brand">
              <span class="brand-text">
                <strong>Rafael Guimarães</strong>
                <span>Matemática &amp; Informática</span>
              </span>
            </a>
 
            <div class="footer-social">
              <a href="https://www.linkedin.com/in/guimaraesdevweb" target="_blank" rel="noopener noreferrer" aria-label="Perfil do LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
 
              <a href="https://github.com/guimaraesdevweb/" target="_blank" rel="noopener noreferrer" aria-label="Perfil no Github">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                </svg>
              </a>
 
              <a href="mailto:guimaraesdevweb@gmail.com?subject=Vim%20pelo%20seu%20site" aria-label="Enviar E-mail para o Professor Rafael Guimarães">
                <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                  <path d="M423.795,31.763H88.205C39.363,31.763,0,71.571,0,119.966v192.679c0,48.711,39.699,88.205,88.205,88.205h54.841v18.531c0,10.656,8.638,19.292,19.292,19.292h84.429v22.253c0,17.109,20.595,25.661,32.752,13.821l83.601-81.417c7.765-7.561,7.783-20.063,0-27.643l-83.601-81.416c-12.196-11.883-32.752-3.204-32.752,13.821v22.251h-84.429c-10.656,0-19.292,8.638-19.292,19.292v18.533H88.205c-11.198,0-21.458-4.072-29.396-10.802l140.826-129.077c58.265,38.135,67.367,29.69,112.731,0l140.826,129.077c-7.938,6.73-18.198,10.802-29.396,10.802h-8.808c-11.785,0-21.339,9.554-21.339,21.339s9.554,21.34,21.339,21.34h8.808C472.247,400.85,512,361.406,512,312.645V119.966C512,71.476,472.549,31.763,423.795,31.763z M42.679,304.258V119.966c0-1.44,0.075-2.862,0.206-4.268l119.899,78.474L42.679,304.258z M266.284,197.444c-6.247,4.089-14.32,4.089-20.567-0.001L66.347,80.046c6.491-3.568,13.94-5.604,21.857-5.604c364.554,0,343.118-2.273,357.449,5.604L266.284,197.444z M469.321,304.258L349.215,194.174l119.9-78.475c0.131,1.406,0.206,2.828,0.206,4.268V304.258z"/>
                </svg>
              </a>
 
              <a rel="noopener noreferrer" href="https://wa.me/5581996678813?text=Ol%C3%A1%2C%20professor%20Rafael!%20Vim%20pelo%20seu%20site." target="_blank" aria-label="Mensagens via WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd" />
                  <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z" />
                </svg>
              </a>
              <a rel="noopener noreferrer" href="https://www.youtube.com/@guimaraesdevweb" target="_blank" aria-label="Canal no YouTube">
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="currentColor" fill-rule="evenodd" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clip-rule="evenodd" />
  </svg>
</a>
            </div>
          </div>
 
          <div class="footer-bottom">
            © ${new Date().getFullYear()} <strong>Prof. Rafael Silva Guimarães</strong>. Todos os direitos reservados.<br>
            Professor de Matemática e Informática | Vitória de Santo Antão – PE
          </div>
        </div>
      </footer>
    `;
  }
}

// Registra a tag <site-footer>
customElements.define('site-footer', SiteFooter);