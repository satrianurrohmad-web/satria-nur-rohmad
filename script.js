const menuButton = document.getElementById('menuButton');
const navigation = document.getElementById('navigation');
const themeButton = document.getElementById('themeButton');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');

menuButton.addEventListener('click', () => {
  const opened = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.setAttribute('aria-label', opened ? 'Tutup menu' : 'Buka menu');
  menuButton.textContent = opened ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu');
  menuButton.textContent = '☰';
}));
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeButton.textContent = document.body.classList.contains('light-mode') ? '☾' : '☼';
});
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.gallery-card[data-full]').forEach(card => card.addEventListener('click', () => {
  lightboxImage.src = card.dataset.full;
  lightboxImage.alt = card.querySelector('img').alt;
  lightboxCaption.textContent = card.dataset.caption || '';
  lightbox.showModal();
}));
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => { lightboxImage.src = ''; });

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...navigation.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  sections.forEach(section => observer.observe(section));
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .story-main, .profile-card, .journey-card, .stat-card, .achievement-detail, .daily-card, .gallery-card, .motivation-panel, .closing-card').forEach(el => {
    el.classList.add('reveal'); revealObserver.observe(el);
  });
}
