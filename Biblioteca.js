/*
 biblioteca.js — Menú dinámico tipo biblioteca para Fanfic Recs
 
 * FLUJO DE ESTADOS:
 1. LOMOS  → Se ven los lomos de los libros en la estantería
 2. PORTADA → Al hacer click en un lomo, el libro se "saca" y muestra su portada
 3. LIBRO ABIERTO → Al hacer click en la portada, el libro se abre mostrando el índice
 4. PÁGINA → Al hacer click en un título del índice, se muestra la ficha del fanfic
 
 CONCEPTOS JS USADOS:
 - Array de objetos: para guardar los datos de cada fandom y sus fanfics
 - DOM Manipulation: createElement, innerHTML, classList, appendChild
 - Event Listeners: click para manejar cada transición de estado
 - CSS Classes: agregar/quitar clases para disparar animaciones CSS
 - Template literals: construir HTML dinámico con datos del array
*/

// 1. BASE DE DATOS DE FANDOMS Y FANFICS
//    Cada fandom es un objeto con: id, nombre,
//    color de lomo, y un array de fanfics.
//    Cada fanfic tiene: título, autor, tags,
//    descripción y link a AO3.
const fandoms = [
  {
    id: "AOT",
    nombre: "Attack on Titan",
    abrev: "AOT",
    colorLomo: "#6b0f1a",
    colorAccento: "#c9a84c",
    fanfics: [
      {
        titulo: "Título 1",
        autor: "Autor 1",
        tags: ["Angst", "Canon Divergence", "Eren/Mikasa"],
        descripcion: "Una historia que explora qué hubiera pasado si Eren hubiera tomado otra decisión en el momento decisivo. Escritura profunda, personajes complejos.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 2",
        autor: "Autor 2",
        tags: ["Fluff", "AU — Coffee Shop", "Levi/Erwin"],
        descripcion: "Una AU moderna donde los personajes se encuentran en circunstancias completamente distintas. Liviana, reconfortante y muy bien escrita.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 3",
        autor: "Autor 3",
        tags: ["Hurt/Comfort", "Post-Canon"],
        descripcion: "Ambientada después del final de la serie. Una exploración de lo que queda cuando termina la guerra y los sobrevivientes tienen que reconstruirse.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 4",
        autor: "Autor 4",
        tags: ["Mystery", "Gen Fic"],
        descripcion: "Historia centrada en el universo de los titanes desde una perspectiva completamente distinta. Muy original en su construcción narrativa.",
        link: "https://archiveofourown.org"
      }
    ]
  },
  {
    id: "Arcane",
    nombre: "Arcane",
    abrev: "ARCANE",
    colorLomo: "#4a0000",
    colorAccento: "#d4a843",
    fanfics: [
      {
        titulo: "Título 1",
        autor: "Autor 1",
        tags: ["Jinx/Vi", "Angst", "Sisters"],
        descripcion: "Una historia alternativa donde Jinx y Vi tienen una segunda oportunidad. Emotiva y muy fiel al tono de la serie.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 2",
        autor: "Autor 2",
        tags: ["Jayce/Viktor", "Science", "Found Family"],
        descripcion: "El vínculo entre Jayce y Viktor explorado desde sus años de investigación. Profunda y científicamente creativa.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 3",
        autor: "Autor 3",
        tags: ["Caitlyn/Vi", "Romance", "Post-Canon"],
        descripcion: "Una historia de reencuentros y reconciliaciones. Muy bien equilibrada entre la acción y el desarrollo emocional.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 4",
        autor: "Autor 4",
        tags: ["Gen Fic", "Piltover", "World Building"],
        descripcion: "Exploración del mundo de Piltover y Zaun desde una perspectiva social. Increíblemente rica en detalles.",
        link: "https://archiveofourown.org"
      }
    ]
  },
  {
    id: "HOTD",
    nombre: "House of the Dragon",
    abrev: "HOTD",
    colorLomo: "#6b0f1a",
    colorAccento: "#c9a84c",
    fanfics: [
      {
        titulo: "Título 1",
        autor: "Autor 1",
        tags: ["Rhaenyra/Alicent", "Historical AU", "Politics"],
        descripcion: "Una reescritura de la relación central de la serie. Sofisticada, política y emocionalmente devastadora.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 2",
        autor: "Autor 2",
        tags: ["Daemon Targaryen", "Character Study"],
        descripcion: "Un estudio de personaje profundo sobre Daemon. Ambiguo moralmente, brillante en su ejecución.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 3",
        autor: "Autor 3",
        tags: ["Canon Divergence", "Dragons"],
        descripcion: "¿Qué hubiera pasado si la Danza de los Dragones hubiera tenido otro desenlace? Épica en escala y en emoción.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 4",
        autor: "Autor 4",
        tags: ["Helaena Targaryen", "Angst", "Gen"],
        descripcion: "Una mirada íntima a Helaena, la personaje más subestimada de la serie. Delicada y trágica.",
        link: "https://archiveofourown.org"
      }
    ]
  },
  {
    id: "AUs",
    nombre: "AU's",
    abrev: "AU'S",
    colorLomo: "#4a0000",
    colorAccento: "#d4a843",
    fanfics: [
      {
        titulo: "Título 1",
        autor: "Autor 1",
        tags: ["Crossover", "AU — Modern", "Multiple Fandoms"],
        descripcion: "Una AU que mezcla personajes de distintos fandoms en un universo coherente. Creativa y sorprendente.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 2",
        autor: "Autor 2",
        tags: ["Coffee Shop AU", "Slow Burn"],
        descripcion: "La clásica coffee shop AU pero ejecutada con una profundidad inusual. Los personajes se sienten reales.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 3",
        autor: "Autor 3",
        tags: ["Fantasy AU", "Magic", "Original World"],
        descripcion: "Una AU de fantasía construida desde cero con personajes de distintos fandoms. World-building impresionante.",
        link: "https://archiveofourown.org"
      },
      {
        titulo: "Título 4",
        autor: "Autor 4",
        tags: ["College AU", "Found Family", "Humor"],
        descripcion: "Una AU universitaria ligera y divertida. El equilibrio entre el humor y los momentos emotivos es perfecto.",
        link: "https://archiveofourown.org"
      }
    ]
  }
];


