import './bootstrap';
import { initSidebar } from './modules/sidebar';
import { initDataManager } from './modules/data-manager';
import { initDashboardCharts, initFilterTabs } from './charts/dashboard-charts';
import { initWadek1 } from './charts/wadek1-charts';
import { initWadek2 } from './charts/wadek2-charts';
import { initWadek3 } from './charts/wadek3-charts';
import { initDosenModule } from './charts/dosen-charts';
import { initMahasiswaModule } from './charts/mahasiswa-charts';
import { initKurikulumModule } from './charts/kurikulum';
import { initPenelitianModule } from './charts/penelitian';
import { initWebMedsosModule } from './charts/web-medsos';
import { initInstagramAnalyticsModule } from './charts/instagram-analytics';
import { initKerjasamaModule } from './charts/kerjasama';
import { initPartisipasiModule } from './charts/partisipasi';
import { initUnitBisnisModule } from './charts/unit-bisnis';
import { initComstracDscModule } from './charts/comstrac-dsc';
import { initKesehatanApotekModule } from './charts/kesehatan-apotek';
import { initLabGisModule } from './charts/lab-gis';
import { initLabServiceModule } from './charts/lab-service';

function initTablePageSizeDropdowns() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.table-pagesize-btn');
    if (btn) {
      e.stopPropagation();
      const wrap = btn.closest('.table-pagesize-dropdown');
      const wasOpen = wrap.classList.contains('open');
      document.querySelectorAll('.table-pagesize-dropdown.open').forEach(w => w.classList.remove('open'));
      if (!wasOpen) {
        wrap.classList.add('open');
      }
      return;
    }

    const item = e.target.closest('.table-pagesize-item');
    if (item) {
      e.stopPropagation();
      const wrap = item.closest('.table-pagesize-dropdown');
      const val = item.getAttribute('data-value');
      const label = wrap.querySelector('.table-pagesize-label');
      const input = wrap.querySelector('input[type="hidden"]');

      if (label) label.textContent = val;
      wrap.querySelectorAll('.table-pagesize-item').forEach(it => it.classList.remove('is-active'));
      item.classList.add('is-active');
      wrap.classList.remove('open');

      if (input) {
        input.value = val;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return;
    }

    document.querySelectorAll('.table-pagesize-dropdown.open').forEach(w => w.classList.remove('open'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTablePageSizeDropdowns();
  initDataManager();

  if (document.getElementById('wadek1Sections') || window.location.pathname.includes('wadek-1')) {
    initWadek1();
  } else if (document.getElementById('wadek2Sections') || window.location.pathname.includes('wadek-2')) {
    initWadek2();
  } else if (document.getElementById('wadek3Sections') || window.location.pathname.includes('wadek-3')) {
    initWadek3();
  } else if (document.getElementById('dosenSections') || window.location.pathname.includes('dosen')) {
    initDosenModule();
  } else if (document.getElementById('mahasiswaSections') || window.location.pathname.includes('mahasiswa')) {
    initMahasiswaModule();
  } else if (document.getElementById('kurikulumSections') || window.location.pathname.includes('kurikulum')) {
    initKurikulumModule();
  } else if (document.getElementById('penelitianSections') || window.location.pathname.includes('penelitian')) {
    initPenelitianModule();
  } else if (document.getElementById('webMedsosSections') || window.location.pathname.includes('web-medsos')) {
    initWebMedsosModule();
  } else if (document.getElementById('instagramAnalyticsSections') || window.location.pathname.includes('instagram-analytics')) {
    initInstagramAnalyticsModule();
  } else if (document.getElementById('kerjasamaSections') || window.location.pathname.includes('kerjasama')) {
    initKerjasamaModule();
  } else if (document.getElementById('partisipasiSections') || window.location.pathname.includes('partisipasi')) {
    initPartisipasiModule();
  } else if (document.getElementById('comstracSections') || window.location.pathname.includes('comstrac')) {
    initComstracDscModule();
  } else if (document.getElementById('apotekSections') || window.location.pathname.includes('kesehatan-apotek')) {
    initKesehatanApotekModule();
  } else if (document.getElementById('gisSections') || window.location.pathname.includes('lab-gis')) {
    initLabGisModule();
  } else if (document.getElementById('labserviceSections') || window.location.pathname.includes('lab-service')) {
    initLabServiceModule();
  } else if (document.getElementById('unitBisnisSections') || window.location.pathname.includes('unit-bisnis')) {
    initUnitBisnisModule();
  } else {
    initFilterTabs();
    initDashboardCharts('semua');
  }
});
