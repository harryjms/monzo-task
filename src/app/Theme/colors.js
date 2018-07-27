//@flow
interface Color {
  light: string;
  normal: string;
  dark: string;
}

interface MonzoColors {
  blue: string;
  lightBlue: string;
  soft: string;
}

export interface Colors {
  red: Color;
  green: Color;
  blue: Color;
  black: Color;
  grey: Color;
  white: Color;
  monzo: MonzoColors;
}

export const colors: Colors = {
  red: {
    light: 'rgba(255,59,48,0.75)',
    normal: 'rgba(255,59,48,1)',
    dark: 'rgb(156, 35, 28)',
  },
  green: {
    light: 'rgba(76,217,100,0.75)',
    normal: 'rgba(76,217,100,1)',
    dark: 'rgb(36, 103, 47)',
  },
  blue: {
    light: 'rgba(0,122,255,0.75)',
    normal: 'rgba(0,122,255,1)',
    dark: 'rgb(0, 59, 123)',
  },
  black: {
    light: 'rgba(0,0,0,0.75)',
    normal: 'rgb(0,0,0)',
    dark: 'rgb(0,0,0)',
  },
  grey: {
    light: '#f5f5f5',
    normal: '#CCCCCC',
    dark: '#6b6b6b',
  },
  white: {
    light: 'rgb(255,255,255)',
    normal: 'rgb(255,255,255)',
    dark: 'rgb(249, 249, 249)',
  },
  monzo: {
    blue: '#15233c',
    lightBlue: '#00a4db',
    soft: '#f5f5f5',
  },
};
