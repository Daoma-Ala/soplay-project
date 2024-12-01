 
class Servicio extends HTMLElement {
    #urlServicio = 'http://localhost:3000/api/v1/servicio/';
    #urlServer = 'http://localhost:3000/';
    
    constructor() {
        super();
    }

    connectedCallback() {
        const servicioId = this.getAttribute("servicioId");
        const shadow = this.attachShadow({ mode: "open" });

        this.#agregaEstilo(shadow);
        this.#render(shadow);
        this.#consultaServicio(servicioId, shadow);
    }
    #render(shadow) {
        shadow.innerHTML += `
          <section>
            <h2 id="nombre">...</h2>
            <p id="descripcion">...</p>
            <p id="precio">...</p>
            <img id="imagen" alt="Imagen del servicio" />
            <button id="agregar-cotizacion">Agregar a cotización</button>
          </section>
        `;
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./servicioComponent/css/servicio.css");
        shadow.appendChild(link);
    }

    #consultaServicio(servicioId, shadow) {
        fetch(this.#urlServicio + servicioId)
            .then(response => response.json())
            .then(servicio => {
                let nombreElement = shadow.querySelector("#nombre");
                nombreElement.innerHTML = servicio.nombre;

                let descripcionElement = shadow.querySelector("#descripcion");
                descripcionElement.innerHTML = servicio.descripcion;

                let precioElement = shadow.querySelector("#precio");
                precioElement.innerHTML = `Costo: $${servicio.precio}`;

                let imagenElement = shadow.querySelector("#imagen");
                imagenElement.src = servicio.foto ? this.#urlServer+servicio.foto.ruta : 'default-image.jpg'; // Imagen del servicio

                let buttonElement = shadow.querySelector("#agregar-cotizacion");
                buttonElement.onclick = () => this.#agregarACotizacion(servicio.id_servicio);
            })
            .catch(error => {
                console.error('Error al consultar el servicio:', error);
            });
    }

    #agregarACotizacion(servicioId) {
        console.log(`Servicio con ID ${servicioId} agregado a la cotización.`);
    }
}

window.customElements.define('servicio-info', Servicio);