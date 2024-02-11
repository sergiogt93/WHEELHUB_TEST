'use client'

import Image from 'next/image';
import imgSuccess from '#root/public/assets/img/success.png';
import "#styles/common/stepsForm.scss";
import '#styles/signup/stepSignupForm.scss';
import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';

const StepSuccesRegistration = () => {
  const { isFirstStep, isLastStep, back, goTo } =  useSignUpContext();

  const sendForm = () => {
    goTo(0);
  }

  return (
    <>
    <div className='markFinalBox stepMainSuccessReg'>
      <div>
        <Image src={imgSuccess} alt="success registration" />
      </div>
      <div>
        <h2>¡La cuenta se creó correctamente!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cumque in blanditiis
          consectetur eveniet eius, magnam deserunt voluptatibus nesciunt,
          eum nihil suscipit sit dolorem laborum nostrum est, a explicabo incidunt.
        </p>
      </div>
    </div>
    <div className='stepFormActions'>
    { !isFirstStep && (
      <button type='button' onClick={back} className='btn-back'>
        Atras
      </button>
    )}
    <button
      type='button'
      onClick={sendForm}
      className={isLastStep ? 'btn-last' : 'btn-send'}
    >
      { isLastStep ? 'Volver al inicio': 'Siguiente >'}
    </button>
  </div>
  </>
  )
}

export default StepSuccesRegistration