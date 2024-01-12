'use client'

import Image from "next/image";
import { FormEvent } from "react";
import { useSignUpContext } from "#app/(signup)/context/SignupFormContext";
import imgLogo from "#root/public/assets/img/Logotipo-Vertical-Verde-Alta.png";
import "#styles/stepsForm.scss";
import '#styles/signup/stepSignupForm.scss';

export const StepWelcomeForm = () => {
  const { data, isFirstStep, isLastStep, updateFields, back, next } =  useSignUpContext();

  const sendForm = (e: FormEvent) => {
    e.preventDefault();
    next();
  }

  const handleChangeConfirmed = (e: FormEvent<HTMLInputElement>) => {
    updateFields({ ...data, isConfirmed: e.currentTarget.checked });
  }


  return (
    <>
      <form className="markFinalBox">
        <div>
          <Image
            className="logoForm"
            src={imgLogo}
            alt="Logotipo empresa"
          />
        </div>
        <div>
          <h4>¿Qué deberá realizar?</h4>
          <p>
            En la primera pestaña, deberá confirmar que es mayor de edad y
            que acepta el tratamiento de sus datos según la política de datos vigentes.
          </p>
          <p>
            En la segunda pestaña, deberá crear un usuario, una contraseña
            y una pista para recordar (como dato opcional).
          </p>
          <p>En tercer lugar, deberá visualizarse el mensaje de éxito de creación</p>
          <label className="confirmBoxInput" htmlFor="confirmed">
            <input
              type="checkbox"
              id="confirmed"
              name="confirmed"
              checked={data.isConfirmed}
              onChange={handleChangeConfirmed}
              data-testid="confirmed"
            />
            <span className="inputMark"></span>
            <p className="textInputMark">Confirma que es mayor de edad, y acepta el tratamiento de sus
            datos según la política de protección de datos vigente.</p>
          </label>
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
        disabled={!data.isConfirmed}
        onClick={sendForm}
        className={isLastStep ? 'btn-last' : 'btn-send'}
        data-testid='sendStepWelcome'
      >
        { isLastStep ? 'Volver al inicio': 'Siguiente >'}
      </button>
    </div>
    </>
  )
}
