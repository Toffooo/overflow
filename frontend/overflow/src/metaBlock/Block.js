import BlockItem from './BlockItem'

import SalyHand from '../img/SalyHand.svg'
import Todo from '../img/todo.svg'
import treeMan from '../img/treeMan.svg'
import laptopMan from '../img/manLaptop.svg'
import Corona from '../img/corona.svg'

import  { Redirect } from 'react-router-dom'


const bannerStyle = {
    background: '#f1fee3', 
    width: '100%', 
    height: '75px', 
    gridColumnStart: 1, 
    gridColumnEnd: 3,
    borderRadius: '50px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
}

const virusStyle = { padding: '10px', borderRadius: '100px' }
const buttonStyles = {
    height: '37px',
    width: '180px',
    background: '#D9EFB3',
    borderRadius: '14px',
    border: 'none',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'inherit'
}


const MetaInfoBlock = () => {

    const Blocks = {
        first: {
            imgPath: SalyHand,
            text: "Избегайте «трех К»: \nкрытых помещений, в \nкоторых люди держатся \nкучно или контактируют",
            styles: {
                background: '#EFFEFF',
            }
        },
        second: {
            imgPath: treeMan,
            text: "Проводите встречи на улице. Встреча с людьми на улице значительно безопаснее, чем в помещении.",
            styles: {
                background: '#F5E8FF',
            }
        },
        third: {
            imgPath: Todo,
            text: "Проводите регулярную обработку и дезинфекцию поверхностей, особенно тех, к которым часто прикасаются люди",
            styles: {
                background: '#FBEBE6',
            }
        },
        fourth: {
            imgPath: laptopMan,
            text: "Убедитесь, что вам известен спектр симптомов COVID-19",
            styles: {
                background: 'white',
            }
        }
    }

    return (
        <div className="metaInfo grid">
            <BlockItem {...Blocks.first} />
            <BlockItem {...Blocks.second} />
            <BlockItem {...Blocks.third} />
            <BlockItem {...Blocks.fourth} />    
            <div style={bannerStyle}>
                <img className="virusPhoto" src={Corona} alt="virus" style={virusStyle} />
                <p style={{ maxWidth: '502px' }} >Более подробные рекомендации относительно данного вируса и мер профилактики вы можете прочитать нажав на кнопочку</p>
                <a target="_blank" rel="noreferrer" style={buttonStyles} href="https://www.who.int/ru/emergencies/diseases/novel-coronavirus-2019?adgroupsurvey={adgroupsurvey}&gclid=Cj0KCQjws-OEBhCkARIsAPhOkIY1QrTyboLX6OJskMBR4C2emnE1jpo73a5-z7-05Kl09XpnxXuMn4UaAv-oEALw_wcB">Подробнее</a>
            </div>
        </div>
    )
}


export default MetaInfoBlock