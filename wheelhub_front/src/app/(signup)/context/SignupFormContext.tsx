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

interface ISignupContext extends ReturnType<typeof useMultipleStep> {
  data: FormData,
  steps: JSX.Element[],
  updateFields: (data: FormData) => void,
}

const SignUpFormContext = createContext<ISignupContext | undefined>(undefined);

export function useSignUpContext() {
  const context = useContext(SignUpFormContext);
  if (!context) {
    throw new Error('useSignUpContext must be used within a SignUpFormContextProvider');
  }
  return context;
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

  const contextValue = { data, steps, updateFields, ...multipleStep, ...progressActive };

  return <SignUpFormContext.Provider value={contextValue}>
    {children}
  </SignUpFormContext.Provider>
}
