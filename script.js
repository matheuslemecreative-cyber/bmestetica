// --- LÓGICA DO MENU LATERAL ---
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    menuBtn.classList.toggle('open');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

const menuLinks = document.querySelectorAll('.sidebar a');
menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});


// --- LÓGICA DO CARROSSEL (AUTOMÁTICO + ARRASTAR CORRIGIDO) ---
const track = document.getElementById('track');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.carousel-container');

let currentIndex = 0;
const totalSlides = 3;
const slideInterval = 5000; 
let autoSlide = setInterval(nextSlide, slideInterval);

let startX = 0;
let isDragging = false;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
    
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetInterval();
}

function resetInterval() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
}

// CORREÇÃO DO TOQUE: Libera o clique se for em links, botões ou imagens de botões
function dragStart(e) {
    // Se o clique/toque for no botão do WhatsApp ou qualquer link/botão, não interfere
    if (e.target.closest('.whatsapp-flutuante') || e.target.closest('a') || e.target.closest('button')) {
        return; 
    }
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    clearInterval(autoSlide);
}

function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 50) {
        nextSlide();
    } else if (diffX < -50) {
        prevSlide();
    }
    
    resetInterval();
}

// Eventos do Carrossel
container.addEventListener('touchstart', dragStart, { passive: true });
container.addEventListener('touchend', dragEnd, { passive: true });
container.addEventListener('mousedown', dragStart);
container.addEventListener('mouseup', dragEnd);
container.addEventListener('mouseleave', () => { isDragging = false; });


// --- ARRASTAR SLIDER DE SERVIÇOS COM O MOUSE (PC) ---
const sliders = document.querySelectorAll('.services-slider');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        // Ignora o arrasto se clicar direto no botão de agendar
        if (e.target.closest('.book-btn')) return;
        
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'default';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'default';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; 
        slider.scrollLeft = scrollLeft - walk;
    });
});
