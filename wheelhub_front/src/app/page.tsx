'use client'

import { SignUpWrapper } from '#app/(signup)/layout/SignupWrapper';
import SignupFormContextProvider from '#app/(signup)/context/SignupFormContext';

export default function Home() {
  return (
    <main>
      <SignupFormContextProvider>
        <SignUpWrapper />
      </SignupFormContextProvider>
    </main>
  )
}
