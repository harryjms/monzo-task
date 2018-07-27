//@flow
export const CombineClasses = (
  ...classes: Array<Object | string | boolean | null>
): string => {
  classes = classes.filter(o => o && o !== null);
  return classes.join(' ');
};
