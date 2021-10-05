import React, { useEffect, useState } from 'react';
import './FeaturedMovie.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const FeaturedMovie = ({item}) => {

    const history = useHistory();
    
    const [pointsColor, setPointsColor] = useState();
    const [listPointer, setListPointer] = useState(0);
    const [year, setYear] = useState();
    const [genres, setGenres] = useState([]);
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [pointsAverage, setPointsAverage] = useState();
    const [numberSeasons, setNumberSeasons] = useState();
    const [playId, setPlayId] = useState();
    const [image, setImage] = useState();


    const loadFeatured = (n) => {
        console.log(item[n])

        setImage(item[n].backdrop_path)

        setName(item[n].original_name);

        setPointsAverage(item[n].vote_average);

        let dt = new Date(item[n].first_air_date)

        setYear(dt.getFullYear());

        if (item[n].number_of_seasons !== 1) {
            setNumberSeasons(item[n].number_of_seasons + ' Temporadas');
        }
        else {
            setNumberSeasons(item[n].number_of_seasons + ' Temporada');
        }

        let gen = [];

        for (let i in item[n].genres) {
            gen.push(item[n].genres[i].name);
        }

        setGenres(gen);

        let desc = item[n].overview;
        if (desc.length > 200) {
            desc = desc.substring(0, 200) + '...';
        }

        setDescription(desc);

        if (item[n].vote_average >= 8 ) {
            setPointsColor('#46d369')
        }
        else if (item[n].vote_average <= 5) {
            setPointsColor('red');
        }
        else {
            setPointsColor('yellow');
        }

        item[n].video === false ? setPlayId(`/watch?id=${item[n].id}&type=movie`) : setPlayId(`/watch?id=${item[n].id}&type=tv`);
    }


    const featSelect = (e, n) => {
        setListPointer(n);

        document.querySelectorAll('.feat--circle').forEach((item)=>{
            item.style.backgroundColor = 'transparent';
        });

        e.target.style.backgroundColor = '#46d369';

        loadFeatured(n);
    }


    const clickFeatArrowLeft = () => {
        let n = listPointer;
        if (n > 0) {
            n = n - 1;
            loadFeatured(n);
        }
        else {
            n = item.length - 1;
            loadFeatured(n);
        }
        setListPointer(n);  
        setBackgroundColor(n);    
    }

    const clickFeatArrowRight = () => {
        let n = listPointer;
        if (n < (item.length - 1)) {
            n = n + 1;
            loadFeatured(n);
        }
        else {
            n = 0;
            loadFeatured(n);
        }
        setListPointer(n);
        setBackgroundColor(n);      
    }

    const setBackgroundColor = (n) => {
        let circle = document.querySelectorAll('.feat--circle');

        circle.forEach((item)=>{
            item.style.backgroundColor = 'transparent';
        });

        circle[n].style.backgroundColor = '#46d369';
    }


    useEffect(()=>{
        loadFeatured(0);
    },[])
    



    return (

        <section className='feat' style={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${image})`
        }}>

            <div className='feat--arrowLeft'>
                <NavigateBeforeIcon style={{fontSize: 70}} onClick={clickFeatArrowLeft} />
            </div>
            <div className='feat--arrowRight'>
                <NavigateNextIcon style={{fontSize: 70}} onClick={clickFeatArrowRight} />
            </div>

            <div className='feat--background--v'>
                <div className='feat--background--h'>
                    <div className='feat--infoDisplay'>
                        <div className='feat--name'>{name}</div>
                        <div className='feat--info'>
                            <div className='feat--points' >
                                <label style={{color: pointsColor}}>{pointsAverage} Pontos</label>
                                <button className='feat--add-favorite'><FavoriteIcon style={{fontSize: 20}} /></button>
                                <button className='feat--like'><ThumbUpIcon style={{fontSize: 20}} /></button>30
                                <button className='feat--dislike'><ThumbDownIcon style={{fontSize: 20}} /></button>11
                            </div>
                            <div className='feat--seasons'>{numberSeasons}</div>
                            <div className='feat--year'>{year}</div>
                        </div>

                        <div className='feat--genres'><strong>Gêneros:</strong> {genres.join(', ')}</div>
                        <div className='feat--description'>{description}</div>
                        <div className='feat--buttons'>
                            <a onClick={() => history.push(playId)} className='feat--watch--button'>► Assistir</a>
                        </div> 
                    </div> 
                       
                </div>
            </div>
            <div className='feat--listCircle'>
                <div className='feat--circle' onClick={(e) => featSelect(e, 0)} style={{backgroundColor: '#46d369'}}></div>
                <div className='feat--circle' onClick={(e) => featSelect(e, 1)}></div>
                <div className='feat--circle' onClick={(e) => featSelect(e, 2)}></div>
                <div className='feat--circle' onClick={(e) => featSelect(e, 3)}></div>
                <div className='feat--circle' onClick={(e) => featSelect(e, 4)}></div>
                <div className='feat--circle' onClick={(e) => featSelect(e, 5)}></div>
            </div> 
        </section>
    )
}


export default FeaturedMovie;