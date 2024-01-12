'use client'

interface Props {
  steps: JSX.Element[],
  currentStepIndex: number,
}

export const useProgressActiveSteps = ({ steps, currentStepIndex }: Props) => {
  const calculateProgress = ((currentStepIndex) / (steps.length - 1) ) * 100;

  return {
    calculateProgress
  }
}
