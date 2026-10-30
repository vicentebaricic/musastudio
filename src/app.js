/* ============================================================
   CONFIG — datos centralizados
   ============================================================ */
const CONFIG = {
  business: "Musa Studio",
  whatsapp: "56926424555",   // +56 9 2642 4555 (confirmar que es WhatsApp)
  agendapro: "https://musastudio.site.agendapro.com/cl/sucursal/534535",
  bookingInline: true,   // false = los botones "Reservar" abren AgendaPro en pestaña nueva
  reviews:   "https://www.google.com/maps/search/?api=1&query=Musa%20Studio%20Club%20Fama%20Chicureo",
  instagram: "https://www.instagram.com/musastudiocl/",
  deliveryFee: 3500,
  mapEmbed: "https://www.google.com/maps?q=-33.2465216,-70.6986066&z=17&output=embed",
  // Mensajes de WhatsApp pre-armados según la sección del clic
  waMessages: {
    default:   "Hola Musa Studio, quisiera hacer una consulta.",
    menu:      "Hola Musa Studio, quisiera hacer una consulta.",
    barra:     "Hola Musa Studio, quisiera hacer una consulta sobre sus servicios.",
    flotante:  "Hola Musa Studio, quisiera hacer una consulta sobre sus servicios.",
    ubicacion: "Hola Musa Studio, ¿me podrían indicar cómo llegar al estudio en Club Fama?",
    cta:       "Hola Musa Studio, tengo una duda antes de reservar mi hora.",
    footer:    "Hola Musa Studio, quisiera hacer una consulta.",
    equipo:    "Hola Musa Studio, quisiera agendar con {name}.",
    servicio:  "Hola Musa Studio, quisiera más información sobre {name}."
  },
  // Horario (domingo = 0). Confirmado: cierra a las 19:30. El resto es DE EJEMPLO hasta confirmar.
  hours: [
    { day: "Domingo",   open: null,    close: null },
    { day: "Lunes",     open: "10:00", close: "19:30" },
    { day: "Martes",    open: "10:00", close: "19:30" },
    { day: "Miércoles", open: "10:00", close: "19:30" },
    { day: "Jueves",    open: "10:00", close: "19:30" },
    { day: "Viernes",   open: "10:00", close: "19:30" },
    { day: "Sábado",    open: "10:00", close: "19:30" }
  ]
};

/* Servicios — categorías de AgendaPro agrupadas en 3 mundos.
   Precios y duraciones DE EJEMPLO (AgendaPro indica "desde $3.000"): reemplazar con los reales. Agregar servicios = agregar filas.
   book: link de AgendaPro para esa categoría, si algún día AgendaPro lo permite (hoy su URL no cambia por categoría).
   Sin book se abre la agenda general y la ventana indica qué categoría elegir. */
const SERVICES = [
  { id: "cabello", name: "Cabello", img: "cabello-wide.webp",
    intro: "Color, corte y cuidado pensados para tu tipo de cabello. Siempre con diagnóstico previo.",
    groups: [
      { id: "coloracion", name: "Coloración", book: "", items: [
        ["Tintura raíz", "90 min", 35000], ["Tintura completa", "2 h", 45000], ["Balayage", "3 h", 90000],
        ["Mechas / babylights", "3 h", 80000], ["Baño de color", "60 min", 30000], ["Matiz", "45 min", 20000] ] },
      { id: "corte", name: "Corte de cabello", book: "", items: [
        ["Corte + lavado + secado", "60 min", 22000], ["Despunte", "30 min", 12000], ["Corte de flequillo", "15 min", 5000],
        ["Corte niños", "30 min", 10000], ["Corte masculino", "30 min", 12000] ] },
      { id: "tratamientos", name: "Tratamientos capilares", book: "", items: [
        ["Hidratación profunda", "45 min", 25000], ["Nutrición y brillo", "45 min", 28000],
        ["Reconstrucción", "60 min", 32000], ["Alisado / keratina", "3 h", 65000] ] },
      { id: "brushing", name: "Brushing y peinados", book: "", items: [
        ["Brushing", "45 min", 15000], ["Ondas", "45 min", 20000], ["Peinado de evento", "60 min", 32000] ] }
    ] },
  { id: "unas", name: "Uñas", img: "belleza-wide.webp",
    intro: "Manos y pies impecables, con herramientas esterilizadas y diseños a tu medida.",
    groups: [
      { id: "manos", name: "Manicure", book: "", items: [
        ["Manicure tradicional", "45 min", 10000], ["Esmaltado permanente", "60 min", 16000],
        ["Manicure rusa", "90 min", 22000], ["Kapping gel", "90 min", 22000], ["Uñas acrílicas / polygel", "2 h", 30000] ] },
      { id: "pies", name: "Pedicure", book: "", items: [
        ["Pedicure spa", "60 min", 22000], ["Pedicure + esmaltado permanente", "75 min", 26000] ] },
      { id: "otros-unas", name: "Extras", book: "", items: [
        ["Retiro de esmaltado permanente", "20 min", 5000], ["Reparación de uña", "15 min", 3000], ["Diseño (por uña)", "—", 1500] ] }
    ] },
  { id: "rostro", name: "Rostro", img: "bienestar-wide.webp",
    intro: "Mirada y piel: pestañas, cejas y faciales para verte y sentirte tu mejor versión.",
    groups: [
      { id: "pestanas", name: "Pestañas", book: "", items: [
        ["Lifting de pestañas", "60 min", 22000], ["Extensiones clásicas", "2 h", 35000], ["Extensiones volumen", "2 h 30 min", 42000], ["Retoque de extensiones", "60 min", 20000] ] },
      { id: "cejas", name: "Cejas", book: "", items: [
        ["Diseño de cejas", "30 min", 10000], ["Laminado de cejas", "45 min", 20000], ["Henna de cejas", "45 min", 15000] ] },
      { id: "faciales", name: "Faciales", book: "", items: [
        ["Limpieza facial profunda", "75 min", 32000], ["Hidratación facial", "60 min", 28000] ] }
    ] }
];

