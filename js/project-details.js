document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".feature-card, .challenge-card, .info-card, .screenshot-card, .role-card, .workflow-item, .future-list div"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );


    revealElements.forEach((element) => {
        observer.observe(element);
    });



    /* =========================================
       MOBILE NAVBAR
    ========================================= */

    const navLinks = document.querySelectorAll(
        ".project-navbar .nav-link"
    );

    const navbar = document.querySelector(
        "#navbarNav"
    );


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (
                navbar &&
                navbar.classList.contains("show")
            ) {

                const collapse =
                    bootstrap.Collapse.getInstance(navbar);

                if (collapse) {
                    collapse.hide();
                }

            }

        });

    });



    /* =========================================
       SCREENSHOT LIGHTBOX
    ========================================= */

    const screenshots =
        document.querySelectorAll(".screenshot-card img");


    screenshots.forEach((image) => {

        image.addEventListener("click", () => {

            const overlay =
                document.createElement("div");

            overlay.className =
                "image-lightbox";


            overlay.innerHTML = `
    < button class="lightbox-close" >
        <i class="bi bi-x-lg"></i>
                </button >

    <img src="${image.src}" alt="${image.alt}">
        `;


        document.body.appendChild(overlay);


            requestAnimationFrame(() => {
            overlay.classList.add("active");
            });


        overlay.addEventListener(
        "click",
                (event) => {

                    if (
        event.target === overlay ||
        event.target.closest(".lightbox-close")
        ) {

            overlay.classList.remove("active");

                        setTimeout(() => {
            overlay.remove();
                        }, 250);

                    }

                }
        );

        });

    });



        /* =========================================
           ESC CLOSE LIGHTBOX
        ========================================= */

        document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                const lightbox =
        document.querySelector(".image-lightbox");

        if (lightbox) {
            lightbox.remove();
                }

            }

        }
        );

});
        