//@flow

import { colors } from './colors';

export interface Typography {
    h1: Object;
    a: Object;
}

export const typography: Typography = {
    h1: {
        fontSize: '2em',
        fontWeight: 'bold',
    },
    a: {
        '&:hover': {
            textDecoration: 'underline',
        },
        color: colors.monzo.lightBlue,
        cursor: 'pointer',
    },
};
