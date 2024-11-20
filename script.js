document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animated");
    const links = document.querySelectorAll('.smooth-scroll');

    const onScroll = () => {
        animatedElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                el.classList.add("show");
            } else {
                el.classList.remove("show");
            }
        });
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); 

    AOS.init({
        duration: 1200, 
        easing: 'ease-in-out', 
      });
      

      document.addEventListener('scroll', function() {
        var element = document.querySelector('.background-container');
        var position = element.getBoundingClientRect();
      
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
          element.classList.add('visible');
        }
      });

      window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const background = document.querySelector('.background-container');
        
        background.style.backgroundPosition = `center ${scrollPosition * 0.5}px`; 
    });

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1); 

            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop, 
                behavior: 'smooth' 
            });
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const backgroundContainer = document.querySelector('.background-container');
      
        // Quando o usuário rola para baixo
        if (window.scrollY > 0) {
          navbar.classList.add('scrolled');  // Adiciona o fundo escuro à navbar
          backgroundContainer.classList.add('visible');  // Torna o fundo visível
        } else {
          navbar.classList.remove('scrolled');  // Remove o fundo escuro da navbar
          backgroundContainer.classList.remove('visible');  // Torna o fundo invisível
        }
      });      
});
