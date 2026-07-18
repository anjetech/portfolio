// ========= Mobile menu toggle =========
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks?.classList.remove("active");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// ========= Scroll reveal animations =========
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// ========= Footer year =========
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========= Scroll-spy: highlight active nav link =========
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[data-section]");

if (sections.length && navAnchors.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach(a => {
          a.classList.toggle("active", a.dataset.section === id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

  sections.forEach(s => spy.observe(s));
}

// ========= Scroll progress gutter fill =========
const fill = document.getElementById("scrollFill");
if (fill) {
  const updateFill = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.height = `${pct}%`;
  };
  window.addEventListener("scroll", updateFill, { passive: true });
  updateFill();
}
