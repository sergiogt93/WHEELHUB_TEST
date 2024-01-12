'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react'

import { useMultipleStep } from '#app/(common)/useMultipleStepForm';
import { StepWelcomeForm } from '#app/(signup)/components/StepWelcomeForm';
import { StepUserForm } from '#app/(signup)/components/StepUserForm';
import StepSuccesRegistration from '#app/(signup)/components/StepSuccesRegistration';
import { useProgressActiveSteps } from '#root/src/app/(common)/useProgressActiveSteps';

export interface FormData {
  isConfirmed: boolean,
  username: string,
  password: string,
  track: string
}

const initialData: FormData = {
  isConfirmed: false,
  username: '',
  password: '',
  track: '',
}

interface ISignupContext {
  data: FormData,
  steps: JSX.Element[],
  currentStep: JSX.Element,
  currentStepIndex: number,
  isFirstStep: boolean,
  isLastStep: boolean,
  updateFields: (data: FormData) => void,
  back: () => void
  next: () => void,
  goTo: (index: number) => void
}

const SignUpFormContext = createContext<ISignupContext>({
  data: initialData,
  steps: [],
  currentStep: <></>,
  currentStepIndex: 0,
  isFirstStep: false,
  isLastStep: false,
  updateFields: (data: FormData) => {},
  back: () => {},
  next: () => {},
  goTo: (index: number) => {},
});

export function useSignUpContext() {
  return useContext(SignUpFormContext)
}

export default function SignUpFormContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState(initialData);

  const steps = [
    <StepWelcomeForm key={1}/>,
    <StepUserForm key={2}/>,
    <StepSuccesRegistration key={3}/>
  ]

  const updateFields = (fields: Partial<FormData>) => {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const multipleStep = useMultipleStep(steps);
  const progressActive = useProgressActiveSteps(
    { steps, currentStepIndex: multipleStep.currentStepIndex }
  );
  const value = { data, steps, updateFields, ...multipleStep, ...progressActive };

  return <SignUpFormContext.Provider value={value}>
    {children}
  </SignUpFormContext.Provider>
}
