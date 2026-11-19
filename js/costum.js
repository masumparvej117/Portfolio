
// =====================================
// 1. Smooth Scrolling
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Close mobile navbar
            const navbar = document.querySelector(".navbar-collapse");
            if (navbar && navbar.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(navbar).hide();
            }
        }
    });
});


// =====================================
// 2. Active Navbar Link
// =====================================
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

function updateActiveLink() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href && href.toLowerCase() === `#${current}`.toLowerCase()) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


// =====================================
// 3. Scroll Reveal Animation
// =====================================
const revealElements = document.querySelectorAll(
    ".card, .service-card, .project-card, #about .row, #contact .row"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active-reveal");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// =====================================
// 4. Skill Progress Animation
// =====================================
const skillBars = document.querySelectorAll(".progress-bar");

skillBars.forEach(bar => {
    const finalWidth = bar.style.width;

    bar.style.width = "0%";
    bar.style.transition = "width 1.5s ease";

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bar.style.width = finalWidth;
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(bar);
});


// =====================================
// 5. Back To Top Button
// =====================================
const topButton = document.createElement("button");

topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
topButton.setAttribute("aria-label", "Back to top");

topButton.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    background: #0dcaf0;
    color: #000;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.style.display =
        window.scrollY > 400 ? "block" : "none";
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =====================================
// 6. Contact Form Validation
// =====================================
const contactForm = document.querySelector("#contact form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        const name = this.querySelector('[name="name"]').value.trim();
        const email = this.querySelector('[name="email"]').value.trim();
        const subject = this.querySelector('[name="subject"]').value.trim();
        const message = this.querySelector('[name="message"]').value.trim();

        if (!name || !email || !subject || !message) {
            e.preventDefault();
            alert("Please fill in all fields!");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            alert("Please enter a valid email address!");
        }
    });
}


// =====================================
// 7. Dynamic Footer Year
// =====================================
const copyright = document.querySelector("footer .text-center p");

if (copyright) {
    copyright.innerHTML =
        `© ${new Date().getFullYear()} <span class="text-info fw-bold">Md Masum Parvej</span>. All Rights Reserved.`;
}


// =====================================
// 8. Image Loading Animation
// =====================================
document.querySelectorAll("img").forEach(img => {
    img.addEventListener("load", () => {
        img.classList.add("image-loaded");
    });

    if (img.complete && img.naturalWidth > 0) {
        img.classList.add("image-loaded");
    }
});

console.log("Masum Parvej Portfolio JavaScript Loaded Successfully!");
