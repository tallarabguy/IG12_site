"use client"

import { useState, useEffect, type FormEvent } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeographicLoadingAnimation } from "./components/geographic-loading-animation"

const sampleIdentities = [
  { firstName: "Ada", lastName: "Lovelace", email: "ada@analyticalengine.org" },
  { firstName: "Nelson", lastName: "Mandela", email: "nelson@freedomcharter.za" },
  { firstName: "Zaha", lastName: "Hadid", email: "zaha@fluidarchitectures.net" },
  { firstName: "Octavia", lastName: "Butler", email: "octavia@patternmaster.net" },
  { firstName: "David", lastName: "Attenborough", email: "david@voiceoftheearth.uk" },
  { firstName: "Nina", lastName: "Simone", email: "nina@mississippigoddam.com" },
  { firstName: "W.E.B.", lastName: "Du Bois", email: "web@thesoulofthefight.org" },
  { firstName: "Angela", lastName: "Davis", email: "angela@abolitionuniversity.org" },
  { firstName: "Frida", lastName: "Kahlo", email: "frida@casaazul.mx" },
  { firstName: "Patsy", lastName: "Mink", email: "patsy@titleixfoundation.gov" },
  { firstName: "Yayoi", lastName: "Kusama", email: "yayoi@infinityroom.jp" },
  { firstName: "James", lastName: "Baldwin", email: "james@firethistime.net" },
];


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

  const [placeholders, setPlaceholders] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@domain.com",
  });

  useEffect(() => {
    const randomIdentity =
      sampleIdentities[Math.floor(Math.random() * sampleIdentities.length)];
    setPlaceholders({
      firstName: randomIdentity.firstName,
      lastName: randomIdentity.lastName,
      email: randomIdentity.email,
    });
  }, []);

    const submitToBackend = async (data: typeof formData) => {
      try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        let result;
        try {
          result = await response.json();
        } catch (jsonErr) {
          throw new Error('Server returned non-JSON response (likely an HTML error page)');
        }

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Unknown error from server');
        }

        return { success: true };
      } catch (err) {
        console.error('Backend submission failed:', err);
        return { success: false, error: err };
      }
    };



  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace mockSubmitToBackend with actual API call
      const result = await submitToBackend(formData);

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
    <div className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] min-h-[100dvh] bg-background text-foreground">
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
      <section className="min-h-[100dvh] flex flex-col items-center justify-center relative px-6">
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
              <div className="border-2 border-primary p-8 lg:p-12 bg-background/90 backdrop-blur-sm max-w-4xl mx-auto">
                {/* Logo */}
                <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-6">
                  <img src="/ig12-logo.jpg" alt="IG12 Consultancy Logo" className="w-full h-full object-contain" />
                </div>

                {/* Divider */}
                <div className="h-px bg-primary w-full"></div>

                {/* Subtitle */}
                <p className="text-lg md:text-2xl text-primary mt-4 font-medium tracking-wide text-center">
                  R&D FOR CIVIC INNOVATION
                </p>

                {/* Explainer */}
                <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
                  We begin with bold questions - about how places shape us, how communities thrive and how systems succeed or fail.
                  <br /><br />
                  At the crossroads of design, culture and critical inquiry, we craft tools and strategies that uncover unseen patterns, amplify shared voices and reimagine the infrastructures of everyday life.
                </p>
              </div>
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
      <section id="cta-section" className="min-h-[100dvh] flex items-center justify-center px-6 lg:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mt-12">


            {/* Right Column - Geometric Visual */}
            <div className="order-1 lg:order-2 lg:justify-self-end w-full">
              <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
                <div className="border-2 border-primary p-8 bg-background/50 backdrop-blur-sm space-y-8">

                  {/* Section Title */}
                  <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase text-center">
                    Works In Progress
                  </h2>                  

                  {/* Project 1 */}
                  <div className="flex items-start space-x-4">
                    <img src="/codex_cropped_final.png" alt="Project 1 Logo" className="w-10 h-10 object-contain" />
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide uppercase text-primary">Project Codex</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        London is alive with cultural activity - events, initiatives, spaces and communities - but much of this vibrancy remains hidden beyond our immediate awareness. Codex sets out to change this by creating a comprehensive directory of London’s cultural entities, mapping the entire city's cultural landscape borough-by-borough. More than just a directory, Codex aims to become a living cultural heartbeat, tracking and visualising events and activities as they unfold.
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-primary opacity-30" />

                  {/* Project 2 */}
                  <div className="flex items-start space-x-4">
                    <img src="/strata_cropped_final.png" alt="Project 2 Logo" className="w-10 h-10 object-contain" />
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide uppercase text-primary">Project Strata</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ever felt the arrangement of things around you subtly influences where you venture and explore? Strata investigates precisely this - exploring how the spatial layout of cultural entities shapes patterns of community engagement and cultural activity. Drawing on 'Space Syntax' - a discipline designed to analyse how spatial configurations influence social behaviour - this project combines insights from Codex’s directory with spatial network analysis to reveal hidden patterns between physical space and cultural participation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner Squares */}
                <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-primary bg-background"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-primary bg-background"></div>
              </div>
            </div>

            {/* Left Column - Content */}
            <div className="order-2 lg:order-1 space-y-8 lg:justify-self-start">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Full-site Under Development</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-tight">
                    Join the
                    <br />
                    Conversation
                  </h2>
                </div>

                <div className="w-24 h-px bg-primary"></div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  IG12 is an evolving exploration. Share your details below to receive our full manifesto - an invitation to dialogue, reflection and mutual learning. 
                  Whether you're curious about our projects, eager to exchange ideas or simply want to connect, we'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                {!isSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="text-xs text-primary font-medium tracking-widest uppercase block"
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
                          placeholder={placeholders.firstName}
                          className="w-full px-4 py-3 bg-background border-2 border-primary text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary/80 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="text-xs text-primary font-medium tracking-widest uppercase block"
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
                          placeholder={placeholders.lastName}
                          className="w-full px-4 py-3 bg-background border-2 border-primary text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary/80 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs text-primary font-medium tracking-widest uppercase block"
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
                        placeholder={placeholders.email}
                        className="w-full px-4 py-3 bg-background border-2 border-primary text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary/80 transition-colors"
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
                          Request Manifesto
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
                        Thank you for signing up, {formData.firstName}! We'll be in touch to share our manifesto and 
                        keep you up to date with our unfolding research.
                      </p>
                      <div className="w-16 h-px bg-primary mx-auto"></div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Welcome to IG12</p>
                    </div>
                  </div>
                )}

                {!isSubmitted && (
                  <p className="text-xs text-muted-foreground text-center max-w-sm mx-auto leading-relaxed">
                    Join us in shaping future conversations and deepening our understanding of the systems we inhabit.
                  </p>
                )}
              </div>
            </div>


          </div>

          <div className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              IG12 • Constant Active Development • 2025
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
