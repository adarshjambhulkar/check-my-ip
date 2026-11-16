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
        toast.className = 'toast';
        toast.textContent = message;
        document.querySelector('.toast-container').appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 250);
        }, 2000);
    }

    return { setValue, setText, setRefreshing, showToast };
})();
