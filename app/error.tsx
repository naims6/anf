"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AlertCircle, RotateCw, Home } from "lucide-react"

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const router = useRouter()

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary/5 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="h-12 w-12 text-red-500 stroke-[1.5]" />
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Something went wrong!
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-md">
                            We encountered an unexpected error. Our team has been notified.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                            <Button
                                onClick={() => reset()}
                                className="gap-2 bg-primary hover:bg-primary/90"
                            >
                                <RotateCw className="h-4 w-4" />
                                Try Again
                            </Button>

                            <Button
                                onClick={() => router.push("/")}
                                variant="outline"
                                className="gap-2 border-primary text-primary hover:bg-primary/10"
                            >
                                <Home className="h-4 w-4" />
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-8 py-6 text-center">
                    <p className="text-sm text-gray-500">
                        Error code: {error.digest || "UNKNOWN_ERROR"}
                    </p>
                </div>
            </div>
        </div>
    )
}
