/* Academia da Jurema — renderização do catálogo (lê CURSOS de cursos.js) */
(function () {
  "use strict";

  const catalogo = document.getElementById("catalogo");
  const busca = document.getElementById("busca");

  /* ---------- HERO ---------- */
  const destaque = CURSOS.find(c => c.destaque) || CURSOS[0];
  if (destaque) {
    document.getElementById("hero-titulo").textContent = destaque.titulo;
    document.getElementById("hero-mestre").textContent = "com " + destaque.mestre;
    document.getElementById("hero-desc").textContent = destaque.descricao;
    document.getElementById("hero-btn").addEventListener("click", () => abrirModal(destaque));
  }

  /* ---------- CARDS / FILEIRAS ---------- */
  function cardDe(curso) {
    const el = document.createElement("button");
    el.className = "card capa-" + (curso.capa || "mata");
    /* sem aria-label: o conteúdo interno (selo, título, mestre, preço)
       forma o nome acessível completo */
    el.innerHTML =
      (curso.emBreve ? '<span class="selo">EM BREVE</span>' : "") +
      '<span class="card-titulo">' + curso.titulo + "</span>" +
      '<span class="card-mestre">' + curso.mestre + "</span>" +
      '<span class="card-preco">' + (curso.preco || "") + "</span>";
    el.addEventListener("click", () => abrirModal(curso));
    return el;
  }

  function render(lista) {
    catalogo.innerHTML = "";
    const emDestaque = lista.filter(c => c.destaque);
    const fileiras = [["Em destaque", emDestaque]].concat(
      CATEGORIAS.map(cat => [cat, lista.filter(c => c.categoria === cat)])
    );
    for (const [titulo, cursos] of fileiras) {
      if (!cursos.length) continue;
      const sec = document.createElement("section");
      sec.className = "fileira";
      const h = document.createElement("h2");
      h.textContent = titulo;
      const trilho = document.createElement("div");
      trilho.className = "trilho";
      cursos.forEach(c => trilho.appendChild(cardDe(c)));
      sec.appendChild(h);
      sec.appendChild(trilho);
      adicionarSetas(sec, trilho);
      sec.classList.add("reveal");
      catalogo.appendChild(sec);
      observador.observe(sec);
    }
    if (!catalogo.children.length) {
      catalogo.innerHTML = '<p style="padding:20px 4vw;color:#b9b2a3">Nenhum curso encontrado.</p>';
    }
  }

  /* ---------- SETAS DAS FILEIRAS ---------- */
  function adicionarSetas(sec, trilho) {
    const passo = () => Math.max(trilho.clientWidth * 0.8, 240);
    const esq = document.createElement("button");
    esq.className = "seta seta-esq";
    esq.innerHTML = "‹";
    esq.setAttribute("aria-label", "Cursos anteriores");
    esq.addEventListener("click", () => trilho.scrollBy({ left: -passo(), behavior: "smooth" }));
    const dir = document.createElement("button");
    dir.className = "seta seta-dir";
    dir.innerHTML = "›";
    dir.setAttribute("aria-label", "Próximos cursos");
    dir.addEventListener("click", () => trilho.scrollBy({ left: passo(), behavior: "smooth" }));
    sec.appendChild(esq);
    sec.appendChild(dir);
  }

  /* ---------- ANIMAÇÃO DE ENTRADA ---------- */
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        observador.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".faixa-manifesto, .parceiro-card, .rodape").forEach(el => {
    el.classList.add("reveal");
    observador.observe(el);
  });

  /* ---------- BUSCA (indiferente a acentos: "catimbo" acha "Catimbó") ---------- */
  function semAcento(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  busca.addEventListener("input", () => {
    const q = semAcento(busca.value.trim());
    if (!q) return render(CURSOS);
    render(CURSOS.filter(c =>
      semAcento(c.titulo + " " + c.mestre + " " + c.categoria + " " + c.descricao).includes(q)
    ));
  });

  /* ---------- MODAL ---------- */
  const modal = document.getElementById("modal");
  const mCapa = document.getElementById("modal-capa");
  const mSelo = document.getElementById("modal-selo");
  const mComprar = document.getElementById("modal-comprar");

  function abrirModal(curso) {
    mCapa.className = "modal-capa capa-" + (curso.capa || "mata");
    mSelo.hidden = !curso.emBreve;
    document.getElementById("modal-titulo").textContent = curso.titulo;
    document.getElementById("modal-mestre").textContent = "com " + curso.mestre;
    document.getElementById("modal-desc").textContent = curso.descricao;
    const ul = document.getElementById("modal-aprende");
    ul.innerHTML = "";
    (curso.aprende || []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    document.getElementById("modal-preco").textContent = curso.preco || "";
    if (curso.link && !curso.emBreve) {
      mComprar.href = curso.link;
      mComprar.textContent = "Quero este curso";
      mComprar.removeAttribute("aria-disabled");
    } else {
      mComprar.href = "#";
      mComprar.textContent = "Em breve";
      mComprar.setAttribute("aria-disabled", "true");
    }
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    /* foco vai para o modal; guarda quem abriu para devolver ao fechar */
    focoAnterior = document.activeElement;
    botaoFechar.focus();
  }

  let focoAnterior = null;
  const botaoFechar = document.getElementById("modal-fechar");

  function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (focoAnterior && document.contains(focoAnterior)) focoAnterior.focus();
    focoAnterior = null;
  }

  botaoFechar.addEventListener("click", fecharModal);
  modal.addEventListener("click", e => { if (e.target === modal) fecharModal(); });
  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") { fecharModal(); return; }
    /* prende o Tab dentro do modal enquanto aberto */
    if (e.key === "Tab") {
      const focaveis = [...modal.querySelectorAll("button, a[href]")].filter(n => n.offsetParent !== null);
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    }
  });

  /* ---------- primeira renderização ---------- */
  render(CURSOS);
})();
