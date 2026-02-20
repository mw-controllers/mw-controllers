// Loads navbar.html from same directory as current page (root -> navbar.html, en/ -> en/navbar.html)
document.addEventListener('DOMContentLoaded', function() {
    var placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    var pageLang = (placeholder.getAttribute('data-lang') || document.documentElement.getAttribute('lang') || 'ru').toLowerCase();

    // Always use relative URL so: from /en/xxx.html we get en/navbar.html, from /xxx.html we get navbar.html
    fetch('navbar.html')
        .then(function(r) { return r.text(); })
        .then(function(html) {
            placeholder.innerHTML = html;

            var pathname = (window.location.pathname || '/').replace(/\\/g, '/');
            var inEn = pageLang === 'en';

            // Extract the page filename, normalising index/directory to empty string
            var file;
            if (inEn) {
                file = pathname.replace(/^\/en\//i, '');
            } else {
                file = pathname.replace(/^\//, '');
            }
            if (file === 'index.html' || file === '') file = '';

            // Build canonical absolute targets: '' → '/' or '/en/', 'ccs.html' → '/ccs.html' or '/en/ccs.html'
            var ruTarget = '/' + file;
            var enTarget = '/en/' + file;

            var enOpt = placeholder.querySelector('.lang-option[data-lang="en"]');
            var ruOpt = placeholder.querySelector('.lang-option[data-lang="ru"]');
            if (!enOpt || !ruOpt) return;

            enOpt.classList.remove('lang-active');
            ruOpt.classList.remove('lang-active');

            if (inEn) {
                enOpt.classList.add('lang-active');
                enOpt.href = '#';
                enOpt.style.pointerEvents = 'none';
                ruOpt.href = ruTarget;
                ruOpt.style.pointerEvents = '';
            } else {
                ruOpt.classList.add('lang-active');
                ruOpt.href = '#';
                ruOpt.style.pointerEvents = 'none';
                enOpt.href = enTarget;
                enOpt.style.pointerEvents = '';
            }
        })
        .catch(function(err) { console.error('Error loading navbar:', err); });
});
