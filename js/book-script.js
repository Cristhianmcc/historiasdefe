document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const storyHeader = document.querySelector('.story-header');
    const storyContent = document.querySelector('.story-content');
    
    if (!storyHeader || !storyContent) {
        console.error('No se encontraron los elementos necesarios');
        return;
    }
    
    // Obtener datos de la historia
    const storyTitle = storyHeader.querySelector('h1').textContent;
    const storyImage = storyContent.querySelector('.story-image img').src;
    const storyImageAlt = storyContent.querySelector('.story-image img').alt;
    
    // Obtener todos los párrafos
    const paragraphs = Array.from(storyContent.querySelectorAll('p'));
    console.log("Párrafos encontrados:", paragraphs.length);
    
    if (paragraphs.length === 0) {
        console.error('No se encontraron párrafos en la historia');
        return;
    }
    
    // Crear estructura del libro
    const main = document.querySelector('main');
    const originalContent = main.innerHTML;
    main.innerHTML = '';
    
    // Crear el contenedor del libro
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-container';
    main.appendChild(bookContainer);
    
    // Crear el libro
    const book = document.createElement('div');
    book.className = 'book';
    bookContainer.appendChild(book);
    
    // Crear portada
    const cover = document.createElement('div');
    cover.className = 'book-cover';
    cover.innerHTML = `
        <h1>${storyTitle}</h1>
        <img src="${storyImage}" alt="${storyImageAlt}">
        <p>Haz clic para abrir</p>
    `;
    book.appendChild(cover);
    
    // Crear contenedor de páginas
    const pagesContainer = document.createElement('div');
    pagesContainer.className = 'pages-container';
    pagesContainer.style.display = 'none';
    book.appendChild(pagesContainer);
    
    // Crear páginas
    paragraphs.forEach((paragraph, index) => {
        const page = document.createElement('div');
        page.className = 'page';
        page.id = `page-${index}`;
        page.style.display = 'none';
        
        // Contenido de la página
        let pageContent = '';
        
        // Primera página con imagen
        if (index === 0) {
            pageContent = `
                <div class="page-content">
                    <div class="story-image">
                        <img src="${storyImage}" alt="${storyImageAlt}">
                    </div>
                    ${paragraph.outerHTML}
                </div>
            `;
        } else {
            pageContent = `
                <div class="page-content">
                    ${paragraph.outerHTML}
                </div>
            `;
        }
        
        // Añadir número de página y controles
        pageContent += `
            <div class="page-number">Página ${index + 1} de ${paragraphs.length}</div>
            <div class="page-controls">
                <button id="prev-btn-${index}" ${index === 0 ? 'disabled' : ''}>Anterior</button>
                <button id="next-btn-${index}" ${index === paragraphs.length - 1 ? 'disabled' : ''}>Siguiente</button>
            </div>
        `;
        
        page.innerHTML = pageContent;
        pagesContainer.appendChild(page);
    });
    
    // Navegación entre historias
    const bookNavigation = document.createElement('div');
    bookNavigation.className = 'book-navigation';
    bookNavigation.innerHTML = `
        <a href="../index.html#cuentos">Volver a Cuentos</a>
        <a href="david-goliat.html">Siguiente Historia</a>
    `;
    main.appendChild(bookNavigation);
    
    // Botón para volver al formato original
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Volver al formato original';
    resetButton.style.margin = '20px auto';
    resetButton.style.display = 'block';
    resetButton.style.padding = '10px 15px';
    resetButton.style.backgroundColor = '#8B4513';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    
    resetButton.addEventListener('click', function() {
        main.innerHTML = originalContent;
    });
    
    main.appendChild(resetButton);
    
    // Variables de control
    let currentPage = -1; // -1 = portada, 0+ = páginas
    
    // Abrir el libro al hacer clic en la portada
    cover.addEventListener('click', function() {
        cover.style.transform = 'rotateY(-180deg)';
        
        setTimeout(function() {
            pagesContainer.style.display = 'block';
            showPage(0);
        }, 500);
    });
    
    // Función para mostrar una página específica
    function showPage(pageIndex) {
        console.log("Mostrando página:", pageIndex);
        
        // Ocultar la página actual si existe
        if (currentPage >= 0) {
            document.getElementById(`page-${currentPage}`).style.display = 'none';
        }
        
        // Mostrar la nueva página
        const newPage = document.getElementById(`page-${pageIndex}`);
        if (newPage) {
            newPage.style.display = 'block';
            currentPage = pageIndex;
            
            // Configurar botones
            setupPageButtons(pageIndex);
        } else {
            console.error("No se encontró la página:", pageIndex);
        }
    }
    
    // Configurar botones de una página específica
    function setupPageButtons(pageIndex) {
        // Botón anterior
        const prevBtn = document.getElementById(`prev-btn-${pageIndex}`);
        if (prevBtn) {
            prevBtn.onclick = function() {
                if (pageIndex > 0) {
                    showPage(pageIndex - 1);
                }
            };
        }
        
        // Botón siguiente
        const nextBtn = document.getElementById(`next-btn-${pageIndex}`);
        if (nextBtn) {
            nextBtn.onclick = function() {
                if (pageIndex < paragraphs.length - 1) {
                    showPage(pageIndex + 1);
                }
            };
        }
    }
    
    // Eventos de teclado
    document.addEventListener('keydown', function(event) {
        if (currentPage >= 0) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                if (currentPage < paragraphs.length - 1) {
                    showPage(currentPage + 1);
                }
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                if (currentPage > 0) {
                    showPage(currentPage - 1);
                }
            }
        }
    });
});
