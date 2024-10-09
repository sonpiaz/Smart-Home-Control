// Spotify song URLs
const spotifySongs = [
    "https://open.spotify.com/embed/track/7MXVkk9YMctZqd1Srtv4MB", // The Weeknd - Blinding Lights
    "https://open.spotify.com/embed/track/0lx2cLdOt3piJbcaXIV74f", // Lana Del Rey - Summertime Sadness
    "https://open.spotify.com/embed/track/2k1fyo2D7GorZyvql4AFqR", // Taylor Swift - Blank Space
    "https://open.spotify.com/embed/track/4bHsxqR3GMrXTxEPLuK5ue", // Justin Bieber - Love Yourself
    "https://open.spotify.com/embed/track/2nK5F0Bi4cB1PSm5RnF32m"  // Sơn Tùng M-TP - Hãy Trao Cho Anh
];

let currentSongIndex = 0;
let playing = false;

// Get DOM elements
const spotifyPlayer = document.getElementById('spotify-player');
const songNameDisplay = document.getElementById('song-name');

// Temperature control elements
const tempUpButton = document.getElementById('temp-up');
const tempDownButton = document.getElementById('temp-down');
const tempDisplay = document.getElementById('current-temp');

// Initial temperature
let currentTemp = 78;

// Function to update the temperature display
function updateTempDisplay() {
    tempDisplay.textContent = `Current Temperature: ${currentTemp}°F`;
}

// Increase temperature
tempUpButton.addEventListener('click', function () {
    currentTemp++;
    updateTempDisplay();
});

// Decrease temperature
tempDownButton.addEventListener('click', function () {
    currentTemp--;
    updateTempDisplay();
});

// Function to update and play the current song
function updateSongPlayer() {
    songNameDisplay.textContent = `Song: Playing...`;
    spotifyPlayer.src = spotifySongs[currentSongIndex];
    spotifyPlayer.style.display = "block"; // Show player
    spotifyPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

// Play music
document.getElementById('play-music').addEventListener('click', function () {
    if (!playing) {
        playing = true;
        updateSongPlayer();
        console.log("Music is playing");
    }
});

// Pause music
document.getElementById('pause-music').addEventListener('click', function () {
    if (playing) {
        playing = false;
        songNameDisplay.textContent = "Music paused";
        spotifyPlayer.src = ""; // Stop the player
        console.log("Music is paused");
    }
});

// Stop music
document.getElementById('stop-music').addEventListener('click', function () {
    playing = false;
    songNameDisplay.textContent = "Song: No music playing";
    spotifyPlayer.src = ""; // Stop the player
    console.log("Music stopped");
});

// Next track
document.getElementById('next-track').addEventListener('click', function () {
    if (playing) {
        currentSongIndex = (currentSongIndex + 1) % spotifySongs.length; // Cycle through songs
        updateSongPlayer();
        console.log("Playing next song");
    }
});
// Function to update the clock with London time
function updateLondonTime() {
    const londonTimeElement = document.getElementById('london-time');
    
    // Get the current time in UTC and then adjust for London time (UTC+1 or UTC+0 depending on DST)
    const now = new Date();
    const londonOffset = now.getTimezoneOffset() + 60; // Adjust for London (UTC+1)
    const londonTime = new Date(now.getTime() + londonOffset * 60 * 1000);
    
    const hours = londonTime.getUTCHours().toString().padStart(2, '0');
    const minutes = londonTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = londonTime.getUTCSeconds().toString().padStart(2, '0');

    // Update the clock display
    londonTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateLondonTime, 1000);

// Initialize the clock display on page load
updateLondonTime();
