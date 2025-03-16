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
  const navbarLinks = document.getElementById("navbar-links");
  const contactIcons = document.getElementById("contact-icons");

  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

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

  function toggleCardExpansion(serviceCard) {
      const readMoreLink = serviceCard.querySelector('.read-more');
      const moreText = serviceCard.querySelector('.more-text');

      if (!readMoreLink || !moreText) return;

      if (serviceCard.classList.contains('expanded')) {
          serviceCard.classList.remove('expanded');
          serviceCard.classList.add('collapsing');
          document.querySelectorAll('.service-card').forEach(card => card.style.opacity = '1');
          moreText.style.display = 'none';
          readMoreLink.textContent = 'Leia mais →';
          expandedCard = null;

          setTimeout(() => serviceCard.classList.remove('collapsing'), 800);
      } else {
          if (expandedCard) {
              expandedCard.classList.remove('expanded');
              expandedCard.querySelector('.more-text').style.display = 'none';
              expandedCard.querySelector('.read-more').textContent = 'Leia mais →';
              expandedCard.style.opacity = '1';
          }

          serviceCard.classList.add('expanded');
          document.querySelectorAll('.service-card').forEach(card => {
              if (card !== serviceCard) card.style.opacity = '0.3';
          });
          moreText.style.display = 'block';
          readMoreLink.textContent = 'Leia menos ←';
          expandedCard = serviceCard;
      }
  }

  readMoreLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const serviceCard = link.closest('.service-card');
          if (serviceCard) toggleCardExpansion(serviceCard);
      });

      link.addEventListener('click', (e) => e.stopPropagation());
  });

  document.addEventListener('click', (e) => {
      if (expandedCard && !expandedCard.contains(e.target) && !e.target.closest('.read-more')) {
          toggleCardExpansion(expandedCard);
      }
  });


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
  
  document.querySelector('.navbar').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('hidden');
    }
  });

});

