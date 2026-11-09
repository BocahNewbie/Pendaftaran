// ==========================================
// ADMIN DASHBOARD & DATA MANAGEMENT MODULE
// ==========================================

let adminData = {
    activeTab: 'pending',
    sortHeader: 'regNo',
    sortAsc: true,
    registrants: [
        { regNo: "#001", name: "Eman Rahman", email: "eman@example.com", phone: "081234567890", phase: "Phase 1", category: "Lomba Bayi Merangkak", date: "2026-11-01", status: "approved" },
        { regNo: "#002", name: "Siti Rahma", email: "siti@example.com", phone: "085712345678", phase: "Phase 2", category: "Lomba Pindah Bola", date: "2026-11-01", status: "pending" }
    ]
};

function openAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) modal.classList.add('hidden');
    
    const userEl = document.getElementById('admin-user');
    const passEl = document.getElementById('admin-pass');
    const errEl = document.getElementById('admin-error-msg');
    
    if (userEl) userEl.value = '';
    if (passEl) passEl.value = '';
    if (errEl) errEl.classList.add('hidden');
}

function closeAdminDashboard() {
    const modal = document.getElementById('admin-dashboard-modal');
    if (modal) modal.classList.add('hidden');
}

function handleAdminLogin(e) {
    e.preventDefault();
    const userEl = document.getElementById('admin-user');
    const passEl = document.getElementById('admin-pass');
    const user = userEl ? userEl.value : '';
    const pass = passEl ? passEl.value : '';

    if (user === 'admin' && pass === 'cyber2026') {
        if (userEl) userEl.value = '';
        if (passEl) passEl.value = '';
        closeAdminLoginModal();
        
        const dash = document.getElementById('admin-dashboard-modal');
        if (dash) {
            dash.classList.remove('hidden');
            initAdminDashboard();
        }
    } else {
        const err = document.getElementById('admin-error-msg');
        if (err) err.classList.remove('hidden');
    }
}

function initAdminDashboard() {
    renderRegistrantsTable();
    resetAdminForm(); // Memastikan form admin siap dan proporsional saat pertama dibuka
}

function switchAdminTab(tabName) {
    adminData.activeTab = tabName;
    
    const btnPending = document.getElementById('tab-btn-pending');
    const btnApproved = document.getElementById('tab-btn-approved');

    const activeClass = "px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-[#34d399] text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.3)] flex items-center gap-2";
    const inactiveClass = "px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2";

    if (tabName === 'pending') {
        if (btnPending) btnPending.className = activeClass;
        if (btnApproved) btnApproved.className = inactiveClass;
    } else {
        if (btnApproved) btnApproved.className = activeClass;
        if (btnPending) btnPending.className = inactiveClass;
    }

    renderRegistrantsTable();
}

function renderRegistrantsTable() {
    const tbody = document.getElementById('registrants-table-body');
    const searchVal = (document.getElementById('search-registrant')?.value || '').toLowerCase();
    
    if (!tbody) return;

    // Update Counter Badges
    const cntPending = document.getElementById('cnt-pending');
    const cntApproved = document.getElementById('cnt-approved');
    const totalPending = adminData.registrants ? adminData.registrants.filter(r => r.status === 'pending').length : 0;
    const totalApproved = adminData.registrants ? adminData.registrants.filter(r => r.status === 'approved').length : 0;

    if (cntPending) cntPending.innerText = totalPending;
    if (cntApproved) cntApproved.innerText = totalApproved;

    // Validasi pengaman jika registrants kosong atau null
    if (!adminData.registrants || adminData.registrants.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-slate-400 text-xs">Belum ada data pendaftar yang masuk.</td></tr>`;
        return;
    }

    let filtered = adminData.registrants.filter(r => r.status === adminData.activeTab);
    
    if (searchVal) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(searchVal) || 
            r.email.toLowerCase().includes(searchVal) ||
            r.regNo.toLowerCase().includes(searchVal)
        );
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-slate-400 text-xs">Tidak ada data peserta untuk tab ini.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(r => `
        <tr class="hover:bg-[#0d1f18] transition-colors border-b border-emerald-900/20">
            <td class="p-3.5 font-mono text-[#34d399] font-bold text-xs">${r.regNo}</td>
            <td class="p-3.5 font-semibold text-white text-xs">${r.name}</td>
            <td class="p-3.5 text-slate-300 text-xs">${r.email}</td>
            <td class="p-3.5 text-slate-300 text-xs">${r.phone}</td>
            <td class="p-3.5 text-[#6ee7b7] text-xs">${r.phase}</td>
            <td class="p-3.5 text-slate-200 text-xs">${r.category}</td>
            <td class="p-3.5 text-slate-400 text-xs">${r.date}</td>
            <td class="p-3.5 text-center">
                <div class="flex items-center justify-center gap-2">
                    ${r.status === 'pending' ? `
                        <button onclick="approveRegistrant('${r.regNo}')" class="px-3 py-1.5 rounded-lg bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 hover:bg-[#34d399] hover:text-slate-950 font-bold text-[11px] transition-all shadow-sm">
                            Verifikasi
                        </button>
                    ` : `
                        <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">TERDAFTAR</span>
                    `}
                    <button onclick="openEditForm('${r.regNo}')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/80 hover:bg-slate-700 hover:text-white font-bold text-[11px] transition-all shadow-sm">
                        Edit
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }
}

