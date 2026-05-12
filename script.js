// Countdown Timer
const targetDate = new Date('May 23, 2026 12:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML = "<h3>¡LA COMPETENCIA HA COMENZADO!</h3>";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Competitor Data
const competitors = {
    keyla: {
        name: "Keyla Daniela",
        title: "La Maestra del Fuego",
        birth: "21 de febrero de 1988",
        sign: "Piscis",
        signImage: "Picsis.jpg",
        desc: "Keyla es conocida por su técnica impecable con el fuego directo. Su secreto reside en un 'rub' seco que ha perfeccionado durante años. No solo cocina costillas; ella las moldea con pasión y precisión volcánica. Se dice que el humo le obedece."
    },
    jose: {
        name: "José Alejandro",
        title: "El Guardián del Humo",
        birth: "7 de junio de 1996",
        sign: "Géminis",
        signImage: "Geminis.jpg",
        desc: "Un tradicionalista puro que cree en el 'low and slow'. Para José, la paciencia es el ingrediente principal. Sus ribs son tan tiernas que se desprenden del hueso con solo mirarlas. Su técnica de ahumado es legendaria en la familia."
    },
    juan: {
        name: "Juan José",
        title: "El Señor de la Brasa",
        birth: "20 de septiembre de 1989",
        sign: "Virgo",
        signImage: "Virgo.jpg",
        desc: "El experimentalista del grupo. Juan José no teme usar maderas exóticas y glaseados poco convencionales. Su objetivo es redefinir lo que una costilla puede ser. Cada bocado de sus ribs es una explosión de sabores inesperados y gloria pura."
    }
};

// Modal Logic
function openModal(id) {
    const comp = competitors[id];
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${comp.signImage}" alt="${comp.sign}" style="width: 200px; height: auto; border-radius: 10px; border: 2px solid #facc15; box-shadow: 0 0 20px rgba(250, 204, 21, 0.4); margin-bottom: 15px;">
            <h2 style="margin: 0;">${comp.name}</h2>
            <p style="color: #f97316; font-family: 'Cinzel', serif; font-size: 0.9rem;">${comp.title}</p>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Nacimiento:</strong> ${comp.birth}</p>
            <p style="margin: 5px 0;"><strong>Signo:</strong> ${comp.sign}</p>
        </div>
        <p style="color: #f3f4f6; font-size: 1.05rem; line-height: 1.6;">${comp.desc}</p>
    `;
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Flying Ribs Generator
const ribsContainer = document.getElementById('flying-ribs-container');
const ribImage = 'rib.png';

function createFlyingRib() {
    const rib = document.createElement('img');
    rib.src = ribImage;
    rib.classList.add('flying-rib');
    
    // Randomize properties
    const size = Math.random() * 60 + 40; // 40px to 100px
    const duration = Math.random() * 8 + 12; // 12s to 20s
    const startY = Math.random() * 100;
    const delay = Math.random() * 3;
    
    rib.style.width = `${size}px`;
    rib.style.top = `${startY}vh`;
    rib.style.left = `-150px`;
    rib.style.animationDuration = `${duration}s`;
    rib.style.animationDelay = `${delay}s`;
    
    ribsContainer.appendChild(rib);
    
    setTimeout(() => {
        rib.remove();
    }, (duration + delay) * 1000);
}

// Embers Generator
function createEmber() {
    const ember = document.createElement('div');
    ember.classList.add('ember');
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const duration = Math.random() * 3 + 4;
    
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    ember.style.left = `${startX}vw`;
    ember.style.bottom = `-10px`;
    ember.style.animationDuration = `${duration}s`;
    
    ribsContainer.appendChild(ember);
    
    setTimeout(() => {
        ember.remove();
    }, duration * 1000);
}

// Create elements periodically
setInterval(createFlyingRib, 1500); // More frequent ribs
setInterval(createEmber, 200);      // Frequent embers

// Initial burst
for(let i=0; i<10; i++) {
    setTimeout(createFlyingRib, i * 300);
}
for(let i=0; i<20; i++) {
    setTimeout(createEmber, i * 100);
}

// RSVP Form with AJAX
document.getElementById('rsvp-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const button = form.querySelector('.btn-submit');
    const originalText = button.innerText;

    button.innerText = 'ENVIANDO...';
    button.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert(`¡Gracias ${data.get('name')}! Tu mensaje ha sido enviado a los guerreros de la brasa.`);
            form.reset();
        } else {
            alert('Ups! Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.');
        }
    } catch (error) {
        alert('Error de conexión. Intenta de nuevo más tarde.');
    } finally {
        button.innerText = originalText;
        button.disabled = false;
    }
});