/* Galería — reemplaza con fotos reales (assets/img/galeria/) */
const GALLERY = [   // una foto por cada original: ninguna se repite
  { file: "color-01.webp",    cat: "color",  cap: "Aplicación de color con pincel" },
  { file: "corte-04.webp",    cat: "corte",  cap: "Antes del corte" },
  { file: "color-05.webp",    cat: "color",  cap: "Color con diagnóstico" },
  { file: "unas-01.webp",     cat: "unas",   cap: "Manicure de precisión" },
  { file: "color-02.webp",    cat: "corte",  cap: "Corte y forma" },
  { file: "pestanas-01.webp", cat: "rostro", cap: "Limpieza facial" },
  { file: "corte-03.webp",    cat: "corte",  cap: "Brushing con cepillo redondo" },
  { file: "lavado-01.webp",   cat: "corte",  cap: "Lavado y tratamiento" }
];

/* Equipo — POR CONFIRMAR: nombres, especialidad, días y fotos (assets/img/equipo/<nombre>.webp).
   Mientras no haya foto (file: null) se muestra el medallón del logo. */
const TEAM = [
  { name: "Por confirmar", role: "Estilista · Colorista",  file: null, sample: true,
    tagline: "Color y corte a tu medida.",
    bio: "Aquí va la presentación de la profesional: especialidad, técnicas que domina y su sello personal.",
    days: "Días por confirmar" },
  { name: "Por confirmar", role: "Manicurista · Nail artist", file: null, sample: true,
    tagline: "Manos y pies impecables.",
    bio: "Aquí va la presentación de la profesional: especialidad, técnicas que domina y su sello personal.",
    days: "Días por confirmar" },
  { name: "Por confirmar", role: "Lash & brow artist",     file: null, sample: true,
    tagline: "Una mirada que habla por ti.",
    bio: "Aquí va la presentación de la profesional: especialidad, técnicas que domina y su sello personal.",
    days: "Días por confirmar" },
  { name: "Por confirmar", role: "Cosmetóloga",            file: null, sample: true,
    tagline: "Piel cuidada, piel feliz.",
    bio: "Aquí va la presentación de la profesional: especialidad, técnicas que domina y su sello personal.",
    days: "Días por confirmar" }
];

/* Reseñas — la primera es real (Google Maps); el resto son DE EJEMPLO hasta copiar textos reales de Google. */
const REVIEWS = [
  { name: "Carolina P.",   date: "Oct 2026", title: "Volveré sin duda",                  service: "Cabello, manos y pies", sample: false,
    text: "Me encantó todo el servicio. Pelo además de manos y pies… Volveré sin duda." },
  { name: "Javiera R.",    date: "Sep 2026", title: "Justo el color que quería",         service: "Coloración",        sample: true, text: "Me escucharon de verdad y el color quedó exactamente como lo quería. El estudio es precioso y te atienden con mucho cariño." },
  { name: "Paula S.",      date: "Sep 2026", title: "Todo en un solo lugar",             service: "Manicure + pestañas", sample: true, text: "Me hice las uñas y el lifting de pestañas el mismo día, sin tener que ir a dos lugares. Puntuales y muy prolijas." },
  { name: "Fernanda M.",   date: "Ago 2026", title: "Mi lugar en Chicureo",              service: "Corte y brushing",  sample: true, text: "Por fin encontré mi peluquería en Chicureo. Honestas al recomendar, muy profesionales y súper cerca." },
  { name: "Antonia L.",    date: "Ago 2026", title: "Pestañas naturales y prolijas",     service: "Extensiones de pestañas", sample: true, text: "Quedaron preciosas y naturales, tal como pedí. El lugar está siempre ordenado y limpio." },
  { name: "Isabel C.",     date: "Jul 2026", title: "Salí sintiéndome otra",             service: "Limpieza facial",   sample: true, text: "Excelente atención de principio a fin. Productos buenos, un ambiente muy lindo y salí con la piel radiante." }
];

