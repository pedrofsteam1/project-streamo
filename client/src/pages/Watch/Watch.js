import React, { useEffect, useState } from 'react';
import './Watch.css';

import ProgressBar from './ProgressBar/ProgressBar';
import Seasons from './Seasons/Seasons';
import Quality from './Quality/Quality';
import Subtitle from './Subtitle/Subtitle';

import Controls from '../../modules/Controls/Controls';
import Events from '../../modules/Controls/Events';
import RequestDB from '../../modules/RequestDB';

import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import SettingsIcon from '@material-ui/icons/Settings';

import ImpVideo from '../../public/acervo/videos/spiderman/spider.mp4';



export default () => {

    const [videoSrc, setVideoSrc] = useState();
    const [videoId, setVideoId] = useState((new URLSearchParams(window.location.search)).get("id"));
    const [videoType, setVideoType] = useState((new URLSearchParams(window.location.search)).get("type"));
    const [videoInfo, setVideoInfo] = useState(false);
    const [subtitles, setSubtitles] = useState();
    const [video, setVideo] = useState();
    const [videoPlay, setVideoPlay] = useState(true);
    const [iconPlay, setIconPlay] = useState(<PauseIcon style={{fontSize: 35}} />);
    const [volumeIcon, setVolumeIcon] = useState(<VolumeUpIcon style={{fontSize: 35}}/>);
    const [isMute, setIsMute] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [videoDuration, setVideoDuration] = useState('');
    const [videoTimeLeft, setVideoTimeLeft] = useState('');
    const [showSeasonList, setShowSeasonList] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const PausePlay = (e) => {
        if (e.target.dataset.play) {
            if (videoPlay) {
                Controls.pause(video);
                setVideoPlay(false);
                setIconPlay(<PlayArrowIcon style={{fontSize: 35}} />)
            }
            else {
                console.log(video.videoWidth)
                Controls.play(video);
                Controls.showControls(e);
                setVideoPlay(true);
                setIconPlay(<PauseIcon style={{fontSize: 35}} />);
            }
        } 
    }

    const volumeMute = (e) => {
        if (isMute) {
            setIsMute(false);
            setVolumeIcon(<VolumeUpIcon style={{fontSize: 35}}/>);
            Controls.volumeUnMute(video);
        }
        else {
            setIsMute(true);
            setVolumeIcon(<VolumeOffIcon style={{fontSize: 35}}/>);
            Controls.volumeMute(video);
        }
    }

    const setFullscreen = (e) => {
        if ( isFull ) {
            Controls.exitFull();
            setIsFull(false);
        }
        else {
            Controls.requestFull();
            setIsFull(true);
        }
    }

    const showLoading = (e) => {
        const loading = document.getElementById('videoLoading');
        loading.style.display = 'flex';
    }

    const hideLoding = (e) => {
        const loading = document.getElementById('videoLoading');
        loading.style.display = 'none';
    }

    const getVideoInfo = async() => {
        const _type = new URLSearchParams(window.location.search).get("type");
        const _id = new URLSearchParams(window.location.search).get("id");

        const info = await RequestDB.getMovieInfo(_id, _type);
        console.log(info);
        setVideoInfo(info);
    }

    const OpenMenu = (valor) => {
        setIsOpenMenu(valor);
        const open = document.getElementById(valor);
        open.style.display = 'flex'; 
    }

    const CloseMenu = (valor) => {
        const close = document.getElementById(isOpenMenu);
        close.style.display = 'none';

        if (valor !== isOpenMenu) {
            OpenMenu(valor);
        }
        else {
            setIsOpenMenu(false);
        }
    }


    useEffect(()=>{
        setVideo(document.getElementById('watchVideo'));
        const volBar = document.getElementById('volumeContainer');

        volBar.addEventListener("pointerdown", Events.VolumeMouseDown, false);
        window.addEventListener("pointerup", Events.VolumeMouseUp, false);

        volBar.addEventListener("touchstart", Events.VolumeMouseDown, false);
        window.addEventListener("touchend", Events.VolumeMouseUp, false);
        
        const timeLeft = Math.floor(videoDuration - document.getElementById('watchVideo').currentTime);
        setVideoTimeLeft(timeLeft);

        if (videoInfo === false) {
            getVideoInfo();
        }
        
    },[videoDuration]);

    return (
        <section className='watch' id='watch'>
            <div className='watch--container'
            onMouseMove={(e) => Controls.showControls(e)} >
                <video src={ImpVideo} className='watch--video' id='watchVideo' autoPlay
                preload="auto" onLoadedMetadata={(e) => setVideoDuration(Math.floor(e.target.duration))} 
                onWaiting={(e) => showLoading(e)}
                onPlaying={(e) => hideLoding(e)}
                >
                    <track kind="subtitles" src="foo.en.vtt" srcLang="en" label="English"/>
                    
                </video>
                <div className='watch--display'>
                    <div className='watch--screen' id='watchScreen' data-play={true}
                        onClick={(e) => PausePlay(e)}>
                            <Seasons info={videoInfo} show={showSeasonList} />
                            <Quality info={videoInfo} />
                            <Subtitle info={videoInfo} />
                    </div>

                    <ProgressBar duration={videoTimeLeft} pause={videoPlay} />
                    
                    
                    <div className='watch--controls' id='watchControls'>
                        <button className='watch--controls--play' onClick={(e) => PausePlay(e)}>{iconPlay}</button>
                        <button className='watch--controls--back'><Replay10Icon style={{fontSize: 35}} onClick={(e) => Controls.skipRewind(video)} /></button>
                        <button className='watch--controls--forward'><Forward10Icon style={{fontSize: 35}} onClick={(e) => Controls.skipForward(video)} /></button>

                        <div className='watch--controls--volumediv' >
                            <button className='watch--controls--volume' onMouseEnter={(e) => document.getElementById('volumeContainer').style.display = 'flex'} onClick={(e) => volumeMute(e)}>{volumeIcon}</button>
                            <div className='watch--controls--volumecontainer' id='volumeContainer' onClick={(e) => Events.VolumeClick(e)}>
                                <div className='watch--controls--volumeBar' id='volumeBar'>
                                    <div className='watch--controls--volumeFlow' id='volumeFlow' data-volume={100}>     
                                        <div className='watch--controls--volumeMoviment'>
                                            <div className='watch--controls--volumeCircle' id='volumeCircle'></div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        
                        <div className='watch--controls--name'>{videoInfo.name}</div>
                        <button className='watch--controls--info'><HelpOutlineIcon style={{fontSize: 35}} /></button>
                        <button className='watch--controls--previous'><SkipPreviousIcon style={{fontSize: 35}} /></button>
                        <button className='watch--controls--next'><SkipNextIcon style={{fontSize: 35}} /></button>
                        <button className='watch--controls--list' onClick={(e) => !isOpenMenu ? OpenMenu('seasonList') : CloseMenu('seasonList') }><FormatListNumberedIcon style={{fontSize: 35}} /></button>
                        <button className='watch--controls--subtitle' onClick={(e) => !isOpenMenu ? OpenMenu('subtitleWrapper') : CloseMenu('subtitleWrapper')}><SubtitlesIcon style={{fontSize: 35}} /></button>
                        <button className='watch--controls--quality' onClick={(e) => !isOpenMenu ? OpenMenu('qualityWrapper') : CloseMenu('qualityWrapper')}><SettingsIcon style={{fontSize: 35}} /></button>
                        <button className='watch--controls--full' onClick={(e) => setFullscreen(e)}><FullscreenIcon style={{fontSize: 35}} /></button>
                    </div>
                </div>

                <div className='video--loading' id='videoLoading'>
                    <div className='video--loader--loop'>

                    </div>
                </div>
                
                
            </div>
        </section>
    )
}




/*<div className='watch--controls--volumebarC'>
    <div className='watch--controls--volumebarB'>
        <div id='controls--volumebar' className='watch--controls--volumebar' ></div>
    </div>
</div>
<div id='controls--volumeballC' className='watch--controls--volumeballC'>
    <div id='watchCVB' className='watch--controls--volumeballB' onClick={(e) => Events.VolumeClick(e)}>
        <div id='controls--volumeball' className='watch--controls--volumeball'></div>
    </div>
</div> */