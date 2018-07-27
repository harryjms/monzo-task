//@flow
import { Borders } from './borders.js';
import { Colors, colors } from './colors.js';
import { Transitions, transitions } from './transitions.js';

export interface Theme {
  borders: Borders;
  colors: Colors;
  transitions: Transitions;
}

export const theme: Theme = {
  borders: {
    radius: 5,
  },
  colors,
  transitions,
};

export { CombineClasses } from './functions';
