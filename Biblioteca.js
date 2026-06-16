/**
 * biblioteca.js — Menú dinámico tipo biblioteca con efecto libro 3D
 */

// ─────────────────────────────────────────────
// 1. BASE DE DATOS
// ─────────────────────────────────────────────
const fandoms = [
  {
    id: "AOT",
    nombre: "Attack on Titan",
    abrev: "AOT",
    colorLomo: "#4a0000",
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
  paginaActual: 0
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
            <div class="lomo-cara-top"></div>
            <div class="lomo-cara-frontal">
              <div class="lomo-banda top"></div>
              <div class="lomo-titulo">${f.abrev}</div>
              <div class="lomo-banda bottom"></div>
            </div>
            <div class="lomo-cara-bottom"></div>
            <div class="lomo-cara-contratapa"></div>
            <div class="lomo-cara-tapa"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.lomo').forEach(el => {
    el.addEventListener('click', () => {
      const fandom = fandoms.find(f => f.id === el.dataset.id);
      el.classList.add('lomo--saliendo');
      setTimeout(() => renderLibro3D(fandom), 1100);
    });
  });
}

// ─────────────────────────────────────────────
// 4. RENDER: LIBRO 3D
// ─────────────────────────────────────────────
function renderLibro3D(fandom) {
  estado.pantalla = "libro";
  estado.fandomActivo = fandom;
  estado.paginaActual = 0;

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
      dorso: `
        ${fandom.imagenUrl
          ? `<div class="pagina-imagen-wrapper"><img src="${fandom.imagenUrl}" alt="${fandom.nombre}" class="pagina-imagen"></div>`
          : `<div class="pagina-izq-roja">
               <div class="pagina-izq-roja-ornamento">✦</div>
               <p class="pagina-izq-roja-nombre">${fandom.nombre}</p>
               <div class="pagina-izq-roja-ornamento">✦</div>
             </div>`
        }
      `
    })),

    {
      tipo: "contratapa",
      frente: `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:20px;text-align:center;padding:20px;">
          <div style="color:var(--color-accento,#c9a84c);font-size:1.2rem;opacity:0.6;">✦</div>
          <p style="font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(0.85rem,1.5vw,1rem);color:var(--texto-suave);line-height:1.7;max-width:320px;">
            "Las historias son la forma en que los humanos le dan sentido al mundo."
          </p>
          <p style="font-size:0.7rem;letter-spacing:1.5px;color:var(--texto-suave);opacity:0.55;">— Fanfic Recs, Rocío Monzón</p>
          <div style="color:var(--color-accento,#c9a84c);font-size:1rem;opacity:0.5;">✦</div>
          <p style="font-size:0.6rem;letter-spacing:3px;text-transform:uppercase;color:var(--texto-suave);opacity:0.3;margin-top:8px;">fin</p>
        </div>
      `,
      dorso: ``
    }
  ];

  function contenidoIzq(tipo) {
    if (tipo === 'indice' || tipo === 'contratapa') {
      return `<div class="pagina-izq-roja">
        <div class="pagina-izq-roja-ornamento">✦</div>
        <p class="pagina-izq-roja-nombre">${fandom.nombre}</p>
        <div class="pagina-izq-roja-ornamento">✦</div>
      </div>`;
    }
    return fandom.imagenUrl
      ? `<div class="pagina-imagen-wrapper"><img src="${fandom.imagenUrl}" alt="${fandom.nombre}" class="pagina-imagen"></div>`
      : `<div class="pagina-izq-roja">
           <div class="pagina-izq-roja-ornamento">✦</div>
           <p class="pagina-izq-roja-nombre">${fandom.nombre}</p>
           <div class="pagina-izq-roja-ornamento">✦</div>
         </div>`;
  }

  bibliotecaEl.innerHTML = `
    <div class="libro-ui">
      <div class="libro-escena">
        <div class="libro-3d" id="libro3d"
          style="--color-lomo:${fandom.colorLomo}; --color-accento:${fandom.colorAccento};">

          <div class="libro-tapa libro-tapa-front libro-tapa-front--oculta">
            <div class="tapa-banda top"></div>
            <div class="tapa-contenido">
              <div class="tapa-ornamento">✦</div>
              <h2 class="tapa-titulo">${fandom.nombre}</h2>
              <p class="tapa-subtitulo">Fanfic Recs</p>
              <div class="tapa-ornamento">✦</div>
            </div>
            <div class="tapa-banda bottom"></div>
          </div>
          <div class="libro-tapa libro-tapa-back libro-tapa-back--oculta">
            <div class="tapa-interior-texto">✦</div>
          </div>

          <div class="libro-pagina-izq" id="paginaIzq">
            ${contenidoIzq('indice')}
          </div>

          <div class="libro-lomo-centro"></div>

          <div class="libro-paginas">
            ${paginas.map((p, i) => `
              <div class="pagina" data-i="${i}" data-tipo="${p.tipo}" style="z-index:${paginas.length - i};">
                <div class="cara cara-front">${p.frente}</div>
              </div>
            `).join('')}
          </div>

        </div>
      </div>
      <div class="libro-controles">
        <div class="libro-nav">
          <button class="btn-volver" id="btnVolverLomos">← Volver</button>
          <button class="btn-pagina" id="btnPrev" disabled>‹</button>
          <button class="btn-indice" id="btnIndice" title="Ir al índice">☰</button>
          <span class="libro-nav-hint">pasá las páginas</span>
          <button class="btn-pagina" id="btnNext">›</button>
        </div>
      </div>
    </div>
  `;

  function recalcZIndex() {
    document.querySelectorAll('.pagina').forEach(p => {
      const i = parseInt(p.dataset.i);
      p.style.zIndex = p.classList.contains('pagina--girada')
        ? i + 1
        : (paginas.length * 2) - i;
    });
  }

  function recalcVisibility() {
    document.querySelectorAll('.pagina').forEach(p => {
      const back = p.querySelector('.cara-back');
      if (!back) return;
      back.style.visibility = p.classList.contains('pagina--girada') ? 'visible' : 'hidden';
    });
  }

  function actualizarBotones() {
    document.getElementById('btnPrev').disabled = estado.paginaActual === 0;
    document.getElementById('btnNext').disabled = estado.paginaActual >= paginas.length - 1;
    recalcZIndex();
    recalcVisibility();
    const libro = document.getElementById('libro3d');
    if (!libro) return;
    const esContratapa = paginas[estado.paginaActual]?.tipo === 'contratapa';
    libro.classList.toggle('libro-3d--contratapa', esContratapa);
  }

  function actualizarPaginaIzq() {
    const izq = document.getElementById('paginaIzq');
    if (!izq) return;
    const tipoPagActual = paginas[estado.paginaActual]?.tipo || 'indice';
    izq.innerHTML = contenidoIzq(tipoPagActual);
  }

  function girarAdelante() {
    if (estado.paginaActual >= paginas.length - 1) return;
    const pag = document.querySelector(`.pagina[data-i="${estado.paginaActual}"]`);
    if (pag) pag.classList.add('pagina--girada');
    estado.paginaActual++;
    actualizarBotones();
    actualizarPaginaIzq();
  }

  setTimeout(() => {
    const libro = document.getElementById('libro3d');
    if (!libro) return;
    libro.style.opacity = '0';
    libro.classList.add('libro-3d--abierto');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        libro.style.transition = 'opacity 0.6s ease';
        libro.style.opacity = '1';
        recalcZIndex();
        recalcVisibility();
      });
    });
  }, 80);

  document.getElementById('btnNext').addEventListener('click', girarAdelante);
  document.getElementById('btnIndice').addEventListener('click', () => {
    document.querySelectorAll('.pagina.pagina--girada').forEach(p => {
      p.classList.remove('pagina--girada');
    });
    estado.paginaActual = 0;
    actualizarBotones();
    actualizarPaginaIzq();
  });

  document.getElementById('btnPrev').addEventListener('click', () => {
    if (estado.paginaActual === 0) return;
    estado.paginaActual--;
    const pag = document.querySelector(`.pagina[data-i="${estado.paginaActual}"]`);
    if (pag) pag.classList.remove('pagina--girada');
    actualizarBotones();
    actualizarPaginaIzq();
  });

  bibliotecaEl.addEventListener('click', e => {
    const item = e.target.closest('.indice-item');
    if (!item) return;
    const targetIndex = parseInt(item.dataset.index) + 1;
    while (estado.paginaActual < targetIndex) {
      const pag = document.querySelector(`.pagina[data-i="${estado.paginaActual}"]`);
      if (pag) pag.classList.add('pagina--girada');
      estado.paginaActual++;
    }
    actualizarBotones();
    actualizarPaginaIzq();
  });

  document.getElementById('btnVolverLomos').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderLomos();
  });
}

