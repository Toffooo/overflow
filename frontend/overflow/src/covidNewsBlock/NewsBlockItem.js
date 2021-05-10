
const styles = {
    img: {
        width: '150px',
        height: '150px',
        borderRadius: '14px'
    },
    block: {
        width: '350px',
        height: '150px',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        fontSize: '18px'
    }
}


const NewsBlockItem = props => {
    return (
        <div className="newsBlock__item grid" style={styles.block}>
            <img src={props.imgPath} style={styles.img} alt="" />
            <a href={props.link} style={{ fontWeight: 'bold', color: 'inherit', textDecoration: 'none' }}>
                {props.text}
            </a>
        </div>
    )
}

export default NewsBlockItem