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


// --- LÓGICA DE ARRASTAR PARA O LADO COM O MOUSE (PC) ---
// Captura todas as 3 linhas de sliders criadas no HTML
const sliders = document.querySelectorAll('.services-slider');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Altera a velocidade do arrasto aqui
        slider.scrollLeft = scrollLeft - walk;
    });
});