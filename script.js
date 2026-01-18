const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const themeBtn = document.getElementById("themeBtn");
const STORAGE_KEY = "theme";

function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const t = getTheme();
    if (themeBtn) themeBtn.textContent = (t === "light") ? "☀️" : "🌙";
}

const saved = localStorage.getItem(STORAGE_KEY);
if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
}
updateThemeIcon();

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const next = (getTheme() === "light") ? "dark" : "light";
        setTheme(next);
    });
}


function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const out = document.getElementById("formResult");

    const name = form.elements["name"]?.value?.trim() || "";
    const contact = form.elements["contact"]?.value?.trim() || "";
    const message = form.elements["message"]?.value?.trim() || "";

    const subject = encodeURIComponent(`Заявка з сайту — ${name || "без імені"}`);
    const body = encodeURIComponent(
        `Ім'я: ${name}\nКонтакт: ${contact}\n\nПовідомлення:\n${message}\n`
    );

    if (out) out.textContent = "Відкриваю пошту для відправки… ✅";

    window.location.href = `mailto:bevzyuk.ivan13@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
    return false;
}

window.handleSubmit = handleSubmit;

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const navBackdrop = document.getElementById("navBackdrop");

function setMenuOpen(open) {
    if (!menuBtn || !mobileNav || !navBackdrop) return;

    menuBtn.setAttribute("aria-expanded", String(open));

    mobileNav.hidden = !open;
    navBackdrop.hidden = !open;

    mobileNav.classList.toggle("is-open", open);
    navBackdrop.classList.toggle("is-open", open);

    document.body.style.overflow = open ? "hidden" : "";
}

if (menuBtn && mobileNav && navBackdrop) {

    setMenuOpen(false);

    menuBtn.addEventListener("click", () => {
        const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
        setMenuOpen(!isOpen);
    });

    navBackdrop.addEventListener("click", () => setMenuOpen(false));

    mobileNav.addEventListener("click", (e) => {
        const link = e.target?.closest?.("a");
        if (link) setMenuOpen(false);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenuOpen(false);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) setMenuOpen(false);
    });
}
