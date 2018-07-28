//@flow
import React from 'react';
import injectSheet from 'react-jss';
import Content from '../Content/index.jsx';
import { Theme } from '../../Theme';

type ClassNames = 'bar';

const styles = (theme: Theme) => ({
    bar: {
        backgroundColor: theme.colors.monzo.blue,
        color: 'white',
        padding: 20,
    },
});

interface AppBarProps {
    classes: { [key: ClassNames]: string };
}

class AppBar extends React.Component<AppBarProps, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.bar}>
                <Content>Developer Portal</Content>
            </div>
        );
    }
}

export default injectSheet(styles)(AppBar);
