(function () {
    function setMenuState(toggle, panel, isOpen) {
        toggle.setAttribute('aria-expanded', String(isOpen));
        panel.classList.toggle('is-open', isOpen);
        panel.hidden = !isOpen;
    }

    function initMenu(toggle) {
        var panelId = toggle.getAttribute('aria-controls');
        if (!panelId) {
            return;
        }

        var panel = document.getElementById(panelId);
        if (!panel) {
            return;
        }

        setMenuState(toggle, panel, false);

        toggle.addEventListener('click', function () {
            var currentlyExpanded = toggle.getAttribute('aria-expanded') === 'true';
            setMenuState(toggle, panel, !currentlyExpanded);
        });

        panel.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenuState(toggle, panel, false);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setMenuState(toggle, panel, false);
                toggle.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setMenuState(toggle, panel, false);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-nav-toggle]').forEach(initMenu);
    });
})();