/* Tienda — productos y precios DE EJEMPLO. Fotos: assets/img/tienda/ */
const PRODUCTS = [
  { id: "sh-hidra",  brand: "Línea profesional", name: "Shampoo hidratante 300 ml",         desc: "Para cabello seco o con color.",         price: 18900, file: "shampoo-hidratante.webp" },
  { id: "ac-hidra",  brand: "Línea profesional", name: "Acondicionador hidratante 300 ml",  desc: "Desenreda y aporta suavidad.",            price: 19900, file: "acondicionador.webp" },
  { id: "cr-peinar", brand: "Línea profesional", name: "Crema de peinar anti frizz 200 ml", desc: "Define sin apelmazar.",                  price: 15900, file: "crema-peinar.webp" },
  { id: "masc-rep",  brand: "Línea profesional", name: "Mascarilla reparadora 250 ml",      desc: "Tratamiento semanal intensivo.",         price: 24900, file: "mascarilla.webp" },
  { id: "ac-capil",  brand: "Línea profesional", name: "Aceite capilar de argán 50 ml",     desc: "Brillo y protección de puntas.",          price: 21900, file: "aceite-argan.webp" },
  { id: "term",      brand: "Línea profesional", name: "Protector térmico 150 ml",          desc: "Antes del secador o la plancha.",        price: 16900, file: "protector-termico.webp" },
  { id: "sh-matiz",  brand: "Línea profesional", name: "Shampoo matizador 300 ml",          desc: "Neutraliza tonos amarillos en rubios.",   price: 19900, file: "shampoo-matizador.webp" },
  { id: "cr-manos",  brand: "Musa Studio",        name: "Crema de manos y cutículas 75 ml",  desc: "Nutrición diaria con karité.",           price: 9900,  file: "crema-manos.webp" }
];

/* ============================================================
   UTILIDADES
   ============================================================ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clp = n => "$" + Math.round(n).toLocaleString("es-CL");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const STAR = '<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8z"/></svg>';
const sampleBadge = (txt = "Contenido de ejemplo") => `<span class="sample">${txt}</span>`;
const imgBox = (src, alt, cls = "", attrs = "") =>
  `<div class="ph ${cls}" data-file="${esc(src)}" ${attrs}><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;

function toast(msg){
  const t = $("#toast");
  t.textContent = msg; t.classList.add("is-show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-show"), 3200);
}

/* Placeholder visible cuando falta una imagen/video (antes de subir la multimedia) */
function watchMedia(root = document){
  $$(".ph img", root).forEach(img => {
    const mark = () => img.closest(".ph").classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) mark();
    img.addEventListener("error", mark, { once: true });
    img.addEventListener("load", () => img.closest(".ph").classList.remove("is-missing"), { once: true });
  });
}

/* ============================================================
   LINKS CENTRALIZADOS (AgendaPro, WhatsApp, Instagram)
   ============================================================ */
function wireLinks(root = document){
  $$(".js-book", root).forEach(a => a.href = a.dataset.book || CONFIG.agendapro);
  $$(".js-reviews", root).forEach(a => a.href = CONFIG.reviews);
  $$(".js-ig", root).forEach(a => a.href = CONFIG.instagram);
  $$(".js-wa", root).forEach(a => {
    const key = a.dataset.wa || "default";
    let msg = CONFIG.waMessages[key] || CONFIG.waMessages.default;
    if (a.dataset.name) msg = msg.replace("{name}", a.dataset.name);
    a.href = waLink(msg);
  });
}

/* ============================================================
   RENDER DE SECCIONES
   ============================================================ */
function renderGallery(){
  const el = $("#gallery"), preview = el.dataset.preview !== undefined;
  el.innerHTML = GALLERY.map((g, i) => (preview && !g.home) ? "" : `
    <button class="g-item reveal" type="button" data-cat="${g.cat}" data-index="${i}" aria-label="Ampliar foto: ${esc(g.cap)}">
      ${imgBox("assets/img/galeria/" + g.file, g.cap)}
      <figcaption>${esc(g.cap)}</figcaption>
    </button>`).join("");
}

function renderTeam(){
  $("#team").innerHTML = TEAM.map((m, i) => `
    <article class="member reveal" data-delay="${i % 4}">
      <div class="member__photo">
        ${m.file ? imgBox("assets/img/equipo/" + m.file, `${m.name}, ${m.role}`) : `<div class="ph member__mono"><img src="assets/img/monograma.svg" alt="" loading="lazy"></div>`}
        <div class="member__over" id="bio-${i}">
          <p class="member__tag">${esc(m.tagline)}</p>
          <p>${esc(m.bio)}</p>
          ${m.sample ? `<a class="js-book" href="#" target="_blank" rel="noopener">Reservar hora →</a>` : `<a class="js-wa" data-wa="equipo" data-name="${esc(m.name)}" href="#" target="_blank" rel="noopener">Agendar con ${esc(m.name)} →</a>`}
        </div>
      </div>
      <h3>${esc(m.name)}</h3>
      <p class="role">${esc(m.role)}</p>
      <p class="member__days">${esc(m.days)}</p>
      <button class="member__more" type="button" aria-expanded="false" aria-controls="bio-${i}">Ver perfil</button>
    </article>`).join("");
  // Táctil y teclado: el botón abre/cierra el perfil (en desktop también aparece con el cursor)
  $("#team").addEventListener("click", e => {
    const b = e.target.closest(".member__more"); if (!b) return;
    const card = b.closest(".member"), open = !card.classList.contains("is-open");
    $$(".member.is-open").forEach(c => { c.classList.remove("is-open"); $(".member__more", c).setAttribute("aria-expanded", "false"); $(".member__more", c).textContent = "Ver perfil"; });
    card.classList.toggle("is-open", open);
    b.setAttribute("aria-expanded", open); b.textContent = open ? "Cerrar" : "Ver perfil";
  });
}

