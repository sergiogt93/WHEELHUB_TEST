'use client'

import '#styles/signup/progressBarSignupForm.scss';
import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';
import { useProgressActiveSteps } from '#app/(common)/useProgressActiveSteps';

export const ProgressBarSignupForm = () => {
  const { steps, currentStepIndex } = useSignUpContext();
  const { calculateProgress } = useProgressActiveSteps({ steps, currentStepIndex});

  const getPages = () => {
    const pages = [];
    for (let index = 0; index < steps.length; index++) {
      let className = '';
      if(index === currentStepIndex) {
        className = 'numberProgressBar numberProgressBarActive';
      }

      if(index < currentStepIndex) {
        className = 'numberProgressBar numberProgressBarPrevious';
      }

      if(index > currentStepIndex) {
        className = 'numberProgressBar numberProgressBarNext';
      }

      pages.push(
        <div key={index + 1} className={className}>
          { index >= currentStepIndex ? index + 1: null}
        </div>
      )
    }
    return pages;
  }

  return (
    <div className="mainProgressBar">
      <div className='boxProgressBar'>
        { getPages() }
        <div className='lineProgressBar'>
          <progress className='indicatorProgressBar' value={calculateProgress} max={100}></progress>
        </div>
      </div>
    </div>
  )
}