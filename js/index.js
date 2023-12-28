// Catálogo de películas
const catalogoPeliculas = [
    { titulo: 'El Padrino', genero: 'Drama', duracion: 175, imagen: './assets/img/01_El Padrino.jpg' },
    { titulo: 'Forrest Gump', genero: 'Drama', duracion: 142, imagen: './assets/img/02_Forrest.jpg' },
    { titulo: 'Pulp Fiction', genero: 'Crimen', duracion: 154, imagen: './assets/img/03_Pulp Fiction.jpg' },
    { titulo: 'Titanic', genero: 'Romance', duracion: 195, imagen: './assets/img/04_Titanic.jpg' },
    { titulo: 'Matrix', genero: 'Ciencia ficción', duracion: 136, imagen: './assets/img/05_Matrix.jpg' },
    { titulo: 'El Señor de los Anillos', genero: 'Fantasía', duracion: 178, imagen: './assets/img/06_El señor de los anillos.jpg' },
    { titulo: 'El Rey León', genero: 'Animación', duracion: 88, imagen: './assets/img/08_El rey Leon.jpg' },
    { titulo: 'Inception', genero: 'Ciencia ficción', duracion: 148, imagen: './assets/img/09_Inception.jpg' },
    { titulo: 'The Shawshank', genero: 'Drama', duracion: 142, imagen: './assets/img/10_The Shawshank Redemption.jpg' },

];


document.addEventListener('DOMContentLoaded', () => {
    const catalogoContainer = document.getElementById('catalogo-container');
    const detallesContainer = document.getElementById('detalles-seleccionadas');
    const duracionTotalRecuadro = document.getElementById('duracion-total-recuadro');
    const vaciarBtn = document.getElementById('vaciarBtn');

    let tiempoInicioSeleccion = null;

    function mostrarCatalogo() {
        catalogoContainer.innerHTML = '';

        catalogoPeliculas.forEach((pelicula, index) => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card');

            const tituloPelicula = document.createElement('p'); 
            tituloPelicula.textContent = pelicula.titulo;
            tituloPelicula.classList.add('card-title');

            const imagen = document.createElement('img');
            imagen.src = pelicula.imagen;
            imagen.alt = pelicula.titulo;
            imagen.classList.add('card-img');

            const detalles = document.createElement('div');
            detalles.classList.add('card-details');
            detalles.innerHTML = `<p>${pelicula.genero}</p><p>${pelicula.duracion} minutos</p>`;

            const seleccionarBtn = document.createElement('button');
            seleccionarBtn.textContent = 'Seleccionar';
            seleccionarBtn.addEventListener('click', () => seleccionarPelicula(pelicula));

            cardContainer.appendChild(tituloPelicula); 
            cardContainer.appendChild(imagen);
            cardContainer.appendChild(detalles);
            cardContainer.appendChild(seleccionarBtn);

            catalogoContainer.appendChild(cardContainer);
        });
    }

    function seleccionarPelicula(pelicula) {
        tiempoInicioSeleccion = new Date();

        if (!peliculaSeleccionada(pelicula)) {
            mostrarDetalles(pelicula);
        }
    }

    function peliculaSeleccionada(pelicula) {
        return detallesContainer.innerHTML.includes(pelicula.titulo);
    }

    function mostrarDetalles(pelicula) {
        Swal.fire({
            title: 'Película seleccionada',
            text: `Has seleccionado: ${pelicula.titulo}`,
            icon: 'success',
            confirmButtonColor: '#007BFF',
            confirmButtonText: 'OK'
        });

        detallesContainer.innerHTML += `<p>${mostrarDetallesTexto(pelicula)}</p>`;
        actualizarDuracionTotal();
        mostrarBotonVaciar();
        guardarPeliculaSeleccionada(pelicula);
    }

    function mostrarDetallesTexto(pelicula) {
        return `Detalles de "${pelicula.titulo}":\nGénero: ${pelicula.genero}\nDuración: ${pelicula.duracion} minutos`;
    }

    function guardarPeliculaSeleccionada(pelicula) {
        const peliculasSeleccionadas = obtenerPeliculasSeleccionadas();
        peliculasSeleccionadas.push(pelicula);
        localStorage.setItem('peliculasSeleccionadas', JSON.stringify(peliculasSeleccionadas));
    }

    function actualizarDuracionTotal() {
        const peliculasSeleccionadas = obtenerPeliculasSeleccionadas();
        const duracionTotal = peliculasSeleccionadas.reduce((total, pelicula) => total + pelicula.duracion, 0);
        const horas = Math.floor(duracionTotal / 60);
        const minutos = duracionTotal % 60;

        const tiempoTranscurrido = tiempoInicioSeleccion ? calcularTiempoTranscurrido(tiempoInicioSeleccion) : 0;

        duracionTotalRecuadro.innerHTML = `Te tomaría ${horas} horas y ${minutos} minutos ${tiempoTranscurrido} segundos. En ver todas las películas seleccionadas.`;
    }

    function mostrarBotonVaciar() {
        vaciarBtn.style.display = 'block';
    }

    function obtenerPeliculasSeleccionadas() {
        const peliculasSeleccionadasGuardadas = JSON.parse(localStorage.getItem('peliculasSeleccionadas')) || [];
        return peliculasSeleccionadasGuardadas;
    }

    function vaciarLista() {
        detallesContainer.innerHTML = '';
        duracionTotalRecuadro.textContent = '';
        localStorage.removeItem('peliculasSeleccionadas');
        vaciarBtn.style.display = 'none';
        tiempoInicioSeleccion = null;
    }

    function calcularTiempoTranscurrido(tiempoInicio) {
        const tiempoActual = new Date();
        const diferenciaTiempo = (tiempoActual - tiempoInicio) / 1000;
        return Math.floor(diferenciaTiempo);
    }

    mostrarCatalogo();
    vaciarBtn.addEventListener('click', vaciarLista);
});
