document.addEventListener("DOMContentLoaded", () => {
  // Navigation active state
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll("nav ul li a")

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      })

      // Update active link
      navLinks.forEach((link) => link.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })

    // Animate skill bars when in view
    if (current === "skills") {
      animateSkillBars()
    }

    // Header shadow on scroll
    const header = document.querySelector("header")
    if (window.scrollY > 0) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.boxShadow = "none"
    }
  })

  // Animate skill bars
  function animateSkillBars() {
    const skillLevels = document.querySelectorAll(".skill-level")
    skillLevels.forEach((level) => {
      const width = level.style.width
      level.style.width = "0"
      setTimeout(() => {
        level.style.width = width
      }, 200)
    })
  }

  // Download CV functionality
  document.getElementById("download-cv").addEventListener("click", function (e) {
    e.preventDefault()

    // Create a dummy PDF file for demonstration
    // In a real scenario, you would link to an actual CV file
    alert("CV download started! (This is a demo - in a real site, this would download your actual CV file)")

    // Animation for button click
    this.classList.add("downloading")
    setTimeout(() => {
      this.classList.remove("downloading")
    }, 1000)
  })

  // Reveal animations for elements when they come into view
  const revealElements = document.querySelectorAll(".project-card, .about-content, .skill-category")

  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for reveal elements
  revealElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Call reveal function on load and scroll
  window.addEventListener("load", revealOnScroll)
  window.addEventListener("scroll", revealOnScroll)

  // Initial call to set active link on page load
  setTimeout(() => {
    const scrollPosition = window.scrollY
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    if (current) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    } else {
      // Default to home if no section is active
      navLinks[0].classList.add("active")
    }
  }, 100)
})
