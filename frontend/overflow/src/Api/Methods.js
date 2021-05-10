import React, { useEffect, useState } from 'react'


const GetCountryInfectedData = () => {
    const [countryInfected, setCountryInfected] = useState({infected: 0})
    const [firstReq, setFirstReq] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = () => {
            fetch(`${process.env.REACT_APP_COVID_API_BASE_PATH}/covid?tp=country`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => { 
                setCountryInfected(json)
                setLoading(false)
            })
            .catch(err => console.error(err))
        }

        const timer = setTimeout(() => {
            fetchData()
        }, 5000)

        if (!firstReq) {
            fetchData()
            return () => setFirstReq(true)
        } else {
            return () => clearTimeout(timer)
        }
    })

    return {
        countryInfected: countryInfected,
        setCountryLoading: setLoading,
        loading: loading
    }
}


const GetCovidNews = () => {
    const [covidNews, setCovidNews] = useState([])
    const [firstReq, setFirstReq] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchData = () => {
            fetch(`${process.env.REACT_APP_COVID_API_BASE_PATH}/covid/news`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                setCovidNews(json)
                setLoading(false)
            })
            .catch(err => console.error(err))
        }

        const timer = setTimeout(() => {
            fetchData()
        }, 5000)
        
        if (!firstReq) {
            fetchData() 
            return () => setFirstReq(true)
        } else {
            return () => clearTimeout(timer)
        }

    })

    return {
        covidNews: covidNews,
        setCovidNews: setCovidNews, 
        setNewsLoading: setLoading,
        newsLoading: loading
    }
}


export {
    GetCountryInfectedData,
    GetCovidNews,
}
