'use client'

import { useState } from "react";

export function useMultipleStep(steps: JSX.Element[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex(current => {
      if(current >= steps.length - 1) return current;
      return current + 1;
    })
  }

  function back() {
    setCurrentStepIndex(current => {
      if(current <= 0) return current;
      return current - 1;
    })
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo, back, next
  }
}