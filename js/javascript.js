
    async function loadComponent(id, file) {
        const res = await fetch(`components/${file}`);
        document.getElementById(id).innerHTML = await res.text();
    }

    document.addEventListener("DOMContentLoaded", async () => {
        await Promise.all([
            loadComponent('navbar-component', 'navbar.html'),
            loadComponent('hero-component', 'hero.html'),
            loadComponent('phases-component', 'pricing-phases.html'),
            loadComponent('footer-component', 'footer.html'),
            loadComponent('modals-component', 'modals.html')
        ]);

        initAppFromConfig();
        if (window.lucide) {
            lucide.createIcons();
        }
    });
