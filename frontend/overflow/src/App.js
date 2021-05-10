import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

import { GetCountryInfectedData, GetCovidNews } from './Api/Methods'

import MetaInfoBlock from './metaBlock/Block'
import NewsBlock from './covidNewsBlock/NewsBlock'
import CovidInfoBlock from './countryBlock/Block'
import CityBlock from './CitiesBlock/Block'
import { Calendar, generateCalendar } from './countryBlock/Calendar'


const styles = {
  window: { 
    background: '#F5E8FF',
    height: '100vh',
    placeItems: 'center',
    display: 'grid'
  } 
}


function App() {

  const { covidNews, setCovidNews, setNewsLoading, newsLoading } = GetCovidNews()
  const { countryInfected, loading, setLoading } = GetCountryInfectedData()
  const [clicked, setClicked] = useState(false)
  const [days, setDays] = useState(generateCalendar(
    new Date( new Date().getTime() - (6 * 24 * 60 * 60 * 1000)).getDate(),
    new Date().getDate(), 
    new Date()
  ))

  return (
    <div className="window" style={styles.window}>
      <div className="wrapper grid blocks_c-4" style={{ borderRadius: '30px', background: 'white' }}>
        <MetaInfoBlock />
        <CovidInfoBlock 
          loading={loading} 
          days={days} 
          setDays={setDays} 
          clicked={clicked} 
          setClicked={setClicked} 
          infectedData={countryInfected} 
        />
        <NewsBlock setLoading={setNewsLoading} setCovidNews={setCovidNews} loading={newsLoading} news={covidNews} />
        <CityBlock />
      </div>
    </div>
  );
}

export default App;
