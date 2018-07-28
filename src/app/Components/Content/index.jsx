//@flow
import * as React from 'react';
import injectSheet from 'react-jss';
import { Theme } from 'theme';

const styles = {
    root: {
        margin: '0 auto',
        width: 960,
    },
};

type ClassNames = 'root';

interface ContentProps {
    children?: React.Node;
    classes: { [key: ClassNames]: string };
}

class Content extends React.Component<ContentProps, {}> {
    render() {
        const { children, classes } = this.props;
        return <div className={classes.root}>{children}</div>;
    }
}

export default injectSheet(styles)(Content);
