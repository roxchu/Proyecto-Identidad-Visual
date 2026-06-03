/**
 * biblioteca.js — Menú dinámico tipo biblioteca con efecto libro 3D
 *
 * TÉCNICA CSS 3D (inspirada en: https://www.youtube.com/watch?v=mriZ7iOhNh8)
 *   - transform-style: preserve-3d  → los hijos mantienen su posición en el espacio 3D
 *   - perspective                   → define la distancia del ojo al plano 3D (profundidad)
 *   - rotateY()                     → gira el elemento sobre el eje vertical (efecto flip de página)
 *   - backface-visibility: hidden   → oculta la cara trasera de un elemento cuando está girado
 *   - animation-delay               → hace que cada página gire en secuencia, no todas a la vez
 *   - z-index dinámico              → controla qué página queda "encima" durante el giro
 *
 * FLUJO:
 *   LOMOS → click → LIBRO 3D con flip de tapa → páginas giran mostrando índice → ficha de fanfic
 *
 * REFERENCIAS:
 *   - CSS 3D transforms: https://developer.mozilla.org/es/docs/Web/CSS/transform-function/rotateY
 *   - perspective: https://developer.mozilla.org/es/docs/Web/CSS/perspective
 *   - backface-visibility: https://developer.mozilla.org/es/docs/Web/CSS/backface-visibility
 *   - animation-delay: https://developer.mozilla.org/es/docs/Web/CSS/animation-delay
 *   - Arrays y objetos: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
 *   - Template literals: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals
 */

// ─────────────────────────────────────────────
// 1. BASE DE DATOS
// ─────────────────────────────────────────────
const fandoms = [
  {
    id: "AOT",
    nombre: "Attack on Titan",
    abrev: "AOT",
    colorLomo: "#6b0f1a",
    colorAccento: "#c9a84c",
    imagenUrl: "AttackOnTitan2.jpg",
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
    colorLomo: "#6b0f1a",
    colorAccento: "#e8c87a",
    imagenUrl: "arcane1.jpg",
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
    colorLomo: "#4a0000",
    colorAccento: "#d4a843",
    imagenUrl: "HOTD1.jpg",
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
    colorLomo: "#7a0020",
    colorAccento: "#c9a84c",
    imagenUrl: "AUs1.png",
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

// ─────────────────────────────────────────────
// 2. ESTADO
// ─────────────────────────────────────────────
const estado = {
  pantalla: "lomos",
  fandomActivo: null,
  fanficActivo: null,
  paginaActual: 0       // índice de la página abierta en el libro 3D
};

const bibliotecaEl = document.getElementById("biblioteca");

// ─────────────────────────────────────────────
// 3. RENDER: LOMOS (estantería)
// ─────────────────────────────────────────────
function renderLomos() {
  estado.pantalla = "lomos";
  estado.fandomActivo = null;

  bibliotecaEl.innerHTML = `
    <div class="estanteria">
      <p class="estanteria-hint">— Seleccioná un fandom —</p>
      <div class="lomos-grid">
        ${fandoms.map(f => `
          <div class="lomo" data-id="${f.id}"
            style="--color-lomo:${f.colorLomo}; --color-accento:${f.colorAccento};">
            <div class="lomo-banda top"></div>
            <div class="lomo-titulo">${f.abrev.split('').join('<br>')}</div>
            <div class="lomo-banda bottom"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.lomo').forEach(el => {
    el.addEventListener('click', () => {
      const fandom = fandoms.find(f => f.id === el.dataset.id);
      el.classList.add('lomo--saliendo');
      setTimeout(() => renderLibro3D(fandom), 400);
    });
  });
}

