// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Filtrage des produits
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retire la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajoute la classe active au bouton cliqué
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Panier
let cartCount = 0;
const cartBtn = document.getElementById('cartBtn');
const cartCountSpan = document.querySelector('.cart-count');

function addToCart(button) {
    cartCount++;
    cartCountSpan.textContent = cartCount;
    
    // Animation feedback
    button.textContent = '✓ Ajouté';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = 'Ajouter au panier';
        button.style.background = '';
    }, 2000);
    
    // Message de confirmation
    showMessage('Produit ajouté au panier !');
}

// Bouton découvrir
const exploreBtn = document.getElementById('exploreBtn');
exploreBtn.addEventListener('click', () => {
    document.getElementById('collection').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Histoire toggle
const toggleHistory = document.getElementById('toggleHistory');
const historyContent = document.getElementById('historyContent');

toggleHistory.addEventListener('click', () => {
    if (historyContent.style.display === 'none') {
        historyContent.style.display = 'block';
        toggleHistory.textContent = 'Cacher notre histoire';
    } else {
        historyContent.style.display = 'none';
        toggleHistory.textContent = 'Voir notre histoire';
    }
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showMessage('Message envoyé avec succès !');
    contactForm.reset();
});

// Fonction pour afficher des messages
function showMessage(text) {
    // Crée le message
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Supprime le message après 3 secondes
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Ajout des animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .product-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Ferme le menu mobile si ouvert
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});