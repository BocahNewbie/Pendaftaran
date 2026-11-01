// ==========================================
// PUBLIC USER INTERFACE & MODAL HANDLERS
// ==========================================

// Function untuk membuka modal pendaftaran berdasarkan phase
function triggerRegistration(phaseId) {
    const modal = document.getElementById('register-modal');
    const phaseTag = document.getElementById('modal-phase-tag');
    
    if (modal) {
        modal.classList.remove('hidden');
        if (phaseTag) {
            if (phaseId === 'p1') phaseTag.innerText = 'Phase 1 - Early Bird';
            else if (phaseId === 'p2') phaseTag.innerText = 'Phase 2 - Regular Pass';
            else if (phaseId === 'p3') phaseTag.innerText = 'Phase 3 - VIP Access';
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
    
    // Tampilkan Modal Pembayaran / QRIS
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

// Mobile Menu Toggle
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
    if (brandTitle) brandTitle.innerText = APP_CONFIG.eventName || 'CYBERFEST 2026';
    if (footerBrand) footerBrand.innerText = APP_CONFIG.eventName || 'CYBERFEST 2026';

    // Populate Kategori Lomba pada Form
    const categorySelect = document.getElementById('reg-category');
    if (categorySelect && APP_CONFIG.categories) {
        categorySelect.innerHTML = APP_CONFIG.categories
            .map(cat => `<option value="${cat}">${cat}</option>`)
            .join('');
    }

    // Render FAQ
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer && APP_CONFIG.faqs) {
        faqContainer.innerHTML = APP_CONFIG.faqs.map(faq => `
            <div class="glass-card p-5 rounded-xl border border-slate-800">
                <h4 class="font-bold text-white text-sm mb-2">${faq.q}</h4>
                <p class="text-xs text-slate-400 leading-relaxed">${faq.a}</p>
            </div>
        `).join('');
    }

    // Render Sosmed
    const sosmedContainer = document.getElementById('sosmed-container');
    if (sosmedContainer && APP_CONFIG.socials) {
        sosmedContainer.innerHTML = APP_CONFIG.socials.map(soc => `
            <a href="${soc.link}" class="glass-card p-4 rounded-xl border border-slate-800 hover:border-neonCyan transition-all flex items-center justify-center gap-2 text-sm font-semibold text-slate-300 hover:text-neonCyan">
                <i data-lucide="${soc.icon}" class="w-4 h-4"></i> ${soc.name}
            </a>
        `).join('');
    }

    // Render Sponsor
    const sponsorContainer = document.getElementById('sponsor-container');
    if (sponsorContainer && APP_CONFIG.sponsors) {
        sponsorContainer.innerHTML = APP_CONFIG.sponsors.map(sp => `
            <div class="font-bold text-slate-400 text-sm tracking-wider uppercase">${sp}</div>
        `).join('');
    }

    // Render Pesan Panitia
    const msg = document.getElementById('panitia-message');
    const sig = document.getElementById('panitia-signature');
    if (msg && APP_CONFIG.panitiaMessage) msg.innerText = `"${APP_CONFIG.panitiaMessage}"`;
    if (sig && APP_CONFIG.panitiaSignature) sig.innerText = APP_CONFIG.panitiaSignature;
}
