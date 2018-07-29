//@flow

/**
 * The idea here is to not only create a styles input, but also have it debounce.
 * This will reduce the number of re-renders as an update to the state will not be
 * fired for each key stroke.
 */

import { debounce } from 'lodash';
import React from 'react';
import injectSheet from 'react-jss';
import { Theme, CombineClasses } from 'theme';

type ClassNames = 'input' | 'label' | 'label_focus' | 'root';

const styles = (theme: Theme) => ({
    input: {
        '&:focus': {
            borderBottomColor: theme.colors.monzo.lightBlue,
        },
        appearance: 'none',
        background: 'transparent',
        borderBottomColor: theme.colors.grey.normal,
        borderBottomStyle: 'solid',
        borderBottomWidth: 2,
        border: 'none',
        fontSize: 'inherit',
        padding: '5px 0',
        outline: 'none',
        width: '100%',
        ...theme.transitions.default,
        transitionProperty: 'border-bottom-color',
    },
    label: {
        color: theme.colors.grey.dark,
        ...theme.transitions.default,
    },
    label_focus: {
        color: theme.colors.monzo.lightBlue,
    },
    root: {
        width: '100%',
    },
});

interface TextFieldProps {
    classes: { [key: ClassNames]: Object };
    label?: string;
    placeholder?: string;
    value?: string;
    onChange: (event: Event) => void;
    onEnterKey: (event: Event) => void;
    secure?: boolean;
    inputStyle?: Object;
    style?: Object;
    inputRef?: Function;
    name: string;
}

interface TextFieldState {
    focus: boolean;
    value: string;
}

class TextField extends React.Component<TextFieldProps, TextFieldState> {
    constructor(props: TextFieldProps) {
        super(props);
        this.state = {
            focus: false,
            value: props.value || '',
        };
    }

    componentDidMount() {
        this._createDebounce(200);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        });
    }

    _debounce: any;

    _createDebounce = (timeout: number): void => {
        if (timeout === 0) {
            this._debounce = this._doOnChange;
            return;
        }
        const debounceFunction = debounce((event: Event) => {
            this._doOnChange(event);
        }, timeout);
        this._debounce = (event: Event) => debounceFunction(event);
    };

    _doOnChange = (event: Event) => {
        const { onChange } = this.props;
        onChange(event);
    };

    _onChange = (event: SyntheticEvent<HTMLInputElement>) => {
        event.persist();
        this.setState({ value: event.currentTarget.value }, () => {
            this._debounce(event);
        });
    };

    _onEnterKey = (event: Event) => {
        const { onEnterKey } = this.props;
        if (onEnterKey) onEnterKey(event);
    };

    _onFocus = () => {
        this.setState((prevState: TextFieldState) => ({
            focus: !prevState.focus,
        }));
    };

    render() {
        const {
            classes,
            inputRef,
            inputStyle,
            label,
            name,
            placeholder,
            secure,
            style,
            value,
        } = this.props;
        return (
            <div className={classes.root} style={style}>
                {label && (
                    <label
                        className={CombineClasses(
                            classes.label,
                            this.state.focus && classes.label_focus,
                        )}
                        htmlFor={`TextField_${name}`}>
                        {label}
                    </label>
                )}
                <input
                    type={secure ? 'password' : 'text'}
                    placeholder={placeholder}
                    onChange={this._onChange}
                    value={this.state.value}
                    className={classes.input}
                    style={inputStyle}
                    ref={inputRef}
                    onFocus={this._onFocus}
                    onBlur={this._onFocus}
                    id={`TextField_${name}`}
                    name={name}
                    onKeyUp={e => {
                        if (e.keyCode === 13) {
                            this._onEnterKey(e);
                        }
                    }}
                />
            </div>
        );
    }
}

export default injectSheet(styles)(TextField);
