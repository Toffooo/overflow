import React, { useState } from 'react';


const style = {
    ul: {
        listStyle: 'none',
        margin: '0 auto',
        padding: 0
    }
}


const InfectedBlock = props => {
    return (
        <ul style={style.ul}>
            <li>Country: {props.infected.name}</li>
            <li>Infected: {props.infected.infected}</li>
            <li>Deaths: {props.infected.deaths}</li>
        </ul>
    )
}


const CityInfectedModal = ({ show, infected, modalControl }) => {
    if (!show) return ""

    return (
        <div style={{ zIndex: 2, background: '#f6f6f6', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', padding: '10px', width: '50vw', height: '50vh', position: 'absolute' }}>
            <span style={{ float: 'right', cursor: 'pointer' }} onClick={modalControl}>&#x2715;</span>
            <ul style={{ listStyle: 'none' }}>
                {
                    infected.map(infected => {
                        return <CityInfectedModalItem meta={infected} />
                    })
                }
            </ul>
        </div>
    )
}


const CityInfectedModalItem = ({ meta }) => {
    return <li><strong>{meta.id}.</strong> {meta.name} - {meta.infected}</li>
}


export {
    InfectedBlock,
    CityInfectedModal,
    CityInfectedModalItem,
}
