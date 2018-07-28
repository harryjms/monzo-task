//@flow
import React from 'react';
import injectSheet from 'react-jss';
import { Theme, CombineClasses } from 'theme';
import { map } from 'lodash';
import Content from 'Components/Content/index.jsx';
import MonzoAPI from '../../API/index.js';
import moment from 'moment';
import { AppObject } from '../../API/getAppList.js';
import CookieJar from '../../Utils/CookieJar';

type ClassNames = 'h1' | 'a' | 'image' | 'root' | 'table' | 'th' | 'td' | 'tr';

const styles = (theme: Theme) => ({
    h1: theme.typography.h1,
    a: theme.typography.a,
    image: {
        '& img': {
            width: '100%',
            borderRadius: theme.borders.radius,
        },
        width: 100,
    },
    root: {},
    table: {
        width: '100%',
    },
    td: {
        padding: 10,
    },
    th: {
        textAlign: 'left',
        padding: 10,
    },
    tr: {
        '&:nth-child(2n+1)': {
            backgroundColor: theme.colors.monzo.soft,
        },
        height: 100,
    },
});

interface AppListProps {
    classes: { [key: ClassNames]: string };
}

interface AppListState {
    loading: boolean;
    apps: Array<?AppObject>;
}

class AppList extends React.Component<AppListProps, AppListState> {
    constructor(props: AppListProps) {
        super(props);
        this.state = {
            loading: true,
            apps: [],
        };
    }

    componentWillMount() {
        MonzoAPI.appList()
            .then(res => {
                this.setState({
                    loading: false,
                    apps: res.apps,
                });
            })
            .catch(err => {
                console.log(err);
                if (err.status === 401) {
                    CookieJar.deleteCookie('authToken');
                    window.location = window.location;
                } else {
                    console.error(err);
                }
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Content>
                <h1 className={classes.h1}>My Apps</h1>
                {this.state.loading ? (
                    'Loading...'
                ) : (
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th
                                    className={CombineClasses(
                                        classes.th,
                                        classes.image,
                                    )}>
                                    Logo
                                </th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Created</th>
                                <th className={classes.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {map(
                                this.state.apps,
                                (app: AppObject, i: number) => {
                                    return (
                                        <tr key={i} className={classes.tr}>
                                            <td
                                                className={CombineClasses(
                                                    classes.td,
                                                    classes.image,
                                                )}>
                                                <img src={app.logo} />
                                            </td>
                                            <td className={classes.td}>
                                                {app.name}
                                            </td>
                                            <td className={classes.td}>
                                                {moment(app.created).format(
                                                    'DD/MM/YYYY HH:MM',
                                                )}
                                            </td>
                                            <td className={classes.td}>
                                                <span className={classes.a}>
                                                    Edit
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                )}
            </Content>
        );
    }
}

export default injectSheet(styles)(AppList);