// ─────────────────────────────────────────────
// 5. MODAL DE FANFIC INDIVIDUAL
// ─────────────────────────────────────────────
function abrirModalFanfic(fandom, fanfic) {
  let modal = document.getElementById('fanfic-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fanfic-modal';
    modal.className = 'fanfic-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="fanfic-modal-overlay"></div>
    <div class="fanfic-modal-contenido">
      <button class="fanfic-modal-cerrar">✕</button>

      <div class="fanfic-modal-header">
        <div style="color: ${fandom.colorAccento}; font-size: 0.8rem; opacity: 0.8; letter-spacing: 1px; text-transform: uppercase;">
          ${fandom.nombre}
        </div>
      </div>

      <div class="fanfic-modal-body">
        <div class="fanfic-modal-ornamento">✦</div>

        <h2 class="fanfic-modal-titulo">${fanfic.titulo}</h2>

        <p class="fanfic-modal-autor">por ${fanfic.autor}</p>

        <div class="fanfic-modal-tags">
          ${fanfic.tags.map(t => `
            <span class="fanfic-modal-tag" style="border-color: ${fandom.colorAccento}; color: ${fandom.colorAccento};">
              ${t}
            </span>
          `).join('')}
        </div>

        <p class="fanfic-modal-descripcion">${fanfic.descripcion}</p>

        <a href="${fanfic.link}" target="_blank" class="fanfic-modal-link" style="background-color: ${fandom.colorLomo}; color: ${fandom.colorAccento};">
          Leer en AO3 →
        </a>
      </div>
    </div>
  `;

  modal.classList.add('fanfic-modal--abierto');

  const overlay = modal.querySelector('.fanfic-modal-overlay');
  const btnCerrar = modal.querySelector('.fanfic-modal-cerrar');

  overlay.addEventListener('click', () => modal.classList.remove('fanfic-modal--abierto'));
  btnCerrar.addEventListener('click', () => modal.classList.remove('fanfic-modal--abierto'));
}

// ─────────────────────────────────────────────
// 6. INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 480) {
    renderMobileGrid();
  } else {
    renderLomos();
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 480) {
      if (!document.querySelector('.mobile-libros-grid')) {
        renderMobileGrid();
      }
    } else {
      if (!document.querySelector('.lomo')) {
        renderLomos();
      }
    }
  });

  // Fix 1: bloquear scroll del body cuando el menú hamburguesa está abierto
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('change', () => {
      document.body.style.overflow = menuToggle.checked ? 'hidden' : '';
    });
    // También cerrar con los links de contacto restaura el scroll
    document.querySelectorAll('#nav-mobile a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.style.overflow = '';
      });
    });
  }
});
// ─────────────────────────────────────────────
// 7. MOBILE: GRILLA 2×2
// ─────────────────────────────────────────────
function renderMobileGrid() {
  document.querySelectorAll('main section').forEach(s => s.style.display = 'none');
  const intro = document.querySelector('main > p.intro');
  if (intro) intro.style.display = 'none';

  // Evitar duplicados
  if (document.querySelector('.mobile-libros-grid')) return;

  const main = document.querySelector('main');
  const grid = document.createElement('div');
  grid.className = 'mobile-libros-grid';
  grid.innerHTML = fandoms.map(f => `
    <div class="mobile-libro-card" data-id="${f.id}"
      style="--color-lomo:${f.colorLomo}; --color-accento:${f.colorAccento}; background-color:${f.colorLomo};">
      <div class="mobile-libro-card-overlay">
        <div class="mobile-libro-card-ornamento">✦</div>
        <div class="mobile-libro-card-titulo">${f.nombre}</div>
        <div class="mobile-libro-card-sub">Fanfic Recs</div>
        <div class="mobile-libro-card-ornamento">✦</div>
      </div>
    </div>
  `).join('');
  main.prepend(grid);

  grid.querySelectorAll('.mobile-libro-card').forEach(card => {
    card.addEventListener('click', () => {
      const fandom = fandoms.find(f => f.id === card.dataset.id);
      if (fandom) abrirPanelMobile(fandom);
    });
  });
}

// ─────────────────────────────────────────────
// 8. MOBILE: PANEL LATERAL
// ─────────────────────────────────────────────
function abrirPanelMobile(fandom) {
  let panel = document.getElementById('fandom-panel-mobile');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'fandom-panel-mobile';
    panel.className = 'fandom-mobile-panel';
    document.body.appendChild(panel);
  }

  panel.innerHTML = `
    <div class="fmp-overlay"></div>
    <div class="fmp-sheet">
      <button class="fmp-cerrar">✕</button>
      <div class="fmp-header" style="background: linear-gradient(135deg, ${fandom.colorLomo}, ${fandom.colorLomo}cc);">
        <div class="fmp-categoria" style="color:${fandom.colorAccento};">✦ Fanfic Recs ✦</div>
        <div class="fmp-nombre">${fandom.nombre}</div>
        <div class="fmp-ornamento" style="color:${fandom.colorAccento};">✦</div>
      </div>
      <div class="fmp-lista">
        ${fandom.fanfics.map((ff, i) => `
          <div class="fmp-ficha" style="border-left-color:${fandom.colorLomo};">
            <div class="fmp-ficha-num">${String(i+1).padStart(2,'0')}</div>
            <div class="fmp-ficha-cuerpo">
              <div class="fmp-titulo">${ff.titulo}</div>
              <div class="fmp-autor">por ${ff.autor}</div>
              <div class="fmp-tags">
                ${ff.tags.map(t => `<span class="fmp-tag" style="color:${fandom.colorLomo}; border-color:${fandom.colorLomo};">${t}</span>`).join('')}
              </div>
              <p class="fmp-desc">${ff.descripcion}</p>
              <a href="${ff.link}" target="_blank" class="fmp-link" style="background-color:${fandom.colorLomo}; color:${fandom.colorAccento};">Leer en AO3 →</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  panel.classList.add('fmp--abierto');
  panel.querySelector('.fmp-overlay').addEventListener('click', () => panel.classList.remove('fmp--abierto'));
  panel.querySelector('.fmp-cerrar').addEventListener('click', () => panel.classList.remove('fmp--abierto'));
}