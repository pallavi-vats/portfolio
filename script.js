/* =========================
   NAV ACTIVE LINK (Optimized)
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach(section => navObserver.observe(section));

/* =========================
   SCROLL ANIMATION
========================= */
const animatedElements = document.querySelectorAll(".animate");

const animationObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        animationObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15 }
);

animatedElements.forEach(el => animationObserver.observe(el));

/* =========================
   MOBILE MENU
========================= */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

/* Close menu after clicking a link (mobile UX) */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

/* =========================
   PROJECT VIDEO MODAL
========================= */
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const playButtons = document.querySelectorAll(".play-btn");

playButtons.forEach(button => {
  button.addEventListener("click", () => {
    const videoSrc = button.closest(".project-card").dataset.video;
    modalVideo.src = videoSrc;
    modal.style.display = "flex";
    modalVideo.play();
  });
});

/* Close modal on outside click */
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

/* Close modal on ESC key */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = "";
}
