import { LaptopWindows } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

//import Controls from '../../../js/Class/Controls/Controls';


export default ({duration, pause}) => {

    const [video, setVideo] = useState(document.getElementById('watchVideo'));
    const [videoTimeLeft, setVideoTimeLeft] = useState('');
    const [videoTime, setVideoTime] = useState('');
    const [barRight, setBarRight] = useState();
    const [videoTimePreview, setVideoTimePreview] = useState('');
    const [PointerBallIsDown, setPointerBallIsDown] = useState(false);


    const progressBarClick = (e) => {
        const bar = document.getElementById('progressbarBack');
        const barLeft = Math.round(e.clientX - bar.getBoundingClientRect().left);
        const barR = document.getElementById('progressbarBack').offsetWidth;

        if (barLeft <= 0) {
            video.currentTime = 0;
        }
        else if (barLeft >= barR) {
            video.currentTime = video.duration;
        }
        else {
            const selectTime = Math.round((barLeft / barR) * 100);
            const moveToTime = video.duration * (selectTime / 100);
            
            video.currentTime = moveToTime;
        }
        window.getSelection().removeAllRanges();
        setPointerBallIsDown(false);
    }

    const progressMouseMoving = (e) => {
        const watchPreview = document.getElementById('watchPreview');
        const bar = document.getElementById('progressbarBack');
        const barR = document.getElementById('progressbarBack').offsetWidth;
        const mRight = barR - (watchPreview.offsetWidth / 2);
        const barLeft = Math.round(e.clientX - bar.getBoundingClientRect().left);

        if (barLeft <= (watchPreview.offsetWidth / 2)) {
            watchPreview.style.marginLeft = '0px';
        }
        else if (barLeft >= mRight) {
            watchPreview.style.marginLeft = (barR - watchPreview.offsetWidth) + 'px';
        }
        else {
            watchPreview.style.marginLeft = (barLeft - (watchPreview.offsetWidth / 2)) + 'px';
        }

        if (barLeft >= 0 && barLeft <= barR) {

            const selectTime = Math.round((barLeft / barR) * 100);
            const moveToTime = video.duration * (selectTime / 100);

            

            setVideoTimePreview(moveToTime);
        } 
    }

    const pointerBallDown = (e) => {
        setPointerBallIsDown(true);

        video.pause();

        window.addEventListener('pointermove', pointerBallMove, false);

        window.addEventListener('pointerup', pointerBallUp, false);
    }

    const pointerBallMove = (e) => {
        const bar = document.getElementById('progressbarBack');
        const barR = document.getElementById('progressbarBack').offsetWidth;

        const barLeft = Math.round(e.clientX - bar.getBoundingClientRect().left);

        const selectTime = Math.round((barLeft / barR) * 100);

        const moveToTime = Math.round(video.duration * (selectTime / 100));
        video.currentTime = moveToTime;

        window.getSelection().removeAllRanges();
    }

    const pointerBallUp = (e) => {
        window.getSelection().removeAllRanges();
        setPointerBallIsDown(false);

        if (pause) {
            video.play();
        }

        window.removeEventListener('pointermove', pointerBallMove, false);

        window.removeEventListener('pointerup', pointerBallUp, false);
    }

    useEffect(()=>{
        if (duration !== '') {
            setVideo(document.getElementById('watchVideo'));
            setVideoTimeLeft(duration);

            var video = document.getElementById('watchVideo');
            video.addEventListener('timeupdate', updateCountdown, false);
            video.addEventListener('progress', updateBuffer, false);
            
            var progressBarBuffer = document.getElementById("progressBarBuffer");
            var progressBarColor = document.getElementById('progressBarColor');
            var progressBarBallMove = document.getElementById('progressBallMove');
            progressBarColor.style.width = 0;
            progressBarBallMove.style.width = '1px';

            function updateCountdown(e) {
                let time = ( video.currentTime / video.duration ) * 100;
                progressBarColor.style.width = time + '%';
                setVideoTimeLeft(video.duration - video.currentTime);
            }

            function updateBuffer(e) {
                if (duration > 0) {
                for (var i = 0; i < video.buffered.length; i++) {
                        if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                            progressBarBuffer.style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + "%";
                            break;
                        }
                    }
                }
            }

            setBarRight(document.getElementById('progressbarBack').offsetWidth);
        }       
    }, [duration])

    return (
        <div className='watch--progressbar' id='progressbar'>
            <div className='watch--progressbarContainer' onPointerDown={(e) => pointerBallDown(e)} onPointerMove={(e) => progressMouseMoving(e)} onClick={(e) => progressBarClick(e)}>
                <div className='watch--progressbarBack' id='progressbarBack' >
                    <div className='watch--progressbarColor' id='progressBarColor'>
                        <div className='watch--progressBallMove' id='progressBallMove'>
                            <div className='watch--progressbarBall' id='progressbarBall'></div>
                        </div>
                    </div>

                    <div className='watch--progressbar--buffer' id='progressBarBuffer'>

                    </div>
                </div>    
            </div> 

            <div className='watch--preview' id='watchPreview'>
                <div className='watch--preview--time'>
                    {videoTimePreview < 3600 ? new Date(videoTimePreview * 1000).toISOString().substr(14, 5) : new Date(videoTimePreview * 1000).toISOString().substr(11, 8)}  
                </div>                
            </div>

            <div className='watch--progressbar--timer'>
                {videoTimeLeft < 3600 ? new Date(videoTimeLeft * 1000).toISOString().substr(14, 5) : new Date(videoTimeLeft * 1000).toISOString().substr(11, 8)}  
            </div>       
        </div>
    )
}