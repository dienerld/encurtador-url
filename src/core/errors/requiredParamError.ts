class RequiredParamError extends Error {
  constructor (paramName: string) {
    super(`Required param: ${paramName}`);
    this.name = 'RequiredParamError';
  }
}

export { RequiredParamError };
