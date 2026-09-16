<!-- ============================================ -->
<!-- SIDEBAR - FMIPA Universitas Pakuan (Tema Ungu #722F99) -->
<!-- ============================================ -->
<aside id="sidebar" class="sidebar fixed md:relative z-50 w-64 h-full flex flex-col min-h-0 shadow-2xl flex-shrink-0 transition-all duration-300 -translate-x-full md:translate-x-0">
  
  <!-- Logo Section - FMIPA Universitas Pakuan (Tinggi h-16 sejajar persis dengan Topbar) -->
  <div class="h-16 px-4 sm:px-5 border-b border-white/10 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Logo Image Container -->
      <div class="relative flex-shrink-0">
        <div id="logoContainer" class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden border border-white/20">
          <img id="logoImage" src="{{ asset('images/logo/logo_unpak.png') }}" alt="UNPAK Logo" class="w-full h-full p-1 object-contain" onerror="this.classList.add('hidden'); document.getElementById('logoFallback').classList.remove('hidden');" />
          <span id="logoFallback" class="text-base font-extrabold text-white hidden">U</span>
        </div>
        <div class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#722F99] animate-pulse"></div>
      </div>
      <!-- Brand Text -->
      <div class="min-w-0">
        <span class="text-[10px] font-bold text-purple-200 uppercase tracking-wider block leading-none mb-0.5">FMIPA</span>
        <span class="text-[12px] font-extrabold text-white tracking-tight block leading-none">UNIVERSITAS</span>
        <span class="text-[12px] font-extrabold text-purple-200 tracking-tight block leading-none mt-0.5">PAKUAN</span>
      </div>
    </div>
    <!-- Close Button (Mobile Only) -->
    <button id="sidebarToggleMobile" class="md:hidden w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition" aria-label="Tutup menu">
      <i class="fas fa-times text-base"></i>
    </button>
  </div>

  <!-- Navigation Menu -->
  <nav id="sidebarNav" class="px-3 py-4 flex-1 min-h-0 overflow-y-auto">
    
    <!-- Dashboard -->
    <a href="{{ route('dashboard') }}" class="sidebar-link {{ request()->routeIs('dashboard') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
      <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
        <i class="fas fa-th-large text-sm"></i>
      </div>
      <span class="font-medium text-sm transition">Dashboard</span>
    </a>

    <!-- Pusat Upload & Kelola Data (Executive Center) -->
    <a href="{{ url('/kelola-data') }}" class="sidebar-link {{ request()->is('kelola-data*') || request()->is('upload-data*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200" title="Pusat Upload Berkas Excel & Input Data">
      <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
        <i class="fa-solid fa-cloud-arrow-up text-sm"></i>
      </div>
      <div class="flex items-center justify-between flex-1">
        <span class="font-medium text-sm transition">Pusat Upload Data</span>
        <span class="px-1.5 py-0.5 rounded-md bg-white/20 text-white border border-white/30 text-[9.5px] font-bold tracking-wide uppercase">New</span>
      </div>
    </a>

    <!-- Wakil Dekan Dropdown -->
    <button type="button" class="sidebar-dropdown-toggle w-full flex items-center gap-2 mt-4 mb-2 px-3 py-2 text-left group" aria-expanded="true" aria-controls="wakilDekanMenu">
      <span class="text-[10px] font-semibold text-purple-300/60 uppercase tracking-wider whitespace-nowrap">WAKIL DEKAN FMIPA</span>
      <span class="h-[1px] flex-1 bg-white/20 group-hover:bg-white/30 transition-colors"></span>
      <i class="fas fa-chevron-down text-[10px] text-purple-300/60 transition-transform"></i>
    </button>

    <div id="wakilDekanMenu" class="sidebar-dropdown-menu" data-open="true">
      <!-- Akademik (Wadek 1) -->
      <a href="{{ url('/wadek-1') }}" class="sidebar-link {{ request()->is('wadek-1*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-graduation-cap text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Wakil Dekan : Bidang Akademik</span>
      </a>

      <!-- Keuangan & SDM (Wadek 2) -->
      <a href="{{ url('/wadek-2') }}" class="sidebar-link {{ request()->is('wadek-2*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-wallet text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Wakil Dekan : Bidang Keuangan & SDM</span>
      </a>

      <!-- Kemahasiswaan (Wadek 3) -->
      <a href="{{ url('/wadek-3') }}" class="sidebar-link {{ request()->is('wadek-3*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-users text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Wakil Dekan : Bidang Kemahasiswaan</span>
      </a>
    </div>

    <!-- Data Operasional Dropdown -->
    <button type="button" class="sidebar-dropdown-toggle w-full flex items-center gap-2 mt-4 mb-2 px-3 py-2 text-left group" aria-expanded="true" aria-controls="dataOperasionalMenu">
      <span class="text-[10px] font-semibold text-purple-300/60 uppercase tracking-wider whitespace-nowrap">DATA OPERASIONAL</span>
      <span class="h-[1px] flex-1 bg-white/20 group-hover:bg-white/30 transition-colors"></span>
      <i class="fas fa-chevron-down text-[10px] text-purple-300/60 transition-transform"></i>
    </button>

    <div id="dataOperasionalMenu" class="sidebar-dropdown-menu" data-open="true">
      <!-- Dosen -->
      <a href="{{ url('/dosen') }}" class="sidebar-link {{ request()->is('dosen*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-id-card text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Dosen</span>
      </a>

      <!-- Mahasiswa -->
      <a href="{{ url('/mahasiswa') }}" class="sidebar-link {{ request()->is('mahasiswa*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-user-friends text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Mahasiswa</span>
      </a>

      <!-- Kurikulum -->
      <a href="{{ url('/kurikulum') }}" class="sidebar-link {{ request()->is('kurikulum*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-book-open text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Kurikulum</span>
      </a>

      <!-- Penelitian -->
      <a href="{{ url('/penelitian') }}" class="sidebar-link {{ request()->is('penelitian*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-flask text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Penelitian</span>
      </a>

      <!-- Web & Medsos -->
      <a href="{{ url('/web-medsos') }}" class="sidebar-link {{ request()->is('web-medsos*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-globe text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Web &amp; Medsos</span>
      </a>

      <!-- Instagram Analytics -->
      <a href="{{ url('/instagram-analytics') }}" class="sidebar-link {{ request()->is('instagram-analytics*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fab fa-instagram text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Instagram Analytics</span>
      </a>

      <!-- Kerjasama -->
      <a href="{{ url('/kerjasama') }}" class="sidebar-link {{ request()->is('kerjasama*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-handshake text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Kerjasama</span>
      </a>

      <!-- Partisipasi -->
      <a href="{{ url('/partisipasi') }}" class="sidebar-link {{ request()->is('partisipasi*') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-chart-bar text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Partisipasi</span>
      </a>
    </div>

    <!-- Unit Bisnis Dropdown -->
    <button type="button" class="sidebar-dropdown-toggle w-full flex items-center gap-2 mt-4 mb-2 px-3 py-2 text-left group" aria-expanded="true" aria-controls="unitBisnisMenu">
      <span class="text-[10px] font-semibold text-purple-300/60 uppercase tracking-wider whitespace-nowrap">UNIT BISNIS</span>
      <span class="h-[1px] flex-1 bg-white/20 group-hover:bg-white/30 transition-colors"></span>
      <i class="fas fa-chevron-down text-[10px] text-purple-300/60 transition-transform"></i>
    </button>

    <div id="unitBisnisMenu" class="sidebar-dropdown-menu" data-open="true">
      <!-- Overview Unit Bisnis -->
      <a href="{{ url('/unit-bisnis') }}" class="sidebar-link {{ request()->is('unit-bisnis') ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-building text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Overview Unit Bisnis</span>
      </a>

      <!-- ComSTraC & DSC -->
      <a href="{{ url('/comstrac-dsc') }}" class="sidebar-link {{ (request()->is('comstrac-dsc*') || request()->is('unit-bisnis/comstrac*')) ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-laptop-code text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">ComSTraC & DSC</span>
      </a>

      <!-- Kesehatan & Apotek -->
      <a href="{{ url('/kesehatan-apotek') }}" class="sidebar-link {{ (request()->is('kesehatan-apotek*') || request()->is('unit-bisnis/kesehatan-apotek*')) ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-clinic-medical text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Kesehatan & Apotek</span>
      </a>

      <!-- Lab GIS Terpadu -->
      <a href="{{ url('/lab-gis') }}" class="sidebar-link {{ (request()->is('lab-gis*') || request()->is('unit-bisnis/lab-gis*')) ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-map-marked-alt text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Lab GIS Terpadu</span>
      </a>

      <!-- Lab Service -->
      <a href="{{ url('/lab-service') }}" class="sidebar-link {{ (request()->is('lab-service*') || request()->is('unit-bisnis/lab-service*')) ? 'active' : '' }} group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200">
        <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition shadow-sm">
          <i class="fas fa-microscope text-sm"></i>
        </div>
        <span class="font-medium text-sm transition">Lab Service</span>
      </a>
    </div>

    <!-- Fast State & Scroll Restoration Script to eliminate layout flash -->
    <script>
      (function() {
        try {
          var nav = document.getElementById('sidebarNav');
          var savedScroll = sessionStorage.getItem('sidebar_nav_scroll');
          if (nav && savedScroll !== null) {
            nav.scrollTop = parseInt(savedScroll, 10);
          }
          var state = JSON.parse(localStorage.getItem('sidebar_groups_state') || '{}');
          ['wakilDekanMenu', 'dataOperasionalMenu', 'unitBisnisMenu'].forEach(function(id) {
            var menu = document.getElementById(id);
            var btn = document.querySelector('[aria-controls="' + id + '"]');
            if (menu && btn) {
              var hasActive = menu.querySelector('.sidebar-link.active') !== null;
              if (!hasActive && state[id] === false) {
                menu.setAttribute('data-open', 'false');
                menu.style.display = 'none';
                btn.setAttribute('aria-expanded', 'false');
                var ch = btn.querySelector('.fa-chevron-down');
                if (ch) ch.style.transform = 'rotate(-90deg)';
              } else if (hasActive) {
                menu.setAttribute('data-open', 'true');
                menu.style.display = 'block';
                btn.setAttribute('aria-expanded', 'true');
                var ch = btn.querySelector('.fa-chevron-down');
                if (ch) ch.style.transform = 'rotate(0deg)';
              }
            }
          });
        } catch (e) {}
      })();
    </script>
  </nav>

  <!-- Footer Sidebar: Icon-Only Settings & Logout (Horizontal) -->
  <div class="p-3 border-t border-white/10 bg-white/5 backdrop-blur-sm shrink-0 flex items-center justify-between gap-2">
    <!-- Settings Icon Button -->
    <a href="{{ url('/settings') }}" class="flex-1 flex items-center justify-center h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all duration-200 border border-white/10 shadow-xs group" title="Pengaturan (Settings)" aria-label="Settings">
      <i class="fas fa-cog text-base text-purple-200 group-hover:text-white transition-transform duration-300 group-hover:rotate-45"></i>
    </a>

    <!-- Logout Icon Button -->
    <a href="#" onclick="event.preventDefault(); if(confirm('Apakah Anda yakin ingin keluar dari Dashboard Dekan?')) { window.location.reload(); }" class="flex-1 flex items-center justify-center h-10 rounded-xl bg-white/15 hover:bg-red-500/30 text-white hover:text-red-200 transition-all duration-200 border border-white/10 hover:border-red-400/30 shadow-xs group" title="Keluar (Logout)" aria-label="Logout">
      <i class="fas fa-arrow-right-from-bracket text-base text-purple-200 group-hover:text-red-300 transition-transform duration-200 group-hover:translate-x-0.5"></i>
    </a>
  </div>
</aside>

