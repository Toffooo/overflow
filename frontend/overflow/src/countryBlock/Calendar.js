import Round from '../img/round.svg'
import { useState } from 'react'

import { GetCountryInfectedData } from '../Api/Methods'


const styles = {
    calendar: {
        marginTop: '20px',
        maxHeight: '100px'
    },
    days: {
        fontSize: '24px',
        display: 'flex',
        columnGap: '25px',
        lineHeight: '28px',
    },
    day__item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }
}


const monthNames = [
    "Январь", "Феврал", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];


const RoundImg = () => {
    return <img src={Round} alt="" style={{ position: 'absolute', maxWidth: '50px', maxHeight: '50px' }} />
}


const DayButton = props => { 
    return (
        <div className="day__item" style={styles.day__item}>
            { props.active && <RoundImg /> }
            <p onClick={props.onClick}>{props.day}</p>
        </div>
    )
}


const generateCalendar = (currentDate, activeDate, _do) => {
    let counter = 0
    const dateObject = []

    while (counter < 7) {
        let _diff = (new Date().getDate() - currentDate) - counter

        dateObject[counter] = {
            day: currentDate + counter,
            active: currentDate + counter === activeDate ? true : false,
            origin: new Date( new Date().getTime() - (_diff * 24 * 60 * 60 * 1000))
        }

        counter++
    }

    return dateObject
}


const Calendar = ({ days, setDays, setClicked }) => {
    const currentDate = new Date()
    const monthName = monthNames[currentDate.getMonth()]

    const handleClick = day => {
        let activeDay = parseInt(day.target.innerText)

        setDays(
            generateCalendar(
                new Date( currentDate.getTime() - (6 * 24 * 60 * 60 * 1000) ).getDate(),
                activeDay,
                currentDate
            )
        )
        setClicked(true)
    }

    return (
        <div className="calendar" style={styles.calendar}>
            <div className="days" style={styles.days}>
                <p><strong>{monthName}</strong></p>
                {
                    days.map((element, index) => {
                        return (
                            <DayButton 
                                key={index} 
                                onClick={element => handleClick(element)} 
                                active={element.active} 
                                day={element.day} 
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export {
    Calendar,
    generateCalendar
}