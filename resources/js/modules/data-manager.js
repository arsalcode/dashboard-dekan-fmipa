/**
 * DATA MANAGER ENGINE - FMIPA UNIVERSITAS PAKUAN
 * Modul Reusable Terpusat untuk:
 * 1. Download Template Excel (.xlsx) dengan SheetJS
 * 2. Upload / Import Excel & CSV dengan Drag-and-Drop & Preview Table
 * 3. Form Dialog Tambah Data Manual
 * 4. Sinkronisasi Data Persisten (localStorage) & Reactive CustomEvent
 * 5. Executive Toast Notification
 */

import * as XLSX from 'xlsx';
import { DATA_SCHEMAS } from './data-schemas';

class FmipaDataManager {
  constructor() {
    this.activeModule = null;
    this.parsedImportRows = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.bindGlobalActions();
    this.bindModalEvents();
  }

  /**
   * Bind event delegation untuk tombol aksi di seluruh halaman
   */
  bindGlobalActions() {
    document.addEventListener('click', (e) => {
      // 1. Download Template Excel
      const btnDownload = e.target.closest('[data-action="download-template"]');
      if (btnDownload) {
        e.preventDefault();
        const moduleKey = btnDownload.getAttribute('data-module');
        this.downloadTemplate(moduleKey);
        return;
      }

      // 2. Open Import Excel Modal
      const btnImport = e.target.closest('[data-action="import-excel"]');
      if (btnImport) {
        e.preventDefault();
        const moduleKey = btnImport.getAttribute('data-module');
        this.openImportModal(moduleKey);
        return;
      }

      // 3. Open Tambah Data Manual Modal
      const btnTambah = e.target.closest('[data-action="tambah-manual"]');
      if (btnTambah) {
        e.preventDefault();
        const moduleKey = btnTambah.getAttribute('data-module');
        this.openManualModal(moduleKey);
        return;
      }

      // 4. Modal Close
      const btnClose = e.target.closest('[data-close-modal]');
      if (btnClose) {
        e.preventDefault();
        this.closeAllModals();
        return;
      }

      // 5. Reset Data Lokal Modul
      const btnReset = e.target.closest('[data-action="reset-data"]');
      if (btnReset) {
        e.preventDefault();
        const moduleKey = btnReset.getAttribute('data-module');
        if (confirm('Kembalikan data tabel ke pengaturan default (menghapus data upload lokal)?')) {
          this.clearPersistedData(moduleKey);
        }
        return;
      }
    });
  }

