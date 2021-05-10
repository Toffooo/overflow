import { useState } from 'react'

import NewsBlockItem from './NewsBlockItem'

import Pand1 from '../img/pand1.svg'
import Pand2 from '../img/padn2.svg'
import Pand3 from '../img/pand3.svg'
import Pand4 from '../img/pand4.svg'

import Loader from '../Loader/Loader'


const NewsBlock = ({ loading, news, setCovidNews, setLoading }) => {
    const [newsPage, setNewsPage] = useState([0, 4])
    const [currentNews, setCurrentNews] = useState(news.slice([newsPage[0], newsPage[1]]))
    const [firstRender, setFirstRender] = useState(false)

    const images = [Pand1, Pand2, Pand3, Pand4]

    const generateNews = () => {        
        if (newsPage[1] + 4 > news.length) {
            setNewsPage([0, 4])    
        } else {
            setNewsPage([newsPage[0] + 4, newsPage[1] + 4])
        }
        setCurrentNews(news.slice(newsPage[0], newsPage[1]))
    }

    if (!firstRender && news.length > 0) {
        generateNews()
        setFirstRender(true)
    }

    setTimeout(() => {
        generateNews()
    }, 10000)

    return (
        <div className="covidNews grid">
            <h1 style={{ gridColumnStart: 1, gridColumnEnd: 3, maxHeight: '0px' }}>Новости</h1>
            {loading ? <Loader style={{ alignItems: 'center' }} /> : currentNews.map((_new, index) => {
                return <NewsBlockItem 
                            key={index}
                            text={`${_new.title.slice(0, 50)}...`} 
                            link={_new.content_link} 
                            imgPath={images[index]} 
                        />
            }) }
        </div>
    )
}

export default NewsBlock