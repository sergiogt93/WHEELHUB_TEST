export default class UserAlreadyExistsException extends Error {
  public readonly code: number

  constructor () {
    super('User already exists');
    this.code = 409;
  }
}