function renderReviews(){
  $("#reviews").innerHTML = REVIEWS.map((r, i) => `
    <li class="review" aria-roledescription="reseña" aria-label="${i + 1} de ${REVIEWS.length}">
      <div class="review__top"><b>${esc(r.name)}</b><time>${esc(r.date)}</time></div>
      <span class="stars" role="img" aria-label="5 de 5 estrellas">${STAR.repeat(5)}</span>
      <h3>${esc(r.title)}</h3>
      <p class="review__text">${esc(r.text)}</p>
      <button class="review__more" type="button" hidden>Leer más</button>
      <div class="review__foot"><span>${esc(r.service)}</span>${r.sample ? sampleBadge("Reseña de ejemplo") : '<span class="review__src">Google</span>'}</div>
    </li>`).join("");
  initCarousel($("#reviews").closest(".carousel"));
}

// Página de servicios: lista completa + índice fijo + barra de categorías (móvil) + buscador
function renderServices(){
  const norm = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  $("#svcList").innerHTML = SERVICES.map(c => `
    <section class="svc-cat" id="${c.id}" data-spy="${c.id}" aria-labelledby="h-${c.id}">
      <div class="svc-cat__head">
        ${imgBox("assets/img/servicios/" + c.img, "", "svc-cat__img")}
        <div class="svc-cat__title"><h2 id="h-${c.id}">${c.name}</h2><p>${c.intro}</p></div>
      </div>
      ${c.groups.map(g => `
        <div class="svc-group" id="${c.id}-${g.id}" data-spy="${c.id}" data-sub="${c.id}-${g.id}">
          <div class="svc-group__head"><h3>${g.name}</h3><a class="link js-book" data-hint="${esc(g.name)}" ${g.book ? `data-book="${esc(g.book)}"` : ""} href="#" target="_blank" rel="noopener" aria-label="Reservar ${esc(g.name)}">Reservar →</a></div>
          <ul class="svc-rows">
            ${g.items.map(([n, d, p]) => `<li data-q="${esc(norm(n + " " + g.name + " " + c.name))}"><span class="svc-rows__name">${esc(n)}</span><span class="svc-rows__dur">${esc(d)}</span><span class="svc-rows__price">desde ${clp(p)}</span></li>`).join("")}
          </ul>
        </div>`).join("")}
    </section>`).join("");

  $("#svcIndex").innerHTML = SERVICES.map(c => `
    <li><a href="#${c.id}" data-cat="${c.id}">${c.name}</a>
      <ul>${c.groups.map(g => `<li><a href="#${c.id}-${g.id}" data-sub="${c.id}-${g.id}">${g.name}</a></li>`).join("")}</ul></li>`).join("");
  $("#svcChips").innerHTML = SERVICES.map(c => `<a class="chip" href="#${c.id}" data-cat="${c.id}">${c.name}</a>`).join("");

  // Resalta en el índice y en la barra la sección visible
  const mark = (cat, sub) => {
    $$("[data-cat]", $("#svcIndex")).concat($$("[data-cat]", $("#svcChips"))).forEach(a => a.classList.toggle("is-active", a.dataset.cat === cat));
    $$("[data-sub]", $("#svcIndex")).forEach(a => a.classList.toggle("is-active", a.dataset.sub === sub));
    const chip = $(`#svcChips [data-cat="${cat}"]`); if (chip) chip.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  const io = new IntersectionObserver(entries => {
    const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (vis) mark(vis.target.dataset.spy, vis.target.dataset.sub || null);
  }, { rootMargin: "-30% 0px -60% 0px" });
  $$(".svc-group, .svc-cat__head", $("#svcList")).forEach(el => { if (!el.dataset.spy) el.dataset.spy = el.closest(".svc-cat").id; io.observe(el); });
  mark(SERVICES[0].id, null);

  // Buscador
  const input = $("#svcSearch"), empty = $("#svcEmpty");
  input.addEventListener("input", () => {
    const q = norm(input.value.trim());
    let total = 0;
    $$(".svc-group", $("#svcList")).forEach(g => {
      let n = 0;
      $$("li", g).forEach(li => { const ok = !q || li.dataset.q.includes(q); li.hidden = !ok; n += ok; });
      g.hidden = n === 0; total += n;
    });
    $$(".svc-cat", $("#svcList")).forEach(c => c.hidden = !$$(".svc-group", c).some(g => !g.hidden));
    empty.hidden = total > 0;
    $("#svcCount").textContent = q ? `${total} ${total === 1 ? "servicio" : "servicios"}` : "";
  });
}

// Carrusel horizontal: flechas, arrastre/scroll nativo con snap y "Leer más" en textos largos
function initCarousel(root){
  const track = $(".carousel__track", root), prev = $(".carousel__btn--prev", root), next = $(".carousel__btn--next", root);
  const step = () => { const c = track.firstElementChild; return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300; };
  const sync = () => {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev.click(); }
  });
  track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
  window.addEventListener("resize", sync);
  // "Leer más" solo donde el texto quedó cortado
  const clampCheck = () => $$(".review", track).forEach(card => {
    const t = $(".review__text", card), b = $(".review__more", card);
    if (card.classList.contains("is-open")) return;
    b.hidden = t.scrollHeight <= t.clientHeight + 2;
  });
  track.addEventListener("click", e => {
    const b = e.target.closest(".review__more"); if (!b) return;
    const card = b.closest(".review"), open = card.classList.toggle("is-open");
    b.textContent = open ? "Leer menos" : "Leer más";
  });
  sync(); clampCheck(); window.addEventListener("resize", clampCheck);
  document.fonts && document.fonts.ready.then(() => { sync(); clampCheck(); });
}

