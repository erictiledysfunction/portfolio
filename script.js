document.addEventListener("DOMContentLoaded", () => {
  // Navigation active state
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll("nav ul li a")
  const pageContainer = document.querySelector(".page-container")

  // Initialize sections visibility
  const initializeSections = () => {
    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add("visible")
      }
    })
  }

  // Smooth scrolling for navigation links with transition effect
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      // Add transition effect
      pageContainer.classList.add("transitioning")

      setTimeout(() => {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        })

        // Update active link immediately
        navLinks.forEach((link) => link.classList.remove("active"))
        this.classList.add("active")

        // Remove transition effect
        setTimeout(() => {
          pageContainer.classList.remove("transitioning")
        }, 300)
      }, 150)
    })
  })

  // Update active link on scroll and handle section visibility
  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200
      const sectionHeight = section.clientHeight
      const sectionBottom = sectionTop + sectionHeight

      // Check if section is in viewport for visibility
      if (pageYOffset >= sectionTop - 300 && pageYOffset < sectionBottom) {
        section.classList.add("visible")
      }

      // Check for active navigation
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    // Update active navigation link
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })

    // Animate skill bars when in view
    if (current === "about") {
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
    // Animation removed - skill bars now display at full width immediately
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

  // Initial setup
  setTimeout(() => {
    initializeSections()

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

  // Education items hover effects
  const educationItems = document.querySelectorAll(".education-item")

  educationItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const logo = item.querySelector(".school-logo")
      if (logo && window.innerWidth > 768) {
        logo.style.opacity = "1"
        logo.style.left = "-120px"
      }
    })

    item.addEventListener("mouseleave", () => {
      const logo = item.querySelector(".school-logo")
      if (logo && window.innerWidth > 768) {
        logo.style.opacity = "0"
        logo.style.left = "-100px"
      }
    })
  })

  // Touch support for mobile devices
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  if (isTouchDevice) {
    // For touch devices, add tap functionality to education items
    educationItems.forEach((item) => {
      let isToggled = false

      item.addEventListener("touchstart", (e) => {
        e.preventDefault()
        const logo = item.querySelector(".school-logo")

        if (logo && window.innerWidth > 768) {
          if (!isToggled) {
            logo.style.opacity = "1"
            logo.style.left = "-120px"
            isToggled = true
          } else {
            logo.style.opacity = "0"
            logo.style.left = "-100px"
            isToggled = false
          }
        }
      })
    })

    // Touch support for contact message card
    const contactCard = document.getElementById("contact-message-card")
    if (contactCard && window.innerWidth > 768) {
      let cardToggled = false

      contactCard.addEventListener("touchstart", (e) => {
        e.preventDefault()
        const messageText = document.getElementById("message-text")
        const socialLinks = document.getElementById("contact-social-links")

        if (!cardToggled) {
          messageText.style.opacity = "0"
          messageText.style.transform = "scale(0.8)"
          socialLinks.style.opacity = "1"
          socialLinks.style.transform = "translate(-50%, -50%) scale(1)"
          cardToggled = true
        } else {
          messageText.style.opacity = "1"
          messageText.style.transform = "scale(1)"
          socialLinks.style.opacity = "0"
          socialLinks.style.transform = "translate(-50%, -50%) scale(0.8)"
          cardToggled = false
        }
      })
    }
  }
})
