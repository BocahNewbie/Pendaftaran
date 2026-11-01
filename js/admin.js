// ==========================================
// ADMIN DASHBOARD & DATA MANAGEMENT MODULE
// ==========================================

// State Data Admin
let adminData = {
    activeTab: 'pending', // 'pending' atau 'approved'
    sortHeader: 'regNo',
    sortAsc: true,
    registrants: [
        // Dummy data awal peserta untuk pengujian
        { regNo: "#001", name: "Budi Santoso", email: "budi@example.com", phone: "081234567890", phase: "Phase 1", category: "Web Development", date: "2026-11-01", status: "approved" },
        { regNo: "#002", name: "Siti Rahma", email: "siti@example.com", phone: "085712345678", phase: "Phase 2", category: "UI/UX Design", date: "2026-11-01", status: "pending" }
    ]
};

// Function untuk menutup Modal Login Admin sekaligus membersihkan input
function closeAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) modal.classList.add('hidden');
    
    // Clear bidang input username dan password
    const userEl = document.getElementById('admin-user');
    const passEl = document.getElementById('admin-pass');
    const errEl = document.getElementById('admin-error-msg');
    
    if (userEl) userEl.value = '';
    if (passEl) passEl.value = '';
    if (errEl) errEl.classList.add('hidden');
}

// Authentication Login Admin
function handleAdminLogin(e) {
    e.preventDefault();
    const userEl = document.getElementById('admin-user');
    const passEl = document.getElementById('admin-pass');
    const user = userEl ? userEl.value : '';
    const pass = passEl ? passEl.value : '';

    if (user === 'admin' && pass === 'cyber2026') {
        // Reset/Kosongkan form sebelum menutup modal
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

// Authentication Login Admin
function handleAdminLogin(e) {
    e.preventDefault();
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;

    if (user === 'admin' && pass === 'cyber2026') {
        closeAdminLoginModal();
        const dash = document.getElementById('admin-dashboard-modal');
        if (dash) {
            dash.classList.remove('hidden');
            initAdminDashboard(); // Sinkronkan data saat dashboard dibuka
        }
    } else {
        const err = document.getElementById('admin-error-msg');
        if (err) err.classList.remove('hidden');
    }
}

// Inisialisasi & Sinkronisasi Dashboard Admin
function initAdminDashboard() {
    // 1. Isikan data default ke form admin jika belum terisi
    if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.phases) {
        ['p1', 'p2', 'p3'].forEach((pKey, idx) => {
            const pData = APP_CONFIG.phases[pKey];
            if (pData) {
                const elName = document.getElementById(`edit-${pKey}-name`);
                const elPrice = document.getElementById(`edit-${pKey}-price`);
                const elFilled = document.getElementById(`edit-${pKey}-filled`);
                const elTotal = document.getElementById(`edit-${pKey}-total`);
                const elOpen = document.getElementById(`edit-${pKey}-open`);

                if (elName && !elName.value) elName.value = pData.name || `Phase ${idx+1}`;
                if (elPrice && !elPrice.value) elPrice.value = pData.price || 'Rp 0';
                if (elFilled && !elFilled.value) elFilled.value = pData.filled || 0;
                if (elTotal && !elTotal.value) elTotal.value = pData.total || 50;
                if (elOpen) elOpen.checked = pData.open !== false;
            }
        });
    }

    // 2. Render Tabel Peserta
    renderRegistrantsTable();
}

// Switch Tab (Antrian vs Terdaftar)
function switchAdminTab(tabName) {
    adminData.activeTab = tabName;
    
    const btnPending = document.getElementById('tab-btn-pending');
    const btnApproved = document.getElementById('tab-btn-approved');

    if (tabName === 'pending') {
        btnPending.className = "px-4 py-2 rounded-lg text-xs font-bold transition-all bg-neonCyan text-slate-950 shadow-neon-cyan flex items-center gap-1.5";
        btnApproved.className = "px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
    } else {
        btnApproved.className = "px-4 py-2 rounded-lg text-xs font-bold transition-all bg-neonCyan text-slate-950 shadow-neon-cyan flex items-center gap-1.5";
        btnPending.className = "px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
    }

    renderRegistrantsTable();
}

// Render Tabel Peserta
function renderRegistrantsTable() {
    const tbody = document.getElementById('registrants-table-body');
    const searchVal = (document.getElementById('search-registrant')?.value || '').toLowerCase();
    
    if (!tbody) return;

    // Filter berdasarkan Tab & Search
    let filtered = adminData.registrants.filter(r => r.status === adminData.activeTab);
    
    if (searchVal) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(searchVal) || 
            r.email.toLowerCase().includes(searchVal) ||
            r.regNo.toLowerCase().includes(searchVal)
        );
    }

    // Update Counter Jumlah Tab
    const cntPending = document.getElementById('cnt-pending');
    const cntApproved = document.getElementById('cnt-approved');
    if (cntPending) cntPending.innerText = adminData.registrants.filter(r => r.status === 'pending').length;
    if (cntApproved) cntApproved.innerText = adminData.registrants.filter(r => r.status === 'approved').length;

    // Render Baris Tabel
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-500">Tidak ada data peserta.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(r => `
        <tr class="hover:bg-slate-900/40 transition-colors">
            <td class="p-3 font-mono text-neonCyan font-bold">${r.regNo}</td>
            <td class="p-3 font-semibold text-white">${r.name}</td>
            <td class="p-3 text-slate-400">${r.email}</td>
            <td class="p-3 text-slate-400">${r.phone}</td>
            <td class="p-3 text-neonPurple">${r.phase}</td>
            <td class="p-3 text-slate-300">${r.category}</td>
            <td class="p-3 text-slate-400">${r.date}</td>
            <td class="p-3 text-center">
                ${r.status === 'pending' ? `
                    <button onclick="approveRegistrant('${r.regNo}')" class="px-2.5 py-1 rounded bg-neonGreen/20 text-neonGreen border border-neonGreen/40 hover:bg-neonGreen hover:text-black font-bold text-[11px] transition-all">
                        Verifikasi
                    </button>
                ` : `
                    <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">TERDAFTAR</span>
                `}
            </td>
        </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
}

