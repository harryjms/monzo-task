//@flow
import React from 'react';
import injectSheet from 'react-jss';
import Content from '../Content/index.jsx';
import { Theme } from '../../Theme';
import type { ChangePageFunc } from '../../Pages/App/index.jsx';

type ClassNames = 'bar' | 'title';

const styles = (theme: Theme) => ({
    bar: {
        backgroundColor: theme.colors.monzo.blue,
        color: 'white',
        padding: 20,
    },
    title: {
        '&:hover': {
            textDecoration: 'underline',
        },
        cursor: 'pointer',
    },
});

interface AppBarProps {
    classes: { [key: ClassNames]: string };
    changePage: ChangePageFunc;
}

class AppBar extends React.Component<AppBarProps, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.bar}>
                <Content>
                    <span
                        className={classes.title}
                        onClick={() => this.props.changePage('home')}>
                        Developer Portal
                    </span>
                </Content>
            </div>
        );
    }
}

export default injectSheet(styles)(AppBar);
