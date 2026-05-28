// --- LÓGICA DO MENU LATERAL (HAMBÚRGUER) ---
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    menuBtn.classList.toggle('open');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Eventos para abrir/fechar o menu
menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Fecha a barra lateral automaticamente se clicar em qualquer link interno dela
const menuLinks = document.querySelectorAll('.sidebar a');
menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});