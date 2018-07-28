//@flow
import { Borders } from './borders.js';
import { Colors, colors } from './colors.js';
import { Transitions, transitions } from './transitions.js';
import { Typography, typography } from './typography.js';

export interface Theme {
    borders: Borders;
    colors: Colors;
    transitions: Transitions;
    typography: Typography;
}

export const theme: Theme = {
    borders: {
        radius: 5,
    },
    colors,
    transitions,
    typography,
};

export { CombineClasses } from './functions';
