"use client"

import { useState, useEffect, type FormEvent } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeographicLoadingAnimation } from "./components/geographic-loading-animation"

export default function IG12SimplifiedLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const scrollToCallToAction = () => {
    const ctaSection = document.getElementById("cta-section")
    ctaSection?.scrollIntoView({ behavior: "smooth" })
  }
  
  const handleLoadingAnimationComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowScrollIndicator(true), 500);
  };

  // Mock async function simulating successful submission
  const mockSubmitToBackend = async (data: typeof formData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // TODO: Replace with actual backend integration
    // 1. Send data to Google Sheets API
    // await saveToGoogleSheets(data)

    // 2. Send confirmation email
    // await sendConfirmationEmail(data.email, data.firstName)

    // 3. Add to mailing list/CRM
    // await addToMailingList(data)

    console.log("Form submitted:", data)
    return { success: true }
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace mockSubmitToBackend with actual API call
      const result = await mockSubmitToBackend(formData)

      if (result.success) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Submission error:", error)
      // TODO: Add error handling UI
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Loading Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-8">
            {/* IG12 Logo */}
            <div className="w-24 h-24">
              <img src="/ig12-logo.jpg" alt="IG12 Consultancy Logo" className="w-full h-full object-contain" />
            </div>

            {/* Loading Text */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground font-medium tracking-wide text-sm uppercase">
                Loading...
              </p>
            </div>

            {/* Geographic Animation positioned below text - ONLY during loading */}
            <div className="mt-4">
              <GeographicLoadingAnimation size={120} onComplete={handleLoadingAnimationComplete} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-12 animate-fade-in max-w-4xl mx-auto text-center">
            {/* IG12 Logo-Style Welcome */}
            <div className="space-y-6">
              <div className="border-2 border-primary p-8 lg:p-12 bg-background/90 backdrop-blur-sm">
                <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-6">
                  <img src="/ig12-logo.jpg" alt="IG12 Consultancy Logo" className="w-full h-full object-contain" />
                </div>
                <div className="h-px bg-primary w-full"></div>
                <p className="text-lg md:text-xl text-muted-foreground mt-4 font-medium tracking-wide">
                  RESEARCH CONSULTANCY
                </p>
              </div>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Precision-driven insights for complex challenges. Data visualization and strategic research solutions.
              </p>
            </div>

            {/* NO ANIMATION HERE - removed the slow animation */}

            {/* Geometric Scroll Indicator */}
            
            <div
              className={`flex flex-col items-center space-y-4 cursor-pointer group transition-all duration-500
                ${showScrollIndicator ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
              `}
              onClick={scrollToCallToAction}
            >
              <div className="w-px h-16 bg-primary opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="border border-primary p-3 group-hover:bg-primary/10 transition-colors">
                <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Continue</p>
            </div>
            
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section id="cta-section" className="min-h-screen flex items-center justify-center px-6 lg:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 lg:justify-self-start">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Coming Soon</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-tight">
                    Strategic Research
                    <br />
                    Platform
                  </h2>
                </div>

                <div className="w-24 h-px bg-primary"></div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Advanced analytics and visualization tools for data-driven decision making. Join our research network
                  for early access to cutting-edge insights.
                </p>
              </div>

              <div className="space-y-6">
                {!isSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="text-xs text-muted-foreground font-medium tracking-widest uppercase block"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                          className="w-full px-4 py-3 bg-background border-2 border-primary text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary/80 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="text-xs text-muted-foreground font-medium tracking-widest uppercase block"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Smith"
                          className="w-full px-4 py-3 bg-background border-2 border-primary text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary/80 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs text-muted-foreground font-medium tracking-widest uppercase block"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john.smith@domain.com"
                        className="w-full px-4 py-3 bg-background border-2 border-primary text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary/80 transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request Early Access
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="max-w-md animate-fade-in">
                    <div className="border-2 border-primary p-8 bg-background/90 backdrop-blur-sm text-center space-y-4">
                      <div className="w-12 h-12 mx-auto border-2 border-primary rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-primary">Thank You!</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Thank you for signing up, {formData.firstName}! We'll be in touch soon with early access to our
                        strategic research platform.
                      </p>
                      <div className="w-16 h-px bg-primary mx-auto"></div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Welcome to IG12</p>
                    </div>
                  </div>
                )}

                {!isSubmitted && (
                  <p className="text-xs text-muted-foreground text-center max-w-sm mx-auto leading-relaxed">
                    Join our research network for exclusive insights and early access to our strategic analysis
                    platform.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Geometric Visual */}
            <div className="lg:justify-self-end">
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <div className="border-2 border-primary p-12 bg-background/50 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="w-2 h-2 bg-primary"></div>
                        <div className="text-xs text-muted-foreground font-medium tracking-wider">DATA INSIGHTS</div>
                      </div>

                      <div className="space-y-2">
                        <div className="w-full h-1 bg-border">
                          <div className="w-3/4 h-full bg-primary"></div>
                        </div>
                        <div className="w-full h-1 bg-border">
                          <div className="w-1/2 h-full bg-primary"></div>
                        </div>
                        <div className="w-full h-1 bg-border">
                          <div className="w-5/6 h-full bg-primary"></div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-primary opacity-30"></div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
                        Research Excellence
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-primary bg-background"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-primary bg-background"></div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              Platform Development • Q2 2024
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
}