function renderHours(){
  const now = new Date();
  const today = now.getDay();
  const order = [1,2,3,4,5,6,0];
  $("#hoursBody").innerHTML = order.map(d => {
    const h = CONFIG.hours[d];
    return `<tr class="${d === today ? "is-today" : ""}"><th scope="row">${h.day}${d === today ? ' <span class="sr-only">(hoy)</span>' : ""}</th><td>${h.open ? `${h.open} – ${h.close}` : "Cerrado"}</td></tr>`;
  }).join("");

  // ¿Abierto ahora? (hora de Chile)
  const parts = new Intl.DateTimeFormat("es-CL", { timeZone: "America/Santiago", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const hh = +parts.find(p => p.type === "hour").value, mm = +parts.find(p => p.type === "minute").value;
  const cl = new Date(now.toLocaleString("en-US", { timeZone: "America/Santiago" }));
  const h = CONFIG.hours[cl.getDay()];
  const mins = hh * 60 + mm;
  const toM = s => { const [a, b] = s.split(":").map(Number); return a * 60 + b; };
  const el = $("#openNow");
  if (h.open && mins >= toM(h.open) && mins < toM(h.close)) {
    el.lastElementChild.textContent = `Abierto ahora · cierra a las ${h.close}`;
  } else {
    el.classList.add("is-closed");
    el.lastElementChild.textContent = "Cerrado ahora · reserva online 24/7";
  }
}

function renderShop(){
  $("#shop").innerHTML = PRODUCTS.map((p, i) => `
    <article class="product reveal" data-delay="${i % 4}">
      ${imgBox("assets/img/tienda/" + p.file, p.name)}
      <span class="product__brand">${esc(p.brand)}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="product__foot">
        <span class="price">${clp(p.price)}</span>
        <button class="btn btn--ghost add-btn" type="button" data-add="${p.id}" aria-label="Agregar ${esc(p.name)} al carrito">Agregar</button>
      </div>
    </article>`).join("");
}

/* ============================================================
   INTERACCIONES
   ============================================================ */
// Header sólido al hacer scroll
function initHeader(){
  const header = $("#header");
  if (document.body.classList.contains("page-sub")) { header.classList.add("is-solid"); return; }
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.6 - 80);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
}

// Tema claro/oscuro
function initTheme(){
  const btn = $("#themeBtn");
  const saved = store.get("musa-theme", null);
  if (saved) document.documentElement.dataset.theme = saved;
  // La marca es negra y dorada: el modo oscuro es el predeterminado
  const isDark = () => document.documentElement.dataset.theme !== "light";
  const label = () => btn.setAttribute("aria-label", isDark() ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  label();
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next; store.set("musa-theme", next); label();
  });
  $("#themeBtnM").addEventListener("click", () => btn.click());
}

// Focus trap + overlay genérico
let lastFocus = null;
function openLayer(el, { scrim = false } = {}){
  lastFocus = document.activeElement;
  el.classList.add("is-open");
  if (scrim) $("#scrim").classList.add("is-open");
  document.body.style.overflow = "hidden";
  const f = el.querySelector("button, a[href], input, select, textarea");
  setTimeout(() => f && f.focus(), 60);
}
function closeLayer(el){
  el.classList.remove("is-open");
  $("#scrim").classList.remove("is-open");
  document.body.style.overflow = "";
  lastFocus && lastFocus.focus();
}
function trapFocus(e, el){
  if (e.key !== "Tab" || !el.classList.contains("is-open")) return;
  const f = $$("button:not([disabled]), a[href], input, select, textarea", el).filter(x => x.offsetParent !== null);
  if (!f.length) return;
  if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
  else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
}