// Verifikasi Pembayaran Peserta
function approveRegistrant(regNo) {
    const target = adminData.registrants.find(r => r.regNo === regNo);
    if (target) {
        target.status = 'approved';
        renderRegistrantsTable();
    }
}

// Update Kuota & Harga ke Tampilan Depan secara Sinkron
function updatePhaseSlotsFromAdmin() {
    ['p1', 'p2', 'p3'].forEach((pKey, idx) => {
        const num = idx + 1;
        const nameVal = document.getElementById(`edit-${pKey}-name`)?.value;
        const priceVal = document.getElementById(`edit-${pKey}-price`)?.value;
        const filledVal = parseInt(document.getElementById(`edit-${pKey}-filled`)?.value || 0);
        const totalVal = parseInt(document.getElementById(`edit-${pKey}-total`)?.value || 1);

        // Update UI Halaman Depan jika elemen tersedia
        const titleDisp = document.getElementById(`phase${num}-title-display`);
        const priceDisp = document.getElementById(`phase${num}-price-display`);
        const slotText = document.getElementById(`phase${num}-slot-text`);
        const progressBar = document.getElementById(`phase${num}-progress`);
        const detailText = document.getElementById(`phase${num}-detail-text`);

        if (titleDisp && nameVal) titleDisp.innerText = nameVal;
        if (priceDisp && priceVal) priceDisp.innerText = priceVal;
        
        const remaining = Math.max(0, totalVal - filledVal);
        const pct = Math.min(100, Math.round((filledVal / totalVal) * 100));

        if (slotText) slotText.innerText = `${remaining} Slot Tersisa`;
        if (progressBar) progressBar.style.width = `${pct}%`;
        if (detailText) detailText.innerText = `${pct}% Terisi (${filledVal}/${totalVal} Slot)`;
    });
}

// Export Data Peserta ke File CSV (Excel)
function downloadCSV() {
    if (adminData.registrants.length === 0) {
        alert("Belum ada data peserta untuk diunduh.");
        return;
    }

    const headers = ["No. Registrasi", "Nama Lengkap", "Email", "WhatsApp", "Phase", "Kategori", "Tanggal", "Status"];
    const rows = adminData.registrants.map(r => [
        `"${r.regNo}"`,
        `"${r.name}"`,
        `"${r.email}"`,
        `"${r.phone}"`,
        `"${r.phase}"`,
        `"${r.category}"`,
        `"${r.date}"`,
        `"${r.status}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Peserta_CYBERFEST_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
