'use client'

import {  TRACK_MAX_LEN } from "#app/(signup)/signup.constants";
import "#styles/stepsForm.scss";
import '#styles/signup/stepSignupForm.scss';
import { useStepUserForm } from "#app/(signup)/hooks/useStepUserForm";
import { usePasswordToogle } from "#app/(signup)/hooks/usePasswordToogle";

export const StepUserForm = () => {
  const {
    data, errUsername, tagUsername, errPassword, tagPassword, confirmPassword, errConfirmPassword, tagConfirmPassword, tranckLength,
    isFirstStep, isLastStep, isDisabled, IconSpinner, loadingSpinner,
    handleChangeUsername, handleChangePassword,
    handleChangeConfirmPass, handleChangeTrack, sendForm, back
  } = useStepUserForm();
  const {
    IconPass, inputPassType, IconConfirmPass, inputConfirmPassType,
    togglePassVisibility, toggleConfirmPassVisibility
  } = usePasswordToogle();

  const renderError = (errorMessage: string) => (
    errorMessage.length > 0 ? <p className="textDanger errPass">{errorMessage}</p> : null
  );

  return (
    <>
    <form className="markFinalBox stepMainUserReg">
      <div className="formGroupUserReg">
        <label htmlFor="username">Crea tu usuario</label>
        <input
          required
          name="username"
          placeholder="Introduce tu usuario"
          value={data.username}
          onChange={handleChangeUsername}
          ref={tagUsername}
          data-testid={"username"}
        />
        { renderError(errUsername) }
      </div>
      <div className="formGroupPasswordUserReg">
        <div className="groupShowIconPass">
          <label htmlFor="password">Crea tu contraseña</label>
          <input
            required
            type={inputPassType}
            name="password"
            placeholder="Crea tu contraseña"
            value={data.password}
            onChange={handleChangePassword}
            ref={tagPassword}
            data-testid={"password"}
          />
          <IconPass className='passToogleIcon' onClick={togglePassVisibility}/>
          { renderError(errUsername) }
        </div>
        <div className="groupShowIconPass">
          <label htmlFor="confirmPassword">Repite tu contraseña</label>
          <input
            required
            type={inputConfirmPassType}
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={handleChangeConfirmPass}
            ref={tagConfirmPassword}
            data-testid={"confirmPassword"}
          />
          <IconConfirmPass className='passToogleIcon' onClick={toggleConfirmPassVisibility} />
          { renderError(errUsername) }
        </div>
      </div>
      <p>
        También puedes crear una pista que te ayude a recordar tu contraseña
      </p>

      <div className="formGroupUserReg">
        <label htmlFor="track">Crea tu pista para recordar tu contraseña (opcional)</label>
        <input max={TRACK_MAX_LEN} name="track" placeholder="Introduce tu pista" value={data.track} onChange={handleChangeTrack}/>
        <span>{tranckLength}/{TRACK_MAX_LEN}</span>
      </div>
    </form>
    <div className='stepFormActions'>
    { !isFirstStep && (
      <button type='button' onClick={back} className='btn-back'>
        Atras
      </button>
    )}
    <button
      type='button'
      disabled={isDisabled}
      onClick={sendForm}
      className={isLastStep ? 'btn-last' : 'btn-send'}
      data-testid={"sendStepUser"}
    >
      { isLastStep ? 'Volver al inicio': 'Siguiente >'}
      { loadingSpinner && <IconSpinner />}
    </button>
  </div>
  </>
  )
}