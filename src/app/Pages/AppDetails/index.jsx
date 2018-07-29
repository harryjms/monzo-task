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
import { Event } from '../../../../node_modules/chrome-trace-event';
import type { ChangePageFunc } from '../App/index.jsx';
import TextField from 'Components/TextField/index.jsx';
import Button from 'Components/Button/index.jsx';
import { AppUserObject } from '../../API/getAppUsers.js';

type ClassNames =
    | 'a'
    | 'back'
    | 'h1'
    | 'saveMessage'
    | 'usersWrap'
    | 'userAvatar'
    | 'userWrap'
    | 'subtle'
    | 'pagination'
    | 'previous'
    | 'page'
    | 'next';

interface AppDetailsObject {}

interface AppDetailsProps {
    classes: { [key: ClassNames]: Object };
    app: AppObject;
    changePage: ChangePageFunc;
}

interface AppDetailsState {
    loading: boolean;
    details: AppObject & { users?: AppUserObject };
    saving: boolean;
    saved: boolean;
    error: boolean;
    page: number;
}

const styles = (theme: Theme) => ({
    a: theme.typography.a,
    back: {
        display: 'inline-block',
        marginTop: 20,
    },
    h1: theme.typography.h1,
    saveMessage: {
        textAlign: 'center',
        marginTop: 10,
    },
    usersWrap: {
        padding: 10,
        backgroundColor: theme.colors.monzo.soft,
        borderRadius: theme.borders.radius,
        '& ul': {
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            '& li': {
                width: 'calc(100% / 3)',
                marginBottom: 10,
                '& img': {
                    width: '100%',
                    borderRadius: '50%',
                },
            },
        },
    },
    userWrap: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
    },
    userAvatar: {
        width: 50,
        marginRight: 10,
    },
    subtle: {
        color: theme.colors.grey.dark,
        fontSize: '10pt',
    },
    pagination: {
        display: 'flex',
        width: '100%',
        '& div': { flex: 1 },
        marginTop: 20,
    },
    previous: {
        '& span': { ...theme.typography.a },
    },
    page: {
        textAlign: 'center',
    },
    next: {
        '& span': { ...theme.typography.a },
        textAlign: 'right',
    },
});

class AppDetails extends React.Component<AppDetailsProps, AppDetailsState> {
    constructor(props: AppDetailsProps) {
        super(props);
        this.state = {
            loading: true,
            saving: false,
            saved: false,
            error: false,
            details: props.app,
            page: 1,
        };
        this.timer = null;
    }
    timer: TimeoutID | null;

    componentWillMount() {
        this._loadUsers();
    }

    componentWillUnmount() {
        if (this.timer) clearTimeout(this.timer);
    }

    _loadUsers = (perPage: number = 12) => {
        const appID = this.state.details.id;
        MonzoAPI.appUsers(appID, this.state.page, perPage)
            .then(users =>
                this.setState((prevState: AppDetailsState) => ({
                    details: {
                        ...prevState.details,
                        users: users.users,
                    },
                    loading: false,
                })),
            )
            .catch(console.error);
    };

    _doSave = (): void => {
        this.setState({ saving: true });
        if (!CookieJar.getCookie('authToken')) {
            window.location = window.location;
        }
        const {
            details: { id, name, logo },
        } = this.state;
        MonzoAPI.saveDetails(id, { name, logo })
            .then(res => {
                this._saveComplete();
            })
            .catch(err => {
                this._saveError();
                console.error(err);
            });
    };

    _saveComplete = (): void => {
        this.setState({ saving: false, saved: true }, () => {
            this.timer = setTimeout(
                () => this.setState({ saved: false }),
                2000,
            );
        });
    };

    _saveError = (): void => {
        this.setState({
            saving: false,
            saved: false,
            error: true,
        });
    };

    _doChange = (event: Event) => {
        event.persist();
        const { value, name } = event.target;
        this.setState((prevState: AppDetailsState) => ({
            details: {
                ...prevState.details,
                [name]: value,
            },
        }));
    };

    _nextPage = () => {
        this.setState(
            (prevState: AppDetailsState) => ({
                page: prevState.page + 1,
                loading: true,
            }),
            () => this._loadUsers(),
        );
    };

    _prevPage = () => {
        this.setState(
            (prevState: AppDetailsState) => {
                let page: number;
                if (prevState.page > 1) {
                    page = prevState.page - 1;
                } else {
                    page = prevState.page;
                }
                return { page, loading: true };
            },
            () => this._loadUsers(),
        );
    };

    render() {
        const { app, classes } = this.props;
        const { details, saving, saved, error } = this.state;
        return (
            <Content>
                <span
                    onClick={() => this.props.changePage('home')}
                    className={CombineClasses(classes.a, classes.back)}>
                    &larr; Back
                </span>
                <h1 className={classes.h1}>App Details</h1>
                {app ? (
                    <React.Fragment>
                        <TextField
                            name="name"
                            value={details.name}
                            label="App Name"
                            onChange={this._doChange}
                        />
                        <br />
                        <TextField
                            name="logo"
                            value={details.logo}
                            label="App Logo"
                            onChange={this._doChange}
                        />
                        <br />
                        <Button
                            label={saving ? 'Saving...' : 'Save'}
                            onClick={this._doSave}
                            disabled={saving}
                        />
                        <div className={classes.saveMessage}>
                            {saved
                                ? 'Save Successful 🎉'
                                : error
                                    ? 'Save Failed 😔'
                                    : ''}
                        </div>
                        <h2>Users</h2>
                        <div className={classes.usersWrap}>
                            {this.state.details.users ? (
                                <React.Fragment>
                                    <ul>
                                        {map(this.state.details.users, user => (
                                            <li key={user.id}>
                                                <div
                                                    className={
                                                        classes.userWrap
                                                    }>
                                                    <div
                                                        className={
                                                            classes.userAvatar
                                                        }>
                                                        <img
                                                            src={user.avatar}
                                                        />
                                                    </div>
                                                    <span>
                                                        {user.name}
                                                        <br />
                                                        <span
                                                            className={
                                                                classes.subtle
                                                            }>
                                                            {user.email}
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={classes.pagination}>
                                        <div className={classes.previous}>
                                            <span onClick={this._prevPage}>
                                                &larr; Previous
                                            </span>
                                        </div>
                                        <div className={classes.page}>
                                            {this.state.page}
                                        </div>
                                        <div className={classes.next}>
                                            <span onClick={this._nextPage}>
                                                Next &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                'Loading...'
                            )}
                        </div>
                    </React.Fragment>
                ) : (
                    <p>No app details were passed to display</p>
                )}
            </Content>
        );
    }
}
export default injectSheet(styles)(AppDetails);
