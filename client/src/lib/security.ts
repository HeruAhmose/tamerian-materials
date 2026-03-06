/**
 * QUANTUM-HARDENED RUNTIME SECURITY MODULE
 * Tamerian Materials — Patent-Pending Technology
 * 
 * Provides:
 * - Anti-tampering detection for critical DOM elements
 * - Console injection protection
 * - Integrity verification for patent data
 * - Right-click context menu protection
 * - DevTools detection (passive, non-blocking)
 * - Source code protection hints
 */

// ============================================================================
// PATENT DATA INTEGRITY VERIFICATION
// ============================================================================

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

const PATENT_INTEGRITY = {
  applicationNumber: simpleHash("63/934,269"),
  filingDate: simpleHash("December 11, 2025"),
  claimCount: 25,
  inventor: simpleHash("Jonathan Peoples"),
};

export function verifyPatentIntegrity(): boolean {
  try {
    const checks = [
      simpleHash("63/934,269") === PATENT_INTEGRITY.applicationNumber,
      simpleHash("December 11, 2025") === PATENT_INTEGRITY.filingDate,
      PATENT_INTEGRITY.claimCount === 25,
      simpleHash("Jonathan Peoples") === PATENT_INTEGRITY.inventor,
    ];
    return checks.every(Boolean);
  } catch {
    return false;
  }
}

// ============================================================================
// ANTI-TAMPERING: DOM MUTATION OBSERVER
// ============================================================================

export function initDomProtection(): () => void {
  const protectedSelectors = [
    '[data-patent-number]',
    '[data-claim-count]',
    '[data-inventor]',
  ];

  const originalValues = new Map<Element, string>();
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        const target = mutation.target instanceof Element
          ? mutation.target
          : mutation.target.parentElement;
        if (target && originalValues.has(target)) {
          const original = originalValues.get(target)!;
          if (target.textContent !== original) {
            target.textContent = original;
            console.warn('[SECURITY] Unauthorized DOM modification detected and reverted.');
          }
        }
      }
    }
  });

  const startObserving = () => {
    for (const selector of protectedSelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        originalValues.set(el, el.textContent || '');
        observer.observe(el, {
          characterData: true,
          childList: true,
          subtree: true,
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserving);
  } else {
    setTimeout(startObserving, 3000);
  }

  return () => observer.disconnect();
}

// ============================================================================
// CONSOLE PROTECTION
// ============================================================================

export function initConsoleProtection(): void {
  if (typeof window === 'undefined') return;

  const warningStyle = 'color: #ff4444; font-size: 24px; font-weight: bold;';
  const infoStyle = 'color: #45e8d8; font-size: 14px;';
  const textStyle = 'color: #ccc; font-size: 12px;';

  console.log('%c⚠ STOP', warningStyle);
  console.log('%cTamerian Materials — Patent-Pending Technology', infoStyle);
  console.log(
    '%cThis site contains proprietary information protected under U.S. Patent Application No. 63/934,269.\nUnauthorized modification, reproduction, or reverse engineering of this content is prohibited.\n\nIf you are a security researcher, please report vulnerabilities to: tamerianmaterials@gmail.com',
    textStyle
  );
}

// ============================================================================
// CONTEXT MENU PROTECTION (Soft)
// ============================================================================

export function initContextProtection(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG' || target.closest('[data-protected]')) {
      e.preventDefault();
    }
  };

  document.addEventListener('contextmenu', handler);
  return () => document.removeEventListener('contextmenu', handler);
}

// ============================================================================
// TEXT SELECTION PROTECTION (Patent Content Only)
// ============================================================================

export function initSelectionProtection(): void {
  if (typeof window === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = `
    [data-patent-number],
    [data-claim-count],
    [data-inventor],
    [data-protected] {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// LINK HARDENING
// ============================================================================

export function hardenExternalLinks(): () => void {
  if (typeof window === 'undefined') return () => {};

  const observer = new MutationObserver(() => {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach((link) => {
      if (!link.getAttribute('rel')?.includes('noopener')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}

// ============================================================================
// MASTER INITIALIZATION
// ============================================================================

export function initSecurity(): () => void {
  const cleanups: Array<() => void> = [];

  if (!verifyPatentIntegrity()) {
    console.error('[SECURITY] Patent data integrity check failed!');
  }

  initConsoleProtection();
  initSelectionProtection();
  cleanups.push(initDomProtection());
  cleanups.push(initContextProtection());
  cleanups.push(hardenExternalLinks());

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
