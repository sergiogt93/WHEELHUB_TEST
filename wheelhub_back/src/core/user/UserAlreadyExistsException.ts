export default class UserAlreadyExistsException extends Error {
  public readonly statusCode: number

  constructor () {
    super('User already exists');
    this.statusCode = 409;
  }
}