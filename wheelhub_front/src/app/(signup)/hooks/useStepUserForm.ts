'use client'

import { useState, useRef, FormEvent, RefObject, useEffect, Dispatch} from 'react'
import { PASS_MAX_LEN, PASS_MIN_LEN, PASS_REGEX, PASS_SUCCESS_LEN, TRACK_MAX_LEN } from '../signup.constants';
import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';
import { useSpinnerSubmit } from '#app/(common)/useSpinnerSubmit';
import { signupAPI } from '#core/signup/signup.service';

export const useStepUserForm = () => {
  const { data, isFirstStep, isLastStep, updateFields, back, next } = useSignUpContext();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [tranckLength, setTranckLength] = useState(data.track.length);

  const [errUsername, setErrUsername] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");

  const tagUsername = useRef<HTMLInputElement>(null);
  const tagPassword = useRef<HTMLInputElement>(null);
  const tagConfirmPassword = useRef<HTMLInputElement>(null);

  const [isDisabled, setIsDisabled] = useState(true);

  const {IconSpinner, loadingSpinner } = useSpinnerSubmit();

  useEffect(() => {
    handleChangeDisabled()
  }, []);

  useEffect(() => {
    removeIndicators(tagUsername, setErrUsername);
    showErrorEmptyMessage(setErrUsername, data.username);
    emptyInput(data.username, tagUsername);
    handleChangeDisabled();
  }, [data.username]);

  useEffect(() => {
    removeIndicators(tagPassword, setErrPassword);
    showErrorEmptyMessage(setErrPassword, data.password);
    showErrorPassMessage(setErrPassword, data.password);
    emptyInput(data.password, tagPassword);
    strongWarningPassword(data.password, tagPassword);
    strongSuccessPassword(data.password, tagPassword);
    isSamePass();
    handleChangeDisabled();
  }, [data.password, errPassword])

  useEffect(() => {
    removeIndicators(tagConfirmPassword, setErrConfirmPassword);
    showErrorEmptyMessage(setErrConfirmPassword, confirmPassword);
    showErrorPassMessage(setErrConfirmPassword, confirmPassword);
    emptyInput(confirmPassword, tagConfirmPassword);
    strongWarningPassword(confirmPassword, tagConfirmPassword);
    strongSuccessPassword(confirmPassword, tagConfirmPassword);
    isSamePass();
    handleChangeDisabled();
  }, [confirmPassword])

  const handleChangeUsername = (e: FormEvent<HTMLInputElement>) => {
    updateFields({
      ...data,
      username: e.currentTarget.value
    })
  }

  const handleChangePassword = (e: FormEvent<HTMLInputElement>) => {
    if(e.currentTarget.value.length > PASS_MAX_LEN) {
      return
    }
    updateFields({
      ...data,
      password: e.currentTarget.value
    })
  }

  const handleChangeTrack = (e: FormEvent<HTMLInputElement>) => {
    if(e.currentTarget.value.length > TRACK_MAX_LEN) {
      return
    }

    setTranckLength(e.currentTarget.value.length)
    updateFields({
      ...data,
      track: e.currentTarget.value
    })
  }

  const emptyInput = (value: string, tag: RefObject<HTMLInputElement>) => {
    if(value.length > 0) return;
    if(tag.current === null) return;
    tag.current.classList.add('boxErrInput');
  }

  const strongWarningPassword = (value: string, tag: RefObject<HTMLInputElement>) => {
    if(tag.current === null) return;
    if((value.length >= PASS_MIN_LEN) && (value.length < PASS_SUCCESS_LEN)) {
      if(!PASS_REGEX.test(value)) return;
      tag.current.classList.add('passStrongWarning');
    }
  }

  const strongSuccessPassword = (value: string, tag: RefObject<HTMLInputElement>) => {
    if(tag.current === null) return;
    if((value.length > PASS_SUCCESS_LEN)) {
      if(!PASS_REGEX.test(value)) return;
      tag.current.classList.add('passStrongSuccess');
    }
  }

  const isMatchRegexPassword = (value: string) => {
    return PASS_REGEX.test(value);
  }

  const showErrorEmptyMessage = (setState: Dispatch<React.SetStateAction<string>>, value: string) => {
    if(value.length === 0) {
      setState("El campo es obligatorio");
    }
  }

  const showErrorPassMessage = (setState: Dispatch<React.SetStateAction<string>>, value: string) => {
    if(value.length > 0 && !isMatchRegexPassword(value)) {
      setState("Min 8 - Max 24 caracteres, debe haber 1 número y una mayúscula)");
    }
  }

  const isSamePass = () => {
    if(!isMatchRegexPassword(data.password) || !isMatchRegexPassword(confirmPassword)) {
      return;
    }
    if(data.password !== confirmPassword) {
      setErrPassword("Las contraseñas no son iguales");
      setErrConfirmPassword("Las contraseñas no son iguales");
      return;
    }
    return;
  }

  const removeIndicators = (tag: RefObject<HTMLInputElement>, setState: Dispatch<React.SetStateAction<string>>) => {
    if(tag.current === null) return;
    tag.current.classList.remove('boxErrInput', 'passStrongWarning', 'passStrongSuccess');
    setState('');
  }

  const handleChangeConfirmPass = (e: FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  }

  const handleChangeDisabled = () => {
    setIsDisabled(
      data.username.length === 0 ||
      !PASS_REGEX.test(data.password) ||
      !PASS_REGEX.test(confirmPassword) ||
      data.password !== confirmPassword
    )
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
    data, errUsername, tagUsername, errPassword, confirmPassword, errConfirmPassword, tagPassword, tagConfirmPassword, tranckLength,
    isFirstStep, isLastStep, isDisabled, IconSpinner, loadingSpinner, updateFields, handleChangeUsername, handleChangePassword,
    handleChangeTrack, emptyInput, strongWarningPassword, strongSuccessPassword,
    isMatchRegexPassword, handleChangeConfirmPass, sendForm, back
  }
}