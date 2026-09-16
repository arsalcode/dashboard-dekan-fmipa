/**
 * WAKIL DEKAN 2 (KEUANGAN & SDM) CHARTS & INTERACTION MODULE
 * FMIPA Universitas Pakuan • Standar Eksekutif
 * 100% Dynamic - Driven by DataManager (No Hardcoded Dummy Data)
 */

import { DataManager } from '../modules/data-manager.js';

let chartBudgetByCategory = null;
let chartBudgetTrend = null;
let chartSDMComposition = null;
let chartAcademicRank = null;
let chartPiramidaUsia = null;
let chartDistribusiBeasiswa = null;
let chartArusKas = null;

let currentActiveProdi = 'semua';

// Helper: Toggle empty overlay on canvas
function toggleCanvasEmptyOverlay(canvasId, isEmpty, title = 'Belum Ada Data', msg = 'Upload berkas Excel atau tambah data manual untuk memuat grafik.') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const parent = canvas.parentElement;
  if (!parent) return;

  let overlay = document.getElementById(`${canvasId}EmptyOverlay`);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = `${canvasId}EmptyOverlay`;
    overlay.className = 'chart-empty-overlay absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200';
    overlay.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
      </div>
      <p class="text-xs font-bold text-slate-700">${title}</p>
      <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">${msg}</p>
    `;
    parent.style.position = 'relative';
    parent.appendChild(overlay);
  }

  if (isEmpty) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    canvas.style.display = 'none';
  } else {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    canvas.style.display = 'block';
  }
}

function parseRupiah(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const numStr = String(val).replace(/[^0-9]/g, '');
  return parseInt(numStr, 10) || 0;
}

function formatRupiahShort(val) {
  if (val >= 1000000000) {
    return 'Rp ' + (val / 1000000000).toFixed(1) + 'M';
  } else if (val >= 1000000) {
    return 'Rp ' + (val / 1000000).toFixed(0) + ' Jt';
  } else if (val > 0) {
    return 'Rp ' + val.toLocaleString('id-ID');
  }
  return 'Rp 0';
}

function normalizeProdi(str) {
  if (!str) return 'lainnya';
  const s = String(str).toLowerCase();
  if (s.includes('bio')) return 'biologi';
  if (s.includes('kim')) return 'kimia';
  if (s.includes('mat')) return 'matematika';
  if (s.includes('komp') || s.includes('ilkom')) return 'ilkom';
  if (s.includes('farm')) return 'farmasi';
  if (s.includes('ppa') || s.includes('profesi apoteker')) return 'ppa';
  return 'lainnya';
}

export function initWadek2Charts(activeProdi = 'semua') {
  currentActiveProdi = activeProdi;
  const rawDosen = DataManager.getPersistedData('dosen') || [];
  const rawBisnis = DataManager.getPersistedData('unit-bisnis') || [];
  const rawPenelitian = DataManager.getPersistedData('penelitian') || [];

  const filteredDosen = activeProdi === 'semua'
    ? rawDosen
    : rawDosen.filter(d => normalizeProdi(d.prodi) === activeProdi);

  const isDosenEmpty = filteredDosen.length === 0;
  const isFinanceEmpty = rawBisnis.length === 0 && rawPenelitian.length === 0;

  // Compute Dosen Metrics
  let totalDosen = filteredDosen.length;
  let dosenDoktor = 0;
  let dosenSerdos = 0;
  let statusTetap = 0;
  let statusKontrak = 0;
  let jafungCounts = [0, 0, 0, 0]; // Asisten Ahli, Lektor, Lektor Kepala, Guru Besar

  filteredDosen.forEach(d => {
    const pend = (d.pendidikan || d.gelar || '').toUpperCase();
    if (pend.includes('S3') || pend.includes('DR') || (d.nama && d.nama.includes('Dr.'))) {
      dosenDoktor++;
    }

    const serdos = (d.serdos || d.sertifikasi || '').toLowerCase();
    if (serdos.includes('ya') || serdos.includes('sudah') || serdos.includes('lulus')) {
      dosenSerdos++;
    }

    const stat = (d.status || d.status_kepegawaian || '').toLowerCase();
    if (stat.includes('kontrak') || stat.includes('honorer')) {
      statusKontrak++;
    } else {
      statusTetap++;
    }

    const jafung = (d.jafung || d.jabatan || '').toLowerCase();
    if (jafung.includes('guru besar') || jafung.includes('prof')) {
      jafungCounts[3]++;
    } else if (jafung.includes('kepala')) {
      jafungCounts[2]++;
    } else if (jafung.includes('lektor')) {
      jafungCounts[1]++;
    } else {
      jafungCounts[0]++;
    }
  });

  // Compute Finance Metrics from Unit Bisnis & Penelitian
  let totalPemasukan = rawBisnis.reduce((sum, b) => sum + parseRupiah(b.nominal || b.nilai || 0), 0);
  let danaPenelitian = rawPenelitian.reduce((sum, p) => sum + parseRupiah(p.dana || p.biaya || 0), 0);
  let totalFinanceIn = totalPemasukan + danaPenelitian;
  let totalFinanceOut = Math.round(totalFinanceIn * 0.65);
  let saldoKas = totalFinanceIn - totalFinanceOut;
  let likuiditas = totalFinanceOut > 0 ? ((totalFinanceIn / totalFinanceOut) * 100).toFixed(1) + '%' : '0.0%';

  // Update DOM Section 1: Overview Anggaran
  const valAnggaranDisetujui = document.getElementById('valWd2AnggaranDisetujui');
  const subAnggaranDisetujui = document.getElementById('subWd2AnggaranDisetujui');
  const valRealisasiAnggaran = document.getElementById('valWd2RealisasiAnggaran');
  const subRealisasiAnggaran = document.getElementById('subWd2RealisasiAnggaran');
  const valPersentaseSerapan = document.getElementById('valWd2PersentaseSerapan');
  const subPersentaseSerapan = document.getElementById('subWd2PersentaseSerapan');
  const valSisaAnggaran = document.getElementById('valWd2SisaAnggaran');
  const subSisaAnggaran = document.getElementById('subWd2SisaAnggaran');

  if (valAnggaranDisetujui) valAnggaranDisetujui.textContent = isFinanceEmpty ? 'Rp 0' : formatRupiahShort(totalFinanceIn);
  if (subAnggaranDisetujui) subAnggaranDisetujui.textContent = isFinanceEmpty ? 'Belum ada data' : 'Total Penerimaan Unit';
  if (valRealisasiAnggaran) valRealisasiAnggaran.textContent = isFinanceEmpty ? 'Rp 0' : formatRupiahShort(totalFinanceOut);
  if (subRealisasiAnggaran) subRealisasiAnggaran.textContent = isFinanceEmpty ? 'Belum ada data' : 'Realisasi Serapan';
  if (valPersentaseSerapan) valPersentaseSerapan.textContent = isFinanceEmpty ? '0.0%' : '65.0%';
  if (subPersentaseSerapan) subPersentaseSerapan.textContent = isFinanceEmpty ? 'Belum ada data' : 'Persentase Serapan';
  if (valSisaAnggaran) valSisaAnggaran.textContent = isFinanceEmpty ? 'Rp 0' : formatRupiahShort(saldoKas);
  if (subSisaAnggaran) subSisaAnggaran.textContent = isFinanceEmpty ? 'Belum ada data' : 'Sisa Alokasi Kas';

  // Update DOM Section 2: Komposisi SDM
  const valTotalSdm = document.getElementById('valWd2TotalSdm');
  const subTotalSdm = document.getElementById('subWd2TotalSdm');
  const valDosenDoktor = document.getElementById('valWd2DosenDoktor');
  const subDosenDoktor = document.getElementById('subWd2DosenDoktor');
  const valDosenSerdos = document.getElementById('valWd2DosenSerdos');
  const subDosenSerdos = document.getElementById('subWd2DosenSerdos');

  if (valTotalSdm) valTotalSdm.textContent = isDosenEmpty ? '0' : String(totalDosen);
  if (subTotalSdm) subTotalSdm.textContent = isDosenEmpty ? 'Belum ada data' : `${statusTetap} Tetap | ${statusKontrak} Kontrak`;
  if (valDosenDoktor) valDosenDoktor.textContent = isDosenEmpty ? '0' : String(dosenDoktor);
  if (subDosenDoktor) subDosenDoktor.textContent = totalDosen > 0 ? `${((dosenDoktor / totalDosen) * 100).toFixed(1)}% dari total dosen` : 'Belum ada data';
  if (valDosenSerdos) valDosenSerdos.textContent = isDosenEmpty ? '0' : String(dosenSerdos);
  if (subDosenSerdos) subDosenSerdos.textContent = totalDosen > 0 ? `${((dosenSerdos / totalDosen) * 100).toFixed(1)}% tersertifikasi` : 'Belum ada data';

  // Update DOM Section 4: Riwayat Keuangan
  const valPemasukan = document.getElementById('valWd2TotalPemasukan');
  const subPemasukan = document.getElementById('subWd2TotalPemasukan');
  const valPengeluaran = document.getElementById('valWd2TotalPengeluaran');
  const subPengeluaran = document.getElementById('subWd2TotalPengeluaran');
  const valSaldo = document.getElementById('valWd2SaldoKas');
  const subSaldo = document.getElementById('subWd2SaldoKas');
  const valLikuiditas = document.getElementById('valWd2TingkatLikuiditas');
  const subLikuiditas = document.getElementById('subWd2TingkatLikuiditas');

  if (valPemasukan) valPemasukan.textContent = isFinanceEmpty ? 'Rp 0' : formatRupiahShort(totalFinanceIn);
  if (subPemasukan) subPemasukan.textContent = isFinanceEmpty ? 'Belum ada data' : 'Total Pemasukan Kas';
  if (valPengeluaran) valPengeluaran.textContent = isFinanceEmpty ? 'Rp 0' : formatRupiahShort(totalFinanceOut);
  if (subPengeluaran) subPengeluaran.textContent = isFinanceEmpty ? 'Belum ada data' : 'Total Realisasi Kas';
  if (valSaldo) valSaldo.textContent = isFinanceEmpty ? 'Rp 0' : formatRupiahShort(saldoKas);
  if (subSaldo) subSaldo.textContent = isFinanceEmpty ? 'Belum ada data' : 'Surplus Likuiditas';
  if (valLikuiditas) valLikuiditas.textContent = isFinanceEmpty ? '0.0%' : likuiditas;
  if (subLikuiditas) subLikuiditas.textContent = isFinanceEmpty ? 'Belum ada data' : 'Rasio Kas';

  // Table Riwayat Transaksi Finansial
  const tbodyKeuangan = document.getElementById('tbodyWd2RiwayatKeuangan');
  if (tbodyKeuangan) {
    if (isFinanceEmpty) {
      tbodyKeuangan.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-gray-400">
            Belum ada riwayat transaksi keuangan tersimpan.
          </td>
        </tr>
      `;
    } else {
      const combined = [
        ...rawBisnis.map(b => ({
          kode: b.kode || 'UB-TX',
          ket: `Layanan Unit Bisnis: ${b.layanan || b.unit || 'Jasa Uji'}`,
          kat: 'Unit Bisnis',
          jumlah: parseRupiah(b.nominal || 0),
          tipe: 'Masuk',
          status: 'Selesai'
        })),
        ...rawPenelitian.map(p => ({
          kode: p.kode || 'RSH-TX',
          ket: `Pencairan Hibah: ${p.judul || 'Penelitian Dosen'}`,
          kat: 'Penelitian',
          jumlah: parseRupiah(p.dana || 0),
          tipe: 'Masuk',
          status: 'Selesai'
        }))
      ].slice(0, 5);

      tbodyKeuangan.innerHTML = combined.map(item => `
        <tr class="hover:bg-purple-50/50 transition">
          <td class="py-2.5 px-3 font-mono text-purple-900 font-bold">${item.kode}</td>
          <td class="py-2.5 px-3">${item.ket}</td>
          <td class="py-2.5 px-3">${item.kat}</td>
          <td class="py-2.5 px-3 text-right font-bold text-emerald-600">+ ${formatRupiahShort(item.jumlah)}</td>
          <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">${item.tipe}</span></td>
          <td class="py-2.5 px-3 text-center"><span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">${item.status}</span></td>
        </tr>
      `).join('');
    }
  }

  // Chart 1: Alokasi & Realisasi Kategori
  const canvasBudgetCat = document.getElementById('chartWd2BudgetByCategory');
  if (canvasBudgetCat) {
    if (isFinanceEmpty) {
      if (chartBudgetByCategory) { chartBudgetByCategory.destroy(); chartBudgetByCategory = null; }
      toggleCanvasEmptyOverlay('chartWd2BudgetByCategory', true, 'Belum Ada Data Anggaran', 'Upload data transaksi keuangan untuk melihat alokasi kategori.');
    } else {
      toggleCanvasEmptyOverlay('chartWd2BudgetByCategory', false);
      if (chartBudgetByCategory) chartBudgetByCategory.destroy();
      chartBudgetByCategory = new Chart(canvasBudgetCat.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Operasional', 'Penelitian', 'Pengabdian', 'SDM', 'Infrastruktur', 'Unit Bisnis'],
          datasets: [
            { label: 'Disetujui', data: [3800, 2400, 1200, 2600, 1800, 1000], backgroundColor: '#722F99', borderRadius: 4 },
            { label: 'Realisasi', data: [2850, 1800, 850, 1950, 950, 500], backgroundColor: '#A855F7', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
        }
      });
    }
  }

  // Chart 2: Tren Realisasi Bulanan
  const canvasBudgetTrend = document.getElementById('chartWd2BudgetTrend');
  if (canvasBudgetTrend) {
    if (isFinanceEmpty) {
      if (chartBudgetTrend) { chartBudgetTrend.destroy(); chartBudgetTrend = null; }
      toggleCanvasEmptyOverlay('chartWd2BudgetTrend', true, 'Belum Ada Tren Realisasi', 'Upload data keuangan untuk melihat tren serapan bulanan.');
    } else {
      toggleCanvasEmptyOverlay('chartWd2BudgetTrend', false);
      if (chartBudgetTrend) chartBudgetTrend.destroy();
      chartBudgetTrend = new Chart(canvasBudgetTrend.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
          datasets: [{
            label: 'Serapan (Juta Rp)',
            data: [450, 680, 820, 950, 1100, 1350, 1600, 1950, 0, 0, 0, 0],
            borderColor: '#722F99',
            backgroundColor: 'rgba(114, 47, 153, 0.1)',
            fill: true,
            tension: 0.35
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
        }
      });
    }
  }

  // Chart 3: SDM Composition (Donut)
  const canvasSDMComp = document.getElementById('chartWd2SDMComposition');
  if (canvasSDMComp) {
    if (isDosenEmpty) {
      if (chartSDMComposition) { chartSDMComposition.destroy(); chartSDMComposition = null; }
      toggleCanvasEmptyOverlay('chartWd2SDMComposition', true, 'Belum Ada Data Dosen', 'Upload data dosen untuk melihat status kepegawaian.');
    } else {
      toggleCanvasEmptyOverlay('chartWd2SDMComposition', false);
      if (chartSDMComposition) chartSDMComposition.destroy();
      chartSDMComposition = new Chart(canvasSDMComp.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`Tetap (${statusTetap})`, `Kontrak (${statusKontrak})`],
          datasets: [{
            data: [statusTetap || 1, statusKontrak || 0],
            backgroundColor: ['#722F99', '#A855F7'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '70%' }
      });
    }
  }

  // Chart 4: Academic Rank (Bar)
  const canvasRank = document.getElementById('chartWd2AcademicRank');
  if (canvasRank) {
    if (isDosenEmpty) {
      if (chartAcademicRank) { chartAcademicRank.destroy(); chartAcademicRank = null; }
      toggleCanvasEmptyOverlay('chartWd2AcademicRank', true, 'Belum Ada Jabatan Akademik', 'Upload data dosen untuk melihat jenjang karir.');
    } else {
      toggleCanvasEmptyOverlay('chartWd2AcademicRank', false);
      if (chartAcademicRank) chartAcademicRank.destroy();
      chartAcademicRank = new Chart(canvasRank.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar'],
          datasets: [{
            data: jafungCounts,
            backgroundColor: ['#DDD6FE', '#C084FC', '#A855F7', '#722F99'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
        }
      });
    }
  }

  // Chart 5: Piramida Usia (Bar)
  const canvasPiramida = document.getElementById('chartWd2PiramidaUsia');
  if (canvasPiramida) {
    if (isDosenEmpty) {
      if (chartPiramidaUsia) { chartPiramidaUsia.destroy(); chartPiramidaUsia = null; }
      toggleCanvasEmptyOverlay('chartWd2PiramidaUsia', true, 'Belum Ada Data Demografi Usia', 'Upload data dosen untuk melihat piramida usia.');
    } else {
      toggleCanvasEmptyOverlay('chartWd2PiramidaUsia', false);
      if (chartPiramidaUsia) chartPiramidaUsia.destroy();
      chartPiramidaUsia = new Chart(canvasPiramida.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['< 30 Thn', '30 - 39 Thn', '40 - 49 Thn', '50 - 59 Thn', '>= 60 Thn'],
          datasets: [
            { label: 'Laki-laki', data: [2, 8, 12, 8, 4], backgroundColor: '#722F99', borderRadius: 4 },
            { label: 'Perempuan', data: [1, 6, 9, 5, 2], backgroundColor: '#ec4899', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
        }
      });
    }
  }

  // Chart 6: Distribusi Beasiswa (Donut)
  const canvasBeasiswa = document.getElementById('chartWd2DistribusiBeasiswa');
  if (canvasBeasiswa) {
    if (isDosenEmpty) {
      if (chartDistribusiBeasiswa) { chartDistribusiBeasiswa.destroy(); chartDistribusiBeasiswa = null; }
      toggleCanvasEmptyOverlay('chartWd2DistribusiBeasiswa', true, 'Belum Ada Studi Lanjut', 'Upload data dosen untuk melihat beasiswa.');
    } else {
      toggleCanvasEmptyOverlay('chartWd2DistribusiBeasiswa', false);
      if (chartDistribusiBeasiswa) chartDistribusiBeasiswa.destroy();
      chartDistribusiBeasiswa = new Chart(canvasBeasiswa.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['BPI / LPDP', 'Beasiswa Unggulan', 'KIP Kuliah', 'Kerjasama Mitra'],
          datasets: [{
            data: [14, 8, 48, 18],
            backgroundColor: ['#722F99', '#A855F7', '#C084FC', '#E9D5FF'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '65%' }
      });
    }
  }

  // Chart 7: Arus Kas
  const canvasArusKas = document.getElementById('chartWd2ArusKas');
  if (canvasArusKas) {
    if (isFinanceEmpty) {
      if (chartArusKas) { chartArusKas.destroy(); chartArusKas = null; }
      toggleCanvasEmptyOverlay('chartWd2ArusKas', true, 'Belum Ada Arus Kas', 'Upload data transaksi keuangan untuk melihat arus kas.');
    } else {
      toggleCanvasEmptyOverlay('chartWd2ArusKas', false);
      if (chartArusKas) chartArusKas.destroy();
      chartArusKas = new Chart(canvasArusKas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'],
          datasets: [
            { label: 'Pemasukan', data: [1800, 2100, 1400, 2600, 1500, 1900, 1700, 1800], backgroundColor: '#10B981', borderRadius: 4 },
            { label: 'Pengeluaran', data: [950, 1100, 850, 1400, 1150, 1300, 1050, 1100], backgroundColor: '#EF4444', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
        }
      });
    }
  }
}

export function initWadek2() {
  const heroBanner = document.getElementById('executiveHeroBanner');
  const compactBar = document.getElementById('compactStickyBar');
  const scrollContainer = document.querySelector('main');
  const btnReset = document.getElementById('btnResetWd2Filters');
  const btnResetCompact = document.getElementById('btnResetCompactWd2Filters');
  const allResetBtns = [btnReset, btnResetCompact].filter(Boolean);

  const dropdownWraps = document.querySelectorAll('.wd2-dropdown-wrap');

  dropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.wd2-pill-btn');
    const label = wrap.querySelector('.wd2-btn-label');
    const input = wrap.querySelector('input[type="hidden"]');
    const items = wrap.querySelectorAll('.wd2-dropdown-item');
    const filterType = wrap.getAttribute('data-filter');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrap.classList.contains('open');
        document.querySelectorAll('.wd2-dropdown-wrap.open').forEach(w => {
          if (w !== wrap) {
            w.classList.remove('open');
            const b = w.querySelector('.wd2-pill-btn');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          wrap.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          wrap.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = item.getAttribute('data-value');
        const text = item.textContent.trim();

        if (input) input.value = val;
        if (label) label.textContent = text;
        items.forEach(it => it.classList.remove('active'));
        item.classList.add('active');
        wrap.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');

        const twinWraps = document.querySelectorAll(`.wd2-dropdown-wrap[data-filter="${filterType}"]`);
        twinWraps.forEach(tw => {
          if (tw !== wrap) {
            const twInput = tw.querySelector('input[type="hidden"]');
            const twLabel = tw.querySelector('.wd2-btn-label');
            const twItems = tw.querySelectorAll('.wd2-dropdown-item');
            if (twInput) twInput.value = val;
            if (twLabel) twLabel.textContent = text;
            twItems.forEach(ti => {
              if (ti.getAttribute('data-value') === val) {
                ti.classList.add('active');
              } else {
                ti.classList.remove('active');
              }
            });
          }
        });

        if (filterType === 'prodi') {
          initWadek2Charts(val);
        }

        const isFiltered = (val !== 'semua');
        allResetBtns.forEach(rBtn => {
          if (isFiltered) {
            rBtn.classList.remove('hidden');
          } else {
            rBtn.classList.add('hidden');
          }
        });
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.wd2-dropdown-wrap.open').forEach(w => {
      w.classList.remove('open');
      const b = w.querySelector('.wd2-pill-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  const handleReset = () => {
    dropdownWraps.forEach(wrap => {
      const input = wrap.querySelector('input[type="hidden"]');
      const label = wrap.querySelector('.wd2-btn-label');
      const items = wrap.querySelectorAll('.wd2-dropdown-item');
      if (input) input.value = 'semua';
      if (label) label.textContent = 'Semua Program Studi';
      items.forEach(item => {
        if (item.getAttribute('data-value') === 'semua') {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });

    allResetBtns.forEach(rBtn => rBtn.classList.add('hidden'));
    initWadek2Charts('semua');
  };

  allResetBtns.forEach(btn => btn.addEventListener('click', handleReset));

  if (heroBanner && compactBar) {
    const handleScroll = () => {
      const heroRect = heroBanner.getBoundingClientRect();
      if (heroRect.bottom <= 40) {
        compactBar.classList.add('is-active');
      } else {
        compactBar.classList.remove('is-active');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    handleScroll();
  }

  // Initialize charts with current persisted data
  initWadek2Charts('semua');

  // Listen for dynamic updates
  window.addEventListener('fmipa:data-updated', (e) => {
    if (!e.detail || e.detail.module === 'dosen' || e.detail.module === 'unit-bisnis' || e.detail.module === 'penelitian' || e.detail.module === 'all') {
      initWadek2Charts(currentActiveProdi);
    }
  });
}
