// ========= Sticky header style on scroll =========
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
});

// ========= Mobile menu toggle =========
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const expanded = navLinks.classList.contains("active");
  navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");

  // dropdown animation height
  if (expanded) {
    navLinks.style.maxHeight = navLinks.scrollHeight + "px";
  } else {
    navLinks.style.maxHeight = null;
  }
});

// Close menu when clicking a link (mobile)
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      navLinks.style.maxHeight = null;
      navToggle.setAttribute("aria-expanded", "false");
    }
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
document.getElementById("year").textContent = new Date().getFullYear();

// ========= Subtle mouse glow =========
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.setProperty("--x", `${e.clientX}px`);
  glow.style.setProperty("--y", `${e.clientY}px`);
});

// Reduce glow if user prefers less motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
if (prefersReduced.matches && glow) {
  glow.style.opacity = "0";
}