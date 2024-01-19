'use client'

import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';
import "#styles/stepsForm.scss";
import { ProgressBarSignupForm } from '#app/(signup)/components/ProgressBarSignupForm';

export const SignUpWrapper = () => {
  const { steps, currentStep, currentStepIndex } =  useSignUpContext();

  return (
    <main>
      <ProgressBarSignupForm />
      <div className="stepsForm">
        { steps.length - 1 > currentStepIndex && (
          <h2>
            <span className="markedWord">Test</span> Frontend Wheel Hub
          </h2>
        )}
        { currentStep }
      </div>
    </main>
  )
}