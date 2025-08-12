// Show alert when user searches
document.querySelector('header input[type="text"]').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    alert(`Searching for: ${this.value}`);
  }
});

// Highlight product cards on hover
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    card.style.transform = 'scale(1.05)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'none';
    card.style.transform = 'scale(1)';
  });
});

// Dynamic greeting based on time
const greeting = document.createElement('div');
const hour = new Date().getHours();
if (hour < 12) {
  greeting.textContent = 'Good Morning! ☀️';
} else if (hour < 18) {
  greeting.textContent = 'Good Afternoon! 🌞';
} else {
  greeting.textContent = 'Good Evening! 🌙';
}
greeting.style.textAlign = 'center';
greeting.style.padding = '10px';
greeting.style.backgroundColor = '#fff';
greeting.style.fontWeight = 'bold';
document.body.insertBefore(greeting, document.body.firstChild);

