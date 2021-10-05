import React, { useEffect, useState } from 'react';
import './Seasons.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Seasons = ({ info, show }) => {

    const [showSeason, setShowSeason] = useState('none');
    const [seasonInfo, setSeasonInfo] = useState(info);
    const [seasonChoose, setSeasonChoose] = useState(false);
    const [seasonListShow, setSeasonListShow] = useState('flex');
    const [episodesListShow, setEpisodesListShow] = useState('none');

    const seasonClick = (e, season) => {
        setSeasonChoose(season);
        setSeasonListShow('none');
        setEpisodesListShow('flex');
    }

    const seasonReturn = (e) => {
        setSeasonChoose(false)
        setEpisodesListShow('none');
        setSeasonListShow('flex');
    }

    const getListEpisodes = (n) => {
        let list = [];
        for (let i = 1; i <= n; i++) {
            list.push(
            <div className='season--episode--row' key={i}>
                <div className='season--episode--number'>{i}</div>
                <div className='season--episode--name'>EPISODE {i}</div>
            </div>)
        }

        return list;
    }

    useEffect(() => {
        
    }, [])

    return(
        <div className='season--list--wrapper' id='seasonList' data-play={true} style={{display: showSeason}} onClick={(e) => console.log(e.target)}>
            <div className='season--list--container' style={{display : seasonListShow}}>
                <div className='season--list--header'>SEASONS</div>
                <div className='season--list--display'>
                    <div className='season--list--over'>
                        {info.seasons ? info.seasons.map((item, key) => (
                            item.season_number > 0 && 
                                <div className='season--list--row' key={key}
                                onClick={(e) => seasonClick(e, item)}>{item.season_number}° Season</div>
                        )) : <div></div>} 
                    </div>
                </div>       
            </div>

            {seasonChoose ? 
                <div className='season--episodes' style={{display : episodesListShow}}>
                    <div className='season--episodes--header'>
                        <div className='season--episodes--return' onClick={(e) => seasonReturn(e)}><ArrowBackIcon style={{fontSize: 30}} /></div>
                        <div className='season--episodes--seasonName'>{seasonChoose.season_number}° Season</div>
                    </div>
                    <div className='season--episodes--list1'>
                        <div>{getListEpisodes(seasonChoose.episode_count)}</div> 
                    </div>
                </div>
                :
                <div></div>
            }

        </div>
    )
}


export default Seasons;
