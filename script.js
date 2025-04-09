document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animated");
  const readMoreLinks = document.querySelectorAll('.read-more');
  const backgroundContainer = document.querySelector(".background-container");
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  const sections = document.querySelectorAll(".content-wrapper");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  const navbarElement = document.querySelector('.navbar');
  const contactIcons = document.getElementById("contact-icons");
  const contactContainer = document.querySelector('.contact');

  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

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

  if (animatedElements.length > 0) {
      window.addEventListener("scroll", onScroll);
      onScroll();
  }

  if (typeof AOS !== "undefined") {
      AOS.init({
          duration: 1200,
          easing: 'ease-in-out',
      });
  }

  if (backgroundContainer) {
      const imageUrl = backgroundContainer.getAttribute("data-background");
      if (imageUrl) {
          backgroundContainer.style.backgroundImage = `url('${imageUrl}')`;

          document.addEventListener('scroll', function () {
              const position = backgroundContainer.getBoundingClientRect();
              if (position.top >= 0 && position.bottom <= window.innerHeight) {
                  backgroundContainer.classList.add('visible');
              }
          });

          window.addEventListener('scroll', function () {
              const scrollPosition = window.scrollY;
              backgroundContainer.style.backgroundPosition = `center ${scrollPosition * 0.2}%`;
          });
      }
  }

    if (slider && slides.length > 0) {
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
      });
    }
    
    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
          currentSlide = index;
          updateSlider();
        });
      });
    }
    
    setInterval(function() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
    }, 5000);
    
    updateSlider();
  }
  
  const title = document.querySelector('.title'); 
  const triggerSection = document.querySelector('.trigger-section');

  if (title && triggerSection) {
      document.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          const triggerHeight = triggerSection.offsetTop;
          const sectionHeight = triggerSection.offsetHeight;

          if (scrollY > triggerHeight - window.innerHeight && scrollY < triggerHeight + sectionHeight) {
              const scale = 1 + (scrollY - triggerHeight + window.innerHeight) / 500;
              title.style.transform = `scale(${scale})`;
          } else {
              title.style.transform = 'scale(1)';
          }
      });
  }

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          const words = entry.target.querySelectorAll(".word");
          words.forEach((word, index) => {
              if (entry.isIntersecting) {
                  setTimeout(() => word.classList.add("visible"), index * 300);
              } else {
                  word.classList.remove("visible");
              }
          });
      });
  }, { threshold: 0.5 });

  if (sections.length > 0) {
      sections.forEach(section => observer.observe(section));
  }

  if (menuToggle && navbarLinks && contactIcons) {
      menuToggle.addEventListener("click", () => {
          navbarLinks.classList.toggle("show");
          contactIcons.classList.toggle("show");
      });
  }
  mobileMenu.addEventListener('click', function() {
    navbar.classList.toggle('active');
    
    this.classList.toggle('active');
    
    if (this.classList.contains('active')) {
      this.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      this.children[1].style.opacity = '0';
      this.children[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      this.children[0].style.transform = 'none';
      this.children[1].style.opacity = '1';
      this.children[2].style.transform = 'none';
    }
  });
  
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
      navbar.classList.remove('active');
      mobileMenu.classList.remove('active');
      
      mobileMenu.children[0].style.transform = 'none';
      mobileMenu.children[1].style.opacity = '1';
      mobileMenu.children[2].style.transform = 'none';
    });
  });
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbarElement.classList.add('scrolled');
    } else {
      navbarElement.classList.remove('scrolled');
    }
  });

  document.getElementById('submitButton').addEventListener('click', function() {
    const form = document.getElementById('contactForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!firstName || !lastName || !email || !subject || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const whatsappMessage = 
        `*Novo contato do site*\n\n` +
        `*Nome:* ${firstName} ${lastName}\n` +
        `*E-mail:* ${email}\n` +
        `*Assunto:* ${subject}\n\n` +
        `*Mensagem:*\n${message}`;
    
    const whatsappNumber = "5547920021797"; 
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank');
    
    form.reset();
  });

});

