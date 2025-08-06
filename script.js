// Hero reveal
const heroTitle = document.getElementById('hero-title');
const heroSection = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      heroTitle.classList.remove('animate');
      void heroTitle.offsetWidth;
      heroTitle.classList.add('animate');
    }
  });
}, { threshold: 0.6 });
heroObserver.observe(heroSection);

// Project cards reveal + modals
const cards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal-close');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.3 });
cards.forEach(c => obs.observe(c));
cards.forEach(card => card.addEventListener('click', () => {
  document.getElementById(card.dataset.modal).classList.add('active');
}));
closeBtns.forEach(btn => btn.onclick = () => btn.closest('.modal').classList.remove('active'));
window.addEventListener('click', e => modals.forEach(m => { if (e.target === m) m.classList.remove('active'); }));

// Fade-up on scroll
const fadeSections = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeSections.forEach(section => fadeObserver.observe(section));

// Extra section scroll logic
document.querySelector('.desc-scroll').addEventListener('scroll', () => {
  const descs = document.querySelectorAll('.description');
  const containerRect = document.querySelector('.desc-scroll').getBoundingClientRect();
  descs.forEach(desc => {
    const r = desc.getBoundingClientRect();
    if (r.top >= containerRect.top + containerRect.height * 0.2 &&
        r.top < containerRect.top + containerRect.height * 0.6) {
      document.getElementById('extra-img').src = desc.getAttribute('data-img');
    }
  });
});

// Description intersection logic
const descriptions = document.querySelectorAll('.description');
const imgDisplay = document.getElementById('extra-img');
const container = document.querySelector('.desc-scroll');
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) imgDisplay.src = entry.target.getAttribute('data-img');
  });
}, { root: container, threshold: 0.5 });
descriptions.forEach(desc => imgObserver.observe(desc));

const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      descriptions.forEach(d => d.classList.remove('active'));
      entry.target.classList.add('active');
    }
  });
}, { root: container, threshold: 0.6 });
descriptions.forEach(desc => highlightObserver.observe(desc));

// Awards carousel logic
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.award-carousel');
  const cards = Array.from(carousel?.children || []);
  const prevBtn = document.querySelector('.award-arrow.prev');
  const nextBtn = document.querySelector('.award-arrow.next');
  if (!carousel || !prevBtn || !nextBtn) return;

  // **Center the middle card on page load**
  const midIndex = Math.floor(cards.length / 2);
  const midCard = cards[midIndex];
  if (midCard) {
    const containerRect = carousel.getBoundingClientRect();
    const cardRect = midCard.getBoundingClientRect();
    const scrollOffset = (cardRect.left + cardRect.width / 2)
                       - (containerRect.left + containerRect.width / 2);
    carousel.scrollBy({ left: scrollOffset, behavior: 'instant' });
  }

  function updateVisible() {
    const centerX = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      card.classList.toggle('visible', Math.abs(cardCenter - centerX) < r.width / 2);
    });
  }

  prevBtn.onclick = () => carousel.scrollBy({ left: -260, behavior: 'smooth' });
  nextBtn.onclick = () => carousel.scrollBy({ left: 260, behavior: 'smooth' });
  carousel.addEventListener('scroll', updateVisible);
  window.addEventListener('resize', updateVisible);
  updateVisible();

  cards.forEach(card => {
    card.onclick = () => {
      if (card.classList.contains('visible') && card.dataset.url) {
        window.open(card.dataset.url, '_blank');
      }
    };
  });

  const scrollBtn = document.getElementById('scrollToTopBtn');
  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Scroll progress bar update
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.height = `${scrollPercent}%`;
});
