// Copy-to-clipboard buttons ([data-copy="<target element id>"]).
const CopyButtons = (function () {
    async function writeText(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) {
            // Fallback for browsers/contexts without the async Clipboard API
            const tmp = document.createElement('textarea');
            tmp.value = text;
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            tmp.remove();
        }
    }

    async function copyFromButton(button) {
        const el = document.getElementById(button.dataset.copy);
        if (el.dataset.copyable !== '1' || button.classList.contains('copied')) return;

        const text = el.textContent;
        await writeText(text);

        const original = button.innerHTML;
        button.classList.add('copied');
        button.innerHTML = '<svg><use href="#i-check" /></svg>';
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = original;
        }, 1500);

        UI.showToast(`${text} copied to clipboard`);
    }

    function init() {
        document.querySelectorAll('[data-copy]').forEach(button =>
            button.addEventListener('click', () => copyFromButton(button)));
    }

    return { init };
})();
