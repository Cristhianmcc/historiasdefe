document.addEventListener('DOMContentLoaded', function() {
    // Animación suave para los botones
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Función para crear nubes de fondo
    function createClouds() {
        const body = document.body;
        const cloudCount = 8;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');
            
            // Posición aleatoria
            const top = Math.random() * 40;
            const left = Math.random() * 100;
            
            // Tamaño aleatorio
            const size = 50 + Math.random() * 100;
            
            // Velocidad aleatoria
            const duration = 60 + Math.random() * 60;
            
            cloud.style.cssText = `
                position: absolute;
                top: ${top}%;
                left: ${left}%;
                width: ${size}px;
                height: ${size * 0.6}px;
                background-color: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                z-index: 1;
                animation: float ${duration}s linear infinite;
            `;
            
            body.appendChild(cloud);
            
            // Crear la forma de nube añadiendo más círculos
            for (let j = 0; j < 3; j++) {
                const cloudPart = document.createElement('div');
                const partSize = size * (0.5 + Math.random() * 0.5);
                const partTop = Math.random() * 20 - 10;
                const partLeft = Math.random() * 40 - 20;
                
                cloudPart.style.cssText = `
                    position: absolute;
                    top: ${partTop}px;
                    left: ${partLeft}px;
                    width: ${partSize}px;
                    height: ${partSize * 0.6}px;
                    background-color: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                `;
                
                cloud.appendChild(cloudPart);
            }
        }
    }
    
    // Añadir animación de flotación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(calc(100vw + 200px));
            }
        }
    `;
    document.head.appendChild(style);
    
    // Crear nubes
    // createClouds(); // Comentado porque ya tenemos un fondo con nubes en la imagen
});