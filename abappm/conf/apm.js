if (window.location.hostname.includes('playground.abappm.com')) {
  document.getElementById('apm-header').innerHTML =
    '<strong>***PLAYGROUND***</strong>  Expect the unexpected! Please post bugs and feedback to <a href="https://github.com/abapPM/abapPM/issues" target="_blank" style="color:white !important;">GitHub</a>. Thank You!  <strong>***PLAYGROUND***</strong>';
  document.getElementById('apm-header').style.backgroundColor = '#0000FF';
  document.getElementById('apm-header').style.color = '#FFFFFF';
  document.getElementById('apm-header').style.fontSize = '12px';
  document.getElementById('apm-header').style.textAlign = 'center';
} else {
  document.getElementById('apm-header').style.display = 'none';
}

var apmFooterHtml = `
<style>
  .apm-footer {
    border-top: 1px solid #3d4f5f;
    padding: 48px 24px;
    background: #253341;
    color: #999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  .apm-footer a {
    color: #999;
    text-decoration: none;
    transition: color 0.2s;
  }
  .apm-footer a:hover {
    color: #fff;
  }
  .apm-footer-inner {
    margin: 0 auto;
    max-width: 64rem;
  }
  .apm-footer-grid {
    display: grid;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .apm-footer-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .apm-footer-tagline {
    margin-top: 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .apm-footer-heading {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #999;
    margin: 0;
  }
  .apm-footer-links {
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
  }
  .apm-footer-links li + li {
    margin-top: 0.5rem;
  }
  .apm-footer-links a {
    font-size: 0.875rem;
  }
  .apm-footer-logo-light {
    display: none;
  }
  .apm-footer-logo-dark {
    display: block;
  }
  .apm-footer.apm-footer--light {
    background: #ffffff;
    border-top-color: #e3e3e3;
    color: #737373;
  }
  .apm-footer.apm-footer--light a {
    color: #737373;
  }
  .apm-footer.apm-footer--light a:hover {
    color: #111111;
  }
  .apm-footer.apm-footer--light .apm-footer-heading {
    color: #333333;
  }
  .apm-footer.apm-footer--light .apm-footer-logo-light {
    display: block;
  }
  .apm-footer.apm-footer--light .apm-footer-logo-dark {
    display: none;
  }
  .apm-footer-copyright {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #3d4f5f;
    text-align: center;
    font-size: 0.875rem;
  }
  .apm-footer.apm-footer--light .apm-footer-copyright {
    border-top-color: #e3e3e3;
    color: #737373;
  }
</style>
<footer class="apm-footer">
  <div class="apm-footer-inner">
    <div class="apm-footer-grid">
      <div>
        <img alt="apm" loading="lazy" width="100" height="30" class="apm-footer-logo-light" src="/-/assets/apm_banner.png">
        <img alt="apm" loading="lazy" width="100" height="30" class="apm-footer-logo-dark" src="/-/assets/apm_banner_gray.png">
        <p class="apm-footer-tagline">
          A Package Manager for ABAP.<br>
          Made with &#x2764;&#xFE0F; in Canada.
        </p>
      </div>
      <div>
        <h4 class="apm-footer-heading">Product</h4>
        <ul class="apm-footer-links">
          <li><a href="https://github.com/abappm/abappm" target="_blank" rel="noopener noreferrer">apm Client</a></li>
          <li><a href="https://registry.abappm.com" target="_blank" rel="noopener noreferrer">apm Registry</a></li>
          <li><a href="https://docs.abappm.com" target="_blank" rel="noopener noreferrer">apm Documentation</a></li>
        </ul>
      </div>
      <div>
        <h4 class="apm-footer-heading">Company</h4>
        <ul class="apm-footer-links">
          <li><a href="https://abappm.com/about" target="_blank" rel="noopener noreferrer">About</a></li>
          <li><a href="https://github.com/abappm/abappm" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://status.abappm.com" target="_blank" rel="noopener noreferrer">Status</a></li>
        </ul>
      </div>
      <div>
        <h4 class="apm-footer-heading">Connect</h4>
        <ul class="apm-footer-links">
          <li><a href="mailto:hello@mail.abappm.com" target="_blank" rel="noopener noreferrer">Email</a></li>
          <li><a href="https://bsky.app/profile/apm.to" target="_blank" rel="noopener noreferrer">Bluesky</a></li>
          <li><a href="https://www.linkedin.com/company/apm.to" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="apm-footer-copyright">
      &copy; 2026 apm.to, Inc. All rights reserved.
    </div>
  </div>
</footer>
`;

function isApmLightMode() {
  try {
    var stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return JSON.parse(stored) === false;
    }
  } catch {
    return false;
  }
  return false;
}

function syncApmFooterTheme() {
  var footer = document.querySelector('.apm-footer');
  if (footer) {
    footer.classList.toggle('apm-footer--light', isApmLightMode());
  }
}

function injectApmFooter() {
  var footer = document.querySelector('[data-testid="footer"]');
  if (!footer || footer.querySelector('.apm-footer')) {
    return;
  }

  footer.style.padding = '0';
  footer.style.background = 'none';
  footer.style.borderTop = 'none';
  footer.innerHTML = apmFooterHtml;
  syncApmFooterTheme();
}

(function hookDarkModeStorage() {
  var originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    originalSetItem(key, value);
    if (key === 'darkMode') {
      syncApmFooterTheme();
    }
  };
  window.addEventListener('storage', function (event) {
    if (event.key === 'darkMode') {
      syncApmFooterTheme();
    }
  });
})();

var footerObserver = new MutationObserver(injectApmFooter);
footerObserver.observe(document.body, { childList: true, subtree: true });
injectApmFooter();