  /**
   * Bind event modal (drag-and-drop, input file, form submit)
   */
  bindModalEvents() {
    const importModal = document.getElementById('fmipaImportModal');
    const manualModal = document.getElementById('fmipaManualModal');
    const dropZone = document.getElementById('fmipaDropZone');
    const fileInput = document.getElementById('fmipaFileInput');
    const btnSaveImport = document.getElementById('btnSaveImportData');
    const manualForm = document.getElementById('fmipaManualForm');

    // Drag and Drop Zone
    if (dropZone && fileInput) {
      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.add('border-[#722F99]', 'bg-purple-50/50');
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.remove('border-[#722F99]', 'bg-purple-50/50');
        }, false);
      });

      dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
          this.handleFileSelected(files[0]);
        }
      });

      dropZone.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.handleFileSelected(e.target.files[0]);
        }
      });
    }

    // Save Imported Data
    if (btnSaveImport) {
      btnSaveImport.addEventListener('click', () => {
        this.applyImportedData();
      });
    }

    // Submit Manual Form
    if (manualForm) {
      manualForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.applyManualData();
      });
    }

    // Close modal saat klik backdrop gelap
    [importModal, manualModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closeAllModals();
          }
        });
      }
    });

    // Close modal via Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  /**
   * Download Template Excel Resmi (.xlsx)
   */
  downloadTemplate(moduleKey) {
    const schema = DATA_SCHEMAS[moduleKey];
    if (!schema) {
      this.showToast('Gagal', `Skema modul '${moduleKey}' tidak ditemukan.`, 'error');
      return;
    }

    try {
      const headers = schema.columns.map(c => c.label);
      const sampleRow1 = schema.columns.map(c => c.example || '');
      
      // Data rows (Header + 1 baris contoh)
      const data = [headers, sampleRow1];

      const ws = XLSX.utils.aoa_to_sheet(data);

      // Auto col width
      ws['!cols'] = schema.columns.map(col => {
        const len = Math.max(col.label.length, (col.example || '').toString().length, 14);
        return { wch: len + 4 };
      });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, schema.sheetName || 'Template');

      XLSX.writeFile(wb, schema.filename || `Template_${moduleKey}.xlsx`);

      this.showToast(
        'Template Berhasil Diunduh',
        `Berkas ${schema.filename} siap diisi data oleh pimpinan atau operator.`,
        'success'
      );
    } catch (err) {
      console.error('Download template error:', err);
      this.showToast('Gagal Mengunduh', err.message || 'Terjadi kesalahan saat membuat file Excel.', 'error');
    }
  }

  /**
   * Buka Modal Import Excel / CSV
   */
  openImportModal(moduleKey) {
    const schema = DATA_SCHEMAS[moduleKey];
    if (!schema) return;

    this.activeModule = moduleKey;
    this.parsedImportRows = [];

    const modal = document.getElementById('fmipaImportModal');
    const modalTitle = document.getElementById('importModalTitle');
    const modalSubtitle = document.getElementById('importModalSubtitle');
    const modalIcon = document.getElementById('importModalIcon');
    const templateLink = document.getElementById('importModalTemplateBtn');
    const previewWrap = document.getElementById('importPreviewContainer');
    const fileInput = document.getElementById('fmipaFileInput');
    const btnSave = document.getElementById('btnSaveImportData');
    const dropZone = document.getElementById('fmipaDropZone');
    const fileStatus = document.getElementById('importFileStatus');

    if (!modal) return;

    if (modalTitle) modalTitle.textContent = `Import Excel / CSV: ${schema.title}`;
    if (modalSubtitle) modalSubtitle.textContent = `Unggah berkas untuk memperbarui tabel data ${schema.singular} secara otomatis.`;
    if (modalIcon) modalIcon.className = `${schema.icon} text-amber-300 text-xl`;
    if (templateLink) templateLink.setAttribute('data-module', moduleKey);

    // Reset UI State
    if (fileInput) fileInput.value = '';
    if (previewWrap) previewWrap.classList.add('hidden');
    if (btnSave) btnSave.disabled = true;
    if (fileStatus) fileStatus.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Handle File yang dipilih atau di-drop
   */
  handleFileSelected(file) {
    if (!file) return;

    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      this.showToast('Format Tidak Sesuai', 'Harap unggah file berformat .xlsx, .xls, atau .csv.', 'error');
      return;
    }

    const schema = DATA_SCHEMAS[this.activeModule];
    if (!schema) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert ke array of objects
        const rawJson = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        if (!rawJson || rawJson.length < 2) {
          this.showToast('Berkas Kosong', 'Berkas Excel tidak memiliki baris data setelah header.', 'error');
          return;
        }

        const rawHeaders = rawJson[0].map(h => (h || '').toString().trim());
        const rawRows = rawJson.slice(1);

        // Map column header ke field schema
        const headerMap = {};
        schema.columns.forEach(col => {
          const index = rawHeaders.findIndex(h => {
            const cleanH = h.toLowerCase();
            return cleanH === col.label.toLowerCase() || 
                   cleanH === col.key.toLowerCase() ||
                   cleanH.includes(col.key.toLowerCase()) ||
                   cleanH.includes(col.label.toLowerCase().slice(0, 5));
          });
          if (index !== -1) {
            headerMap[col.key] = index;
          }
        });

        // Parse baris menjadi objek terstandar
        const parsedList = [];
        rawRows.forEach((row) => {
          // Lewati baris kosong total
          if (!row || row.every(val => val === '' || val === null || val === undefined)) return;

          const item = {};
          schema.columns.forEach(col => {
            const colIdx = headerMap[col.key];
            let cellVal = colIdx !== undefined ? row[colIdx] : '';
            
            if (cellVal instanceof Date) {
              cellVal = cellVal.toISOString().split('T')[0];
            } else if (cellVal !== undefined && cellVal !== null) {
              cellVal = cellVal.toString().trim();
            } else {
              cellVal = '';
            }
            item[col.key] = cellVal;
          });

          // Terapkan fallback default untuk Dosen jika kosong
          if (this.activeModule === 'dosen') {
            if (!item.kategori) item.kategori = 'homebase';
            if (!item.status) item.status = 'Aktif';
            if (!item.sertif) item.sertif = 'Bersertifikat';
            if (!item.jabatan) item.jabatan = 'Lektor';
            if (!item.strata) item.strata = 'S2 (Magister)';
          }

          parsedList.push(item);
        });

        if (parsedList.length === 0) {
          this.showToast('Tidak Ada Data', 'Tidak ada baris data yang berhasil terbaca dari berkas.', 'error');
          return;
        }

        this.parsedImportRows = parsedList;
        this.renderImportPreview(file, parsedList, schema);

      } catch (err) {
        console.error('File parsing error:', err);
        this.showToast('Gagal Membaca File', 'Terjadi kesalahan saat memproses isi berkas Excel.', 'error');
      }
    };

    reader.readAsArrayBuffer(file);
  }

  /**
   * Tampilkan Pratinjau Tabel Data Hasil Import
   */
  renderImportPreview(file, rows, schema) {
    const previewWrap = document.getElementById('importPreviewContainer');
    const fileStatus = document.getElementById('importFileStatus');
    const fileNameEl = document.getElementById('importFileName');
    const fileSizeEl = document.getElementById('importFileSize');
    const rowCountBadge = document.getElementById('importRowCountBadge');
    const previewThead = document.getElementById('importPreviewThead');
    const previewTbody = document.getElementById('importPreviewTbody');
    const btnSave = document.getElementById('btnSaveImportData');

    if (fileStatus && fileNameEl && fileSizeEl) {
      fileStatus.classList.remove('hidden');
      fileNameEl.textContent = file.name;
      fileSizeEl.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    }

    if (rowCountBadge) {
      rowCountBadge.textContent = `${rows.length} Baris Data Ditemukan`;
    }

    // Render Preview Table (Header & up to 5 rows)
    if (previewThead && previewTbody) {
      previewThead.innerHTML = `
        <tr class="bg-purple-900 text-white text-[11px] uppercase tracking-wider">
          <th class="py-2 px-3 text-center w-10">No</th>
          ${schema.columns.slice(0, 6).map(c => `<th class="py-2 px-3">${c.label}</th>`).join('')}
        </tr>
      `;

      const previewRows = rows.slice(0, 5);
      previewTbody.innerHTML = previewRows.map((r, i) => `
        <tr class="hover:bg-purple-50/50 border-b border-gray-100 text-xs text-slate-700">
          <td class="py-2 px-3 text-center text-gray-400 font-bold">${i + 1}</td>
          ${schema.columns.slice(0, 6).map(c => `<td class="py-2 px-3 truncate max-w-[150px]" title="${r[c.key] || '-'}">${r[c.key] || '-'}</td>`).join('')}
        </tr>
      `).join('');
    }

    if (previewWrap) previewWrap.classList.remove('hidden');
    if (btnSave) btnSave.disabled = false;
  }

  /**
   * Terapkan Data Import ke Penyimpanan & Dispatch Event
   */
  applyImportedData() {
    if (!this.parsedImportRows || this.parsedImportRows.length === 0) return;

    const moduleKey = this.activeModule;
    const count = this.parsedImportRows.length;

    this.saveData(moduleKey, this.parsedImportRows, 'import');
    this.closeAllModals();

    this.showToast(
      'Import Berhasil Disimpan!',
      `Sebanyak ${count} baris data berhasil diintegrasikan ke modul ${DATA_SCHEMAS[moduleKey]?.title}.`,
      'success'
    );
  }

  /**
   * Buka Modal Form Tambah Data Manual
   */
  openManualModal(moduleKey) {
    const schema = DATA_SCHEMAS[moduleKey];
    if (!schema) return;

    this.activeModule = moduleKey;

    const modal = document.getElementById('fmipaManualModal');
    const modalTitle = document.getElementById('manualModalTitle');
    const modalSubtitle = document.getElementById('manualModalSubtitle');
    const modalIcon = document.getElementById('manualModalIcon');
    const formFields = document.getElementById('manualFormFieldsContainer');

    if (!modal) return;

    if (modalTitle) modalTitle.textContent = `Tambah Data Manual: ${schema.singular}`;
    if (modalSubtitle) modalSubtitle.textContent = `Isi formulir berikut untuk menambahkan satu entri ${schema.singular} baru.`;
    if (modalIcon) modalIcon.className = `${schema.icon} text-amber-300 text-xl`;

    // Render Dynamic Form Fields
    if (formFields) {
      formFields.innerHTML = schema.columns.map(col => {
        const requiredAttr = col.required ? 'required' : '';
        const requiredBadge = col.required ? '<span class="text-rose-500 font-bold ml-0.5">*</span>' : '';

        if (col.type === 'select') {
          return `
            <div class="flex flex-col gap-1.5">
              <label for="manual_${col.key}" class="text-xs font-bold text-slate-700">
                ${col.label} ${requiredBadge}
              </label>
              <div class="relative">
                <select id="manual_${col.key}" name="${col.key}" ${requiredAttr}
                  class="w-full px-3.5 py-2 text-xs bg-slate-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:border-[#722F99] focus:ring-2 focus:ring-purple-200 text-slate-800 transition">
                  <option value="">-- Pilih ${col.label} --</option>
                  ${(col.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
              </div>
            </div>
          `;
        }

        return `
          <div class="flex flex-col gap-1.5">
            <label for="manual_${col.key}" class="text-xs font-bold text-slate-700">
              ${col.label} ${requiredBadge}
            </label>
            <input 
              type="${col.type || 'text'}" 
              id="manual_${col.key}" 
              name="${col.key}" 
              placeholder="Contoh: ${col.example || ''}" 
              ${col.step ? `step="${col.step}"` : ''}
              ${requiredAttr}
              class="w-full px-3.5 py-2 text-xs bg-slate-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:border-[#722F99] focus:ring-2 focus:ring-purple-200 text-slate-800 transition" 
            />
          </div>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Simpan Data dari Form Manual
   */
  applyManualData() {
    const form = document.getElementById('fmipaManualForm');
    if (!form) return;

    const schema = DATA_SCHEMAS[this.activeModule];
    if (!schema) return;

    const formData = new FormData(form);
    const newItem = {};

    schema.columns.forEach(col => {
      newItem[col.key] = (formData.get(col.key) || '').toString().trim();
    });

    this.saveData(this.activeModule, [newItem], 'manual');
    this.closeAllModals();

    this.showToast(
      'Data Berhasil Ditambahkan!',
      `Satu entri ${schema.singular} baru telah disimpan dan langsung tampil di tabel.`,
      'success'
    );
  }

  /**
   * Tutup seluruh modal aktif
   */
  closeAllModals() {
    const importModal = document.getElementById('fmipaImportModal');
    const manualModal = document.getElementById('fmipaManualModal');

    [importModal, manualModal].forEach(m => {
      if (m) {
        m.classList.add('hidden');
        m.classList.remove('flex');
      }
    });

    document.body.style.overflow = '';
  }

  /**
   * Simpan data ke localStorage & pancarkan custom event
   */
  saveData(moduleKey, rows, action = 'import') {
    try {
      const storageKey = `fmipa_data_${moduleKey}`;
      const existing = this.getPersistedData(moduleKey);
      
      // Tambahkan data baru di awal array
      const combined = [...rows, ...existing];
      localStorage.setItem(storageKey, JSON.stringify(combined));

      // Broadcast CustomEvent ke seluruh chart dan tabel listener
      window.dispatchEvent(new CustomEvent('fmipa:data-updated', {
        detail: {
          module: moduleKey,
          action: action,
          newRows: rows,
          allRows: combined
        }
      }));
    } catch (err) {
      console.error('Storage save error:', err);
    }
  }

  /**
   * Ambil data dari localStorage
   */
  getPersistedData(moduleKey) {
    try {
      const storageKey = `fmipa_data_${moduleKey}`;
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : [];
    } catch (e) {
      console.warn('Failed to parse persisted data for', moduleKey, e);
      return [];
    }
  }

  /**
   * Reset data tersimpan di localStorage untuk modul tertentu
   */
  clearPersistedData(moduleKey) {
    if (!moduleKey) return;
    try {
      localStorage.removeItem(`fmipa_data_${moduleKey}`);
      window.dispatchEvent(new CustomEvent('fmipa:data-updated', {
        detail: {
          module: moduleKey,
          action: 'reset',
          newRows: [],
          allRows: []
        }
      }));
      const title = DATA_SCHEMAS[moduleKey]?.title || moduleKey;
      this.showToast('Data Direset', `Data unggahan untuk modul ${title} telah dikembalikan ke kondisi default.`, 'info');
    } catch (err) {
      console.error('Failed to clear persisted data for', moduleKey, err);
    }
  }

  /**
   * Tampilkan Executive Toast Notification
   */
  showToast(title, message, type = 'success') {
    let container = document.getElementById('fmipaToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'fmipaToastContainer';
      container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300 ease-out bg-white rounded-2xl shadow-2xl border p-4 flex items-start gap-3.5 ${
      type === 'success' ? 'border-emerald-500/30' : type === 'error' ? 'border-rose-500/30' : 'border-purple-500/30'
    }`;

    const iconBg = type === 'success' ? 'bg-emerald-50 text-emerald-600' : type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-purple-50 text-[#722F99]';
    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-bell';

    toast.innerHTML = `
      <div class="w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shrink-0 text-base shadow-sm">
        <i class="${iconClass}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900">${title}</h4>
        <p class="text-[11.5px] text-slate-500 mt-0.5 leading-snug">${message}</p>
      </div>
      <button type="button" class="text-slate-400 hover:text-slate-600 transition shrink-0 mt-0.5 cursor-pointer text-xs">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    const btnClose = toast.querySelector('button');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      });
    }

    container.appendChild(toast);

    // Animasi Muncul
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    // Auto Dismiss setelah 4.5 detik
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }
    }, 4500);
  }
}

// Singleton Instance
export const DataManager = new FmipaDataManager();

export function initDataManager() {
  DataManager.init();
}
