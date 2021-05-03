import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types';


const GetInfectedData = () => {
    const [infects, setInfects] = useState({})

    useEffect(() => {
        fetch('http://localhost:2100/api/v1/covid?tp=country')
            .then(res => res.json())
            .then(json => setInfects(json))
    }, [])

    return {
        infects: infects,
    }
}

const GetInfectedCitiesData = () => {
    const [cities, setCitites] = useState([])

    useEffect(() => {
        fetch('http://localhost:2100/api/v1/covid?tp=cities')
            .then(res => res.json())
            .then(json => setCitites(json))
    })

    return {
        cities: cities
    }
}

export {
    GetInfectedData,
    GetInfectedCitiesData
}
