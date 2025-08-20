"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Upload, Camera, FileText, Sparkles } from "lucide-react"
import { TokenizationForm } from "@/components/tokenization/tokenization-form"
import { TokenizationPreview } from "@/components/tokenization/tokenization-preview"
import { TokenizationSuccess } from "@/components/tokenization/tokenization-success"
import type { TokenizationRequest } from "@/lib/types"

const steps = [
  { id: 1, name: "Item Details", description: "Basic information about your merchandise" },
  { id: 2, name: "Verification", description: "Upload photos and authenticity documents" },
  { id: 3, name: "Preview", description: "Review your NFT before minting" },
  { id: 4, name: "Mint NFT", description: "Create your NFT on the blockchain" },
]

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [tokenizationData, setTokenizationData] = useState<Partial<TokenizationRequest>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [mintedNFT, setMintedNFT] = useState<any>(null)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = (data: Partial<TokenizationRequest>) => {
    setTokenizationData({ ...tokenizationData, ...data })
    handleNext()
  }

  const handleMintNFT = async () => {
    setIsLoading(true)
    try {
      // Simulate NFT minting process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock successful mint result
      const mockNFT = {
        id: "0x" + Math.random().toString(16).substr(2, 8),
        name: tokenizationData.itemName,
        transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
        tokenId: Math.floor(Math.random() * 10000),
      }

      setMintedNFT(mockNFT)
      handleNext()
    } catch (error) {
      console.error("Minting failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Tokenization Studio
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Anime NFT</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your physical anime merchandise into verified NFTs on the blockchain
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep > step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <FileText className="h-5 w-5" />}
              {currentStep === 2 && <Camera className="h-5 w-5" />}
              {currentStep === 3 && <Upload className="h-5 w-5" />}
              {currentStep === 4 && <Sparkles className="h-5 w-5" />}
              {steps[currentStep - 1]?.name}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && <TokenizationForm onSubmit={handleFormSubmit} initialData={tokenizationData} />}
            {currentStep === 2 && (
              <TokenizationForm onSubmit={handleFormSubmit} initialData={tokenizationData} step="verification" />
            )}
            {currentStep === 3 && (
              <TokenizationPreview data={tokenizationData} onConfirm={handleMintNFT} isLoading={isLoading} />
            )}
            {currentStep === 4 && <TokenizationSuccess nft={mintedNFT} />}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>
        )}
      </div>
    </div>
  )
}