// 2. ESTADO DE LA APLICACIÓN
//    Una variable que trackea en qué pantalla estamos y qué fandom/fanfic está activo.
const estado = {
  pantalla: "lomos",      // "lomos" | "portada" | "libro" | "pagina"
  fandomActivo: null,     // objeto del fandom seleccionado
  fanficActivo: null      // objeto del fanfic seleccionado
};


// 3. REFERENCIAS AL DOM
//Guardamos referencias a los elementos que vamos a modificar frecuentemente.
const bibliotecaEl = document.getElementById("biblioteca");


// 4. FUNCIONES DE RENDER
//Cada función dibuja una "pantalla" distinta vaciando el contenedor y construyendo el nuevo HTML con template literals.

/*
  renderLomos()
  Dibuja la estantería con los lomos de los libros.
  Cada lomo es un div con el nombre vertical y el color del fandom.
*/
function renderLomos() {
  estado.pantalla = "lomos";
  estado.fandomActivo = null;

  // Template literal: construimos HTML con datos del array
  bibliotecaEl.innerHTML = `
    <div class="estanteria">
      <p class="estanteria-hint">— Seleccioná un fandom —</p>
      <div class="lomos-grid">
        ${fandoms.map(fandom => `
          <div 
            class="lomo" 
            data-id="${fandom.id}"
            style="--color-lomo: ${fandom.colorLomo}; --color-accento: ${fandom.colorAccento};"
          >
            <div class="lomo-banda top"></div>
            <div class="lomo-titulo">${fandom.abrev.split('').join('<br>')}</div>
            <div class="lomo-banda bottom"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Agregamos event listeners a cada lomo forEach itera el array de lomos ya renderizados en el DOM
  document.querySelectorAll('.lomo').forEach(lomoEl => {
    lomoEl.addEventListener('click', () => {
      const id = lomoEl.dataset.id;                          // leemos el data-id
      const fandom = fandoms.find(f => f.id === id);         // buscamos en el array
      lomoEl.classList.add('lomo--saliendo');                // animación de salida
      setTimeout(() => renderPortada(fandom), 350);          // esperamos que termine
    });
  });
}

/*
 * renderPortada(fandom)
 * Muestra la portada del libro seleccionado.
 * Incluye título, autor/fandom y botón para abrir.
 */
function renderPortada(fandom) {
  estado.pantalla = "portada";
  estado.fandomActivo = fandom;

  bibliotecaEl.innerHTML = `
    <div class="portada-wrapper">
      <button class="btn-volver" id="btnVolverLomos">← Volver</button>
      <div 
        class="portada" 
        id="portadaLibro"
        style="--color-lomo: ${fandom.colorLomo}; --color-accento: ${fandom.colorAccento};"
      >
        <div class="portada-banda top"></div>
        <div class="portada-contenido">
          <div class="portada-ornamento">✦</div>
          <h2 class="portada-titulo">${fandom.nombre}</h2>
          <p class="portada-subtitulo">Fanfic Recs</p>
          <div class="portada-ornamento">✦</div>
        </div>
        <div class="portada-banda bottom"></div>
        <p class="portada-hint">Click para abrir</p>
      </div>
    </div>
  `;

  // Animación de entrada
  setTimeout(() => {
    document.getElementById('portadaLibro')?.classList.add('portada--visible');
  }, 50);

  // Click en portada → abre el libro
  document.getElementById('portadaLibro').addEventListener('click', () => {
    document.getElementById('portadaLibro').classList.add('portada--abriendo');
    setTimeout(() => renderLibroAbierto(fandom), 500);
  });

  // Botón volver → lomos
  document.getElementById('btnVolverLomos').addEventListener('click', () => {
    renderLomos();
  });
}