// Menú móvil
function initMenu(){
  const m = $("#mnav"), btn = $("#menuBtn");
  btn.addEventListener("click", () => { openLayer(m); btn.setAttribute("aria-expanded", "true"); });
  const close = () => { closeLayer(m); btn.setAttribute("aria-expanded", "false"); };
  $("#menuClose").addEventListener("click", close);
  $$("a[href^='#']", m).forEach(a => a.addEventListener("click", close));
  m.addEventListener("keydown", e => { if (e.key === "Escape") close(); trapFocus(e, m); });
}

// Video hero: pausa accesible + reduced motion
function initHero(){
  const v = $("#heroVideo"), b = $("#heroPause"), box = v.closest(".ph");
  const sources = $$("source", v);
  let failed = 0;
  sources.forEach(s => s.addEventListener("error", () => { if (++failed === sources.length) { box.classList.add("is-missing"); b.hidden = true; } }));
  if (matchMedia("(max-width: 699px)").matches) v.poster = "assets/img/hero-poster-mobile.jpg";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { v.removeAttribute("autoplay"); v.pause(); }
  const sync = () => {
    b.setAttribute("aria-label", v.paused ? "Reproducir video de fondo" : "Pausar video de fondo");
    b.innerHTML = v.paused
      ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  };
  b.addEventListener("click", () => { v.paused ? v.play() : v.pause(); });
  v.addEventListener("play", sync); v.addEventListener("pause", sync); sync();
}

// Tabs de servicios (patrón ARIA)
function initTabs(){
  const tabs = $$("[role=tab]");
  const select = t => {
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
      const panel = $("#" + x.getAttribute("aria-controls"));
      if (on && panel.hidden) { panel.classList.remove("is-entering"); void panel.offsetWidth; panel.classList.add("is-entering"); }
      panel.hidden = !on;
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", e => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      const n = tabs[(i + d + tabs.length) % tabs.length]; select(n); n.focus();
    });
  });
}

// Galería: filtros + lightbox
function initGallery(){
  const items = () => $$(".g-item");
  $$("[data-filter]").forEach(b => b.addEventListener("click", () => {
    $$("[data-filter]").forEach(x => x.setAttribute("aria-pressed", x === b));
    const f = b.dataset.filter;
    items().forEach(it => it.classList.toggle("is-hidden", f !== "all" && it.dataset.cat !== f));
  }));

  const lb = $("#lightbox"), img = $("#lbImg"), cap = $("#lbCap");
  let idx = 0;
  const visible = () => items().filter(i => !i.classList.contains("is-hidden"));
  const show = i => {
    const v = visible(); idx = (i + v.length) % v.length;
    const g = GALLERY[+v[idx].dataset.index];
    img.src = "assets/img/galeria/" + g.file; img.alt = g.cap; cap.textContent = g.cap;
  };
  $("#gallery").addEventListener("click", e => {
    const it = e.target.closest(".g-item"); if (!it) return;
    show(visible().indexOf(it)); openLayer(lb);
  });
  $(".lb-close", lb).addEventListener("click", () => closeLayer(lb));
  $(".lb-prev", lb).addEventListener("click", () => show(idx - 1));
  $(".lb-next", lb).addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLayer(lb); });
  lb.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLayer(lb);
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
    trapFocus(e, lb);
  });
}

// Gift card
function initGift(){
  const form = $("#giftForm");
  const upd = () => {
    const amount = +form.amount.value;
    $("#gcAmount").textContent = clp(amount);
    $("#gcTo").textContent = "Para: " + (form.to.value.trim() || "alguien especial");
    $("#gcMsg").textContent = form.msg.value.trim() || "Tu momento, tu esencia, tu mejor versión.";
  };
  form.addEventListener("input", upd); upd();

  const setErr = (input, errId, msg) => {
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    $("#" + errId).textContent = msg || "";
    return !msg;
  };
  const validate = () => {
    const a = setErr(form.from, "gcFromErr", form.from.value.trim() ? "" : "Escribe tu nombre para la gift card.");
    const b = setErr(form.to, "gcToErr", form.to.value.trim() ? "" : "Escribe el nombre de quien la recibe.");
    const em = form.email.value.trim();
    const c = setErr(form.email, "gcEmailErr", !em || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? "" : "Revisa el correo: debe tener el formato nombre@correo.cl");
    return a && b && c;
  };
  ["from", "to", "email"].forEach(n => form[n].addEventListener("blur", () => { if (form[n].value) validate(); }));

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validate()) { form.querySelector("[aria-invalid=true]").focus(); return; }
    const lines = [
      "Hola Musa Studio, quiero comprar una Gift Card electrónica:",
      `• Monto: ${clp(+form.amount.value)}`,
      `• De: ${form.from.value.trim()}`,
      `• Para: ${form.to.value.trim()}`,
      form.email.value.trim() ? `• Enviar a: ${form.email.value.trim()}` : "• Enviármela a mí por WhatsApp",
      form.msg.value.trim() ? `• Mensaje: "${form.msg.value.trim()}"` : ""
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    toast("Abrimos WhatsApp con el detalle de tu gift card");
  });
}

