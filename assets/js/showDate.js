
    document.getElementById('year').textContent = new Date().getFullYear(); document.getElementById('month').textContent = '0' + new Date().getMonth(); document.getElementById('day').textContent = new Date().getDate();
    const btn = document.querySelector('.menu-toggle'); const menu = document.getElementById('primary-nav');
    if (btn && menu) { btn.addEventListener('click', () => { const isOpen = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', String(isOpen)); }); }
