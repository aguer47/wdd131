


const highlights = [
    { id: 1, title: "Quick Healthy Breakfast", type: "nutrition", summary: "Overnight oats with fruit. Easy to prep.", img: "images/healthy-food.jpg" },
    { id: 2, title: "10-min Home Workout", type: "workout", summary: "Short routine that needs no equipment.", img: "images/workout.jpg" },
    { id: 3, title: "5-min Mindfulness", type: "mental", summary: "Simple breathing exercise to calm the mind.", img: "images/meditate.jpg" },
    { id: 4, title: "Balanced Lunch Idea", type: "nutrition", summary: "Grain bowl with veggies and beans.", img: "images/balance-diet.jpg" }
];


const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* Render functions  */
function renderHighlightsIn(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const html = items.map(it => `
    <article class="card">
      <h3>${it.title}</h3>
      <img class="lazy" data-src="${it.img}" alt="${it.title}" width="600" height="340" loading="lazy">
      <p>${it.summary}</p>
      <div>
        <button class="save-btn" data-id="${it.id}">Save</button>
        <button class="view-btn" data-id="${it.id}">View</button>
      </div>
    </article>
  `).join('');
    container.innerHTML = html;
}


function getFavorites() {
    const raw = localStorage.getItem('hlh_favs');
    return raw ? JSON.parse(raw) : [];
}
function saveToFavorites(item) {
    const favs = getFavorites();
    if (favs.some(f => f.id === item.id)) return false;
    favs.push(item);
    localStorage.setItem('hlh_favs', JSON.stringify(favs));
    return true;
}
function renderFavoritesList() {
    const list = getFavorites();
    const container = document.getElementById('favoritesList');
    if (!container) return;
    if (list.length === 0) {
        container.innerHTML = `<p>No saved items yet. Save a highlight to keep it here.</p>`;
        return;
    }
    container.innerHTML = list.map(f => `
    <div class="card">
      <h4>${f.title}</h4>
      <p>${f.summary}</p>
    </div>
  `).join('');
}


function handleDocumentClick(e) {
    if (e.target.matches('.save-btn')) {
        const id = Number(e.target.dataset.id);
        const item = highlights.find(h => h.id === id);
        if (!item) return;
        const ok = saveToFavorites(item);
        if (ok) {
            e.target.textContent = 'Saved ✓';
            e.target.disabled = true;
            renderFavoritesList();
        } else {
            e.target.textContent = 'Already saved';
        }
    }
    if (e.target.matches('.view-btn')) {
        const id = Number(e.target.dataset.id);
        const item = highlights.find(h => h.id === id);
        if (!item) return;
        showPopup(item);
    }
}

/*  simple popup */
function showPopup(item) {
    let modal = document.getElementById('hlhModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'hlhModal';
        modal.style.position = 'fixed';
        modal.style.left = 0; modal.style.top = 0; modal.style.right = 0; modal.style.bottom = 0;
        modal.style.background = 'rgba(0,0,0,0.6)';
        modal.style.display = 'flex'; modal.style.alignItems = 'center'; modal.style.justifyContent = 'center';
        modal.innerHTML = `<div style="background:white;padding:18px;max-width:600px;border-radius:8px">
      <button id="closeModal" style="float:right">Close</button>
      <div id="modalContent"></div>
    </div>`;
        document.body.appendChild(modal);
        document.getElementById('closeModal').addEventListener('click', () => modal.remove());
    }
    document.getElementById('modalContent').innerHTML = `
    <h3>${item.title}</h3>
    <img src="${item.img}" alt="${item.title}" style="max-width:100%;height:auto">
    <p>${item.summary}</p>
  `;
}


function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        if (name.length < 2) {
            showFormMsg('Please enter a valid name (2+ characters).', 'error');
            return;
        }
        if (!email.includes('@')) {
            showFormMsg('Please enter a valid email.', 'error');
            return;
        }
        
        const subs = JSON.parse(localStorage.getItem('hlh_subs') || '[]');
        subs.push({ name, email, date: new Date().toISOString() });
        localStorage.setItem('hlh_subs', JSON.stringify(subs));
        showFormMsg(`Thanks ${name}, you're subscribed!`, 'success');
        form.reset();
    });
}
function showFormMsg(text, type = 'info') {
    const el = document.getElementById('formMessage');
    if (!el) return;
    el.textContent = text;
    el.className = type;
}

/*  Menu toggle */
function initMenuToggle() {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('navList');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        nav.style.display = expanded ? 'none' : 'flex';
    });
}

/*  Lazy loading  */
function initLazyLoading() {
    const images = Array.from(document.querySelectorAll('img.lazy'));
    if (!('IntersectionObserver' in window)) {
        images.forEach(img => { img.src = img.dataset.src; img.classList.remove('lazy'); });
        return;
    }
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });
    images.forEach(img => io.observe(img));
}


function init() {
    const year = new Date().getFullYear();
    document.querySelectorAll('#year,#year2,#year3').forEach(el => { if (el) el.textContent = year; });

    
    renderHighlightsIn('highlights', highlights.slice(0, 3));
    renderHighlightsIn('meals', highlights.filter(h => h.type === 'nutrition'));
    renderHighlightsIn('workouts', highlights.filter(h => h.type === 'workout'));

    renderFavoritesList();

    document.body.addEventListener('click', handleDocumentClick);

    initContactForm();
    initMenuToggle();
    initLazyLoading();
}

// run init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// footer  content

const today = new Date();

document.getElementById("currentyear").textContent = today.getFullYear();
document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
