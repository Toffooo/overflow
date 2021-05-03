import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'

import { GetInfectedData, GetInfectedCitiesData } from './api/Api.js'
import { InfectedBlock, CityInfectedModal } from './countryBlock/Data.js'
import Button from './countryBlock/Button.js'


function App() {
  
  const { infects } = GetInfectedData()
  const { cities } = GetInfectedCitiesData()
  
  const [modalShow, setShowModal] = useState(false);
    
  const modalControl = () => {
      setShowModal(modalShow ? false : true)
  }

  return (
    <div className="wrapper">
      <h1>Infected {infects.name}</h1>

      <CityInfectedModal infected={cities} show={modalShow} modalControl={modalControl}/>

      <InfectedBlock infected={infects} />
      <Button text="cities" className="btn btn-primary" onClick={modalControl} />
    </div>
  )
}

export default App;
