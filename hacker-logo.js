// Hacker Theme Logo Injector for Nginx Proxy Manager
// This script replaces the logo with jude.me.uk branding

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  function init() {
    // Replace navbar logo
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
      // Create SVG logo
      const logoSVG = `
        <svg width="120" height="32" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.5)); margin-right: 8px;">
          <defs>
            <style>
              .terminal-text {
                font-family: 'Courier New', monospace;
                font-weight: bold;
                fill: #00ff41;
              }
            </style>
          </defs>
          <rect x="2" y="2" width="396" height="96" fill="#1a1a1a" stroke="#00ff41" stroke-width="2" rx="5"/>
          <rect x="2" y="2" width="396" height="18" fill="#00ff41" opacity="0.2" rx="5"/>
          <circle cx="12" cy="11" r="3" fill="#00ff41"/>
          <circle cx="22" cy="11" r="3" fill="#00ff41" opacity="0.7"/>
          <circle cx="32" cy="11" r="3" fill="#00ff41" opacity="0.4"/>
          <text x="200" y="65" text-anchor="middle" class="terminal-text" font-size="28">jude.me.uk</text>
        </svg>
      `;
      
      // Replace the content
      const imgTag = navbarBrand.querySelector('img');
      if (imgTag) {
        imgTag.outerHTML = logoSVG;
      }
      
      // Update text
      const textNodes = Array.from(navbarBrand.childNodes).filter(node => node.nodeType === 3);
      textNodes.forEach(node => {
        if (node.textContent.trim()) {
          node.textContent = ' ';
        }
      });
      
      // Add glowing text
      const brandText = navbarBrand.querySelector('span') || document.createElement('span');
      brandText.style.color = '#00ff41';
      brandText.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.3)';
      brandText.style.fontFamily = "'Courier New', monospace";
      brandText.textContent = 'PROXY MANAGER';
      if (!navbarBrand.querySelector('span')) {
        navbarBrand.appendChild(brandText);
      }
    }
    
    // Update page title
    document.title = 'jude.me.uk - Nginx Proxy Manager';
    
    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
      favicon.href = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#0d0d0d"/>
          <rect x="10" y="30" width="80" height="40" fill="none" stroke="#00ff41" stroke-width="3"/>
          <text x="50" y="58" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#00ff41">jude.me.uk</text>
        </svg>
      `);
    }
    
    // Add matrix-style cursor effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      
      .navbar-brand::after {
        content: '▂';
        color: #00ff41;
        animation: blink 1s infinite;
        margin-left: 4px;
      }
      
      /* Add scanline effect */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(
          transparent 0%,
          rgba(0, 255, 65, 0.02) 50%,
          transparent 100%
        );
        background-size: 100% 4px;
        animation: scanline 8s linear infinite;
        z-index: 999999;
      }
      
      @keyframes scanline {
        0% { background-position: 0 0; }
        100% { background-position: 0 100%; }
      }
      
      /* Terminal flicker effect */
      body {
        animation: flicker 0.15s infinite alternate;
      }
      
      @keyframes flicker {
        0% { opacity: 0.97; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    console.log('%c[jude.me.uk]%c Hacker theme loaded...', 
      'color: #00ff41; font-weight: bold; font-family: monospace; font-size: 14px;',
      'color: #00ff41; font-family: monospace;'
    );
  }
  
  // Run on load and on route changes (for SPAs)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Re-run on any dynamic content changes
  const observer = new MutationObserver(() => {
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand && !navbarBrand.querySelector('svg')) {
      init();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