// Carrito
const cart = {
  items: store.get("musa-cart", {}),
  save(){ store.set("musa-cart", this.items); renderCart(); },
  add(id){ this.items[id] = (this.items[id] || 0) + 1; this.save(); },
  set(id, q){ if (q <= 0) delete this.items[id]; else this.items[id] = q; this.save(); },
  count(){ return Object.values(this.items).reduce((a, b) => a + b, 0); },
  subtotal(){ return Object.entries(this.items).reduce((s, [id, q]) => s + (PRODUCTS.find(p => p.id === id)?.price || 0) * q, 0); }
};
function renderCart(){
  const n = cart.count();
  const badge = $("#cartCount");
  badge.textContent = n; badge.hidden = n === 0;
  $("#cartBtn").setAttribute("aria-label", `Abrir carrito, ${n} ${n === 1 ? "producto" : "productos"}`);
  const body = $("#cartBody"), foot = $("#cartFoot");
  const entries = Object.entries(cart.items).filter(([id]) => PRODUCTS.some(p => p.id === id));
  if (!entries.length) {
    body.innerHTML = `<div class="cart-empty"><h3>Tu carrito está vacío</h3><p>Agrega productos de la tienda para llevar el cuidado del estudio a tu casa.</p><a class="btn btn--ghost" href="tienda.html" id="goShop">Ver productos</a></div>`;
    foot.hidden = true;
    $("#goShop").addEventListener("click", () => closeCart());
    return;
  }
  foot.hidden = false;
  body.innerHTML = entries.map(([id, q]) => {
    const p = PRODUCTS.find(x => x.id === id);
    return `<div class="cart-line">
      ${imgBox("assets/img/tienda/" + p.file, "")}
      <div><h4>${esc(p.name)}</h4><span class="muted">${clp(p.price)} c/u</span><br>
        <span class="qty" role="group" aria-label="Cantidad de ${esc(p.name)}">
          <button type="button" data-qty="${id}" data-d="-1" aria-label="Quitar uno">−</button>
          <output aria-live="polite">${q}</output>
          <button type="button" data-qty="${id}" data-d="1" aria-label="Agregar uno">+</button>
        </span></div>
      <div style="text-align:right"><b class="price">${clp(p.price * q)}</b><br><button class="remove" type="button" data-remove="${id}">Eliminar</button></div>
    </div>`;
  }).join("");
  watchMedia(body);
  const fee = $("#delivery").value === "despacho" ? CONFIG.deliveryFee : 0;
  $("#cartTotal").textContent = clp(cart.subtotal() + fee);
}
function openCart(){ openLayer($("#cart"), { scrim: true }); $("#cartBtn").setAttribute("aria-expanded", "true"); }
function closeCart(){ closeLayer($("#cart")); $("#cartBtn").setAttribute("aria-expanded", "false"); }
function initCart(){
  renderCart();
  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#scrim").addEventListener("click", closeCart);
  $("#cart").addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); trapFocus(e, $("#cart")); });
  $("#delivery").addEventListener("change", renderCart);
  $("#shop")?.addEventListener("click", e => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    cart.add(b.dataset.add);
    const p = PRODUCTS.find(x => x.id === b.dataset.add);
    b.classList.add("is-added"); b.textContent = "Agregado ✓";
    setTimeout(() => { b.classList.remove("is-added"); b.textContent = "Agregar"; }, 1400);
    toast(`${p.name} agregado al carrito`);
  });
  $("#cartBody").addEventListener("click", e => {
    const q = e.target.closest("[data-qty]"), r = e.target.closest("[data-remove]");
    if (q) { cart.set(q.dataset.qty, (cart.items[q.dataset.qty] || 0) + +q.dataset.d); }
    if (r) {
      const id = r.dataset.remove, prev = cart.items[id];
      cart.set(id, 0);
      toast("Producto eliminado");
      $("#cartClose").focus();
      undoRemove = { id, prev };
    }
  });
  $("#checkout").addEventListener("click", () => {
    const delivery = $("#delivery").value;
    const fee = delivery === "despacho" ? CONFIG.deliveryFee : 0;
    const lines = ["Hola Musa Studio, quiero hacer este pedido de la tienda:"];
    Object.entries(cart.items).forEach(([id, q]) => {
      const p = PRODUCTS.find(x => x.id === id); if (p) lines.push(`• ${q} × ${p.name} — ${clp(p.price * q)}`);
    });
    lines.push(delivery === "despacho" ? `• Despacho Chicureo/Colina — ${clp(fee)}` : "• Retiro en Musa Studio (Club Fama)");
    lines.push(`Total: ${clp(cart.subtotal() + fee)}`);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });
}
let undoRemove = null;

