import React, {useState, useEffect} from 'react';
import './Main.css';

import RequestDB from '../../modules/RequestDB';
import Header from '../../components/Header/Header';
import MovieRow from '../../components/MovieRow/MovieRow';
import FeaturedMovie from '../../components/FeaturedMovie/FeaturedMovie';
import Footer from '../../components/Footer/Footer';

const Main = () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() =>{
        const loadAll = async () => {
            let list = await RequestDB.getHomeList();
            setMovieList(list);

            let topRated = list.filter(i => i.slug === 'destaques');
            let chosenInfo = []

            while(chosenInfo.length < 6) {
                let randomChosen = Math.floor(Math.random() * (topRated[0].items.results.length - 1));
                let chosen = topRated[0].items.results[randomChosen];
                
                if (chosenInfo.length > 0) {
                    let c = chosenInfo.filter(item => item.id === chosen.id);
                    if(c.length === 0) {
                        chosenInfo.push(await RequestDB.getMovieInfo(chosen.id, 'tv'));
                    }
                }  
                else {
                    chosenInfo.push(await RequestDB.getMovieInfo(chosen.id, 'tv'));
                }
            }
            setFeaturedData(chosenInfo);
        }

        loadAll();
    }, []);

    return (
        <div className='page'>
            
            <Header />

            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className='lists'>
                {movieList.map((item, key) =>(
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <Footer />

            {featuredData === null &&
                <div className='loading'>
                    <div className='loading--loader'></div>
                    <div className='loading--text'>LOADING</div>
                </div>
            }
            
        </div>
    )
}


export default Main;