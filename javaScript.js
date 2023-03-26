
    let now_playing = document.querySelector(".now-playing");
    let track_art = document.querySelector(".track-art");
    let track_name = document.querySelector(".track-name");
    let track_artist = document.querySelector(".track-artist");

    let playpause_btn = document.querySelector(".playpause-track");
    let next_btn = document.querySelector(".next-track");
    let prev_btn = document.querySelector(".prev-track");
    let vid = document.querySelector('.video');

    let seek_slider = document.querySelector(".slider");
    let volume_slider = document.querySelector(".volume_slider");
    let curr_time = document.querySelector(".current-time");
    let total_duration = document.querySelector(".total-duration");
    let onhover_playPause = document.querySelectorAll('i')[3];
    let hide_playPause = document.querySelector('.playpause');

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

    // Create new audio element
    let curr_track = document.createElement('audio');

    // Define the tracks that have to be played
    let track_list = [
      {
        name: "Middle Of The Night",
        artist: "Elle Duhe",
        path: "Songs/MiddleOfTheNight.mp3"
      },
//       {
//           name: "Dil Ibadat",
//           artist: "KK",
//           path: "Songs/Dilibadat.mp3"
//         },
        {
          name: "Haan Tu Hai",
          artist: "KK",
          path: "Songs/HaanTuHai.mp3"
        },
        {
          name: "Uska Hi Banana",
          artist: "Arijit Singh",
          path: "Songs/UskaHiBanana.mp3"
        },
        {
          name: "Kya Mujhe Pyaar Hai",
          artist: "KK",
          path: "Songs/KyaMujhePyaar.mp3"
        },
        {
          name: "Tu Hi Meri Shab Hai",
          artist: "KK",
          path: "Songs/TuhiShabHai.mp3",
        },
        {
          name: "Zara Sa",
          artist: "KK",
          path: "Songs/ZaraSa.mp3",
        },
    ];

    function loadTrack(track_index) {
      clearInterval(updateTimer);
      resetValues();

      // Load a new track
      curr_track.src = track_list[track_index].path;
      curr_track.load();

      // Update details of the track
      track_name.textContent = track_list[track_index].name;
      track_artist.textContent = track_list[track_index].artist;
      now_playing.textContent = "Playing " + (track_index + 1) + " Of " + track_list.length;

      // Set an interval of 1000 milliseconds for updating the seek slider
      updateTimer = setInterval(seekUpdate, 1000);

      // Move to the next track if the current one finishes playing
      curr_track.addEventListener("ended", nextTrack);

    }


    // Reset Values
    function resetValues() {
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
      if(!isPlaying){
        pauseVideo();
      }
    }

    function playpauseTrack() {
      if (!isPlaying) {
        playTrack();
        playVideo();
      }
      else {
        pauseTrack();
        pauseVideo();
      }
    }
    document.addEventListener("keyup",function(event){
        if(event.key == " " || event.code == "Space" || event.keyCode == 32)
        playpauseTrack();
        if(event.keyCode == 39)
        nextTrack();
        if(event.keyCode == 37)
        prevTrack();
      })

    function playTrack() {
      curr_track.play();
      isPlaying = true;

      // Replace icon with the pause icon
      playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';

    }
    function playVideo(){
      vid.play();
    }

    function pauseTrack() {
      curr_track.pause();
      isPlaying = false;

      // Replace icon with the play icon
      playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    function pauseVideo(){
      vid.pause();
    }

    function nextTrack() {
      if (track_index < track_list.length - 1)
        track_index += 1;
      else track_index = 0;
      loadTrack(track_index);
      playTrack();
      playVideo();
    }

    function prevTrack() {
      if (track_index > 0)
        track_index -= 1;
      else track_index = track_list.length;
      loadTrack(track_index);
      playTrack();
      playVideo();
    }

    function seekTo() {
      seekto = curr_track.duration * (seek_slider.value / 100);
      curr_track.currentTime = seekto;
    }

    function setVolume() {
      curr_track.volume = volume_slider.value / 100;
    }

    function seekUpdate() {
      let seekPosition = 0;

      // Check if the current track duration is a legible number
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }

    // Load the first track in the tracklist
    loadTrack(track_index);
