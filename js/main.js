document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces internos que comienzan con #
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Añadir un event listener a cada enlace
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // Prevenir el comportamiento predeterminado
        e.preventDefault();
        
        // Obtener el destino del enlace
        const targetId = this.getAttribute('href');
        
        // Si el destino es solo #, desplazar al inicio de la página
        if(targetId === '#') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }
        
        // Obtener el elemento destino
        const targetElement = document.querySelector(targetId);
        
        // Si el elemento existe, desplazarse hacia él
        if(targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });