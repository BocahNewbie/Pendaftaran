// Admin Dashboard & Auth Management
function openAdminLoginModal() {
    document.getElementById('admin-login-modal').classList.remove('hidden');
}

function closeAdminLoginModal() {
    document.getElementById('admin-login-modal').classList.add('hidden');
}

function handleAdminLogin(e) {
    e.preventDefault();
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;

    if (user === 'admin' && pass === 'cyber2026') {
        closeAdminLoginModal();
        document.getElementById('admin-dashboard-modal').classList.remove('hidden');
    } else {
        document.getElementById('admin-error-msg').classList.remove('hidden');
    }
}

function closeAdminDashboard() {
    document.getElementById('admin-dashboard-modal').classList.add('hidden');
}

function updatePhaseSlotsFromAdmin() {
    // Logika update realtime slot & kuota dari panel admin
}

function downloadCSV() {
    // Logika export CSV data peserta
}
