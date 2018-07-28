//@flow
import Button from 'Components/Button/index.jsx';
import TextField from 'Components/TextField/index.jsx';
import React from 'react';
import injectSheet from 'react-jss';
import { Theme, CombineClasses } from 'theme';
import logo from 'images/monzo-logo.png';
import { Event } from '../../../../node_modules/chrome-trace-event';
import MonzoAPI from '../../API';

const styles = (theme: Theme) => ({
    body: {
        backgroundColor: theme.colors.monzo.soft,
        borderBottomLeftRadius: theme.borders.radius,
        borderBottomRightRadius: theme.borders.radius,
        padding: 20,
        position: 'relative',
    },
    connect_head: {
        alignItems: 'center',
        display: 'flex',
        width: '100%',
    },
    connect_text: {
        fontSize: '15pt',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    form: {
        backgroundColor: 'white',
        width: 500,
    },
    header: {
        backgroundColor: theme.colors.monzo.blue,
        borderTopLeftRadius: theme.borders.radius,
        borderTopRightRadius: theme.borders.radius,
        color: theme.colors.white.normal,
        marginTop: 20,
        padding: 20,
    },
    h1: {
        margin: 0,
        marginBottom: 10,
    },
    p: {
        margin: 0,
    },
    logo: {
        width: 50,
    },
    page: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box_show: {
        opacity: 1,
        transform: 'translateY(10px)',
        ...theme.transitions.default,
    },
    box_hide: {
        opacity: 0,
        transform: 'translateY(-10px)',
        pointerEvents: 'none',
        ...theme.transitions.default,
    },
    busy: {
        position: 'absolute',
        top: -10,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        ...theme.transitions.default,
    },
});

type ClassName =
    | 'body'
    | 'connect_head'
    | 'connect_text'
    | 'form'
    | 'header'
    | 'h1'
    | 'logo'
    | 'page'
    | 'p'
    | 'box_show'
    | 'box_hide'
    | 'busy';

interface LoginProps {
    classes: { [key: ClassName]: Object };
}

interface LoginState {
    busy: boolean;
    username: string;
    password: string;
    error: boolean;
    success: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            busy: false,
            username: '',
            password: '',
            error: false,
            success: false,
        };
    }

    textUsername: ?HTMLInputElement;

    componentDidMount() {
        if (this.textUsername) {
            this.textUsername.focus();
        }
    }

    _handleBusyToggle = () => {
        this.setState((prevState: LoginState) => ({
            busy: !prevState.busy,
        }));
    };

    _handleUsername = (event: Event) => {
        event.persist();
        const username = event.target.value;

        this.setState({ username });
    };

    _handlePassword = (event: Event) => {
        event.persist();
        const password = event.target.value;
        this.setState({ password });
    };

    _handleLogin = () => {
        this._handleBusyToggle();
        MonzoAPI.login(this.state.username, this.state.password)
            .then(res => {
                this.setState({ success: true, error: false, busy: false });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    success: false,
                    error: true,
                    busy: false,
                    password: '',
                });
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.page}>
                <div className={classes.form}>
                    <div className={classes.connect_head}>
                        <div className={classes.logo}>
                            <img src={logo} style={{ width: '100%' }} />
                        </div>
                        <div className={classes.connect_text}>Connect</div>
                    </div>
                    <div className={classes.header}>
                        <h1 className={classes.h1}>Developer Portal</h1>
                        <p className={classes.p}>
                            Please login to continue to the Monzo Developer
                            Portal.
                        </p>
                    </div>
                    <div className={classes.body}>
                        <div
                            className={
                                this.state.busy ? classes.box_hide : null
                            }>
                            <TextField
                                label="Email Address"
                                name="email"
                                onChange={this._handleUsername}
                                placeholder="name@monzo.com"
                                value={this.state.username}
                                inputRef={n => (this.textUsername = n)}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                onChange={this._handlePassword}
                                placeholder="Password"
                                style={{ marginTop: 20 }}
                                value={this.state.password}
                                secure={true}
                            />
                            <br />
                            <Button label="Login" onClick={this._handleLogin} />
                        </div>
                        <div
                            className={CombineClasses(
                                !this.state.busy && classes.box_hide,
                                classes.busy,
                            )}>
                            <div>Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(Login);
