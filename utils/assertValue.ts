export const assertValue = <T>(value: T | undefined, message: string): T => {
  if (value === undefined) {
    throw new Error(`Value Assertion Error: ${message}`);
  }

  return value;
};
