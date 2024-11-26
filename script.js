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

    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const modal360 = document.getElementById('modal360');
    const closeModal = document.querySelector('.close');
    const sky360 = document.getElementById('sky-360');
    let currentIndex = 0;
    let autoSlideInterval;
    
    function loadImage(slide) {
        const mainImage = slide.querySelector('img[data-src]'); 
        const dataSrc = mainImage ? mainImage.getAttribute('data-src') : null;
        if (dataSrc && !mainImage.src) {
            mainImage.src = dataSrc; 
        }
    }
    
    function showSlide(index) {
        const totalSlides = slides.length;
    
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
    
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    
        slides.forEach((slide, i) => {
            const textLeft = slide.querySelector('.text-left');
            const textRight = slide.querySelector('.text-right');
    
            if (i === currentIndex) {
                textLeft.style.opacity = '1'; 
                textRight.style.opacity = '1';
                loadImage(slide);
            } else {
                textLeft.style.opacity = '0'; 
                textRight.style.opacity = '0';
            }
        });
    }
    
    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        resetAutoSlide();
    });
    
    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        resetAutoSlide();
    });
    
    function autoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 3000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }
    
    autoSlide();
    showSlide(0);    

    document.addEventListener('scroll', () => {
        const title = document.querySelector('.project-title');
        const scrollY = window.scrollY; 
        const triggerHeight = document.querySelector('.parallax-360').offsetTop; 
        const sectionHeight = document.querySelector('.parallax-360').offsetHeight;
    
        if (scrollY > triggerHeight - window.innerHeight && scrollY < triggerHeight + sectionHeight) {
            const scale = 1 + (scrollY - triggerHeight + window.innerHeight) / 500; 
            title.style.transform = `scale(${scale})`;
        } else {
            title.style.transform = 'scale(1)';
        }
    });
    
      const animateWords = (section) => {
        const words = section.querySelectorAll(".word");
        words.forEach((word, index) => {
          setTimeout(() => {
            word.classList.add("visible");
          }, index * 300); 
        });
      };

      const resetWords = (section) => {
        const words = section.querySelectorAll(".word");
        words.forEach((word) => {
          word.classList.remove("visible");
        });
      };
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateWords(entry.target); 
          } else {
            resetWords(entry.target); 
          }
        });
      }, {
        threshold: 0.5, 
      });
    
      const sections = document.querySelectorAll(".content-wrapper");
      sections.forEach((section) => observer.observe(section));


      document.getElementById('menu-toggle').addEventListener('click', function() {
        const navbarLinks = document.getElementById('navbar-links');
        navbarLinks.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
    });
});
