<!-- MODAL TERPUSAT: IMPORT EXCEL / CSV & TAMBAH DATA MANUAL -->
<!-- FMIPA Universitas Pakuan • Executive Grade Components -->

<!-- 1. Modal Import Excel / CSV -->
<div id="fmipaImportModal" class="fixed inset-0 z-[999] hidden items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 transition-all duration-300">
    <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        <!-- Header Modal -->
        <div class="px-6 py-4 bg-gradient-to-r from-[#4A154B] via-[#722F99] to-[#4A154B] text-white flex items-center justify-between shadow-md">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <i id="importModalIcon" class="fa-solid fa-cloud-arrow-up text-amber-300 text-lg"></i>
                </div>
                <div>
                    <h3 id="importModalTitle" class="text-base font-bold text-white tracking-tight">Import Berkas Excel / CSV</h3>
                    <p id="importModalSubtitle" class="text-xs text-purple-200">Unggah berkas untuk memperbarui tabel data secara otomatis.</p>
                </div>
            </div>
            <button type="button" data-close-modal class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>

        <!-- Body Modal (Scrollable) -->
        <div class="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
            <!-- Alert Info & Download Template Link -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200/60 text-xs">
                <div class="flex items-center gap-2.5 text-purple-900 font-medium">
                    <i class="fa-solid fa-circle-info text-purple-600 text-sm"></i>
                    <span>Pastikan berkas Excel Anda menggunakan struktur kolom resmi.</span>
                </div>
                <button type="button" id="importModalTemplateBtn" data-action="download-template" data-module="" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#722F99] hover:bg-[#5b257a] text-white font-bold text-[11px] shadow-sm transition active:scale-95 cursor-pointer shrink-0">
                    <i class="fa-solid fa-download text-amber-300"></i>
                    <span>Download Template Resmi</span>
                </button>
            </div>

            <!-- Drag and Drop Zone -->
            <div id="fmipaDropZone" class="border-2 border-dashed border-gray-300 hover:border-[#722F99] rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 bg-slate-50/50 hover:bg-purple-50/30 flex flex-col items-center justify-center gap-2 group">
                <input type="file" id="fmipaFileInput" class="hidden" accept=".xlsx, .xls, .csv" />
                <div class="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-purple-200/80 text-[#722F99] flex items-center justify-center text-2xl transition shadow-inner">
                    <i class="fa-solid fa-file-excel group-hover:scale-110 transition-transform"></i>
                </div>
                <h4 class="text-sm font-bold text-slate-800 mt-1">Seret & Jatuhkan berkas Excel di sini</h4>
                <p class="text-xs text-slate-400">atau <span class="text-[#722F99] font-bold underline">klik untuk memilih dari komputer</span></p>
                <div class="flex items-center gap-2 mt-2 text-[10.5px] text-slate-400 font-medium">
                    <span class="px-2 py-0.5 rounded-md bg-white border border-gray-200 font-mono">.xlsx</span>
                    <span class="px-2 py-0.5 rounded-md bg-white border border-gray-200 font-mono">.xls</span>
                    <span class="px-2 py-0.5 rounded-md bg-white border border-gray-200 font-mono">.csv</span>
                    <span>(Maks. 10 MB)</span>
                </div>
            </div>

            <!-- File Terpilih & Indikator Status -->
            <div id="importFileStatus" class="hidden flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs">
                <div class="flex items-center gap-2.5">
                    <i class="fa-solid fa-circle-check text-[#722F99] text-base"></i>
                    <div>
                        <span id="importFileName" class="font-bold text-slate-800 block">data_dosen.xlsx</span>
                        <span id="importFileSize" class="text-[10.5px] text-slate-500">24.5 KB</span>
                    </div>
                </div>
                <span id="importRowCountBadge" class="px-2.5 py-1 rounded-full bg-[#722F99] text-white font-bold text-[10.5px]">
                    0 Baris Data
                </span>
            </div>

            <!-- Pratinjau 5 Baris Data -->
            <div id="importPreviewContainer" class="hidden space-y-2">
                <div class="flex items-center justify-between">
                    <h5 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <i class="fa-solid fa-table-list text-[#722F99]"></i>
                        <span>Pratinjau Data (5 Baris Pertama)</span>
                    </h5>
                    <span class="text-[11px] text-slate-400">Periksa kolom sebelum disimpan</span>
                </div>
                <div class="border border-purple-100 rounded-xl overflow-x-auto max-h-48 shadow-inner">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead id="importPreviewThead"></thead>
                        <tbody id="importPreviewTbody" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Footer Modal -->
        <div class="px-6 py-4 bg-slate-50 border-t border-gray-200 flex items-center justify-end gap-3">
            <button type="button" data-close-modal class="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-slate-700 font-bold text-xs transition cursor-pointer">
                Batal
            </button>
            <button type="button" id="btnSaveImportData" disabled class="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                <i class="fa-solid fa-check text-amber-300"></i>
                <span>Simpan & Terapkan Data</span>
            </button>
        </div>
    </div>
</div>

<!-- 2. Modal Tambah Data Manual -->
<div id="fmipaManualModal" class="fixed inset-0 z-[999] hidden items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 transition-all duration-300">
    <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        <!-- Header Modal -->
        <div class="px-6 py-4 bg-gradient-to-r from-[#4A154B] via-[#722F99] to-[#4A154B] text-white flex items-center justify-between shadow-md">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <i id="manualModalIcon" class="fa-solid fa-circle-plus text-amber-300 text-lg"></i>
                </div>
                <div>
                    <h3 id="manualModalTitle" class="text-base font-bold text-white tracking-tight">Tambah Data Manual</h3>
                    <p id="manualModalSubtitle" class="text-xs text-purple-200">Isi formulir berikut untuk menambahkan satu entri data baru.</p>
                </div>
            </div>
            <button type="button" data-close-modal class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>

        <!-- Form Modal Body (Scrollable) -->
        <form id="fmipaManualForm" class="flex flex-col flex-1 overflow-hidden">
            <div class="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <div id="manualFormFieldsContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Dynamic Form Fields Injected Here -->
                </div>
            </div>

            <!-- Footer Modal -->
            <div class="px-6 py-4 bg-slate-50 border-t border-gray-200 flex items-center justify-end gap-3">
                <button type="button" data-close-modal class="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-slate-700 font-bold text-xs transition cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                    <i class="fa-solid fa-floppy-disk text-amber-300"></i>
                    <span>Simpan Data</span>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 3. Toast Notifications Container -->
<div id="fmipaToastContainer" class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4"></div>
