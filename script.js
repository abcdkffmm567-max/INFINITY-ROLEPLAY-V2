const SERVER_IP = '51.68.107.75:11999';
const APK_URL = '#';

const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.dot')];let slideIndex=0;
function showSlide(i){slideIndex=i;slides.forEach((s,n)=>s.classList.toggle('active',n===i));dots.forEach((d,n)=>d.classList.toggle('active',n===i));}
dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));setInterval(()=>showSlide((slideIndex+1)%slides.length),4500);
const toast=document.getElementById('toast');function notify(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
async function copyIp(){try{await navigator.clipboard.writeText(SERVER_IP);notify('Server IP copied')}catch(e){notify(SERVER_IP)}}
document.getElementById('copyIpBtn').addEventListener('click',copyIp);document.getElementById('playBtn').addEventListener('click',copyIp);
document.getElementById('downloadBtn').addEventListener('click',(e)=>{if(APK_URL==='#'){e.preventDefault();notify('Add your APK link in script.js')}else e.currentTarget.href=APK_URL});
const navBtn=document.getElementById('navMenuBtn'),mobileNav=document.getElementById('mobileNav');navBtn.addEventListener('click',()=>mobileNav.classList.toggle('open'));mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));
const floatingMenu=document.getElementById('quickMenu');document.getElementById('floatingMenuBtn').addEventListener('click',()=>floatingMenu.classList.toggle('open'));
document.querySelectorAll('.faq-item').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('open');btn.nextElementSibling.classList.toggle('open')}));
const modal=document.getElementById('modal'),modalTitle=document.getElementById('modalTitle'),modalEyebrow=document.getElementById('modalEyebrow'),modalBody=document.getElementById('modalBody');
function openModal(type){floatingMenu.classList.remove('open');if(type==='players'){modalEyebrow.textContent='LIVE DATA';modalTitle.textContent='ONLINE PLAYERS';modalBody.innerHTML='<div class="player-row"><strong>ALL PLAYERS</strong><span>1 ONLINE</span></div><div class="player-row"><strong>Unknown</strong><span>#1</span></div>'}else if(type==='factions'){modalEyebrow.textContent='FACTIONS';modalTitle.textContent='ALL FACTIONS';modalBody.innerHTML='<div class="player-row"><strong>LSPD</strong><span>0 ONLINE</span></div><div class="player-row"><strong>EMS</strong><span>0 ONLINE</span></div><div class="player-row"><strong>GOVERNMENT</strong><span>0 ONLINE</span></div>'}else{modalEyebrow.textContent='INFINITY ROLE PLAY';modalTitle.textContent=type.toUpperCase();modalBody.innerHTML='<div class="modal-empty">This section is ready to connect to your Firebase / website system.</div>'}modal.classList.add('open')}
document.getElementById('playersBtn').addEventListener('click',()=>openModal('players'));document.getElementById('factionsBtn').addEventListener('click',()=>openModal('factions'));document.querySelectorAll('.quick-menu button').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.action)));document.getElementById('modalClose').addEventListener('click',()=>modal.classList.remove('open'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});document.addEventListener('click',e=>{if(!floatingMenu.contains(e.target)&&!document.getElementById('floatingMenuBtn').contains(e.target))floatingMenu.classList.remove('open')});

// Shared image storage (Admin Panel -> Website) using IndexedDB.
const DB_NAME='InfinityRPContent',STORE='images';
function openDb(){return new Promise((res,rej)=>{const r=indexedDB.open(DB_NAME,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE)};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function getImage(key){try{const db=await openDb();return await new Promise((res,rej)=>{const tx=db.transaction(STORE,'readonly'),q=tx.objectStore(STORE).get(key);q.onsuccess=()=>res(q.result||null);q.onerror=()=>rej(q.error)})}catch{return null}}
async function loadAdminImages(){const keys=['hero1','hero2','hero3','showcase1','showcase2','showcase3','downloadBg'];for(const key of keys){const src=await getImage(key);if(!src)continue;if(key.startsWith('hero')){const i=Number(key.slice(-1))-1;if(slides[i])slides[i].style.backgroundImage=`url("${src}")`}else if(key==='downloadBg'){document.querySelector('.download-art').style.backgroundImage=`url("${src}")`}else{const el=document.getElementById(key);if(el)el.src=src}}}
loadAdminImages();
