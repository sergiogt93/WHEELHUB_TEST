'use client'

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export const useSpinnerSubmit = () => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const IconSpinner = FaSpinner;

  return {
    IconSpinner, loadingSpinner, setLoadingSpinner
  }
}