/*
 renderLibroAbierto(fandom)
 Muestra el libro abierto con el índice de fanfics.
 La página izquierda tiene el índice; la derecha está en blanco (o decorativa).
*/
function renderLibroAbierto(fandom) {
  estado.pantalla = "libro";

  bibliotecaEl.innerHTML = `
    <div class="libro-wrapper">
      <button class="btn-volver" id="btnVolverPortada">← Cerrar libro</button>
      <div class="libro-abierto" style="--color-lomo: ${fandom.colorLomo}; --color-accento: ${fandom.colorAccento};">
        
        <!-- Página izquierda: índice -->
        <div class="libro-pagina pagina-izq">
          <div class="pagina-ornamento-top">
            <span>✦</span>
          </div>
          <h3 class="pagina-seccion">Índice</h3>
          <p class="pagina-fandom-nombre">${fandom.nombre}</p>
          <ol class="indice-lista">
            ${fandom.fanfics.map((fanfic, i) => `
              <li class="indice-item" data-index="${i}">
                <span class="indice-numero">${String(i + 1).padStart(2, '0')}</span>
                <span class="indice-titulo">${fanfic.titulo}</span>
                <span class="indice-puntos"></span>
              </li>
            `).join('')}
          </ol>
          <div class="pagina-numero">i</div>
        </div>

        <!-- Lomo del libro (centro) -->
        <div class="libro-lomo-centro"></div>

        <!-- Página derecha: decorativa / bienvenida -->
        <div class="libro-pagina pagina-der">
          <div class="pagina-ornamento-top">
            <span>✦</span>
          </div>
          <div class="pagina-der-contenido">
            <p class="pagina-cita">"Por qué aferrarse al cannon si siempre podes leer un fanfic."</p>
            <p class="pagina-cita-autor">— Fanfic Recs, Rocío</p>
          </div>
          <div class="pagina-numero">ii</div>
        </div>

      </div>
    </div>
  `;

  // Animación de apertura
  setTimeout(() => {
    document.querySelector('.libro-abierto')?.classList.add('libro--visible');
  }, 50);

  // Click en cada ítem del índice → muestra la ficha Y hace scroll a la sección
  document.querySelectorAll('.indice-item').forEach(item => {
    item.addEventListener('click', () => {
      const i = parseInt(item.dataset.index);     // convertimos el string a número
      const fanfic = fandom.fanfics[i];           // accedemos al array por índice
      item.classList.add('indice-item--activo');

      // Scroll suave a la sección del fandom en el main
      // El id de la sección coincide con fandom.id (AOT, Arcane, etc.)
      const seccion = document.getElementById(fandom.id);
      if (seccion) {
        setTimeout(() => {
          seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }

      setTimeout(() => renderPagina(fandom, fanfic), 250);
    });
  });

  // Botón volver → portada
  document.getElementById('btnVolverPortada').addEventListener('click', () => {
    renderPortada(fandom);
  });
}

/*
 renderPagina(fandom, fanfic)
  Muestra la ficha completa del fanfic seleccionado:
  título, autor, tags, descripción y link a AO3.
 */
function renderPagina(fandom, fanfic) {
  estado.pantalla = "pagina";
  estado.fanficActivo = fanfic;

  bibliotecaEl.innerHTML = `
    <div class="libro-wrapper">
      <button class="btn-volver" id="btnVolverIndice">← Volver al índice</button>
      <div class="libro-abierto libro-abierto--pagina" style="--color-lomo: ${fandom.colorLomo}; --color-accento: ${fandom.colorAccento};">

        <!-- Página izquierda: decorativa con nombre del fandom -->
        <div class="libro-pagina pagina-izq pagina-izq--fanfic">
          <div class="pagina-ornamento-top"><span>✦</span></div>
          <div class="pagina-izq-fandom">
            <p class="pagina-fandom-vertical">${fandom.nombre}</p>
          </div>
          <div class="pagina-numero">—</div>
        </div>

        <!-- Lomo centro -->
        <div class="libro-lomo-centro"></div>

        <!-- Página derecha: ficha del fanfic -->
        <div class="libro-pagina pagina-der pagina-der--fanfic">
          <div class="pagina-ornamento-top"><span>✦</span></div>
          <div class="ficha">
            <h3 class="ficha-titulo">${fanfic.titulo}</h3>
            <p class="ficha-autor">por ${fanfic.autor}</p>
            <div class="ficha-tags">
              ${fanfic.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p class="ficha-descripcion">${fanfic.descripcion}</p>
            <a href="${fanfic.link}" target="_blank" class="ficha-link">
              Leer en AO3 →
            </a>
          </div>
          <div class="pagina-numero">1</div>
        </div>

      </div>
    </div>
  `;

  setTimeout(() => {
    document.querySelector('.libro-abierto')?.classList.add('libro--visible');
  }, 50);

  // Botón volver → índice
  document.getElementById('btnVolverIndice').addEventListener('click', () => {
    renderLibroAbierto(fandom);
  });
}


// 5. INICIALIZACIÓN
//    Cuando el DOM está listo, dibujamos la pantalla inicial: los lomos.
document.addEventListener('DOMContentLoaded', () => {
  renderLomos();
});