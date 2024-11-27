"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight } from 'lucide-react'

import { usePRD } from "@/context/PRDContext"
import { PRDData } from "@/types/prd"
import {
  validatePRDData,
  validateProjectInfo,
  validateReferenceLinks,
  validateTechStack,
  validateDatabaseSchema,
  validateUserStories,
} from "@/utils/validation"
import { showToast } from "@/components/Toast"
import { LoadingButton, LoadingOverlay } from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import ProjectInfo from "./steps/ProjectInfo"
import ReferenceLinks from "./steps/ReferenceLinks"
import TechStack from "./steps/TechStack"
import DatabaseSchema from "./steps/DatabaseSchema"
import UserStories from "./steps/UserStories"

const steps = [
  { id: 1, title: "Project Information", component: ProjectInfo, description: "Basic project details" },
  { id: 2, title: "Reference Links", component: ReferenceLinks, description: "Important resources" },
  { id: 3, title: "Tech Stack", component: TechStack, description: "Technology choices" },
  { id: 4, title: "Database Schema", component: DatabaseSchema, description: "Data structure" },
  { id: 5, title: "User Stories", component: UserStories, description: "Requirements" },
]

export default function PRDForm() {
  const router = useRouter()
  const { state, dispatch } = usePRD()
  const { currentStep, formData, isSubmitting, error } = state

  const CurrentStepComponent = steps[currentStep - 1].component
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const validateCurrentStep = (): boolean => {
    let validationResult

    switch (currentStep) {
      case 1:
        validationResult = validateProjectInfo(formData.project_name, formData.vision)
        break
      case 2:
        validationResult = validateReferenceLinks(formData.reference_links)
        break
      case 3:
        validationResult = validateTechStack(formData.tech_stack)
        break
      case 4:
        validationResult = validateDatabaseSchema(formData.database_schema)
        break
      case 5:
        validationResult = validateUserStories(formData.user_stories)
        break
      default:
        return false
    }

    if (!validationResult.isValid) {
      dispatch({
        type: "SET_ERROR",
        payload: validationResult.errors.join("\n"),
      })
      showToast(validationResult.errors[0], "error")
      return false
    }

    dispatch({ type: "SET_ERROR", payload: null })
    return true
  }

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return
    }

    if (currentStep < steps.length) {
      dispatch({ type: "SET_STEP", payload: currentStep + 1 })
      showToast(`Step ${currentStep} completed successfully`, "success")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch({ type: "SET_STEP", payload: currentStep - 1 })
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return
    }

    const finalValidation = validatePRDData(formData)
    if (!finalValidation.isValid) {
      dispatch({
        type: "SET_ERROR",
        payload: finalValidation.errors.join("\n"),
      })
      showToast(finalValidation.errors[0], "error")
      return
    }

    try {
      dispatch({ type: "SET_SUBMITTING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const completeFormData = formData as PRDData
      const response = await fetch("/api/prds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to save PRD")
      }

      const savedPRD = await response.json()

      showToast("PRD created successfully!", "success")

      // Navigate to the PRD list page after a short delay
      setTimeout(() => {
        dispatch({ type: "RESET_FORM" })
        router.push("/prd/list")
      }, 1500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while creating the PRD"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      showToast(errorMessage, "error")
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false })
    }
  }

  // Clear error when changing steps
  useEffect(() => {
    dispatch({ type: "SET_ERROR", payload: null })
  }, [currentStep, dispatch])

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">PRD Assistant</h1>
      <Card className="border-none shadow-none mb-8">
        <CardContent className="relative space-y-8 pt-4">
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-muted rounded">
              <div
                className="h-full bg-primary transition-all duration-500 ease-in-out rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="relative z-10 flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-200 ${step.id === currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : step.id < currentStep
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted bg-background text-muted-foreground"
                      }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <span className="text-lg font-bold">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-3 flex flex-col items-center">
                    <span
                      className={`text-base font-semibold ${step.id === currentStep ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-sm text-muted-foreground">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="mb-4 p-4 bg-destructive/15 border border-destructive text-destructive rounded-md shadow">
          {error}
        </div>
      )}

      <Card className="border shadow-md mb-6">
        <CardHeader className="text-center">
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {isSubmitting && <LoadingOverlay message="Saving your PRD..." />}
          <CurrentStepComponent />
        </CardContent>
      </Card>

      <CardFooter className="flex justify-between mt-6">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1 || isSubmitting}
          variant="outline"
          size="lg"
          className="px-6"
        >
          Previous
        </Button>

        {currentStep === steps.length ? (
          <LoadingButton
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Submitting..."
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors duration-200"
          >
            Submit PRD
          </LoadingButton>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            size="lg"
            className="px-6"
          >
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </CardFooter>
    </div>
  )
}

