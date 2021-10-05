var timedelay = 1;
//var _delay = setInterval(delayCheck, 500);
var _delay;

function delayCheck() {
    try {
        if (timedelay == 3) {
            hide();
            timedelay = 1;
            clearInterval(_delay);
        }
        timedelay = timedelay + 1;
    }
    catch {
        document.body.style.cursor = 'default';
        return;
    }
}

const hide = () => {
    document.body.style.cursor = 'none';
    const painelControle = document.getElementById('watchControls');
    const progressbar = document.getElementById('progressbar');
    painelControle.style.display = 'none';
    progressbar.style.display = 'none';
    document.getElementById('controls--volumecontainer').style.display = 'none';
}

const show = () => {
    const painelControle = document.getElementById('watchControls');
    const progressbar = document.getElementById('progressbar');
    painelControle.style.display = 'flex'; 
    progressbar.style.display = 'flex';
    document.body.style.cursor = 'default';
}


export default {
    showControls: (e) => {
        show();

        const video = document.getElementById('watchVideo');

        clearInterval(_delay);
        timedelay = 1;

        if (e.target.id === "watchScreen" && !video.paused) {
            _delay = setInterval(delayCheck, 500);
        } 
    },

    hideControls: () => {
        hide();
    },

    pause: (video) => {
        video.pause();
        show();
    },

    play: (video) => {
        video.play();
    },

    skipForward: (video) => {
        video.currentTime += 10;
    },

    skipRewind: (video) => {
        video.currentTime -= 10;
    },

    volume: (video, valor) => {
        video.volume = valor;
    },

    volumeMute: (video) => {
        const volumeFlow = document.getElementById('volumeFlow');
        volumeFlow.dataset.volume = video.volume;
        video.volume = 0;
        volumeFlow.style.width = '0';
    },

    volumeUnMute: (video) => {
        const volumeFlow = document.getElementById('volumeFlow');
        video.volume = volumeFlow.dataset.volume;    
        volumeFlow.style.width = (volumeFlow.dataset.volume * 100) + '%'; 
    },

    requestFull: () => {
        const elem = document.getElementById('watch');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } 
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } 
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    },

    exitFull: () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}