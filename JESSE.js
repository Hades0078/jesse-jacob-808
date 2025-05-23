console.log('Happy developing ✨');

// Header shrink on scroll
const header = document.querySelector('header');
const scrollThreshold = 40; // pixels

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Hamburger menu functionality
const hamburger = document.createElement('button');
hamburger.className = 'hamburger';
hamburger.innerHTML = `
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
`;
// Insert hamburger after header
header.insertAdjacentElement('afterend', hamburger);

const nav = document.querySelector('nav');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = isMenuOpen ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (isMenuOpen && !hamburger.contains(e.target) && !nav.contains(e.target)) {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMenuOpen) {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }
});

const toggleBtn = document.createElement('button');
toggleBtn.className = 'theme-toggle';
toggleBtn.textContent = 'Switch Colors';
document.body.appendChild(toggleBtn);

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  toggleBtn.textContent = 'Switch colors';
}

// Toggle theme on button click
toggleBtn.addEventListener('click', function() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = 'Switch colors';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = 'Switch Colors';
  }
});

// Animation for logo class
function animateLogo(logoElement) {
  const targetText = 'JESSE';
  const length = targetText.length;
  const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let index = 0;

  function animateCharacter() {
    if (index < length) {
      let iterations = 5; // Number of random characters to show before settling
      let currentIteration = 0;

      const interval = setInterval(() => {
        const randomChar = randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
        logoElement.textContent = logoElement.textContent.substring(0, index) + randomChar + logoElement.textContent.substring(index + 1);
        currentIteration++;

        if (currentIteration >= iterations) {
          clearInterval(interval);
          logoElement.textContent = logoElement.textContent.substring(0, index) + targetText.charAt(index) + logoElement.textContent.substring(index + 1);
          index++;
          setTimeout(animateCharacter, 100); // Proceed to the next character after a delay
        }
      }, 100); // Change random character every 100ms
    }
  }

  animateCharacter(); // Start the animation
}

// Assuming the logo has a class of 'logo'
const logoElement = document.querySelector('.logo');
if (logoElement) {
  animateLogo(logoElement);
}
