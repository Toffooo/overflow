import Elipse from '../img/elipse.svg'
import ElipseYellow from '../img/elipseyel.svg'
import ElipseGreen from '../img/elipseGreen.svg'


const styles = {
    hr: {
        width: '100%',
        maxWidth: '170px',
        marginRight: '3em',
        background: "#D9CCAB"
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '20px',
        maxHeight: '1.5em'
    },
    img: {
        margin: '20px'
    }
}


const CityBlockItem = props => {
    let img = Elipse

    if (props.infected > 40000) img = Elipse
    else if (props.infected > 20000) img = ElipseYellow
    else if (props.infected < 20000) img = ElipseGreen

    return (
        <div className="cityBlock__item" style={styles.item}>
            <img src={img} alt="" style={styles.img} />
            <p>{props.name}</p>
            <hr style={styles.hr} />
            <p>{props.infected}</p>
        </div>
    )
}


export default CityBlockItem