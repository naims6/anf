import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Compass, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Compass className="h-12 w-12 text-blue-500 stroke-[1.5]" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
                <Link href="/services">
                  <Search className="h-4 w-4" />
                  Browse Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-6 text-center">
          <p className="text-sm text-gray-500">
            Error code: 404 - PAGE_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  )
}