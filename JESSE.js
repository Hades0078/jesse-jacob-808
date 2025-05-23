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
const nav = document.querySelector('nav');
let hamburger = null;
let isMenuOpen = false;

// Function to close menu
const closeMenu = () => {
  isMenuOpen = false;
  if (hamburger) hamburger.classList.remove('active');
  nav.classList.remove('active');
  document.body.style.overflow = '';
};

// Function to open menu
const openMenu = () => {
  isMenuOpen = true;
  if (hamburger) hamburger.classList.add('active');
  nav.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Function to create and insert hamburger menu
const createHamburger = () => {
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    // Insert hamburger after header
    header.insertAdjacentElement('afterend', hamburger);

    // Add click event listener
    hamburger.addEventListener('click', () => {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
};

// Function to remove hamburger menu
const removeHamburger = () => {
  if (hamburger) {
    if (isMenuOpen) {
      closeMenu();
    }
    hamburger.remove();
    hamburger = null;
  }
};

// Function to handle hamburger visibility based on screen width
const handleHamburgerVisibility = () => {
  if (window.innerWidth <= 768) {
    createHamburger();
  } else {
    removeHamburger();
  }
};

// Initial check
handleHamburgerVisibility();

// Close menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
  handleHamburgerVisibility();
  if (window.innerWidth > 768 && isMenuOpen) {
    closeMenu();
  }
});

// Handle navigation link clicks
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Close menu after clicking a link
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  });
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
  const randomLetters = '日月火水木金人口目心山川田中大小本語電時αβγδελμπσωΑΒΔΘΛΞΠΣΦΩ■□◆◇●○▣▧◉◈';

  let index = 0;

  function animateCharacter() {
    if (index < length) {
      let iterations = 8; // Number of random characters to show before settling
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
      }, 120); // Change random character every 120ms
    }
  }

  animateCharacter(); // Start the animation
}

// Assuming the logo has a class of 'logo'
const logoElement = document.querySelector('.logo');
if (logoElement) {
  animateLogo(logoElement);
}