// Reserva: los botones "Reservar" abren AgendaPro dentro de la página.
// Si AgendaPro no permite mostrarse embebido, el link "Abrir en AgendaPro" sigue disponible arriba.
function initBooking(){
  const host = location.hostname;
  if (!CONFIG.bookingInline || !host || /claude|anthropic/.test(host)) return; // visor de artifacts: abre pestaña nueva
  const modal = $("#booking"), frame = $("#bookingFrame"), loading = $(".booking__loading", modal);
  $$(".js-book-ext").forEach(a => a.href = CONFIG.agendapro);
  frame.addEventListener("load", () => { if (frame.src) loading.hidden = true; });
  // Cada botón abre su propio link (p. ej. la categoría "Corte de cabello"); si no tiene, la agenda general
  const hint = $("#bookingHint");
  const open = (url = CONFIG.agendapro, cat = "") => {
    // AgendaPro no permite abrir una categoría por link: se indica cuál elegir
    hint.hidden = !cat;
    if (cat) hint.innerHTML = `En la agenda, elige <strong>${esc(cat)}</strong>.`;
    if (frame.getAttribute("src") !== url) { loading.hidden = false; frame.src = url; }
    $$(".js-book-ext").forEach(a => a.href = url);
    modal.hidden = false; requestAnimationFrame(() => modal.classList.add("is-open"));
    lastFocus = document.activeElement; document.body.style.overflow = "hidden";
    setTimeout(() => $("#bookingClose").focus(), 60);
  };
  const close = () => {
    modal.classList.remove("is-open"); document.body.style.overflow = "";
    setTimeout(() => { modal.hidden = true; }, 250); lastFocus && lastFocus.focus();
  };
  document.addEventListener("click", e => {
    const a = e.target.closest(".js-book");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // cmd/ctrl+clic: pestaña nueva
    e.preventDefault(); $("#mnav")?.classList.contains("is-open") && $("#menuClose").click(); open(a.href, a.dataset.hint || "");
  });
  $("#bookingClose").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  modal.addEventListener("keydown", e => { if (e.key === "Escape") close(); trapFocus(e, modal); });
  if (location.hash === "#reservar") open();
}

// Mapa: embebe Google Maps cuando el sitio corre en su propio dominio
function initMap(){
  const host = location.hostname;
  if (!host || /claude|anthropic/.test(host)) return; // visor de artifacts: se queda la tarjeta con link
  // El bloque deja de ser un link completo: el mapa se usa y la tarjeta sigue llevando a Google Maps
  const link = $(".map"), box = document.createElement("div");
  box.className = link.className; box.dataset.delay = link.dataset.delay || "";
  const f = document.createElement("iframe");
  f.title = "Mapa: Musa Studio en Strip Center Club Fama, Chicureo";
  f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade"; f.src = CONFIG.mapEmbed;
  f.className = "map__frame";
  const card = document.createElement("a");
  card.className = "map__card is-over-map"; card.href = link.href; card.target = "_blank"; card.rel = "noopener";
  card.innerHTML = $(".map__card", link).innerHTML;
  box.append(f, card); link.replaceWith(box);
}

// Post de Instagram con video: se reproduce solo cuando está en pantalla
function initIgVideo(){
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  $$(".ig-video").forEach(v => {
    if (reduce) return;
    new IntersectionObserver(([e]) => e.isIntersecting ? v.play().catch(() => {}) : v.pause(), { threshold: .3 }).observe(v);
  });
}

// Barra "Reservar hora / Ver servicios": en escritorio aparece cuando los botones del hero salen de la pantalla
// (en las páginas internas, al bajar un poco). En móvil está siempre visible.
function initCtaBar(){
  const bar = $("#ctaBar"), heroCtas = $(".hero__ctas");
  if (heroCtas && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => bar.classList.toggle("is-visible", !e.isIntersecting && e.boundingClientRect.top < 0)).observe(heroCtas);
  } else {
    const onScroll = () => bar.classList.toggle("is-visible", window.scrollY > 240);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }
}

// Reveal on scroll
function initReveal(){
  const els = $$(".reveal:not(.is-in)");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach(e => e.classList.add("is-in")); return;
  }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach(e => io.observe(e));
}

// Mostrar/ocultar etiquetas de ejemplo (para revisar el diseño limpio)
function initSamples(){
  const b = $("#toggleSamples");
  b.addEventListener("click", () => {
    const on = document.documentElement.classList.toggle("hide-samples");
    b.textContent = on ? "Mostrar etiquetas de ejemplo" : "Ocultar etiquetas de ejemplo";
  });
}

/* ============================================================
   INIT
   ============================================================ */
// Cada bloque corre solo si su sección existe en la página actual
const run = (sel, fn) => { if (!sel || $(sel)) fn(); };
run("#gallery", renderGallery); run("#team", renderTeam);
run("#reviews", renderReviews); run("#svcList", renderServices); run("#hoursBody", renderHours); run("#shop", renderShop);
wireLinks(); watchMedia();
run(null, initHeader); run(null, initTheme); run("#mnav", initMenu); run("#heroVideo", initHero);
run("[role=tab]", initTabs); run("#gallery", initGallery); run("#giftForm", initGift); run("#cart", initCart);
run("#ctaBar", initCtaBar); run(".map", initMap); run("#booking", initBooking); run(".ig-video", initIgVideo); run(null, initReveal); run("#toggleSamples", initSamples);
$("#year").textContent = new Date().getFullYear();
