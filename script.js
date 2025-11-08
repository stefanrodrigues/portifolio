/* ==================================================================
   EFEITO DE DIGITAÇÃO (TYPING EFFECT)
   ================================================================== */
const typingText = document.querySelector('.typing-effect');
// Textos para o efeito, baseados no seu PDF
const roles = [
    [cite_start]"Consultor de Telecomunicações", // [cite: 14]
    [cite_start]"Engenheiro de Dados", // [cite: 31]
    [cite_start]"Desenvolvedor Golang" // [cite: 8]
]; 
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    let displayText = '';

    if (isDeleting) {
        // Deletando
        displayText = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Digitando
        displayText = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    typingText.textContent = displayText;

    let typeSpeed = 150;
    if (isDeleting) {
        typeSpeed /= 2; // Mais rápido ao deletar
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Pausa no final da palavra
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Terminou de deletar
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Próxima palavra
    }

    setTimeout(type, typeSpeed);
}

// Inicia o efeito quando a página carrega
document.addEventListener('DOMContentLoaded', type);


/* ==================================================================
   TROCA DE TEMA (DARK/LIGHT MODE)
   ================================================================== */
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement; // Pega o <html>

// Verifica o tema salvo no localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'dark');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});


/* ==================================================================
   FILTRO DE PROJETOS
   ================================================================== */
// Os valores em 'data-filter' devem bater com os 'data-category' no HTML
const filterButtons = document.querySelectorAll('.project__filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona 'active' ao botão clicado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category.includes(filter)) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});


/* ==================================================================
   LINK ATIVO NA NAVEGAÇÃO (SCROLL SPY)
   ================================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function scrollSpy() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Ajuste de offset
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                navLink.classList.add('active-link');
            } else {
                // navLink.classList.remove('active-link'); // Descomente se preferir
            }
        }
    });
}

window.addEventListener('scroll', scrollSpy);


/* ==================================================================
   BOTÃO VOLTAR AO TOPO (SCROLL UP)
   ================================================================== */
const scrollUp = document.getElementById('scroll-up');

function showScrollUp() {
    if (window.scrollY >= 500) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', showScrollUp);
