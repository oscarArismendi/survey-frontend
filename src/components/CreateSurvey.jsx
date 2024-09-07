'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const CreateSurvey = ({ onCreateSurvey }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [surveyTitle, setSurveyTitle] = useState('')

  const handleCreateSurvey = () => {
    const newSurvey = {
      title: surveyTitle,
      categories: [],
      chapters: []
    }
    onCreateSurvey(newSurvey)
    setIsOpen(false)
    setSurveyTitle('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-64 h-64 flex flex-col items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary">
          <Plus className="w-12 h-12 mb-2" />
          <span className="text-lg font-semibold">Create Survey</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Survey</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="survey-title" className="text-right">
              Survey Title
            </Label>
            <Input
              id="survey-title"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateSurvey} disabled={!surveyTitle.trim()}>
            Create Survey
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}