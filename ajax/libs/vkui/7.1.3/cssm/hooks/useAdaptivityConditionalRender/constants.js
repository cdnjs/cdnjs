import styles from "../../styles/adaptivity.module.css";
export const forcedProps = {
    className: ''
};
export const sizeXCompactMediaQueryProps = {
    className: styles['-sizeX--compact-mq']
};
export const sizeXRegularMediaQueryProps = {
    className: styles['-sizeX--regular-mq']
};
export const sizeYCompactMediaQueryProps = {
    className: styles['-sizeY--compact-mq']
};
export const sizeYRegularMediaQueryProps = {
    className: styles['-sizeY--regular-mq']
};
export const viewWidthMediaQueryMapProps = {
    tabletMinus: {
        className: styles['-viewWidth--tabletMinus-mq']
    },
    tabletPlus: {
        className: styles['-viewWidth--tabletPlus-mq']
    }
};
export const deviceTypeMediaQueryMapProps = {
    mobile: {
        className: styles['-deviceType--mobile-mq']
    },
    desktop: {
        className: styles['-deviceType--desktop-mq']
    }
};

//# sourceMappingURL=constants.js.map