// ==========================================
// PUBLIC USER INTERFACE & MODAL HANDLERS
// ==========================================

function triggerRegistration(phaseId) {
    const modal = document.getElementById('register-modal');
    const phaseTag = document.getElementById('modal-phase-tag');
    
    if (modal) {
        modal.classList.remove('hidden');
        if (phaseTag) {
            if (phaseId === 'p1') phaseTag.innerText = 'Kategori: Bayi Merangkak';
            else if (phaseId === 'p2') phaseTag.innerText = 'Kategori: Pindah Bola';
            else if (phaseId === 'p3') phaseTag.innerText = 'Kategori: Menyusun Puzzle';
        }
    }
}

function closeRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) modal.classList.add('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    closeRegisterModal();
    
    const payModal = document.getElementById('payment-modal');
    if (payModal) payModal.classList.remove('hidden');
}

function closePaymentModal() {
    const payModal = document.getElementById('payment-modal');
    if (payModal) payModal.classList.add('hidden');
}

function closeEticketModal() {
    const eticketModal = document.getElementById('eticket-modal');
    if (eticketModal) eticketModal.classList.add('hidden');
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Inisialisasi Data dari config.js
function initAppFromConfig() {
    if (typeof APP_CONFIG === 'undefined') return;

    // Render Brand Title
    const brandTitle = document.getElementById('nav-brand-title');
    const footerBrand = document.getElementById('footer-brand-title');
    if (brandTitle) brandTitle.innerText = APP_CONFIG.eventName || 'BABY PLAY DATE 2026';
    if (footerBrand) footerBrand.innerText = APP_CONFIG.eventName || 'BABY PLAY DATE 2026';

    // Populate Kategori Lomba pada Form Pendaftaran
    const categorySelect = document.getElementById('reg-category');
    if (categorySelect && APP_CONFIG.categories) {
        categorySelect.innerHTML = APP_CONFIG.categories
            .map(cat => `<option value="${cat}">${cat}</option>`)
            .join('');
    }

    // Render FAQ (Dapat diedit langsung pada array 'faqs' di config.js)
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer && APP_CONFIG.faqs) {
        faqContainer.innerHTML = APP_CONFIG.faqs.map(faq => `
            <div class="cute-card p-6 rounded-2xl">
                <h4 class="font-bold text-emerald-800 text-sm mb-2 flex items-center gap-2">
                    <i data-lucide="help-circle" class="w-4 h-4 text-emerald-600"></i> ${faq.q}
                </h4>
                <p class="text-xs text-slate-600 leading-relaxed pl-6">${faq.a}</p>
            </div>
        `).join('');
    }

    // Render Daftar Kontak Kami
    const sosmedContainer = document.getElementById('sosmed-container');
    if (sosmedContainer && APP_CONFIG.socials) {
        sosmedContainer.innerHTML = APP_CONFIG.socials.map(soc => `
            <a href="${soc.link}" target="_blank" class="cute-card p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group">
                <div class="p-3 rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <i data-lucide="${soc.icon}" class="w-5 h-5"></i>
                </div>
                <span class="text-sm font-bold text-slate-800 group-hover:text-emerald-600">${soc.name}</span>
            </a>
        `).join('');
    }

    // Render Sponsor Berbentuk Card
    const sponsorContainer = document.getElementById('sponsor-container');
    if (sponsorContainer && APP_CONFIG.sponsors) {
        sponsorContainer.innerHTML = APP_CONFIG.sponsors.map(sp => `
            <div class="cute-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 border border-emerald-200 flex items-center justify-center mb-3 text-emerald-700 font-black text-lg">
                    ${sp.logoText}
                </div>
                <h4 class="font-bold text-slate-900 text-base">${sp.name}</h4>
                <span class="text-xs text-emerald-600 mt-1 font-semibold">${sp.category}</span>
            </div>
        `).join('');
    }

    // Render Pesan Panitia
    const msg = document.getElementById('panitia-message');
    const sig = document.getElementById('panitia-signature');
    if (msg && APP_CONFIG.panitiaMessage) msg.innerText = `"${APP_CONFIG.panitiaMessage}"`;
    if (sig && APP_CONFIG.panitiaSignature) sig.innerText = APP_CONFIG.panitiaSignature;
}
