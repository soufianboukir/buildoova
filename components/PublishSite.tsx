import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Globe, Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { publishSite } from "@/services/site"

export function PublishSite({ code }: { code: string }) {
  const [siteName, setSiteName] = useState("")
  const [error, setError] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const validateSiteName = (name: string) => {
    if (!name) {
      setError("Site name cannot be empty")
      return false
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
      setError("Only letters, numbers, dash, and underscore are allowed")
      return false
    }
    if (name.length > 24) {
      setError("Maximum 24 characters allowed")
      return false
    }
    setError("")
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value)
    validateSiteName(e.target.value)
  }

  const handlePublish = async () => {
    setIsPublishing(true)

    try{
      const response = await publishSite(code,siteName)
      if(response.status === 200){
        setIsPublished(true)
        setTimeout(() => setIsPublished(false), 3000)
      }
    }catch{
      toast.error('An error occuerd from server')
    }finally{
      setIsPublishing(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
            variant="outline" 
            className="h-9 w-9"
            aria-label="Publish site"
        >
            <Globe className="h-4 w-4" />
            <span className="absolute inset-0 rounded-full bg-emerald-100 opacity-100 animate-ping duration-1000"></span>
        </Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-lg shadow-xl">
        <DialogHeader>
          <div className="">
            <DialogTitle className="text-xl font-bold text-gray-800">Publish your site</DialogTitle>
            <DialogDescription className="text-gray-600">
            Get your custom URL at <span className="font-mono text-blue-600">buildoova.com/yourname</span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div className="relative">
            <input
              id="siteName"
              type="text"
              value={siteName}
              onChange={handleChange}
              placeholder="my-awesome-site"
              className={`w-full rounded-lg border-2 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all ${
                error ? "border-red-400" : "border-gray-200 hover:border-gray-300"
              } ${isPublished ? "border-emerald-400 bg-emerald-50" : ""}`}
              autoComplete="off"
              autoFocus
            />
            {error && (
              <p className="absolute -bottom-5 left-0 text-xs text-red-600 animate-shake">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 px-1">
            <span className="text-sm text-gray-500">Your URL:</span>
            <span className="font-mono text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
              buildoova.com/{siteName || "yourname"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="outline" 
              className="border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!!error || !siteName || isPublishing || isPublished}
            onClick={handlePublish}
            className={`relative overflow-hidden ${
              isPublished 
                ? "bg-emerald-500 hover:bg-emerald-600 duration-100" 
                : "bg-blue-500 hover:bg-blue-600 duration-100"
            } text-white shadow-md transition-all`}
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : isPublished ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Published!
              </>
            ) : (
              "Publish Now"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}