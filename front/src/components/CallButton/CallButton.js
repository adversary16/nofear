import { interfaceStrings } from '../../const/strings';
import styles from './CallButton.module.scss';

const CallButton = (props) => {
    const { 
        caption,
        onClick
    } = props
    return <div
        className={styles.callButton}
        onClick={onClick}
    >
        {caption}
    </div>
}

CallButton.defaultProps = {
    caption: interfaceStrings.callButton,
    onClick: ()=>{
        console.log('clicked')
    }
}

export default CallButton