import { Router } from 'express'
import { UserController } from './UserController'
import { createUserValidationRules } from './UserValidateInput'
import { isValidateDTO } from '../common/isValidateDTO'

const userRouter: Router = Router()

userRouter.route('/users')
  .post(createUserValidationRules(), isValidateDTO, UserController.post)

export default userRouter