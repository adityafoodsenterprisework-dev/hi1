/* =========================================
   GSAP + ScrollTrigger Setup
========================================= */
gsap.registerPlugin(ScrollTrigger);

/* =========================================
   Navbar Scroll Effect
========================================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================================
   Hero Section Animation
========================================= */
gsap.from(".text-1", { y: 50, opacity: 0, duration: 1 });
gsap.from(".text-2", { y: 50, opacity: 0, duration: 1, delay: 0.5 });

/* =========================================
   About Section Animation
========================================= */
gsap.from(".about-img", {
  scrollTrigger: ".about",
  x: -100,
  opacity: 0,
  duration: 1,
});
gsap.from(".about-text", {
  scrollTrigger: ".about",
  x: 100,
  opacity: 0,
  duration: 1,
});

/* =========================================
   Services Section Animation
========================================= */
gsap.from(".service-card", {
  scrollTrigger: ".services",
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});

/* =========================================
   Features Section Animation
========================================= */
gsap.from(".features-text", {
  scrollTrigger: ".features",
  x: -100,
  opacity: 0,
  duration: 1,
});
gsap.from(".features-img", {
  scrollTrigger: ".features",
  x: 100,
  opacity: 0,
  duration: 1,
});

/* =========================================
   Contact Section Animation
========================================= */
gsap.from(".contact-info", {
  scrollTrigger: ".contact",
  x: -100,
  opacity: 0,
  duration: 1,
});
gsap.from(".appointment-form", {
  scrollTrigger: ".contact",
  x: 100,
  opacity: 0,
  duration: 1,
});

/* =========================================
   Smooth Scroll for Anchor Links
========================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* =========================================
   Mobile Menu Toggle
========================================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* =========================================
   Service Card Hover Effects
========================================= */
const cards = document.querySelectorAll(".service-card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });

    // Icon bounce effect
    gsap.fromTo(
      card.querySelector(".icon"),
      { y: 0 },
      { y: -10, duration: 0.3, ease: "bounce.out" },
    );
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(card.querySelector(".icon"), {
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  });
});

document.querySelectorAll(".select").forEach((select) => {
  const selectedText = select.querySelector(".selected-text");
  const options = select.querySelectorAll(".option");
  const hiddenInput = select.querySelector(".select-value");

  select.querySelector(".selected").addEventListener("click", () => {
    select.classList.toggle("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value || option.textContent.trim();

      selectedText.textContent = value;
      if (hiddenInput) hiddenInput.value = value;

      select.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
});

/* =========================================
   Appointment Form Submission
========================================= */
const form = document.getElementById("appointmentForm");
const successMsg = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop redirect
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
  })
    .then((response) => response.json())
    .then(() => {
      form.reset();
      successMsg.style.display = "block";

      // Success message GSAP animation
      gsap.fromTo(
        successMsg,
        { opacity: 0, scale: 0.7, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
      );

      gsap.to(successMsg, {
        boxShadow:
          "0 0 25px rgba(212,175,55,0.8), 0 0 50px rgba(212,175,55,0.4)",
        repeat: 1,
        yoyo: true,
        duration: 1.5,
        delay: 0.5,
      });

      gsap.to(successMsg, {
        opacity: 0,
        y: -40,
        duration: 1,
        delay: 4,
        ease: "power2.inOut",
        onComplete: () => {
          successMsg.style.display = "none";
        },
      });
    })
    .catch(() => {
      alert("❌ Something went wrong. Please try again.");
    });
});

/* =========================================
   Preloader
========================================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  setTimeout(() => {
    preloader.classList.add("fade-out");
    content.style.display = "block";
  }, 500); // fade out after 3s
});
