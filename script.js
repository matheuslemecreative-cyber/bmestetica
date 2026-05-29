// ==========================================================================
// --- 1. LÓGICA DO MENU LATERAL (HAMBÚRGUER) ---
// ==========================================================================
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


// ==========================================================================
// --- 2. LÓGICA DO CARROSSEL (AUTOMÁTICO + ARRASTAR MOBILE COM LINKS) ---
// ==========================================================================
const track = document.getElementById('track');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.carousel-container');

let currentIndex = 0;
const totalSlides = 3;
const slideInterval = 5000; // 5 segundos
let autoSlide = setInterval(nextSlide, slideInterval);

let startX = 0;
let isDragging = false;
let moved = false; // Nova variável para detectar se houve arrasto real

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

// Modificado para capturar o clique/toque inicial nos banners
function dragStart(e) {
    if (e.target.closest('.whatsapp-flutuante')) {
        return;
    }
    
    isDragging = true;
    moved = false; // Reseta o estado de movimento a cada novo toque
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    clearInterval(autoSlide);
}

function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
    const diffX = startX - endX;

    // Só considera como arrasto de slide se passar de 50 pixels
    if (Math.abs(diffX) > 50) {
        moved = true; // Sinaliza que o usuário teve a intenção de arrastar, não de clicar
        if (diffX > 50) {
            nextSlide();
        } else if (diffX < -50) {
            prevSlide();
        }
    }
    
    resetInterval();
}

// Bloqueia o redirecionamento do link se a pessoa tentou arrastar o banner
container.querySelectorAll('.slide a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (moved) {
            e.preventDefault();
        }
    });
});

// Eventos de toque e mouse para o carrossel
container.addEventListener('touchstart', dragStart, { passive: true });
container.addEventListener('touchend', dragEnd, { passive: true });
container.addEventListener('mousedown', dragStart);
container.addEventListener('mouseup', dragEnd);
container.addEventListener('mouseleave', () => { isDragging = false; });


// ==========================================================================
// --- 3. ARRASTAR SLIDER DE SERVIÇOS COM O MOUSE (PC) ---
// ==========================================================================
const sliders = document.querySelectorAll('.services-slider');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
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