// Fungsi Membuka Form Edit dengan Tombol Save Edit & Cancel yang Proporsional
function openEditForm(regNo) {
    const target = adminData.registrants.find(r => r.regNo === regNo);
    const formContainer = document.getElementById('admin-form-container') || document.getElementById('admin-form-wrapper');
    
    if (!formContainer) return;

    if (!target) {
        resetAdminForm();
        return;
    }

    formContainer.innerHTML = `
        <form id="edit-registrant-form" class="space-y-4 bg-slate-900/95 p-6 rounded-2xl border border-emerald-500/30 shadow-2xl backdrop-blur-md">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 class="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-pulse"></span> Edit Data Peserta: <span class="font-mono text-[#34d399] text-sm">${target.regNo}</span>
                </h4>
            </div>

            <div class="space-y-3">
                <div>
                    <label class="block text-[11px] font-medium text-slate-400 mb-1">Nama Lengkap</label>
                    <input type="text" id="edit-name" value="${target.name || ''}" class="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#34d399] transition-all" required />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-[11px] font-medium text-slate-400 mb-1">Email</label>
                        <input type="email" id="edit-email" value="${target.email || ''}" class="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#34d399] transition-all" required />
                    </div>
                    <div>
                        <label class="block text-[11px] font-medium text-slate-400 mb-1">WhatsApp</label>
                        <input type="text" id="edit-phone" value="${target.phone || ''}" class="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#34d399] transition-all" required />
                    </div>
                </div>
            </div>

            <!-- Tombol Aksi: Save Edit & Cancel yang Seimbang -->
            <div class="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                <button type="submit" class="flex-1 bg-[#34d399] hover:bg-[#2bc28b] text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(52,211,153,0.2)] flex items-center justify-center gap-1.5">
                    Save Edit
                </button>
                <button type="button" id="cancel-edit-btn" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-1.5">
                    Cancel
                </button>
            </div>
        </form>
    `;

    // Event listener untuk tombol Cancel
    document.getElementById('cancel-edit-btn').addEventListener('click', () => {
        resetAdminForm();
    });

    // Event listener untuk Submit (Save Edit)
    document.getElementById('edit-registrant-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveEditedRegistrant(regNo);
    });
}

// Fungsi Menyimpan Hasil Edit Data Peserta
function saveEditedRegistrant(regNo) {
    const target = adminData.registrants.find(r => r.regNo === regNo);
    if (target) {
        target.name = document.getElementById('edit-name').value;
        target.email = document.getElementById('edit-email').value;
        target.phone = document.getElementById('edit-phone').value;
        
        renderRegistrantsTable();
        resetAdminForm();
    }
}

// Fungsi Mereset Form Admin Menjadi Tampilan Kosong/Panduan yang Rapi
function resetAdminForm() {
    const formContainer = document.getElementById('admin-form-container') || document.getElementById('admin-form-wrapper');
    if (formContainer) {
        formContainer.innerHTML = `
            <div class="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 text-center flex flex-col items-center justify-center min-h-[160px]">
                <div class="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-2 border border-slate-700/50">
                    <span class="text-lg">⚡</span>
                </div>
                <p class="text-slate-400 text-xs font-medium">Pilih salah satu data peserta pada tabel di samping untuk melakukan pengeditan data.</p>
            </div>
        `;
    }
}

function approveRegistrant(regNo) {
    const target = adminData.registrants.find(r => r.regNo === regNo);
    if (target) {
        target.status = 'approved';
        renderRegistrantsTable();
    }
}

// Fungsi Export Data Peserta Menjadi File Excel Rapi (Pemisah Titik Koma / Semicolon)
function downloadCSV() {
    if (!adminData.registrants || adminData.registrants.length === 0) {
        alert("Belum ada data peserta untuk diunduh.");
        return;
    }

    const headers = ["No. Registrasi", "Nama Lengkap", "Email", "WhatsApp", "Phase", "Kategori", "Tanggal", "Status"];
    
    let csvContent = "";
    csvContent += headers.map(h => `"${h}"`).join(";") + "\r\n";

    adminData.registrants.forEach(r => {
        let rowData = [
            r.regNo || "",
            r.name || "",
            r.email || "",
            r.phone || "",
            r.phase || "",
            r.category || "",
            r.date || "",
            r.status || ""
        ].map(val => {
            let cleanVal = String(val).replace(/(\r\n|\n|\r)/gm, "").trim();
            cleanVal = cleanVal.replace(/"/g, '""');
            return `"${cleanVal}"`;
        });

        csvContent += rowData.join(";") + "\r\n";
    });

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const currentDate = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Peserta_CYBERFEST_${currentDate}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}
