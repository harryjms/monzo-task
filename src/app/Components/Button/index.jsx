//@flow
import React from 'react';
import injectSheet from 'react-jss';
import { Theme } from 'theme';

type ClassNames = 'button';

const styles = (theme: Theme) => ({
    button: {
        '&:active': {
            backgroundColor: theme.colors.monzo.lightBlue + ' !important',
        },
        '&:hover': {
            backgroundColor: theme.colors.monzo.lighterBlue,
        },
        backgroundColor: theme.colors.monzo.lightBlue,
        borderRadius: theme.borders.radius,
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        letterSpacing: 1,
        padding: 10,
        textAlign: 'center',
        userSelect: 'none',
        ...theme.transitions.default,
        transitionDuration: theme.transitions.duration.fast,
    },
});

interface ButtonProps {
    classes: { [k: ClassNames]: Object };
    label: string;
    onClick: (event: Event) => void;
}

class Button extends React.Component<ButtonProps, {}> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        const { classes, label, onClick } = this.props;
        return (
            <div className={classes.button} onClick={onClick}>
                {label}
            </div>
        );
    }
}

export default injectSheet(styles)(Button);
