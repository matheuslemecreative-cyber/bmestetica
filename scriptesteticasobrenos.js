// --- LÓGICA DO MENU LATERAL (ABRIR E FECHAR) ---
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    menuBtn.classList.toggle('open');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Abre ou fecha o menu ao clicar no botão hambúrguer
menuBtn.addEventListener('click', toggleMenu);

// Fecha o menu ao clicar na área escura (overlay) fora dele
overlay.addEventListener('click', toggleMenu);

// Fecha o menu automaticamente ao clicar em qualquer link da barra lateral
const menuLinks = document.querySelectorAll('.sidebar a');
menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});