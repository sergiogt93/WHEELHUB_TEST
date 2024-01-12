import { check } from "express-validator";

export const createUserValidationRules = () => [
  check('username', 'Username field is required').not().isEmpty(),
  check('password', 'Password field is required').not().isEmpty()
];

export interface createUserInput {
  username: string;
  password: string;
}