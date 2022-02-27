import styles from './BlinkLoader.module.scss'

import { interfaceStrings } from "../../const/strings";

const BlinkLoader = (props) => {
    const {
        caption,
        blinkInterval
    } = props;

    return <div
        className={styles.blinkLoader}
        style={{'--blinkInterval': `${blinkInterval}ms`}}
    >
        {caption}
    </div>
}

BlinkLoader.defaultProps = {
    caption: interfaceStrings.blinkLoader,
    blinkInterval: 1000
}

export default BlinkLoader