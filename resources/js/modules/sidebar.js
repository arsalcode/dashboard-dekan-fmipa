/**
 * Sidebar Navigation Interactivity
 * FMIPA Universitas Pakuan
 */

export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const toggleMobileBtn = document.getElementById('sidebarToggleMobile');

  // Overlay element creation or reuse
  let overlay = document.getElementById('sidebarOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebarOverlay';
    document.body.appendChild(overlay);
  }

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.remove('-translate-x-full');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openSidebar);
  }

  if (toggleMobileBtn) {
    toggleMobileBtn.addEventListener('click', closeSidebar);
  }

  overlay.addEventListener('click', closeSidebar);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // Close on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeSidebar();
    }
  });

  // Sidebar navigation element & scroll persistence
  const sidebarNav = document.getElementById('sidebarNav') || sidebar?.querySelector('nav');
  if (sidebarNav) {
    // 1. Restore scroll position smoothly
    const savedScroll = sessionStorage.getItem('sidebar_nav_scroll');
    if (savedScroll !== null) {
      sidebarNav.scrollTop = parseInt(savedScroll, 10);
    } else {
      const activeLink = sidebarNav.querySelector('.sidebar-link.active');
      if (activeLink) {
        activeLink.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    }

    // 2. Track scroll position continuously
    sidebarNav.addEventListener('scroll', () => {
      sessionStorage.setItem('sidebar_nav_scroll', sidebarNav.scrollTop.toString());
    }, { passive: true });

    // 3. Save scroll position on link clicks & before unload
    sidebarNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sessionStorage.setItem('sidebar_nav_scroll', sidebarNav.scrollTop.toString());
      });
    });

    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('sidebar_nav_scroll', sidebarNav.scrollTop.toString());
    });
  }

  // Persistent Dropdown Groups in LocalStorage
  const getStoredStates = () => {
    try {
      return JSON.parse(localStorage.getItem('sidebar_groups_state') || '{}');
    } catch {
      return {};
    }
  };

  const saveStoredState = (id, isOpen) => {
    try {
      const states = getStoredStates();
      states[id] = isOpen;
      localStorage.setItem('sidebar_groups_state', JSON.stringify(states));
    } catch (e) {
      console.error(e);
    }
  };

  const storedStates = getStoredStates();
  const dropdownToggles = document.querySelectorAll('.sidebar-dropdown-toggle');

  dropdownToggles.forEach((btn) => {
    const menuId = btn.getAttribute('aria-controls');
    const menu = document.getElementById(menuId);
    const chevron = btn.querySelector('.fa-chevron-down');
    if (!menu) return;

    // Check if this menu hosts the current active page
    const hasActiveChild = menu.querySelector('.sidebar-link.active') !== null;

    // Apply state: Active group MUST be open; other groups obey stored preference
    if (hasActiveChild) {
      menu.setAttribute('data-open', 'true');
      menu.style.display = 'block';
      btn.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else if (storedStates[menuId] === false) {
      menu.setAttribute('data-open', 'false');
      menu.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = 'rotate(-90deg)';
    } else {
      menu.setAttribute('data-open', 'true');
      menu.style.display = 'block';
      btn.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }

    // Toggle event listener
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyOpen = menu.getAttribute('data-open') === 'true';
      const willBeOpen = !isCurrentlyOpen;

      menu.setAttribute('data-open', willBeOpen ? 'true' : 'false');
      menu.style.display = willBeOpen ? 'block' : 'none';
      btn.setAttribute('aria-expanded', willBeOpen ? 'true' : 'false');
      if (chevron) {
        chevron.style.transform = willBeOpen ? 'rotate(0deg)' : 'rotate(-90deg)';
      }

      saveStoredState(menuId, willBeOpen);

      // Keep scroll position intact so nothing jumps
      if (sidebarNav) {
        sessionStorage.setItem('sidebar_nav_scroll', sidebarNav.scrollTop.toString());
      }
    });
  });
}
