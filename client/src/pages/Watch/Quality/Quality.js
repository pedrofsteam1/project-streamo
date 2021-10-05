import React, { useEffect, useState } from 'react';
import './Quality.css';


const Quality = ({info}) => {

    const [video, setVideo] = useState(document.getElementById('watchVideo'));
    const [qualityChoose, setQualityChoose] = useState(false);

    const changeQuality = (e) => {
        if(qualityChoose) {
            qualityChoose.style.color = 'whitesmoke';
        }
        setQualityChoose(e.target);
        e.target.style.color = 'orangered';
    }

    useEffect(() => {
        setVideo(document.getElementById('watchVideo'))
    },[])

    return (
        <div className='quality--wrapper' id='qualityWrapper' data-play={true}>
            <div className='quality--container'>
                <div className='quality--header'>Qualidade</div>
                <div className='quality--display'>
                    <div className='quality--over'>
                        <div className='quality--option' onClick={(e) => changeQuality(e)}>Muito Alta 4K</div>
                        <div className='quality--option' onClick={(e) => changeQuality(e)}>Alta</div>
                        <div className='quality--option' onClick={(e) => changeQuality(e)}>Media</div>
                        <div className='quality--option' onClick={(e) => changeQuality(e)}>Baixa</div>
                        <div className='quality--option' onClick={(e) => changeQuality(e)}>Muito Baixa</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Quality;