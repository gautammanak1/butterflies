import { butterfliesBackground } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

const pc = butterfliesBackground({
  el: document.getElementById('app'),
  eventsEl: document.body,
  gpgpuSize: 18,
  background: 0x88CEFF,
  material: 'phong',
  lights: [
    { type: 'ambient', params: [0xffffff, 0.5] },
    { type: 'directional', params: [0xffffff, 1], props: { position: [10, 0, 0] } }
  ],
  materialParams: { transparent: true, alphaTest: 0.5 },
  texture: 'https://assets.codepen.io/33787/butterflies.png',
  textureCount: 4,
  wingsScale: [2, 2, 2],
  wingsWidthSegments: 16,
  wingsHeightSegments: 16,
  wingsSpeed: 0.75,
  wingsDisplacementScale: 1.25,
  noiseCoordScale: 0.01,
  noiseTimeCoef: 0.0005,
  noiseIntensity: 0.0025,
  attractionRadius1: 100,
  attractionRadius2: 150,
  maxVelocity: 0.1
})

// Quote cycling functionality
let currentQuoteIndex = 0;
const quotes = document.querySelectorAll('.quote');
const totalQuotes = quotes.length;

function showNextQuote() {
  // Hide current quote
  quotes[currentQuoteIndex].classList.remove('active');
  
  // Move to next quote
  currentQuoteIndex = (currentQuoteIndex + 1) % totalQuotes;
  
  // Show next quote
  quotes[currentQuoteIndex].classList.add('active');
}

// Start quote cycling
setInterval(showNextQuote, 4000);

// Add click interaction to manually cycle quotes
document.addEventListener('click', (e) => {
  if (e.target.closest('.quotes-container') || e.target.closest('.quote')) {
    showNextQuote();
  }
});

// Add touch interaction for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - show next quote
      showNextQuote();
    } else {
      // Swipe down - show previous quote
      quotes[currentQuoteIndex].classList.remove('active');
      currentQuoteIndex = currentQuoteIndex === 0 ? totalQuotes - 1 : currentQuoteIndex - 1;
      quotes[currentQuoteIndex].classList.add('active');
    }
  }
}

// Add some sparkle effects
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'fixed';
  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = Math.random() * window.innerHeight + 'px';
  sparkle.style.fontSize = '20px';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = '1000';
  sparkle.style.animation = 'sparkleFade 2s ease-out forwards';
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 2000);
}

// Add sparkle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkleFade {
    0% {
      opacity: 1;
      transform: scale(0.5) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.2) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.8) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// Create sparkles periodically
setInterval(createSparkle, 3000);

// Add special effect on quote change
const originalShowNextQuote = showNextQuote;
showNextQuote = function() {
  originalShowNextQuote();
  // Create extra sparkles when quote changes
  for (let i = 0; i < 3; i++) {
    setTimeout(() => createSparkle(), i * 200);
  }
};

