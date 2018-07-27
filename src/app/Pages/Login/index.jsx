//@flow
import TextField from 'Components/TextField/index.jsx';
import React from 'react';
import injectSheet from 'react-jss';
import { Theme } from 'theme';
import logo from 'images/monzo-logo.png';

const styles = (theme: Theme) => ({
  body: {
    backgroundColor: theme.colors.monzo.soft,
    borderBottomLeftRadius: theme.borders.radius,
    borderBottomRightRadius: theme.borders.radius,
    padding: 20,
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
    margin: '0 auto',
    marginTop: 50,
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
  },
  logo: {
    width: 50,
  },
});

type ClassName =
  | 'body'
  | 'connect_head'
  | 'connect_text'
  | 'form'
  | 'header'
  | 'h1'
  | 'logo';

interface LoginProps {
  classes: { [key: ClassName]: Object };
}

class Login extends React.Component<LoginProps, {}> {
  constructor(props: LoginProps) {
    super(props);
  }

  textUsername: ?HTMLInputElement;

  componentDidMount() {
    if (this.textUsername) {
      this.textUsername.focus();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.form}>
        <div className={classes.connect_head}>
          <div className={classes.logo}>
            <img src={logo} style={{ width: '100%' }} />
          </div>
          <div className={classes.connect_text}>Connect</div>
        </div>
        <div className={classes.header}>
          <h1 className={classes.h1}>Developer Portal</h1>
          <p>Please login to continue to the Monzo Developer Portal.</p>
        </div>
        <div className={classes.body}>
          <TextField
            label="Email Address"
            name="email"
            onChange={console.log}
            placeholder="name@monzo.com"
            inputRef={n => (this.textUsername = n)}
          />
          <TextField
            label="Password"
            name="password"
            onChange={console.log}
            placeholder="Password"
            style={{ marginTop: 20 }}
            secure={true}
          />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Login);
