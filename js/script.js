document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       NAVBAR ACTIVE LINK
    ========================= */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", function () {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });


    /* =========================
       CLOSE MOBILE NAVBAR
    ========================= */

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            const navbar = document.querySelector(".navbar-collapse");

            if (navbar.classList.contains("show")) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbar);

                if (bsCollapse) {
                    bsCollapse.hide();
                }

            }

        });

    });


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert(
                "Thank you for your message! I will get back to you soon."
            );

            contactForm.reset();

        });

    }


    /* =========================
       SCROLL ANIMATION
    ========================= */

    const cards = document.querySelectorAll(
        ".skill-card, .project-card, .about-card"
    );

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease";

        observer.observe(card);

    });

});

