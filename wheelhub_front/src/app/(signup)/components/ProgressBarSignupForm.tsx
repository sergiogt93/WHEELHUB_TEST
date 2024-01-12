'use client'

import '#styles/signup/progressBarSignupForm.scss';
import { useSignUpContext } from '#app/(signup)/context/SignupFormContext';
import { useProgressActiveSteps } from '#app/(common)/useProgressActiveSteps';
import { FaCheckCircle } from "react-icons/fa";

export const ProgressBarSignupForm = () => {
  const { steps, currentStepIndex } = useSignUpContext();
  const { calculateProgress } = useProgressActiveSteps({ steps, currentStepIndex});

  const getPages = () => {
    const pages = [];
    for (let index = 0; index < steps.length; index++) {
      let className = '';
      let fragment = <></>;
      if(index === currentStepIndex) {
        fragment = <div key={index} className='numberProgressBarActive'>
          { index + 1 }
        </div>
      }

      if(index < currentStepIndex) {
        fragment = <div key={index} className='numberProgressBarPrevious'>
          <FaCheckCircle className='iconProgressBarPrevious'/>
        </div>
      }

      if(index > currentStepIndex) {
        className = 'numberProgressBarNext';
        fragment = <div key={index} className='numberProgressBarNext'>
          { index + 1 }
        </div>
      }

      pages.push(fragment)
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