'use client'

import '#styles/common/progressBarSignupForm.scss';
import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';
import { useProgressActiveSteps } from '#app/(common)/useProgressActiveSteps';

export const ProgressBarSignupForm = () => {
  const { steps, currentStepIndex } = useSignUpContext();
  const { calculateProgress } = useProgressActiveSteps({ steps, currentStepIndex});

  const getClassName = (index: number) => {
    if (index === currentStepIndex) return 'numberProgressBarActive';
    if (index < currentStepIndex) return 'numberProgressBarPrevious';
    if (index > currentStepIndex) return 'numberProgressBarNext';
    return '';
  };

  const displayStepProgress = () => {
    const stepsProgress = [];
    for (let index = 0; index < steps.length; index++) {
      const className = getClassName(index);
      const fragment = (
        <div key={index} className='boxProgressBar'>
        <div className={className}>
          {index >= currentStepIndex && index + 1}
          {index < currentStepIndex && <span className="iconProgressBarPrevious">&#10003;</span>}
        </div>
      </div>
      );
      stepsProgress.push(fragment);
    }
    return stepsProgress;
  };

  return (
    <div className="mainProgressBar">
      <div className='bodyProgressBar'>
        { displayStepProgress() }
        <div className='lineProgressBar'>
          <progress className='indicatorProgressBar' value={calculateProgress} max={100}></progress>
        </div>
      </div>
    </div>
  )
}