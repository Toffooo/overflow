import Chart from '../img/chart.svg'
import Chart2 from '../img/chart2.svg'
import Chart3 from '../img/chart3.svg'
import Chart4 from '../img/chart4.svg'

import { useState } from 'react'


const styles = {
    statisticBlock: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '0.1fr 1fr 1fr',
        marginRight: '30px',
        gridGap: '20px',
        maxHeight: '200px'
    },
    statisticBlock__item: {
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 25px',
        minHeight: '100px',
        height: '100%'
    },
    _fix_p: {
        margin: 0,
    },
    _div: {
        minHeight: '65px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}


const StatisticBlockItem = props => {
    return (
        <div className="statisticBlock__item" style={{ ...styles.statisticBlock__item, background: props.color }}>
            <div style={styles._div}>
                <p style={styles._fix_p}>{ props.title }</p>
                <p style={{ alignItems: 'center', fontSize: '28px', fontWeight: 'bold', margin: 0 }} >{props.infects}</p>
            </div>
            <img src={props.chart} alt="" />
        </div>
    )
}


const getDataByDate = (props) => {
    fetch(`${process.env.REACT_APP_COVID_API_BASE_PATH}/covid/time_period?date=${props.unix}`)
        .then(res => res.json())
        .then(json => { 
                props.setInfectedData([]);
                props.setInfectedData(json)
        })
        .catch(err => console.error(err))
}


const convertToStringType = value => {
    return `${parseInt(value / 1000)}k`
}


const StatisticBlock = props => {
    let [firstReq, setFirstReq] = useState(0);
    let unix = parseInt(props.date.filter(d => d.active)[0].origin / 1000)

    const [infectedData, setInfectedData] = useState([]);

    if (!props.clicked && props.date.filter(d => d.active)[0].day === new Date().getDate() && firstReq === 0) {
        getDataByDate({unix, setInfectedData})
        setFirstReq(1)
    }

    if (props.clicked) {
        getDataByDate({unix, setInfectedData})
        props.setClicked(false)
    }

    console.log(props)

    return (
        <div className="statisicBlock" style={styles.statisticBlock}>
            <p style={{ maxHeight: '10px' }}>По всему Казахстану <br /> ({ props.data.updated })</p>
            <p></p>
            <StatisticBlockItem color="#E9FCFF" chart={Chart} title="За все время" infects={convertToStringType(props.data.infected)} />
            <StatisticBlockItem color="#F0FFE4" chart={Chart2} title="За этот день" infects={infectedData.length} />
            <StatisticBlockItem color="#FCFFEF" chart={Chart3} title="С летальным исходом за все время" infects={
                convertToStringType(props.data.deaths)
            } />
            <StatisticBlockItem color="#EFF1FF" chart={Chart4} title="Выздоровели за все время" infects={convertToStringType(props.data.recovered)} />
        </div>
    )
}

export {
    StatisticBlock,
}
