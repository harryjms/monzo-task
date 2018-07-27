interface TransitionDuration {
  standard: string;
  slow: string;
}

export interface Transitions {
  duration: TransitionDuration;
  default: {
    transitionProperty: string,
    transitionTimingFunction: string,
    transitionDuration: string,
  };
}

export const transitions: Transitions = {
  duration: {
    standard: '0.2s',
    slow: '0.8s',
  },
  default: {
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '0.2s',
  },
};
