import React, { useState } from 'react';
import './Subtitle.css';


const Subtitle = ({info}) => {

    const [audioChoose, setAudioChoose] = useState(false);
    const [subChoose, setSubChoose] = useState(false);

    const changeAudio = (e) => {
        if (audioChoose) {
            audioChoose.style.color = 'whitesmoke';
        }
        setAudioChoose(e.target);
        e.target.style.color = 'orangered';
    }

    const changeSub = (e) => {
        if (subChoose) {
            subChoose.style.color = 'white';
        }
        setSubChoose(e.target);
        e.target.style.color = 'orangered';
    }

    return(
        <div className='subtitle--wrapper' id='subtitleWrapper' data-play={true}>
            <div className='subtitle--container'>
                <div className='subtitle--audio'>
                    <div className='subtitle--header'>Audio</div>
                    <div className='subtitle--display'>
                        <div className='subtitle--over'>
                            <div className='subtitle--option' onClick={(e) => changeAudio(e)}>Portugues</div>
                            <div className='subtitle--option' onClick={(e) => changeAudio(e)}>Ingles</div>
                        </div>
                    </div>
                </div>

                <div className='subtitle--text'>
                    <div className='subtitle--header'>Subtitle</div>
                    <div className='subtitle--display'>
                        <div className='subtitle--over'>
                            <div className='subtitle--option' onClick={(e) => changeSub(e)}>Portugues</div>
                            <div className='subtitle--option' onClick={(e) => changeSub(e)}>Ingles</div>
                            <div className='subtitle--option' onClick={(e) => changeSub(e)}>Off</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Subtitle;