// ─────────────────────────────────────────────
// 4. RENDER: LIBRO 3D
//
//    Estructura HTML del libro:
//    .libro-escena (perspective)
//      └── .libro-3d (transform-style: preserve-3d)
//            ├── .libro-tapa-front  ← cara delantera (portada)
//            ├── .libro-tapa-back   ← cara trasera de la tapa (interior)
//            └── .libro-paginas
//                  ├── .pagina[data-i="0"]  ← índice (anverso/reverso con backface-visibility)
//                  └── .pagina[data-i="1..n"] ← fichas de fanfics
//
//    Cada .pagina tiene dos caras:
//      .cara-front  (lo que ves al derecho)
//      .cara-back   (lo que ves cuando la página está girada — backface-visibility:hidden)
//
//    El giro se controla agregando/quitando la clase .pagina--girada (rotateY(-180deg))
//    con animation-delay para efecto secuencial.
// ─────────────────────────────────────────────
function renderLibro3D(fandom) {
  estado.pantalla = "libro";
  estado.fandomActivo = fandom;
  estado.paginaActual = 0;

  // Construimos las páginas: [índice] + [una página por fanfic]
  // LÓGICA DE CARAS:
  // Cada página tiene frente (cara derecha visible) y dorso (cara izquierda visible
  // cuando ESA página está girada, es decir, la izquierda de la página SIGUIENTE).
  //
  // Página 0 (índice):
  //   - frente = índice (derecha cuando el libro recién abre)
  //   - dorso  = fondo rojo con ornamento (izquierda visible mientras se ve el índice,
  //              antes de girar la primera página)
  //
  // Página 1..n (fanfics):
  //   - frente = ficha del fanfic (derecha)
  //   - dorso  = imagen del fandom (izquierda visible cuando esta página está girada)
  //
  // La cara izquierda que se ve junto al ÍNDICE es el dorso de la página 0.
  // La cara izquierda que se ve junto a cada FANFIC es el dorso de esa misma página.

  const paginas = [
    {
      tipo: "indice",
      frente: `
        <div class="pagina-ornamento-top"><span>✦</span></div>
        <h3 class="pagina-seccion">Índice</h3>
        <p class="pagina-fandom-nombre">${fandom.nombre}</p>
        <ol class="indice-lista">
          ${fandom.fanfics.map((ff, i) => `
            <li class="indice-item" data-index="${i}">
              <span class="indice-numero">${String(i+1).padStart(2,'0')}</span>
              <span class="indice-titulo">${ff.titulo}</span>
              <span class="indice-puntos"></span>
            </li>
          `).join('')}
        </ol>
        <div class="pagina-numero">i</div>
      `,
      // Dorso del índice = cara izquierda que se ve ANTES de pasar la primera página
      // → fondo rojo con ornamento dorado
      dorso: `<div class="pagina-izq-roja">
        <div class="pagina-izq-roja-ornamento">✦</div>
        <p class="pagina-izq-roja-nombre">${fandom.nombre}</p>
        <div class="pagina-izq-roja-ornamento">✦</div>
      </div>`
    },
    ...fandom.fanfics.map((ff, i) => ({
      tipo: "fanfic",
      fanficIndex: i,
      frente: `
        <div class="pagina-ornamento-top"><span>✦</span></div>
        <div class="ficha">
          <h3 class="ficha-titulo">${ff.titulo}</h3>
          <p class="ficha-autor">por ${ff.autor}</p>
          <div class="ficha-tags">${ff.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <p class="ficha-descripcion">${ff.descripcion}</p>
          <a href="${ff.link}" target="_blank" class="ficha-link">Leer en AO3 →</a>
        </div>
        <div class="pagina-numero">${i + 1}</div>
      `,
      // Dorso de cada fanfic = cara izquierda visible mientras se lee esa ficha
      // → imagen del fandom cubriendo toda la cara
      dorso: `
        ${fandom.imagenUrl
          ? `<div class="pagina-imagen-wrapper"><img src="${fandom.imagenUrl}" alt="${fandom.nombre}" class="pagina-imagen"></div>`
          : `<div class="pagina-izq-roja">
               <div class="pagina-izq-roja-ornamento">✦</div>
               <p class="pagina-izq-roja-nombre">${fandom.nombre}</p>
               <div class="pagina-izq-roja-ornamento">✦</div>
             </div>`
        }
        <div class="pagina-numero" style="position:absolute;bottom:10px;width:100%;text-align:center;">${i + 2}</div>
      `
    }))
  ];

  bibliotecaEl.innerHTML = `
    <div class="libro-ui">
      <div class="libro-controles">
        <button class="btn-volver" id="btnVolverLomos">← Volver</button>
        <div class="libro-nav">
          <button class="btn-pagina" id="btnPrev" disabled>‹</button>
          <span class="libro-nav-hint">pasá las páginas</span>
          <button class="btn-pagina" id="btnNext">›</button>
        </div>
      </div>

      <!-- Escena 3D: perspective define la profundidad -->
      <div class="libro-escena">
        <div class="libro-3d" id="libro3d"
          style="--color-lomo:${fandom.colorLomo}; --color-accento:${fandom.colorAccento};">

          <!-- Tapa delantera (portada) -->
          <div class="libro-tapa libro-tapa-front">
            <div class="tapa-banda top"></div>
            <div class="tapa-contenido">
              <div class="tapa-ornamento">✦</div>
              <h2 class="tapa-titulo">${fandom.nombre}</h2>
              <p class="tapa-subtitulo">Fanfic Recs</p>
              <div class="tapa-ornamento">✦</div>
            </div>
            <div class="tapa-banda bottom"></div>
          </div>

          <!-- Cara interior de la tapa (se ve cuando la tapa está girada) -->
          <div class="libro-tapa libro-tapa-back">
            <div class="tapa-interior-texto">Abrí el libro para ver el índice</div>
          </div>

          <!-- Páginas -->
          <div class="libro-paginas">
            ${paginas.map((p, i) => `
              <div class="pagina" data-i="${i}" style="z-index:${paginas.length - i};">
                <div class="cara cara-front">${p.frente}</div>
                <div class="cara cara-back">${p.dorso}</div>
              </div>
            `).join('')}
          </div>

        </div>
      </div>
    </div>
  `;

  // Animar entrada del libro
  setTimeout(() => {
    document.getElementById('libro3d')?.classList.add('libro-3d--visible');
    // Abrir la tapa automáticamente después de un momento
    setTimeout(() => {
      document.getElementById('libro3d')?.classList.add('libro-3d--abierto');
    }, 600);
  }, 80);

  // ── Navegación por páginas ──
  // Inicializar z-index correcto desde el arranque
  setTimeout(() => actualizarBotones(), 700);
  // paginaActual = índice de la próxima página a girar
  // Girar hacia adelante: agregar clase .pagina--girada a pagina[data-i=paginaActual]
  // Girar hacia atrás: quitar clase de pagina[data-i=paginaActual-1]

  function actualizarBotones() {
    document.getElementById('btnPrev').disabled = estado.paginaActual === 0;
    document.getElementById('btnNext').disabled = estado.paginaActual >= paginas.length;
    // Recalcular z-index de todas las páginas:
    // - Páginas ya giradas: z-index bajo (quedaron atrás)
    // - Páginas no giradas: z-index alto (la primera del stack arriba de todo)
    //   Esto evita que el dorso de páginas posteriores se transparente
    document.querySelectorAll('.pagina').forEach(p => {
      const i = parseInt(p.dataset.i);
      if (p.classList.contains('pagina--girada')) {
        p.style.zIndex = i + 1;
      } else {
        p.style.zIndex = (paginas.length * 2) - i;
      }
    });
  }

  document.getElementById('btnNext').addEventListener('click', () => {
    if (estado.paginaActual >= paginas.length) return;
    const pag = document.querySelector(`.pagina[data-i="${estado.paginaActual}"]`);
    if (pag) {
      pag.classList.add('pagina--girada');
      // z-index: la página girada queda debajo de las siguientes
      pag.style.zIndex = estado.paginaActual;
    }
    estado.paginaActual++;
    actualizarBotones();
    // Scroll a la sección si es una página de fanfic
    const pagData = paginas[estado.paginaActual - 1];
    if (pagData?.tipo === 'fanfic') {
      const seccion = document.getElementById(fandom.id);
      if (seccion) seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.getElementById('btnPrev').addEventListener('click', () => {
    if (estado.paginaActual === 0) return;
    estado.paginaActual--;
    const pag = document.querySelector(`.pagina[data-i="${estado.paginaActual}"]`);
    if (pag) {
      pag.classList.remove('pagina--girada');
      pag.style.zIndex = paginas.length - estado.paginaActual;
    }
    actualizarBotones();
  });

  // Click en ítem del índice → salta directo a esa página
  bibliotecaEl.addEventListener('click', e => {
    const item = e.target.closest('.indice-item');
    if (!item) return;
    const targetIndex = parseInt(item.dataset.index) + 1; // +1 porque la pág 0 es el índice
    // Girar todas las páginas hasta llegar
    while (estado.paginaActual < targetIndex) {
      const pag = document.querySelector(`.pagina[data-i="${estado.paginaActual}"]`);
      if (pag) {
        pag.classList.add('pagina--girada');
        pag.style.zIndex = estado.paginaActual;
      }
      estado.paginaActual++;
    }
    actualizarBotones();
    const seccion = document.getElementById(fandom.id);
    if (seccion) seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('btnVolverLomos').addEventListener('click', () => {
    renderLomos();
  });
}

// ─────────────────────────────────────────────
// 5. INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderLomos();
});