// DOM helpers shared across the app.
const UI = (function () {
    // state: undefined = real value (copyable), 'loading' or 'muted' = placeholder
    function setValue(id, text, state) {
        const el = document.getElementById(id);
        el.textContent = text;
        el.classList.toggle('loading', state === 'loading');
        el.classList.toggle('muted', state === 'muted');
        el.dataset.copyable = state ? '' : '1';
    }

    function setText(id, text) {
        document.getElementById(id).textContent = text;
    }

    function setRefreshing(isRefreshing) {
        const button = document.getElementById('refreshButton');
        button.disabled = isRefreshing;
        button.classList.toggle('spinning', isRefreshing);
        setText('refreshLabel', isRefreshing ? 'Loading...' : 'Refresh');
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast glass-toast align-items-center';
        toast.role = 'status';
        toast.innerHTML = '<div class="d-flex"><div class="toast-body"></div>' +
            '<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>';
        toast.querySelector('.toast-body').textContent = message;
        document.querySelector('.toast-container').appendChild(toast);
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
        new bootstrap.Toast(toast, { delay: 2000 }).show();
    }

    return { setValue, setText, setRefreshing, showToast };
})();
