// Functionality for Public User Interface
function triggerRegistration(phaseId) {
    const modal = document.getElementById('register-modal');
    if (modal) modal.classList.remove('hidden');
    // Set selected phase logic...
}

function closeRegisterModal() {
    document.getElementById('register-modal').classList.add('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    // Pendaftaran logic & Tampilkan Modal Pembayaran
    closeRegisterModal();
    document.getElementById('payment-modal').classList.remove('hidden');
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
}

function closeEticketModal() {
    document.getElementById('eticket-modal').classList.add('hidden');
}

function initAppFromConfig() {
    if (typeof APP_CONFIG === 'undefined') return;
    
    // Set dynamic titles & info
    const brand = document.getElementById('nav-brand-title');
    if (brand) brand.innerText = APP_CONFIG.eventName || 'CYBERFEST 2026';
    
    // Render FAQ, Sosmed, dan Sponsor dari APP_CONFIG...
}
