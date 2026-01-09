(function(){
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Mobile nav
  const menuBtn = qs('[data-menu-btn]');
  const navLinks = qs('[data-navlinks]');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    qsa('a', navLinks).forEach(a => a.addEventListener('click', ()=> navLinks.classList.remove('open')));
  }

  // Smooth scroll offset for sticky header
  qsa('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const target = qs(id);
      if(!target) return;
      e.preventDefault();
      const topbar = qs('.topbar');
      const offset = (topbar ? topbar.offsetHeight : 0) + 10;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({top:y, behavior:'smooth'});
      history.replaceState(null, '', id);
    });
  });

  // Accordion
  qsa('[data-acc-item]').forEach(item=>{
    const btn = qs('[data-acc-btn]', item);
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const open = item.classList.toggle('open');
      // close others
      qsa('[data-acc-item].open').forEach(other=>{
        if(other !== item) other.classList.remove('open');
      });
      if(open){
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Year
  const y = qs('[data-year]');
  if(y) y.textContent = new Date().getFullYear();
})();
