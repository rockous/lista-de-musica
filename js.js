const list_container = document.getElementById("list-container")
const audio = document.getElementById("audio")
const play_btn = document.getElementById("play-btn")
const prev_btn = document.getElementById("prev-btn")
const next_btn = document.getElementById("next-btn")
const cover_card_img = document.getElementById("cover-card-img")
const volume_up_btn = document.getElementById("volume-up")
const volume_down_btn = document.getElementById("volume-down")
const title_card = document.getElementById("title-card")

let is_playing = false;
let index = 1;
const canciones = [

{
	id: 1,
	title: "Triciclo peruano",
	audio: "audio/02 - los mojarras - TRICICLO PERU_160k.mp3",
	cover: "img/triciclo.jpg",
	artist: "Los mojarras",
},
{
	id: 2,
	title: "Tren al sur",
	audio: "audio/03 - Los Prisioneros - Tren Al Sur_160k.mp3",
	cover: "img/trenalsur.jpg",
	artist: "Los prisioneros",
},
{
	id: 3,
	title: "Porque no se van",
	audio: "audio/04 - los prisioneros Porque no se van ( cancion y letra )_160k.mp3",
	cover: "img/porquenosevan.jpg",
	artist: "Los prisioneros",
},
{
	id: 4,
	title: "Y es que sucede asi",
	audio: "audio/05 - Y Es Que Sucede Asi Letra _160k.mp3",
	cover: "img/yeqsasi.jpg",
	artist: "Pedro Suarez Vertiz",
},
{
	id: 5,
	title: "Por tu amor",
	audio: "audio/06 - POR TU AMOR - (Arturo Barrientos) AUTOCONTROL - Video Oficial_160k.mp3",
	cover: "img/portuamor.jpg",
	artist: "Autocontrol",
},
{
	id: 6,
	title: "Cuando pase el temblor",
	audio: "audio/07 - Soda Stereo - Cuando Pase el Temblor (Official Video)_160k.mp3",
	cover: "img/paseeltemblor.jpg",
	artist: "Soda Stereo",
},
{
	id: 7,
	title: "De musica ligera",
	audio: "audio/08 - Soda Stereo - De Musica Ligera (Official Video)_160k.mp3",
	cover: "img/musicaligera.jpg",
	artist: "Soda Stereo",
},
];
canciones.forEach((e)  => {
	list_container.insertAdjacentHTML(
	"beforeend" ,
	`
	<div class="list-item" id ="${e.id}">
	<img class="cover" src="${e.cover}" alt="${e.title}"/>
	<div class="song-data">
	<div>${e.title}</div>
	<div>${e.artist}</div>
	</div>
	</div> `
	 );
});

const play_card = (obj_audio) =>{
	cover_card_img.src = obj_audio.cover;
	title_card.innerHTML = obj_audio.title;
	is_playing = true;
	play_btn.innerHTML ="pausa";
	index = obj_audio.id;
};
const play_audio = (id) => {
	const res = canciones.find((e) => e.id == id);
	if (res) {
		audio.src = res.audio;
		audio.play();
		play_card(res);
		is_playing = true;
		play_btn.innerHTML="pausa";

	}
};
const animation_active = ( ) => {
	if (is_playing) {
		cover_card_img.style.animationPlayState = "running";
	}
	else {
		cover_card_img.style.animationPlayState = "paused";
	}
};


list_container.addEventListener("click", (e) =>{
	if (e.target.matches(".list-item")) {
		play_audio(e.target.id);
	}else if (e.target.matches(".cover")) {
		play_audio(e.target.parentNode.id);
	}else if (e.target.matches(".song-data")) {
		play_audio(e.target.parentNode.id);
	}else if (e.target.matches(".song-data div")) {
		play_audio(e.target.parentNode.parentNode.id);
	}
});

play_btn.addEventListener("click", () =>{
	if (is_playing) {
		audio.pause();
		is_playing = false;
		play_btn.innerHTML = "play";
	} else {
		is_playing = true;
		play_btn.innerHTML ="pausa";
		audio.play();
	}
	animation_active();
});


window.addEventListener("load", ()=>{
	const progress =document.getElementById("progress-bar");
	progress.max=audio.duration;
	progress.min=0;
	window.setInterval(()=>{
		progress.value=audio.currentTime;
	},1000);

	progress.addEventListener("change",()=>{
		audio.currentTime=progress.value;
	});
});

next_btn.addEventListener("click",()=>{
	if (index<canciones.length) {
		index++;
		play_audio(index);
	}
});
prev_btn.addEventListener("click",()=>{
	if (index>0) {
		index--;
		play_audio(index);
	}
});
volume_up_btn.addEventListener("click",() => {
	audio.volume=audio.volume+0.1;
});

volume_down_btn.addEventListener("click",() => { 
    audio.volume=audio.volume-0.1;
});
