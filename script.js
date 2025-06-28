document.addEventListener('DOMContentLoaded', function () {
    // Mensagem de depuração: verifica se o script foi carregado e executado
    console.log("Script carregado e executado!");

    // --- Funcionalidade de Rolagem Suave para links de navegação ---
    // Seleciona todos os links dentro da tag <nav> que começam com '#'
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão do clique (o "pulo" instantâneo)

            // Obtém o ID da seção do atributo href (ex: "#services", "#hero")
            const targetId = this.getAttribute('href');

            // Encontra o elemento HTML correspondente ao ID
            const targetElement = document.querySelector(targetId);

            // Se o elemento alvo existir, rola suavemente até ele
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Define o comportamento da rolagem para suave
                });

                // Fecha o menu hambúrguer após clicar em um link (se estiver aberto em telas pequenas)
                // Isso melhora a experiência do usuário em dispositivos móveis
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger-menu');
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // --- Funcionalidade de Rolagem Suave para o botão "Agende seu horário" da Seção Hero ---
    const heroButton = document.querySelector('.hero button');
    if (heroButton) { // Verifica se o botão existe antes de adicionar o evento
        heroButton.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão do botão

            // Rola para a seção de agendamento (id="appointment")
            const targetElement = document.querySelector('#appointment');
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Funcionalidade do Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Verifica se os elementos do hambúrguer e do menu existem na página
    if (hamburger && navMenu) {
        // Adiciona um ouvinte de evento de clique ao botão do hambúrguer
        hamburger.addEventListener('click', function () {
            // Alterna a classe 'active' no menu de navegação para mostrar/esconder
            navMenu.classList.toggle('active');
            // Alterna a classe 'active' no próprio hambúrguer para animar o ícone (opcional, mas comum)
            hamburger.classList.toggle('active');
        });

        // Opcional, mas recomendado: Fecha o menu quando o usuário clica fora dele
        document.addEventListener('click', function (event) {
            // Verifica se o clique não foi no hambúrguer nem dentro do menu
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                // Se o menu estiver aberto, fecha-o
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }

        });
    }

        // --- Funcionalidade do Carrossel de Equipe ---
        const carouselTrack = document.querySelector('.carousel-track');
        const teamMembers = document.querySelectorAll('.team-member');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        const carouselDotsContainer = document.querySelector('.carousel-dots');

        if (carouselTrack && teamMembers.length > 0 && prevButton && nextButton && carouselDotsContainer) {
            let currentIndex = 0; // O slide atual
            const memberWidth = teamMembers[0].offsetWidth; // Largura de um membro (slide)

            // Função para atualizar a posição do carrossel
            function updateCarousel() {
                carouselTrack.style.transform = 'translateX(' + (-currentIndex * memberWidth) + 'px)';
                updateDots(); // Atualiza os pontos indicadores
            }

            // Função para atualizar os pontos indicadores
            function updateDots() {
                carouselDotsContainer.innerHTML = ''; // Limpa os pontos existentes
                teamMembers.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                    });
                    carouselDotsContainer.appendChild(dot);
                });
            }

            // Evento para o botão "Próximo"
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % teamMembers.length; // Avança, voltando ao início se chegar ao fim
                updateCarousel();
            });

            // Evento para o botão "Anterior"
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length; // Retrocede, indo para o fim se chegar ao início
                updateCarousel();
            });

            // Inicializa o carrossel e os pontos
            updateCarousel();

            // Adiciona um listener para recalcular a largura e posição se a janela for redimensionada
            window.addEventListener('resize', () => {
                // Recalcula a largura do membro ao redimensionar a janela
                // É importante pegar o offsetWidth do primeiro elemento, pois ele não estará transformado
                const newMemberWidth = teamMembers[0].offsetWidth;
                // Se a largura mudou, atualiza o transform para o novo tamanho
                if (memberWidth !== newMemberWidth) { // Comparação para evitar atualizações desnecessárias
                    updateCarousel(); // Atualiza a posição com base na nova largura
                }
            });

        } else {
            console.warn("Elementos do carrossel não encontrados. Verifique as classes HTML ou se há membros da equipe.");
        }
    });