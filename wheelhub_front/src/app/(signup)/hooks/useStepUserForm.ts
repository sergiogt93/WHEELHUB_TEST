'use client'

import { useState, useRef, FormEvent, RefObject, useEffect, Dispatch, useCallback} from 'react'
import { PASS_MAX_LEN, PASS_MIN_LEN, PASS_REGEX, PASS_SUCCESS_LEN, TRACK_MAX_LEN } from '../signup.constants';
import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';
import { useSpinnerSubmit } from '#app/(common)/useSpinnerSubmit';
import { signupAPI } from '#core/signup/signup.service';

interface StepUserFormData {
  username: string;
  password: string;
  track: string;
}

interface StepUserFormErrors {
  username: string;
  password: string;
  confirmPassword: string;
}

export const useStepUserForm = () => {
  const { data, isFirstStep, isLastStep, updateFields, back, next } = useSignUpContext();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [tranckLength, setTranckLength] = useState(data.track.length);

  const [errorsFields, setErrorsFields] = useState<StepUserFormErrors>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const tagUsername = useRef<HTMLInputElement>(null);
  const tagPassword = useRef<HTMLInputElement>(null);
  const tagConfirmPassword = useRef<HTMLInputElement>(null);

  const [isDisabled, setIsDisabled] = useState(true);

  const {IconSpinner, loadingSpinner } = useSpinnerSubmit();

  const handleChangeDisabled = useCallback(() => {
    setIsDisabled(
      data.username.length === 0 ||
      !PASS_REGEX.test(data.password) ||
      !PASS_REGEX.test(confirmPassword) ||
      data.password !== confirmPassword
    )
  }, [data.username, data.password, confirmPassword]);

  useEffect(() => {
    removeIndicators(tagUsername, 'username');
    showErrorEmptyMessage('username', data.username);
    emptyInput(data.username, tagUsername);
  }, [data.username]);

  useEffect(() => {
    removeIndicators(tagPassword, 'password');
    showErrorEmptyMessage('password', data.password);
    emptyInput(data.password, tagPassword);
    strongWarningPassword(data.password, tagPassword);
    strongSuccessPassword(data.password, tagPassword);
  }, [data.password])

  useEffect(() => {
    removeIndicators(tagConfirmPassword, 'confirmPassword');
    showErrorEmptyMessage('confirmPassword', confirmPassword);
    emptyInput(confirmPassword, tagConfirmPassword);
    strongWarningPassword(confirmPassword, tagConfirmPassword);
    strongSuccessPassword(confirmPassword, tagConfirmPassword);
  }, [confirmPassword])

  useEffect(() => {
    handleChangeDisabled();
  }, [data.username, data.password, confirmPassword, handleChangeDisabled]);

  const handleChangeField = (
    field: keyof StepUserFormData,
    value: string,
    maxLength?: number
  ) => {
    if (maxLength && value.length > maxLength) return;

    updateFields({
      ...data,
      [field]: value,
    });
  };

  const handleChangeUsername = (e: FormEvent<HTMLInputElement>) => {
    handleChangeField('username', e.currentTarget.value);
  };

  const handleChangePassword = (e: FormEvent<HTMLInputElement>) => {
    handleChangeField('password', e.currentTarget.value, PASS_MAX_LEN);
    showErrorPassMessage('password', data.password);
    showErrorSamePassMessage('password');
  };

  const handleChangeConfirmPass = (e: FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
    showErrorPassMessage('confirmPassword', confirmPassword);
    showErrorSamePassMessage('confirmPassword');
  }

  const handleChangeTrack = (e: FormEvent<HTMLInputElement>) => {
    handleChangeField('track', e.currentTarget.value, TRACK_MAX_LEN);
    setTranckLength(e.currentTarget.value.length);
  };

  const emptyInput = (value: string, tag: RefObject<HTMLInputElement>) => {
    if(value.length > 0) return;
    if(tag.current === null) return;
    tag.current.classList.add('boxErrInput');
  }

  const strongWarningPassword = (value: string, tag: RefObject<HTMLInputElement>) => {
    if(tag.current === null) return;
    if(value.length >= PASS_MIN_LEN && value.length < PASS_SUCCESS_LEN) {
      if(!PASS_REGEX.test(value)) return;
      tag.current.classList.add('passStrongWarning');
    }
  }

  const strongSuccessPassword = (value: string, tag: RefObject<HTMLInputElement>) => {
    if(tag.current === null) return;
    if(value.length > PASS_SUCCESS_LEN) {
      if(!PASS_REGEX.test(value)) return;
      tag.current.classList.add('passStrongSuccess');
    }
  }

  const isMatchRegexPassword = (value: string) => {
    return PASS_REGEX.test(value);
  }

  const showErrorEmptyMessage = (field: keyof StepUserFormErrors, value: string) => {
    if(value.length === 0) {
      setErrorsFields((prevErrors) => ({ ...prevErrors, [field]: 'El campo es obligatorio' }));
    }
  }

  const showErrorPassMessage = (field: keyof StepUserFormErrors, value: string) => {
    if(value.length > 0 && !isMatchRegexPassword(value)) {
      setErrorsFields((prevErrors) => ({
        ...prevErrors,
        [field]:
          'Min 8 - Max 24 caracteres, debe haber 1 número y una mayúscula)',
      }));
    }
  };

  const showErrorSamePassMessage = (field: keyof StepUserFormErrors) => {
    if(!isSamePass()) return;
    setErrorsFields((prevErrors) => ({
      ...prevErrors,
      password: 'Las contraseñas no son iguales',
      confirmPassword: 'Las contraseñas no son iguales',
    }));
  }

  const isSamePass = useCallback(() => {
    return isMatchRegexPassword(data.password) && isMatchRegexPassword(confirmPassword)
  }, [data.password, confirmPassword]);

  const removeIndicators = (tag: RefObject<HTMLInputElement>, field: keyof StepUserFormErrors) => {
    if(tag.current === null) return;
    tag.current.classList.remove('boxErrInput', 'passStrongWarning', 'passStrongSuccess');
    setErrorsFields((prevErrors) => ({ ...prevErrors, [field]: '' }));
  }

  const sendForm = (e: FormEvent) => {
    e.preventDefault();
    signupAPI(data)
      .then((res) => {
        if(res.status === 201) {
          next();
        }
      })
      .catch((err) => {
        setIsDisabled(false);
      })
  }

  return {
    data,  tagUsername, confirmPassword, errorsFields, tagPassword, tagConfirmPassword, tranckLength,
    isFirstStep, isLastStep, isDisabled, IconSpinner, loadingSpinner, updateFields, handleChangeUsername, handleChangePassword,
    handleChangeTrack, emptyInput, strongWarningPassword, strongSuccessPassword,
    isMatchRegexPassword, handleChangeConfirmPass, sendForm, back
  }
}