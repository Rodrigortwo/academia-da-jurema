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
    el.setAttribute("aria-label", curso.titulo + " — " + curso.mestre);
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
      catalogo.appendChild(sec);
    }
    if (!catalogo.children.length) {
      catalogo.innerHTML = '<p style="padding:20px 4vw;color:#b9b2a3">Nenhum curso encontrado.</p>';
    }
  }

  /* ---------- BUSCA ---------- */
  busca.addEventListener("input", () => {
    const q = busca.value.trim().toLowerCase();
    if (!q) return render(CURSOS);
    render(CURSOS.filter(c =>
      (c.titulo + " " + c.mestre + " " + c.categoria + " " + c.descricao).toLowerCase().includes(q)
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
  }

  function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.getElementById("modal-fechar").addEventListener("click", fecharModal);
  modal.addEventListener("click", e => { if (e.target === modal) fecharModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) fecharModal(); });

  /* ---------- primeira renderização ---------- */
  render(CURSOS);
})();
