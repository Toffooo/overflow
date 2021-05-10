import { Calendar } from './Calendar'
import { StatisticBlock } from './StatisticBlock'

import Loader from '../Loader/Loader'


const CovidInfoBlock = ({ loading, days, setDays, clicked, setClicked, infectedData }) => {
    return (
        <div className="covidInfo" style={{ marginLeft: '30px' }}>
            <Calendar days={days} setDays={setDays} setClicked={setClicked} />
            { loading ? <Loader /> : <StatisticBlock setClicked={setClicked} date={days} clicked={clicked} data={infectedData} /> }
        </div>
    )
}

export default CovidInfoBlock