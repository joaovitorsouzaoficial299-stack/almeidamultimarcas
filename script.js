const WHATSAPP = "5562993538698";
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Abrir menu");
    }
  });
});

let activeCategory = "Todos";
const searchInput = document.querySelector("#productSearch");
const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const emptyMessage = document.querySelector("#emptyMessage");

function filterProducts() {
  const query = (searchInput?.value || "").trim().toLocaleLowerCase("pt-BR");
  let visibleCount = 0;
  productCards.forEach((card) => {
    const matchesCategory = activeCategory === "Todos" || card.dataset.category === activeCategory;
    const matchesSearch = (card.dataset.name || "").toLocaleLowerCase("pt-BR").includes(query)
      || card.textContent.toLocaleLowerCase("pt-BR").includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category || "Todos";
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    filterProducts();
  });
});
searchInput?.addEventListener("input", filterProducts);

function orderProduct(productName) {
  const message = `Olá! Vim pelo site da Almeida Multimarcas e gostaria de consultar disponibilidade, tamanhos/cores e valor de: ${productName}.`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => orderProduct(button.dataset.product || "um produto"));
});

document.querySelector("#year").textContent = new Date().getFullYear();

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 })
  : null;

if (revealObserver) {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.remove("reveal");
    element.classList.add("reveal-on-scroll");
    revealObserver.observe(element);
  });
}
