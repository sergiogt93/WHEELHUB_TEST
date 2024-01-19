'use client'

import '#styles/signup/progressBarSignupForm.scss';
import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';
import { useProgressActiveSteps } from '#app/(common)/useProgressActiveSteps';
import { FaCheckCircle } from "react-icons/fa";

export const ProgressBarSignupForm = () => {
  const { steps, currentStepIndex } = useSignUpContext();
  const { calculateProgress } = useProgressActiveSteps({ steps, currentStepIndex});

  const getClassName = (index: number) => {
    if (index === currentStepIndex) return 'numberProgressBarActive';
    if (index < currentStepIndex) return 'numberProgressBarPrevious';
    if (index > currentStepIndex) return 'numberProgressBarNext';
    return '';
  };

  const getPages = () => {
    const pages = [];
    for (let index = 0; index < steps.length; index++) {
      const className = getClassName(index);
      const fragment = (
        <div key={index} className={className}>
          {index >= currentStepIndex && index + 1}
          {index < currentStepIndex && <FaCheckCircle className="iconProgressBarPrevious" />}
        </div>
      );
      pages.push(fragment);
    }
    return pages;
  };

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