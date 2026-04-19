const items = [
    {
        url1: 'https://res.cloudinary.com/dgq3fmd3r/image/upload/v1776613042/g2a-Photoroom_cvphrk.png',
        url2: 'https://res.cloudinary.com/dgq3fmd3r/image/upload/v1776613043/g2c-Photoroom_saajap.png',
        name: 'Airpods 2 Pro',
        stock: '6 in stock',
        price: '$129.00',
        desc: 'Cancelación activa de ruido, modo transparencia y audio espacial personalizado. Hasta 30h de batería con el estuche.',
        whatsapp: '573053919200',
    },
    {
        url1: 'https://res.cloudinary.com/dgq3fmd3r/image/upload/v1776620194/g3a_1_sdktjl.png',
        url2: 'https://res.cloudinary.com/dgq3fmd3r/image/upload/v1776620194/g3-Photoroom_1_jeb9db.png',
        name: 'Airpods 3 Pro',
        stock: 'In stock',
        price: '$179.00',
        desc: 'Ecualizador adaptativo, controles de sensor de fuerza y estuche MagSafe. Resistente al sudor y agua IPX4.',
        whatsapp: '573053919200',
    },
    {
        url1: 'https://res.cloudinary.com/dgq3fmd3r/image/upload/v1776613043/g4a-Photoroom_dmtinc.png',
        url2: 'https://res.cloudinary.com/dgq3fmd3r/image/upload/v1776620167/g4c-Photoroom_1_xdq8tz.png',
        name: 'Airpods 4 Pro',
        stock: 'In stock',
        price: '$249.00',
        desc: 'Chip H2 de nueva generación, audio adaptativo y detección de conversaciones. Sonido lossless premium.',
        whatsapp: '573053919200',
    },
    {
        url1: 'https://res.cloudinary.com/dgq3fmd3r/image/upload/v1776613045/teclados75pro-Photoroom_oyzeeq.png',
        url2: null,
        name: 'Keyboard Aula S75 Pro',
        stock: 'In stock',
        price: '$89.00',
        desc: 'Diseño compacto 75%, sockets hot-swap, retroiluminación RGB por tecla. Switches pre-lubricados para una escritura ultra suave.',
        whatsapp: '573053919200',
    }
];

const template  = document.getElementById('card-template');
const container = document.getElementById('container');
const infoPanel = document.getElementById('info-main');

// ── Lightbox ──
function openZoom(src, alt) {
    const overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.innerHTML = `<img src="${src}" alt="${alt}"><span class="zoom-close">✕</span>`;
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener('click', close);
    overlay.querySelector('.zoom-close').addEventListener('click', close);
}

// ── Info panel ──
function showInfo(item) {
    const msg   = encodeURIComponent(`¡Hola! Estoy interesado en ${item.name} (${item.price})`);
    const waUrl = `https://wa.me/${item.whatsapp}?text=${msg}`;
    const imgs  = [item.url1, item.url2].filter(Boolean);

    infoPanel.innerHTML = `
        <img class="main-img" id="main-img" src="${imgs[0]}" alt="${item.name}">
        ${imgs.length > 1 ? `
        <div class="thumb-row">
            ${imgs.map((u, i) => `
                <img class="thumb ${i === 0 ? 'thumb-active' : ''}"
                     src="${u}" alt="${item.name} ${i + 1}"
                     data-src="${u}">
            `).join('')}
        </div>` : ''}
        <div class="detail-body">
            <p class="detail-name">${item.name}</p>
            <p class="detail-price">${item.price}</p>
            <p class="detail-desc">${item.desc}</p>
            <p class="detail-stock">${item.stock}</p>
            <a class="wa-btn" href="${waUrl}" target="_blank" rel="noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Pedir por WhatsApp
            </a>
        </div>
    `;

    // main img zoom on click
    const mainImg = infoPanel.querySelector('#main-img');
    mainImg.addEventListener('click', () => openZoom(mainImg.src, item.name));

    // thumbnail swap
    infoPanel.querySelectorAll('.thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImg.src = thumb.dataset.src;
            infoPanel.querySelectorAll('.thumb').forEach(t => t.classList.remove('thumb-active'));
            thumb.classList.add('thumb-active');
        });
    });
}

// ── Render cards ──
items.forEach(item => {
    const clone = template.content.cloneNode(true);
    const card  = clone.querySelector('.product-card');

    clone.querySelector('.product-img1').src = item.url1;

    const img2 = clone.querySelector('.product-img2');
    if (item.url2) {
        img2.src = item.url2;
    } else {
        img2.style.display = 'none';
    }

    clone.querySelector('.product-name').textContent  = item.name;
    clone.querySelector('.product-stock').textContent = item.stock;

    card.addEventListener('click', () => {
        document.querySelectorAll('.product-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        showInfo(item);
    });

    container.appendChild(clone);
});

