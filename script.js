document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animated");
    const serviceCards = document.querySelectorAll(".service-card");

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
});
