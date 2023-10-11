var songIndex = 0;
var audioElement = new Audio('Music/0.mp3');
var masterPlay = document.getElementById("masterPlay");
var progressBar = document.getElementById("progressBar");
var currentSong = document.getElementById("currentSong");
var songItems = Array.from(document.getElementsByClassName('songItem'));

var songs = [
    {
        songName : "Katy Perry - Harleys In Hawaii",
        filePath : "Music/0.mp3",
        coverPath : "Images/0.jpg"
    },
    {
        songName : "Jay Sean - Ride It",
        filePath : "Music/1.mp3",
        coverPath : "Images/1.jpeg"
    },
    {
        songName : "The Weeknd - Starboy",
        filePath : "Music/2.mp3",
        coverPath : "Images/2.jpg"
    },
    {
        songName : "Clean Bandit - Rockabye",
        filePath : "Music/3.mp3",
        coverPath : "Images/3.jpeg"
    },
    {
        songName : "Sia - Cheap Thrills",
        filePath : "Music/4.mp3",
        coverPath : "Images/4.jpeg"
    },
    {
        songName : "Sean Paul - No Lie",
        filePath : "Music/5.mp3",
        coverPath : "Images/5.jpeg"
    },
];

masterPlay.addEventListener("click" , ()=>{
    if(audioElement.paused)
    {
        audioElement.play();
        masterPlay.firstElementChild.classList.remove("fa-circle-play");
        masterPlay.firstElementChild.classList.add("fa-circle-pause");
    }
    else
    {
        audioElement.pause();
        masterPlay.firstElementChild.classList.remove("fa-circle-pause");
        masterPlay.firstElementChild.classList.add("fa-circle-play");
        makeAllPlays();
    }
})

audioElement.addEventListener("timeupdate" , ()=>{
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener("change" , ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

var makeAllPlays = () =>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click" , (e) => {
        if(audioElement.paused)
        {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = `Music/${songIndex}.mp3`;
            currentSong.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.firstElementChild.classList.remove("fa-circle-play");
            masterPlay.firstElementChild.classList.add("fa-circle-pause");
        }
        else
        {
            e.target.classList.add("fa-circle-play");
            e.target.classList.remove("fa-circle-pause");
            audioElement.pause();
            masterPlay.firstElementChild.classList.add("fa-circle-play");
            masterPlay.firstElementChild.classList.remove("fa-circle-pause");
        }
    });
});

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex <= 0)
    {
        songIndex = 5;
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src = `Music/${songIndex}.mp3`;
    currentSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.firstElementChild.classList.remove("fa-circle-play");
    masterPlay.firstElementChild.classList.add("fa-circle-pause");
});

document.getElementById("next").addEventListener("click" , ()=>{
    if(songIndex >= 5)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }
    audioElement.src = `Music/${songIndex}.mp3`;
    currentSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.firstElementChild.classList.remove("fa-circle-play");
    masterPlay.firstElementChild.classList.add("fa-circle-pause");
});