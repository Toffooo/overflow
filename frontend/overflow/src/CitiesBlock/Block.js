import { useState } from 'react'

import CityBlockItem from './BlockItem'


const styles = {
    cityBlock: {
        display: 'flex',
        flexDirection: 'column',
        padding: "0px 25px"
    }
}


const CityBlock = () => {
    const [citiesData, setCitiesData] = useState([])
    const [firstReq, setFirstReq] = useState(false)

    const getCities = () => {
        fetch(`${process.env.REACT_APP_COVID_API_BASE_PATH}/covid?tp=cities`)
            .then(res => res.json())
            .then(json => setCitiesData(json))
            .catch(err => console.error(err))
    }

    if (!firstReq) {
        getCities()
        setFirstReq(!firstReq)
    }
    
    return ( 
        <div className="citiesBlock" style={styles.cityBlock}>
            {
                citiesData.map((city, index) => {
                    return <CityBlockItem {...city} key={index} />
                })
            }
        </div>
    )
}

export default CityBlock