"use client";

/**
 * Main PRD Form component that handles the step-by-step process
 */
import React, { useEffect } from 'react';
import { usePRD } from '../../context/PRDContext';
import { PRDData } from '../../types/prd';
import { validatePRDData, validateProjectInfo, validateReferenceLinks, validateTechStack, validateDatabaseSchema, validateUserStories } from '../../utils/validation';
import { showToast } from '../../components/Toast';
import { LoadingButton, LoadingOverlay, ProgressBar } from '../../components/Loading';
import { useRouter } from 'next/navigation';

// Import step components
import ProjectInfo from './steps/ProjectInfo';
import ReferenceLinks from './steps/ReferenceLinks';
import TechStack from './steps/TechStack';
import DatabaseSchema from './steps/DatabaseSchema';
import UserStories from './steps/UserStories';

const steps = [
  { id: 1, title: 'Project Information', component: ProjectInfo },
  { id: 2, title: 'Reference Links', component: ReferenceLinks },
  { id: 3, title: 'Tech Stack', component: TechStack },
  { id: 4, title: 'Database Schema', component: DatabaseSchema },
  { id: 5, title: 'User Stories', component: UserStories },
];

export default function PRDForm() {
  const router = useRouter();
  const { state, dispatch } = usePRD();
  const { currentStep, formData, isSubmitting, error } = state;

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const validateCurrentStep = (): boolean => {
    let validationResult;

    switch (currentStep) {
      case 1:
        validationResult = validateProjectInfo(formData.project_name, formData.vision);
        break;
      case 2:
        validationResult = validateReferenceLinks(formData.reference_links);
        break;
      case 3:
        validationResult = validateTechStack(formData.tech_stack);
        break;
      case 4:
        validationResult = validateDatabaseSchema(formData.database_schema);
        break;
      case 5:
        validationResult = validateUserStories(formData.user_stories);
        break;
      default:
        return false;
    }

    if (!validationResult.isValid) {
      dispatch({
        type: 'SET_ERROR',
        payload: validationResult.errors.join('\n'),
      });
      showToast(validationResult.errors[0], 'error');
      return false;
    }

    dispatch({ type: 'SET_ERROR', payload: null });
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < steps.length) {
      dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
      showToast(`Step ${currentStep} completed successfully`, 'success');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    const finalValidation = validatePRDData(formData);
    if (!finalValidation.isValid) {
      dispatch({
        type: 'SET_ERROR',
        payload: finalValidation.errors.join('\n'),
      });
      showToast(finalValidation.errors[0], 'error');
      return;
    }

    try {
      dispatch({ type: 'SET_SUBMITTING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const completeFormData = formData as PRDData;
      const response = await fetch('/api/prds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to save PRD');
      }

      const savedPRD = await response.json();
      
      showToast('PRD created successfully!', 'success');
      
      // Navigate to the PRD list page after a short delay
      setTimeout(() => {
        dispatch({ type: 'RESET_FORM' });
        router.push('/prd/list');
      }, 1500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the PRD';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      showToast(errorMessage, 'error');
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  // Clear error when changing steps
  useEffect(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, [currentStep, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center ${
                step.id === currentStep
                  ? 'text-blue-600'
                  : step.id < currentStep
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current">
                {step.id < currentStep ? '✓' : step.id}
              </span>
              <span className="ml-2 text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded whitespace-pre-line">
          {error}
        </div>
      )}

      {/* Current Step Form */}
      <div className="relative bg-white shadow-md rounded-lg p-6 mb-6">
        {isSubmitting && <LoadingOverlay message="Saving your PRD..." />}
        <CurrentStepComponent />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <LoadingButton
          onClick={handlePrevious}
          disabled={currentStep === 1 || isSubmitting}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors duration-200"
        >
          Previous
        </LoadingButton>

        {currentStep === steps.length ? (
          <LoadingButton
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Submitting..."
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
            Submit PRD
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
            Next
          </LoadingButton>
        )}
      </div>
    </div>
  );
}
