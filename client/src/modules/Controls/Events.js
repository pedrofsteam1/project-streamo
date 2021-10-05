import Controls from '../Controls/Controls';


var volContainer;
var volBar;
var volFlow;
var volCircle;
var video;
var isDown = false;


async function getVolumeElement() {
    volContainer = document.getElementById('volumeContainer');
    volBar = document.getElementById('volumeBar');
    volFlow = document.getElementById('volumeFlow');    
    volCircle = document.getElementById('volumeCircle');
    video = document.getElementById('watchVideo');
    return true;
}


async function VolumeMouseMove(e) {
    e.preventDefault();

    if (isDown) {
        const rect = document.getElementById('volumeBar').getBoundingClientRect();
        let left = Math.floor(e.clientX - rect.left);

         if ( left >= 100 ) {
            Controls.volume(video, 1);
            volFlow.style.width = 100 + '%';
        }
        else if ( left <= 0 ) {
            Controls.volume(video, 0);
            volFlow.style.width = 0 + '%';
        }
        else {
            const valor = left / 100;
            Controls.volume(video, valor);
            volFlow.style.width = left + '%';
        }
    }
}


export default {
    VolumeMouseDown: async (e) => {
        isDown = true;

        volContainer.style.display = 'flex';       

        window.addEventListener("pointermove", VolumeMouseMove, false);
        window.addEventListener("touchmove", VolumeMouseMove, false);
    },
    VolumeMouseUp: async (e) => {
        e.preventDefault();
        if ( isDown ) {
            window.removeEventListener('pointermove', VolumeMouseMove, false);
            window.removeEventListener('touchmove', VolumeMouseMove, false);
            isDown = false;
        }  
    },
    VolumeClick: async (e) => {
        
        const rect = document.getElementById('volumeBar').getBoundingClientRect();
        let left = Math.floor(e.clientX - rect.left);

         if ( left >= 100 ) {
            Controls.volume(video, 1);
            volFlow.style.width = 100 + '%';
        }
        else if ( left <= 0 ) {
            Controls.volume(video, 0);
            volFlow.style.width = 0 + '%';
        }
        else {
            const valor = left / 100;
            Controls.volume(video, valor);
            volFlow.style.width = left + '%';
        }
    }
}