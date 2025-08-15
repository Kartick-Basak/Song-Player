// This file handles the logic for the music player.

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const volumeSlider = document.getElementById('volume-slider');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    // Audio and Music Data
    const audio = new Audio();
    const songs = [
        {
            title: "In the Forest",
            artist: "Lesfm",
            src: "https://www.learning-with-eliza.com/wp-content/uploads/2021/04/in-the-forest-ambient-acoustic-guitar-music-6447.mp3"
        },
        {
            title: "Summer Walk",
            artist: "Lesfm",
            src: "https://www.learning-with-eliza.com/wp-content/uploads/2021/04/summer-walk-13854.mp3"
        },
        {
            title: "A Little Romance",
            artist: "Lesfm",
            src: "https://www.learning-with-eliza.com/wp-content/uploads/2021/04/a-little-romance-13856.mp3"
        }
    ];
    let currentSongIndex = 0;
    let isPlaying = false;

    // Functions
    function loadSong(song) {
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        audio.src = song.src;
        // Resetting the UI for the new song
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        durationEl.textContent = '0:00';
    }

    function playSong() {
        isPlaying = true;
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        audio.play();
    }

    function pauseSong() {
        isPlaying = false;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        audio.pause();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong();
        }
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong();
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgressBar() {
        const { duration, currentTime } = audio;
        if (!isNaN(duration)) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
            durationEl.textContent = formatTime(duration);
        }
    }

    function setProgressBar(e) {
        const width = progressBarContainer.clientWidth;
        // e.offsetX gives the click position relative to the element
        const clickX = e.offsetX; 
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgressBar);
    progressBarContainer.addEventListener('click', setProgressBar);
    audio.addEventListener('ended', nextSong);
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    // Initial Load
    // Load the first song when the page loads
    loadSong(songs[currentSongIndex]);
});
