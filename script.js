/* =========================================================
   KONFIGURASI JSONBIN — WAJIB DIISI SEBELUM DIGUNAKAN
   1. Buat akun gratis di https://jsonbin.io
   2. Buat bin baru, isi konten awal dengan: []
   3. Salin "Bin ID" dan "X-Master-Key" ke bawah ini
========================================================= */
const JSONBIN_BIN_ID  = "6a7c7e39da38895dfedadb74";
const JSONBIN_API_KEY = "$2a$10$nou5c3yZntdxwBqnGEEOvuCkZpg9GT4CfSp1IXgNhJpKQzhxI8NYO";
const JSONBIN_URL     = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

/* ================= NAMA TAMU DARI URL ================= */
(function setGuestName(){
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');
  if(to){
    document.getElementById('guest-name').textContent = decodeURIComponent(to.replace(/\+/g,' '));
  }
})();

/* ================= EFEK KUPU-KUPU TERBANG ================= */
(function initButterflies(){
  const container = document.getElementById('butterfly-container');
  if(!container) return;

  // Dua varian warna sayap: oranye-biru & ungu-biru (senada tema gold/maroon undangan)
  const palettes = [
    { a:'#ff9d3d', b:'#ff5e5e', c:'#4a6cf7', d:'#7ee0ff' }, // oranye ke biru
    { a:'#c04dff', b:'#7a3dff', c:'#3d5cff', d:'#8fe7ff' }, // ungu ke biru
    { a:'#ffb347', b:'#e0577a', c:'#5b6cff', d:'#63d9ff' }
  ];

  function buildSVG(id, p){
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${p.a}"/>
            <stop offset="45%" stop-color="${p.b}"/>
            <stop offset="100%" stop-color="${p.c}"/>
          </linearGradient>
        </defs>
        <g class="wing-l">
          <path d="M50 46 C34 18 8 14 4 30 C1 44 18 54 50 52 Z" fill="url(#grad-${id})"/>
          <path d="M50 54 C36 66 16 74 10 64 C6 56 20 50 50 50 Z" fill="${p.d}" opacity=".9"/>
          <circle cx="16" cy="30" r="2.6" fill="#fff" opacity=".55"/>
          <circle cx="20" cy="58" r="2" fill="#fff" opacity=".45"/>
        </g>
        <g class="wing-r">
          <path d="M50 46 C66 18 92 14 96 30 C99 44 82 54 50 52 Z" fill="url(#grad-${id})"/>
          <path d="M50 54 C64 66 84 74 90 64 C94 56 80 50 50 50 Z" fill="${p.d}" opacity=".9"/>
          <circle cx="84" cy="30" r="2.6" fill="#fff" opacity=".55"/>
          <circle cx="80" cy="58" r="2" fill="#fff" opacity=".45"/>
        </g>
        <ellipse cx="50" cy="50" rx="2.6" ry="16" fill="#3a2418"/>
        <path d="M50 38 C47 32 43 28 39 26 M50 38 C53 32 57 28 61 26" stroke="#3a2418" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      </svg>`;
  }

  const jumlah = window.innerWidth < 500 ? 6 : 10;

  for(let i = 0; i < jumlah; i++){
    const wrap = document.createElement('div');
    wrap.className = 'butterfly';

    const size = (Math.random() * 26 + 30).toFixed(0);       // 30-56px
    const left = (Math.random() * 92 + 2).toFixed(1);         // 2-94%
    const riseDuration = (Math.random() * 10 + 14).toFixed(1);// 14-24s naik ke atas
    const riseDelay = (Math.random() * riseDuration).toFixed(1);
    const swayDuration = (Math.random() * 2 + 2.2).toFixed(2);// 2.2-4.2s goyang kiri-kanan
    const swayAmount = (Math.random() * 26 + 18).toFixed(0);  // 18-44px
    const flapDuration = (Math.random() * .18 + .18).toFixed(2); // .18-.36s kepakan sayap
    const opacity = (Math.random() * 0.35 + 0.65).toFixed(2);

    wrap.style.setProperty('--bsize', size + 'px');
    wrap.style.setProperty('--bleft', left + '%');
    wrap.style.setProperty('--sway', swayAmount + 'px');
    wrap.style.opacity = opacity;
    wrap.style.animationDuration = riseDuration + 's';
    wrap.style.animationDelay = '-' + riseDelay + 's';

    const sway = document.createElement('div');
    sway.className = 'bf-sway';
    sway.style.animationDuration = swayDuration + 's';
    sway.style.animationDelay = '-' + (Math.random() * swayDuration).toFixed(2) + 's';

    const palette = palettes[i % palettes.length];
    sway.innerHTML = buildSVG(i, palette);
    wrap.appendChild(sway);
    container.appendChild(wrap);

    // set durasi kepakan tiap sayap (sedikit acak agar tidak seragam)
    const wingL = sway.querySelector('.wing-l');
    const wingR = sway.querySelector('.wing-r');
    if(wingL) wingL.style.animationDuration = flapDuration + 's';
    if(wingR) wingR.style.animationDuration = flapDuration + 's';
  }
})();

/* ================= EFEK SALJU ================= */
(function initSnow(){
  const container = document.getElementById('snow-container');
  if(!container) return;
  const flakes = ['❄', '❅', '❆'];
  const jumlah = window.innerWidth < 500 ? 30 : 55;

  for(let i = 0; i < jumlah; i++){
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];

    const left = Math.random() * 100;
    const size = (Math.random() * 12 + 8).toFixed(1);
    const duration = (Math.random() * 10 + 9).toFixed(1);
    const delay = (Math.random() * duration).toFixed(1);
    const drift = (Math.random() * 90 - 45).toFixed(0);
    const opacity = (Math.random() * 0.5 + 0.4).toFixed(2);

    flake.style.left = left + '%';
    flake.style.fontSize = size + 'px';
    flake.style.opacity = opacity;
    flake.style.animationDuration = duration + 's';
    flake.style.animationDelay = '-' + delay + 's';
    flake.style.setProperty('--drift', drift + 'px');

    container.appendChild(flake);
  }
})();

/* ================= TIRAI / OPENING SCREEN ================= */
const openingScreen = document.getElementById('opening-screen');
const btnOpen = document.getElementById('btn-open');
const invitation = document.getElementById('invitation');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

btnOpen.addEventListener('click', () => {
  // Tampilkan panel tirai (kondisi tertutup) tepat saat tombol diklik
  openingScreen.classList.add('curtain-active');

  // Paksa reflow lalu di frame berikutnya trigger animasi tirai terbuka
  void openingScreen.offsetWidth;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      openingScreen.classList.add('open');
    });
  });

  music.play().catch(()=>{});
  musicToggle.classList.add('spin');

  setTimeout(() => {
    openingScreen.classList.add('hidden');
    document.body.classList.remove('lock');
    invitation.classList.add('show');
    startCountdown();
  }, 1500);
});

musicToggle.addEventListener('click', () => {
  if(music.paused){
    music.play().catch(()=>{});
    musicToggle.classList.add('spin');
  }else{
    music.pause();
    musicToggle.classList.remove('spin');
  }
});

/* ================= COUNTDOWN ================= */
const WEDDING_DATE = new Date("2026-08-21T10:00:00+08:00").getTime();
function startCountdown(){
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
function updateCountdown(){
  const now = new Date().getTime();
  const diff = WEDDING_DATE - now;
  if(diff <= 0){
    document.getElementById('countdown').innerHTML = '<div style="min-width:auto"><span>Selamat Menempuh Hidup Baru</span></div>';
    return;
  }
  const hari = Math.floor(diff/(1000*60*60*24));
  const jam = Math.floor((diff/(1000*60*60))%24);
  const menit = Math.floor((diff/(1000*60))%60);
  const detik = Math.floor((diff/1000)%60);
  document.getElementById('cd-hari').textContent = String(hari).padStart(2,'0');
  document.getElementById('cd-jam').textContent = String(jam).padStart(2,'0');
  document.getElementById('cd-menit').textContent = String(menit).padStart(2,'0');
  document.getElementById('cd-detik').textContent = String(detik).padStart(2,'0');
}

/* ================= GALERI FOTO ================= */
const galleryGrid = document.getElementById('gallery-grid');
const totalFoto = 12;
const fotoList = [];
for(let i=1;i<=totalFoto;i++){
  fotoList.push(`Foto${i}.jpg`);
  const img = document.createElement('img');
  img.src = `Foto${i}.jpg`;
  img.alt = `Momen ${i}`;
  img.loading = 'lazy';
  img.dataset.index = i-1;
  galleryGrid.appendChild(img);
}

/* ================= LIGHTBOX ================= */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let currentIndex = 0;

galleryGrid.addEventListener('click', (e) => {
  if(e.target.tagName === 'IMG'){
    currentIndex = parseInt(e.target.dataset.index);
    openLightbox();
  }
});
function openLightbox(){
  lbImg.src = fotoList[currentIndex];
  lightbox.classList.add('show');
}
document.getElementById('lb-close').addEventListener('click', () => lightbox.classList.remove('show'));
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('show'); });
document.getElementById('lb-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalFoto) % totalFoto;
  openLightbox();
});
document.getElementById('lb-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalFoto;
  openLightbox();
});

/* ================= SALIN NOMOR REKENING ================= */
document.querySelectorAll('.btn-copy').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Tersalin!';
      setTimeout(() => btn.textContent = original, 1500);
    });
  });
});

/* ================= UCAPAN & DOA (JSONBIN) ================= */
const ucapanList = document.getElementById('ucapan-list');
const btnKirim = document.getElementById('btn-kirim');

// Helper: ambil pesan error yang jelas dari response JSONBin yang gagal
async function baca_pesan_error(res){
  try{
    const data = await res.json();
    return data.message || `HTTP ${res.status}`;
  }catch(e){
    return `HTTP ${res.status} ${res.statusText}`;
  }
}

// Mengambil daftar ucapan. Jika gagal, method ini akan MELEMPAR error
// (tidak diam-diam mengembalikan array kosong), supaya proses kirim
// tidak pernah menimpa data lama dengan data kosong.
async function ambilUcapanRaw(){
  const res = await fetch(`${JSONBIN_URL}/latest`, {
    method: 'GET',
    headers: { 'X-Master-Key': JSONBIN_API_KEY }
  });
  if(!res.ok){
    const pesan = await baca_pesan_error(res);
    throw new Error(`Gagal mengambil data ucapan (${pesan}). Periksa JSONBIN_BIN_ID / JSONBIN_API_KEY di script.js.`);
  }
  const data = await res.json();
  return Array.isArray(data.record) ? data.record : [];
}

// Dipakai untuk menampilkan daftar ucapan saat halaman dibuka.
// Boleh gagal secara "lunak" (tampilkan pesan), karena ini hanya untuk tampilan.
async function ambilUcapan(){
  try{
    const list = await ambilUcapanRaw();
    renderUcapan(list);
    return list;
  }catch(err){
    console.error('[Ucapan] Gagal memuat:', err);
    ucapanList.innerHTML = `<div class="ucapan-empty">Belum bisa memuat ucapan.<br><small>${escapeHtml(err.message)}</small></div>`;
    return [];
  }
}

function renderUcapan(list){
  if(!list.length){
    ucapanList.innerHTML = '<div class="ucapan-empty">Jadilah yang pertama memberi ucapan &amp; doa 💌</div>';
    return;
  }
  ucapanList.innerHTML = list.slice().reverse().map(u => `
    <div class="ucapan-item">
      <span class="nama">${escapeHtml(u.nama)}</span><span class="status">${escapeHtml(u.status)}</span>
      <div class="pesan">${escapeHtml(u.pesan)}</div>
    </div>
  `).join('');
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

btnKirim.addEventListener('click', async () => {
  const nama = document.getElementById('in-nama').value.trim();
  const status = document.getElementById('in-status').value;
  const pesan = document.getElementById('in-pesan').value.trim();

  if(!nama || !pesan){
    alert('Mohon isi nama dan ucapan terlebih dahulu.');
    return;
  }

  btnKirim.disabled = true;
  btnKirim.textContent = 'Mengirim...';

  try{
    // 1) Ambil data ucapan yang sudah ada. Jika ini gagal, HENTIKAN proses
    //    (jangan lanjut kirim), supaya data lama tidak tertimpa/hilang.
    const list = await ambilUcapanRaw();
    list.push({ nama, status, pesan, waktu: new Date().toISOString() });

    // 2) Simpan kembali daftar yang sudah ditambah ucapan baru.
    const resPut = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
        'X-Bin-Versioning': 'false'
      },
      body: JSON.stringify(list)
    });

    if(!resPut.ok){
      const pesanError = await baca_pesan_error(resPut);
      throw new Error(`Gagal menyimpan ucapan (${pesanError}). Periksa JSONBIN_BIN_ID / JSONBIN_API_KEY di script.js.`);
    }

    document.getElementById('in-nama').value = '';
    document.getElementById('in-pesan').value = '';
    renderUcapan(list);
  }catch(err){
    console.error('[Ucapan] Gagal mengirim:', err);
    alert('Gagal mengirim ucapan.\n\nDetail: ' + err.message + '\n\n(Buka Console browser dengan F12 untuk detail lengkap)');
  }finally{
    btnKirim.disabled = false;
    btnKirim.textContent = 'Kirim Ucapan';
  }
});

ambilUcapan();