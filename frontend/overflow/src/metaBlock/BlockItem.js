const metaInfoItem = {
    padding: '5px 10px',
    border: '1px solid white',
    borderRadius: '24.5px',
    gridTemplateColumns: '1fr 2fr',
    alignItems: 'center',
    justifyContent: 'center'
}


const BlockItem = props => {
    return (
        <div className="metaInfo__item grid" style={{...metaInfoItem, ...props.styles}}>
            <img src={props.imgPath} alt="hand" />
            <p>{props.text}</p>
        </div>
    )
}


export default BlockItem