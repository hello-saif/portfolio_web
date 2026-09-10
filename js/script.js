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

        const navbar = document.querySelector(".modern-navbar");
        if (navbar) {
            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

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

    /* =========================
       GLOBAL FULL-PAGE LIVE BACKGROUND ANIMATION
    ========================= */
    initGlobalLiveBackground();

});


/**
 * High-performance Global Full-Page Interactive Canvas Animation
 * Features: Viewport-wide Constellation Network, Interactive Mouse Magnetic Field,
 * Floating Flutter/Dev Code Glyphs, Click Shockwaves, and Auto-injection.
 */
function initGlobalLiveBackground() {
    let canvas = document.getElementById("bg-canvas") || document.getElementById("hero-canvas");
    let wrapper = document.querySelector(".global-bg-wrapper") || document.querySelector(".hero-bg-wrapper");

    // Auto-inject if wrapper/canvas is not present in DOM
    if (!wrapper || !canvas) {
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.className = "global-bg-wrapper";
            wrapper.setAttribute("aria-hidden", "true");
            wrapper.innerHTML = `
                <div class="hero-glow hero-glow-1"></div>
                <div class="hero-glow hero-glow-2"></div>
                <div class="hero-glow hero-glow-3"></div>
                <div class="hero-grid-pattern"></div>
                <canvas id="bg-canvas"></canvas>
            `;
            document.body.prepend(wrapper);
        }
        canvas = document.getElementById("bg-canvas");
    }

    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let runes = [];
    let ripples = [];
    let animationFrameId = null;

    const mouse = {
        x: null,
        y: null,
        targetX: null,
        targetY: null,
        isHovered: false,
        radius: 180
    };

    const colorPalette = [
        { r: 99, g: 102, b: 241 },   // Indigo (#6366f1)
        { r: 6, g: 182, b: 212 },    // Cyan (#06b6d4)
        { r: 139, g: 92, b: 246 },   // Violet (#8b5cf6)
        { r: 2, g: 132, b: 199 },    // Flutter Sky Blue (#0284c7)
        { r: 255, g: 255, b: 255 }   // Pure White (#ffffff)
    ];

    const runeSymbols = [
        "</>", "{ }", "Flutter", "01", "⚡", "Widget", "State", "async", "Dart", "Build"
    ];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.scale(dpr, dpr);

        initParticles();
        initRunes();
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.max(Math.floor((width * height) / 15000), 35), 85);

        for (let i = 0; i < count; i++) {
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                baseRadius: Math.random() * 2 + 1.2,
                radius: Math.random() * 2 + 1.2,
                color: color,
                alpha: Math.random() * 0.45 + 0.25,
                baseAlpha: Math.random() * 0.45 + 0.25,
                pulseAngle: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.03 + 0.01
            });
        }
    }

    function initRunes() {
        runes = [];
        const runeCount = Math.min(Math.max(Math.floor(width / 160), 4), 10);

        for (let i = 0; i < runeCount; i++) {
            runes.push({
                text: runeSymbols[i % runeSymbols.length],
                x: Math.random() * width,
                y: Math.random() * height,
                vy: -(Math.random() * 0.35 + 0.15),
                vx: (Math.random() - 0.5) * 0.2,
                size: Math.floor(Math.random() * 4 + 11),
                alpha: Math.random() * 0.35 + 0.15,
                floatOffset: Math.random() * Math.PI * 2
            });
        }
    }

    // Global Window Mouse & Touch Tracking
    function onMouseMove(e) {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        mouse.isHovered = true;
    }

    function onMouseLeave() {
        mouse.isHovered = false;
        mouse.targetX = null;
        mouse.targetY = null;
    }

    function onClick(e) {
        const clickX = e.clientX;
        const clickY = e.clientY;

        ripples.push({
            x: clickX,
            y: clickY,
            radius: 5,
            maxRadius: 190,
            alpha: 0.75
        });

        // Boost nearby particles
        particles.forEach(p => {
            const dx = p.x - clickX;
            const dy = p.y - clickY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 190 && dist > 0) {
                const force = (190 - dist) / 190 * 4;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }
        });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    // Touch Support for Mobile Viewports
    window.addEventListener("touchmove", function (e) {
        if (e.touches.length > 0) {
            mouse.targetX = e.touches[0].clientX;
            mouse.targetY = e.touches[0].clientY;
            mouse.isHovered = true;
        }
    }, { passive: true });

    window.addEventListener("touchend", function () {
        mouse.isHovered = false;
        mouse.targetX = null;
        mouse.targetY = null;
    }, { passive: true });

    // Smooth Mouse Interpolation
    function updateMouse() {
        if (mouse.targetX !== null && mouse.targetY !== null) {
            if (mouse.x === null) {
                mouse.x = mouse.targetX;
                mouse.y = mouse.targetY;
            } else {
                mouse.x += (mouse.targetX - mouse.x) * 0.15;
                mouse.y += (mouse.targetY - mouse.y) * 0.15;
            }
        } else {
            mouse.x = null;
            mouse.y = null;
        }
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        updateMouse();

        // 1. Draw Shockwave Ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += 3.5;
            r.alpha *= 0.94;

            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(6, 182, 212, ${r.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            if (r.alpha < 0.02 || r.radius >= r.maxRadius) {
                ripples.splice(i, 1);
            }
        }

        // 2. Draw & Update Floating Code Runes
        runes.forEach(rune => {
            rune.y += rune.vy;
            rune.x += rune.vx + Math.sin(rune.floatOffset) * 0.3;
            rune.floatOffset += 0.02;

            if (rune.y < -30) {
                rune.y = height + 20;
                rune.x = Math.random() * width;
            }

            ctx.font = `600 ${rune.size}px monospace`;
            ctx.fillStyle = `rgba(99, 102, 241, ${rune.alpha})`;
            ctx.fillText(rune.text, rune.x, rune.y);
        });

        // 3. Update Particles
        const maxDistance = 130;
        const maxDistanceSq = maxDistance * maxDistance;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Speed limit & natural damping
            p.vx *= 0.985;
            p.vy *= 0.985;

            // Maintain base drift velocity
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed < 0.25) {
                p.vx += (Math.random() - 0.5) * 0.1;
                p.vy += (Math.random() - 0.5) * 0.1;
            }

            // Mouse Interactive Physics
            if (mouse.x !== null && mouse.y !== null && mouse.isHovered) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius && dist > 0) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    p.vx += Math.cos(angle) * force * 0.3;
                    p.vy += Math.sin(angle) * force * 0.3;
                }
            }

            p.x += p.vx;
            p.y += p.vy;

            // Bounce / Wrap edges smoothly
            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            else if (p.x > width) { p.x = width; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            else if (p.y > height) { p.y = height; p.vy *= -1; }

            // Pulse radius & glow
            p.pulseAngle += p.pulseSpeed;
            p.radius = p.baseRadius + Math.sin(p.pulseAngle) * 0.5;
            p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.15;
        }

        // 4. Draw Interconnecting Constellation Lines
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < maxDistanceSq) {
                    const dist = Math.sqrt(distSq);
                    const lineAlpha = (1 - dist / maxDistance) * 0.22;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Draw line to mouse if active
            if (mouse.x !== null && mouse.y !== null && mouse.isHovered) {
                const mdx = mouse.x - p1.x;
                const mdy = mouse.y - p1.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mDist < mouse.radius) {
                    const mouseLineAlpha = (1 - mDist / mouse.radius) * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${mouseLineAlpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }
        }

        // 5. Draw Particle Nodes with Radiant Glow
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const { r, g, b } = p.color;

            // Outer soft glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.35})`;
            ctx.fill();

            // Inner solid core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
            ctx.fill();
        }

        animationFrameId = requestAnimationFrame(render);
    }

    // Window Resize Handling
    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 100);
    });

    // Initial Setup
    resize();
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
    }
}

