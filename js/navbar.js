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

            var pathname = (window.location.pathname || '').replace(/\\/g, '/');
            var segments = pathname.split('/').filter(Boolean);
            var currentFile = segments.length ? segments[segments.length - 1] : 'index.html';
            if (!currentFile || currentFile === '') currentFile = 'index.html';

            var inEn = pageLang === 'en';

            var enOpt = placeholder.querySelector('.lang-option[data-lang="en"]');
            var ruOpt = placeholder.querySelector('.lang-option[data-lang="ru"]');
            if (!enOpt || !ruOpt) return;

            enOpt.classList.remove('lang-active');
            ruOpt.classList.remove('lang-active');

            if (inEn) {
                enOpt.classList.add('lang-active');
                enOpt.href = '#';
                enOpt.style.pointerEvents = 'none';
                ruOpt.href = '../' + currentFile;
                ruOpt.style.pointerEvents = '';
            } else {
                ruOpt.classList.add('lang-active');
                ruOpt.href = '#';
                ruOpt.style.pointerEvents = 'none';
                enOpt.href = 'en/' + currentFile;
                enOpt.style.pointerEvents = '';
            }
        })
        .catch(function(err) { console.error('Error loading navbar:', err); });
});
