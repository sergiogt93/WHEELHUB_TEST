import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Page from '#app/page'

//Step 1: welcome
const getConfirmInput = () => screen.getByTestId('confirmed')
const getSendStepWelcomeSignup = () => screen.getByTestId('sendStepWelcome')

//Step 2: user
const getUsernameInput = () => screen.getByTestId('username')
const getPasswordInput = () => screen.getByTestId('password')
const getConfirmPasswordInput = () => screen.getByTestId('confirmPassword')
const getSendStepUserSignup = () => screen.getByTestId('sendStepUser')

const showStepUserSignup = () => {
  fireEvent.click(getConfirmInput())
  fireEvent.click(getSendStepWelcomeSignup())
}

const fillPasswordsInputs = ({
  password = 'A1234567',
  confirmPassword = 'A1234567',
} = {}) => {
  fireEvent.change(getPasswordInput(), {
    target: {value: password}
  })

  fireEvent.change(getConfirmPasswordInput(), {
    target: {value: confirmPassword}
  })
}

beforeEach(() => render(<Page/>))

describe('Page-Step 1: Welcome Signup Form', () => {
  it('render a step welcome ', () => {
    const title = screen.getByText('Frontend Wheel Hub')
    expect(title).toBeInTheDocument()
  })

  it('must have a step welcome form with the following fields: confirm and a submit button', () => {
    expect(getConfirmInput()).toBeInTheDocument()
    expect(getSendStepWelcomeSignup()).toBeDisabled()
  })

  it('must change confirmed input when is clicked and enable button', async () => {
    fireEvent.click(getConfirmInput())

    await waitFor(() => {
      expect(getConfirmInput()).toBeChecked()
      expect(getSendStepWelcomeSignup()).toBeEnabled()
    })
  })
})

describe('Page-Step 2: User Signup Form', () => {
  it('render a step user ', () => {
    const title = screen.getByText('Frontend Wheel Hub')
    expect(title).toBeInTheDocument()
  })
  it('must have a step welcome form with the following fields: user, password, confirmPassword, track and a submit button', () => {
    showStepUserSignup()
    expect(getUsernameInput()).toBeInTheDocument()
    expect(getPasswordInput()).toBeInTheDocument()
    expect(getConfirmPasswordInput()).toBeInTheDocument()
    expect(getSendStepUserSignup()).toBeInTheDocument()
  })

  it('must have a required fields: user, password, confirmPassword', () => {
    showStepUserSignup()
    expect(getUsernameInput()).toBeRequired()
    expect(getPasswordInput()).toBeRequired()
    expect(getConfirmPasswordInput()).toBeRequired()
    expect(getSendStepUserSignup()).toBeDisabled()
  })

  it('must complete fields(username, password, confirm) when is clicked and enable button', async () => {
    showStepUserSignup()
    fireEvent.change(getUsernameInput(), {
      target: {value: 'sergio'}
    })
    fillPasswordsInputs( { password: 'A1234567', confirmPassword: 'A1234567' } )
    await waitFor(() => {
      expect(getSendStepUserSignup()).toBeEnabled()
    })
  })
})