document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animated");
    const links = document.querySelectorAll('.smooth-scroll');
    const readMoreLinks = document.querySelectorAll('.read-more');

    let expandedCard = null; 

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
      
        if (window.scrollY > 0) {
          navbar.classList.add('scrolled');  
          backgroundContainer.classList.add('visible');  
        } else {
          navbar.classList.remove('scrolled');  
          backgroundContainer.classList.remove('visible');  
        }
      });      

      function toggleCardExpansion(serviceCard) {
        const readMoreLink = serviceCard.querySelector('.read-more'); 

        if (serviceCard.classList.contains('expanded')) {
            serviceCard.classList.remove('expanded');
            serviceCard.classList.add('collapsing');
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.opacity = '1'; 
            });
            serviceCard.querySelector('.more-text').style.display = 'none'; 
            readMoreLink.textContent = 'Leia mais →'; 
            expandedCard = null;

            setTimeout(() => {
              serviceCard.classList.remove('collapsing');
          }, 800);
          
        } else {
            if (expandedCard) {
                expandedCard.classList.remove('expanded'); 
                expandedCard.querySelector('.more-text').style.display = 'none'; 
                expandedCard.style.opacity = '1'; 
                expandedCard.querySelector('.read-more').textContent = 'Leia mais →';
            }

            serviceCard.classList.add('expanded');
            document.querySelectorAll('.service-card').forEach(card => {
                if (card !== serviceCard) {
                    card.style.opacity = '0.3'; 
                }
            });
            serviceCard.querySelector('.more-text').style.display = 'block'; 
            readMoreLink.textContent = 'Leia menos ←';
            expandedCard = serviceCard; 
        }
    }

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); 

            const serviceCard = this.closest('.service-card'); 
            toggleCardExpansion(serviceCard); 
        });
    });

    document.addEventListener('click', function (e) {
        if (expandedCard && !expandedCard.contains(e.target) && !e.target.closest('.read-more')) {
            toggleCardExpansion(expandedCard); 
        }
    });

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.stopPropagation(); 
        });
    });
});
