// Theme handling. Loaded in <head> (not deferred) so the saved theme
// is applied before first paint, avoiding a dark/light flash.
(function () {
    const STORAGE_KEY = 'theme';
    const root = document.documentElement;

    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) || 'dark';
        } catch (e) {
            return 'dark';
        }
    }

    function updateToggle(theme) {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;
        const next = theme === 'dark' ? 'light' : 'dark';
        toggle.innerHTML = `<svg><use href="#i-${theme === 'dark' ? 'sun' : 'moon'}" /></svg>`;
        toggle.setAttribute('aria-label', `Switch to ${next} theme`);
    }

    function applyTheme(theme) {
        root.setAttribute('data-bs-theme', theme);
        updateToggle(theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) { }
    }

    // Apply immediately, before the body renders
    root.setAttribute('data-bs-theme', getSavedTheme());

    document.addEventListener('DOMContentLoaded', () => {
        updateToggle(root.getAttribute('data-bs-theme'));
        document.getElementById('themeToggle').addEventListener('click', () => {
            applyTheme(root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
        });
    });
})();
