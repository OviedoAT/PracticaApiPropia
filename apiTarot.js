const BASE_URL = "https://tarotapi.dev/api/v1/cards";

const inputBusqueda = document.getElementById("inputBusqueda");
const btnBusqueda = document.getElementById("btnBusqueda");
const resultadosDiv = document.getElementById("resultados");
const detalleDiv = document.getElementById("detalleCarta");
const tipoSelect = document.getElementById("tipoPalos");

const cargarTodasLasCartas = () => {
    fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            renderizarCards(data.cards);
        })
        .catch(error => {
            console.error("Error al cargar cartas:", error);
        });
};

const buscarCartas = () => {

    const texto = inputBusqueda.value.trim().toLowerCase();

    if (texto === "") {
        cargarTodasLasCartas();
        return;
    }

    if (texto !== "") {
        fetch(`${BASE_URL}/search?q=${texto}`)
            .then(response => response.json())
            .then(data => {
                renderizarCards(data.cards);
            })
            .catch(error => {
                console.error("Error en búsqueda por nombre:", error);
            });

        return;
    }
};

const renderizarCards = (cartas) => {

    resultadosDiv.innerHTML = "";

    if (cartas.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron resultados</p>";
        return;
    }

    cartas.forEach(carta => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h4>${carta.name}</h4>
        `;

        card.addEventListener("click", () => {
            obtenerDetalleCarta(carta.name_short);
        });

        resultadosDiv.appendChild(card);
    });
};

const obtenerDetalleCarta = (nombre) => {

    fetch(`${BASE_URL}/${nombre}`)
        .then(response => response.json())
        .then(data => {

            const carta = data.card;

            detalleDiv.innerHTML = `
                <h2>Detalle</h2>
                <h3>${carta.name}</h3>
                <p><strong>Tipo:</strong> ${carta.type}</p>
                <p><strong>Significado (Derecho):</strong> ${carta.meaning_up}</p>
                <p><strong>Significado (Invertido):</strong> ${carta.meaning_rev}</p>
            `;
        })
        .catch(error => {
            console.error("Error al obtener detalle:", error);
        });
};

window.addEventListener("DOMContentLoaded", cargarTodasLasCartas);

btnBusqueda.addEventListener("click", buscarCartas);