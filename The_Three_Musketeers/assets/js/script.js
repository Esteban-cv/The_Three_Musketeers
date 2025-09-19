document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);

  var parallax = document.querySelectorAll('.parallax');
  M.Parallax.init(parallax);

  var materialbox = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(materialbox);

  var slider = document.querySelectorAll('.slider');
  var sliderOptions = {
    indicators: true,
    height: 600,
    duration: 500,
    interval: 8000
  };
  M.Slider.init(slider, sliderOptions);
});

window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('preloader').style.opacity = '0';
    setTimeout(function() {
      document.getElementById('preloader').style.display = 'none';
      triggerInitialAnimations();
    }, 500);
  }, 3000);
});

function triggerInitialAnimations() {
  document.querySelectorAll('#inicio .fade-in').forEach(el => {
    el.classList.add('visible');
  });
}

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = scrollPercent + '%';
});

window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      if (entry.target.classList.contains('gallery-item')) {
        setTimeout(() => {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
        }, Math.random() * 200);
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .section-animated, .gallery-item').forEach(el => {
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

document.querySelectorAll('.character-card').forEach(card => {
  card.addEventListener('click', function() {
    const ripple = document.createElement('div');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 193, 7, 0.3);
      transform: scale(0);
      animation: ripple 0.8s linear;
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      left: ${rect.width / 2 - size / 2}px;
      top: ${rect.height / 2 - size / 2}px;
    `;
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });
});

document.querySelectorAll('.mission-icon').forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    const colors = ['var(--secondary-color)', 'var(--accent-electric)', 'var(--accent-fire)'];
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        animation: particle-float 2.5s ease-out forwards;
        left: ${Math.random() * 80 + 10}px;
        top: ${Math.random() * 80 + 10}px;
      `;
      this.appendChild(particle);
      setTimeout(() => particle.remove(), 2500);
    }
  });
});

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) rotateY(5deg)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotateY(0deg)';
  });
});

const heroSection = document.querySelector('#inicio');
document.addEventListener('mousemove', function(e) {
  if (heroSection) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const parallaxElement = heroSection.querySelector('.parallax');
    if (parallaxElement) {
      const xOffset = (mouseX - 0.5) * 30;
      const yOffset = (mouseY - 0.5) * 30;
      parallaxElement.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.1)`;
    }
  }
});

function initTypeWriter() {
  const subtitle = document.querySelector('#inicio h5');
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }
    setTimeout(typeWriter, 2000);
  }
}

let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    activateEasterEgg();
    konamiCode = [];
  }
});

function activateEasterEgg() {
  const celebration = document.createElement('div');
  celebration.innerHTML = `
    <div style="text-align: center;">
      <h2>¡Código Secreto de los Mosqueteros!</h2>
      <p>Has desbloqueado el poder de la alianza</p>
      <p>Mike, Karmelo y Chikapú te reconocen como digno de su confianza</p>
      <div style="margin-top: 20px; font-size: 2rem;">
      </div>
    </div>
  `;
  
  celebration.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--accent-electric));
    color: white;
    padding: 40px;
    border-radius: 20px;
    z-index: 10000;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    animation: celebrate 2s infinite;
    max-width: 90vw;
  `;
  
  document.body.appendChild(celebration);
  document.body.style.animation = 'rainbow 3s infinite';
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => createFallingParticle(), i * 100);
  }
  
  setTimeout(() => {
    celebration.remove();
    document.body.style.animation = '';
  }, 8000);
}

function createFallingParticle() {
  const particle = document.createElement('div');
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  
  particle.style.cssText = `
    position: fixed;
    font-size: 2rem;
    left: ${Math.random() * 100}vw;
    top: -50px;
    z-index: 9999;
    pointer-events: none;
    animation: fall 4s linear forwards;
  `;
  
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 4000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes particle-float {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-80px) scale(0) rotate(360deg);
    }
  }
  
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  
  @keyframes celebrate {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    25% { transform: translate(-50%, -50%) scale(1.05) rotate(2deg); }
    75% { transform: translate(-50%, -50%) scale(1.05) rotate(-2deg); }
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

setTimeout(initTypeWriter, 1000);