class ApiException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export default ApiException;
