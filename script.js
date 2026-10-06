/* =========================================================
   ✏️ CONFIGURAÇÃO
   WHATSAPP: indicativo do país + número, sem "+" nem espaços.
   INSTAGRAM: só o nome de utilizador, sem @ (ex.: "kaconcept").
              Enquanto estiver vazio, os botões de Instagram ficam escondidos.
   ========================================================= */
const WHATSAPP = "351967733558";
const INSTAGRAM = "";
const MENSAGEM_PADRAO = "Olá KA Concept! Gostaria de fazer uma marcação.";

/* --------- Não é preciso mexer abaixo desta linha --------- */
const waLink = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

// WhatsApp
document.querySelectorAll("[data-wa]").forEach((link) => {
  link.href = waLink(link.dataset.msg || MENSAGEM_PADRAO);
});

// Instagram
document.querySelectorAll("[data-ig]").forEach((link) => {
  if (INSTAGRAM) {
    link.href = `https://www.instagram.com/${INSTAGRAM}/`;
  } else {
    link.hidden = true;
  }
});
if (INSTAGRAM) {
  document.querySelectorAll("[data-ig-handle]").forEach((el) => (el.textContent = "@" + INSTAGRAM));
}

document.getElementById("ano").textContent = new Date().getFullYear();

/* ---------- Encontre o seu tom ---------- */
const swatches = [...document.querySelectorAll(".swatch")];
const toneName = document.getElementById("tone-name");
const toneLock = document.getElementById("tone-lock");
const toneSend = document.getElementById("tone-send");

function escolher(sw) {
  swatches.forEach((s) => {
    const ativo = s === sw;
    s.setAttribute("aria-checked", ativo ? "true" : "false");
    s.tabIndex = ativo ? 0 : -1;
  });
  const tom = sw.dataset.tone;
  toneName.textContent = tom;
  toneLock.style.setProperty("--c1", sw.style.getPropertyValue("--c1"));
  toneLock.style.setProperty("--c2", sw.style.getPropertyValue("--c2"));
  toneLock.classList.remove("is-new");
  void toneLock.offsetWidth; // reinicia a animação
  toneLock.classList.add("is-new");

  const msg = tom.startsWith("Ainda não sei")
    ? "Olá KA Concept! Gostaria de uma consulta de coloração. Ainda não sei que tom escolher e queria aconselhamento."
    : `Olá KA Concept! Gostaria de uma consulta de coloração. O tom que me inspira é: ${tom}.`;
  toneSend.href = waLink(msg);
}

swatches.forEach((sw, i) => {
  sw.addEventListener("click", () => escolher(sw));
  sw.addEventListener("keydown", (e) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const next = swatches[(i + dir + swatches.length) % swatches.length];
    next.focus();
    escolher(next);
  });
});
escolher(swatches[0]);
