/* =========================
   NAV ACTIVE LINK (POLISHED)
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

if (sections.length && navLinks.length) {
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
}

/* =========================
   SCROLL ANIMATION (SAFE)
========================= */
const animatedElements = document.querySelectorAll(".animate");

if (animatedElements.length) {
  const animationObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          animationObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach(el => animationObserver.observe(el));
}

/* =========================
   MOBILE MENU (SMOOTH UX)
========================= */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

/* =========================
   PROJECT VIDEO MODAL (SAFE GUARD)
========================= */
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const playButtons = document.querySelectorAll(".play-btn");

if (modal && modalVideo && playButtons.length) {
  playButtons.forEach(button => {
    button.addEventListener("click", e => {
      const card = button.closest(".project-card");
      const videoSrc = card?.dataset?.video;

      if (!videoSrc) return;

      modalVideo.src = videoSrc;
      modal.style.display = "flex";
      modalVideo.play();
    });
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
  }
}
