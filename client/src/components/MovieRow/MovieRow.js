import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const MovieRow = ({title, items}) => {

    const [left, setLeft] = useState(0);

    const history = useHistory();

    const moveLeftRow = () => {
        let x = left + Math.round(window.innerWidth / 2);

        if (x > 0) {
            x = 0
        }
        
        setLeft(x);
    }

    const moveRightRow = () => {
        let x = left - Math.round(window.innerWidth / 2);

        let listW = items.results.length * 150;

        let xMax = window.innerWidth - listW;

        if (xMax > x) {
            x = xMax - 60;
        }

        setLeft(x);
    }

    const imgError = (e) => {
        e.target.src = '/image/Error/errorb.png';
        e.target.style.height = '225px'; 
        //history.push(`/watch?id=${item.id}`)      
    }

    return (
        <div className='movieRow'>
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={moveLeftRow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>

            <div className='movieRow--right' onClick={moveRightRow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>

            <div className='movieRow--listarea'>
                <div className='movieRow--list' style={{
                    marginLeft: left,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) =>(
                        <div key={key} className='movieRow--item'>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} onError={(e) => imgError(e)} />

                            <div className='movieRow--item--buttons'> 
                                <button className='movieRow--play' onClick={() => item.video === false ? history.push(`/watch?id=${item.id}&type=movie`) : history.push(`/watch?id=${item.id}&type=tv`)}><PlayArrowIcon style={{fontSize: 40}} /></button>

                                <div className='movieRow--options'>
                                    <button className='movieRow--getInfo'><PriorityHighIcon style={{fontSize: 16, backgroundColor: 'transparent'}} /></button>
                                    <button className='movieRow--add'><PlaylistAddIcon style={{fontSize: 16}} /></button>
                                </div>
                            </div>    
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MovieRow;