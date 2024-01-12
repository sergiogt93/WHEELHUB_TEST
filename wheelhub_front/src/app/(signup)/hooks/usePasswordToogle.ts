'use client'

import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const usePasswordToogle = () => {
  const [visiblePass, setVisibilityPass] = useState(false);
  const [visibleConfirmPass, setVisibilityConfirmPass] = useState(false);

  const IconPass = visiblePass ? FaEyeSlash : FaEye;
  const inputPassType = visiblePass ? 'text' : 'password';

  const IconConfirmPass = visibleConfirmPass ? FaEyeSlash : FaEye;
  const inputConfirmPassType = visibleConfirmPass ? 'text' : 'password';

  const togglePassVisibility = () => {
    setVisibilityPass(!visiblePass);
  }

  const toggleConfirmPassVisibility = () => {
    setVisibilityConfirmPass(!visibleConfirmPass);
  }

  return {
    IconPass, inputPassType, IconConfirmPass, inputConfirmPassType,
    togglePassVisibility, toggleConfirmPassVisibility
  }
}