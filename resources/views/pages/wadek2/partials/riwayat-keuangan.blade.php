<!-- Section 4: Riwayat Pemasukan & Pengeluaran Kas -->
<x-shared.section-card title="Riwayat Pemasukan & Pengeluaran" icon="fa-solid fa-arrow-right-arrow-left" sectionClass="section-wadek2">
    <!-- 4 Stat Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <x-shared.stat-card title="Total Pemasukan Kas" value="Rp 0" subtext="Belum ada data" valueId="valWd2TotalPemasukan" subtextId="subWd2TotalPemasukan" />
        <x-shared.stat-card title="Total Pengeluaran Kas" value="Rp 0" subtext="Belum ada data" valueId="valWd2TotalPengeluaran" subtextId="subWd2TotalPengeluaran" />
        <x-shared.stat-card title="Surplus / Saldo Kas" value="Rp 0" subtext="Belum ada data" valueId="valWd2SaldoKas" subtextId="subWd2SaldoKas" />
        <x-shared.stat-card title="Tingkat Likuiditas Kas" value="0.0%" subtext="Belum ada data" valueId="valWd2TingkatLikuiditas" subtextId="subWd2TingkatLikuiditas" />
    </div>

    <!-- Chart: Tren Arus Kas Bulanan -->
    <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col w-full">
        <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-money-bill-transfer text-[#722F99]"></i>
                <h3 class="text-sm font-bold text-gray-800">Tren Arus Kas Pemasukan vs Pengeluaran (2026)</h3>
            </div>
            <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Dalam Juta Rp</span>
        </div>
        <div class="w-full h-72 relative">
            <canvas id="chartWd2ArusKas"></canvas>
        </div>
    </div>

    <!-- Audit Ringkasan Transaksi Finansial Terkini -->
    <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col w-full">
        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-receipt text-[#722F99]"></i>
                <h3 class="text-sm font-bold text-gray-800">Rekapitulasi Transaksi Finansial Terakhir</h3>
            </div>
            <span class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">Status Terverifikasi</span>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                        <th class="py-2.5 px-3">Kode Akun</th>
                        <th class="py-2.5 px-3">Keterangan Transaksi</th>
                        <th class="py-2.5 px-3">Kategori</th>
                        <th class="py-2.5 px-3 text-right">Jumlah (Rp)</th>
                        <th class="py-2.5 px-3 text-center">Tipe</th>
                        <th class="py-2.5 px-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tbodyWd2RiwayatKeuangan">
                    <tr>
                        <td colspan="6" class="py-8 text-center text-gray-400">
                            Belum ada riwayat transaksi keuangan tersimpan.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</x-shared.section-card>
