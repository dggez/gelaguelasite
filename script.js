document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links na navegação que começam com '#' (links internos)
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão do clique (que é pular instantaneamente)

            // Obtém o ID da seção do atributo href (ex: "#services")
            const targetId = this.getAttribute('href');

            // Encontra o elemento alvo no documento
            const targetElement = document.querySelector(targetId);

            // Se o elemento alvo existir, rola suavemente até ele
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Define o comportamento da rolagem para suave
                });
            }
        });
    });

    // Adiciona rolagem suave para o botão "Agende seu horário" na seção Hero
    const heroButton = document.querySelector('.hero button');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector('#appointment'); // Rola para a seção de agendamento
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});