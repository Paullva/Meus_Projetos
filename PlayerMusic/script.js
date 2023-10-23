const nomeMusica = document.getElementById('nome_musica');
const nomeBanda = document.getElementById('nome_banda');
const song = document.getElementById('audio');
const capa = document.getElementById('capa');
const play = document.getElementById('play');
const next = document.getElementById('next');
const voltar = document.getElementById('voltar');
const progressoAtual = document.getElementById('progresso_atual');
const conteinerBarra = document.getElementById('conteiner_barra');
const imbaralhar = document.getElementById('imbaralhar');
const repetir = document.getElementById('repetir');
const songTime = document.getElementById('song_time');
const totalTime = document.getElementById('total_time');
const likeButton = document.getElementById('like');

//------------------------------------------------------------------------
const shameless = {
    nomeMusica: 'Shameless',
    nomeBanda: 'Camila Cabello',
    file: 'Camila Cabello - Shameless',
    liked: false,
};
const believer = {
    nomeMusica: 'Believer',
    nomeBanda: 'Imagine Dragons',
    file: 'Imagine Dragons - Believer',
    liked: false,
};


//-----------------------------------------------------------------------------
let isPlay = false;
let isImba = false;
let isRepet = false;


//------------------------------------------------------------------------------
const playList = JSON.parse(localStorage.getItem('likePlayList')) ?? [shameless, believer];
const imbaList = [...playList];
let index = 0;


//----------------------------------------------------------------------------------
function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlay = true;
}
function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlay = false;
}
function playdesise() {
    if(isPlay == true) {
        pauseSong();
    }
    else {
        playSong();
    }
}
function iniMusica() {
    capa.src= `Midia/${playList[index].file}.jpeg`;
    song.src= `Midia/${playList[index].file}.mp3`;
    nomeMusica.innerText = playList[index].nomeMusica;
    nomeBanda.innerText = playList[index].nomeBanda;
    likeButtonRender();
}
function voltarMusica() {
    if(index === 0){
        index = playList.length - 1;
    }
    else{
        index -= 1;
    }
    iniMusica();
    playSong();
}
function nextMusica() {
    if(index === playList.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    iniMusica();
    playSong();
}
function progressoMusica(){
    const barWidth = (song.currentTime / song.duration) * 100;
    progressoAtual.style.setProperty('--proatual', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}
function jumpTo(event) {
    const width = conteinerBarra.clientWidth;
    const clickPosition = event.offsetX;
    //offsetX se refere-se a largura de onde ouve o click
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}
function imbaPlayList(preImbaArray) {
    const size = preImbaArray.length;
    let curretIndex = size - 1;
    while(curretIndex > 0) {
        let randomIdex = Math.floor(Math.random() * size);
        let aux = preImbaArray[curretIndex];
        preImbaArray[curretIndex] = preImbaArray[randomIdex];
        preImbaArray[randomIdex] = aux;
        curretIndex -= 1;
    }
}
function imbaSong() {
    if(isImba === false) {
        isImba = true;
        imbaPlayList(imbaList);
        imbaralhar.classList.add('boto_active');
    }
    else {
        isImba = false;
        imbaralhar.classList.remove('boto_active');
        imbaList = [...playList];
    }
}
function repetSong() {
    if(isRepet === false) {
        isRepet = true;
        repetir.classList.add('boto_active');
    }
    else {
        isRepet = false;
        repetir.classList.remove('boto_active');
    }
}
function nextOrRepet()  {
    if(isRepet === false) {
        nextSong();
    }
    else {
        playSong();
    }
}
function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}
function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
function likeButtonRender() {
    if(imbaList[index].liked === true) {
        likeButton.classList.add('boto_active')
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    }
    else {
        likeButton.classList.remove('boto_active');
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    }
}
function likeButtonClick() {
    if(imbaList[index].liked === false) {
        imbaList[index].liked = true;
    }
    else{
        imbaList[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('likePlayList', JSON.stringify(playList));
}


//-------------------------------------------------------------------------------------------------------------------------------
iniMusica();
play.addEventListener('click', playdesise);
voltar.addEventListener('click', voltarMusica);
next.addEventListener('click', nextMusica);
song.addEventListener('timeupdate', progressoMusica);
song.addEventListener('ended', nextOrRepet);
song.addEventListener('loadedmetadata', updateTotalTime);
conteinerBarra.addEventListener('click', jumpTo);
imbaralhar.addEventListener('click', imbaSong);
repetir.addEventListener('click', repetSong);
likeButton.addEventListener('click', likeButtonClick);