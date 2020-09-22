export function allUndefined(...values) {
  return !values.some((v) => v !== undefined);
}
