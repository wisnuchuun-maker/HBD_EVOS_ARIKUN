/* Ganti isi daftar ini dengan stikermu.
   Isi src dengan nama file gambar, misalnya "ari1.png".
   Kalau src kosong, emoji yang tampil. */
var STICKERS=[
 {src:"foto (1).jpg",emoji:"",label:"Stiker 1"},
 {src:"foto (2).jpg",emoji:"",label:"Stiker 2"},
 {src:"foto (3).jpg",emoji:"",label:"Stiker 3"},
 {src:"foto (4).jpg",emoji:"",label:"Stiker 4"}
];
var PASSWORD="king ari";
var $=function(id){return document.getElementById(id)};

/* Confetti */
var cv=$("fx"),cx=cv.getContext("2d"),bits=[],raf=0;
function size(){cv.width=innerWidth;cv.height=innerHeight}
size();addEventListener("resize",size);
function confetti(n){
  var cols=["#ffc933","#ff4d8d","#3ee6b0","#fff6dc","#8a6bff"];
  for(var i=0;i<(n||120);i++)bits.push({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.4,vx:Math.random()*4-2,vy:Math.random()*3+2,s:Math.random()*8+5,c:cols[i%5],r:Math.random()*6});
  if(!raf)loop();
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  bits=bits.filter(function(b){return b.y<cv.height+20});
  bits.forEach(function(b){b.x+=b.vx;b.y+=b.vy;b.r+=.1;cx.save();cx.translate(b.x,b.y);cx.rotate(b.r);cx.fillStyle=b.c;cx.fillRect(-b.s/2,-b.s/2,b.s,b.s*.6);cx.restore()});
  raf=bits.length?requestAnimationFrame(loop):0;
}

/* Musik */
var bgm=$("bgm"),mb=$("musicBtn");
function playMusic(){
  mb.classList.remove("hidden");
  bgm.play().then(function(){mb.textContent="🔊"}).catch(function(){mb.textContent="🔇"});
}
mb.onclick=function(){
  if(bgm.paused){bgm.play();mb.textContent="🔊"}
  else{bgm.pause();mb.textContent="🔇"}
};

/* Password */
function enter(){
  var v=$("pw").value.trim().toLowerCase();
  var w=["Salah. Masa raja lupa sandinya sendiri?","Bukan itu. Coba pikir lagi, Yang Mulia.","Gerbang menolak. Gerbangnya juga lagi sensi.","Hampir benar. Bohong sih, salah total."];
  if(v===PASSWORD){
    $("gate").classList.add("hidden");$("main").classList.remove("hidden");
    scrollTo(0,0);confetti(160);playMusic();
  }else{
    var h=$("hint");h.textContent=w[Math.floor(Math.random()*w.length)];
    var g=$("pw");g.classList.remove("shake");void g.offsetWidth;g.classList.add("shake");
  }
}
$("pwBtn").onclick=enter;
$("pw").onkeydown=function(e){if(e.key==="Enter")enter()};

/* Umur */
function roast(){
  var r=$("roast");
  r.textContent="Bodo Amat Guweh";
  r.classList.remove("shake");void r.offsetWidth;r.classList.add("shake");
}
$("ageBtn").onclick=roast;
$("age").onkeydown=function(e){if(e.key==="Enter")roast()};

/* Kotak hadiah */
var opened=false;
$("gift").onclick=function(){
  if(opened)return;opened=true;
  this.classList.add("open");confetti(140);
  var box=$("stickers");
  STICKERS.forEach(function(s,i){
    var d=document.createElement("div");d.className="st";d.style.animationDelay=(i*.15+.3)+"s";
    if(s.src){var im=document.createElement("img");im.src=s.src;im.alt=s.label;d.appendChild(im)}
    else{var e=document.createElement("div");e.className="e";e.textContent=s.emoji;e.setAttribute("role","img");e.setAttribute("aria-label",s.label);d.appendChild(e)}
    box.appendChild(d);
  });
};

/* Lilin dan confetti */
var lit=true;
$("blow").onclick=function(){
  lit=!lit;
  $("flame").classList.toggle("hidden",!lit);
  $("blow").textContent=lit?"Tiup Lilin":"Nyalain Lagi";
  $("blowMsg").textContent=lit?"Nyala lagi. Bikin permohonan yang lebih bagus.":"Make a wish dulu. Jangan bilang siapa-siapa.";
  if(!lit)confetti(100);
};
$("boom").onclick=function(){confetti(200)};
