'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Edit, Trash } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import '../styles/survey.css'

export const Survey = () => {
  const [survey, setSurvey] = useState({
    title: "Customer Satisfaction Survey",
    categories: ["Satisfaction", "Recommendation"],
    chapters: [
      {
        title: "Product Satisfaction",
        questions: [
          {
            text: "How satisfied are you with our product?",
            options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
            subQuestions: [
              {
                text: "What features do you like most?",
                options: ["User Interface", "Performance", "Reliability", "Customer Support"]
              }
            ],
            categories: ["Satisfaction"]
          }
        ]
      },
      {
        title: "Service Satisfaction",
        questions: [
          {
            text: "How would you rate our customer service?",
            options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
            subQuestions: [],
            categories: ["Satisfaction"]
          },
          {
            text: "Would you recommend our service to others?",
            options: ["Definitely", "Probably", "Not sure", "Probably not", "Definitely not"],
            subQuestions: [],
            categories: ["Recommendation"]
          }
        ]
      }
    ]
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const handleEdit = (item, type, path = []) => {
    setIsEditing(true)
    setEditingItem({ ...item, type, path })
  }

  const handleUpdate = () => {
    const newSurvey = { ...survey }
    let current = newSurvey
    for (let i = 0; i < editingItem.path.length - 1; i++) {
      current = current[editingItem.path[i]]
    }
    current[editingItem.path[editingItem.path.length - 1]] = editingItem
    setSurvey(newSurvey)
    setIsEditing(false)
    setEditingItem(null)
  }

  const handleDelete = (path) => {
    const newSurvey = { ...survey }
    let current = newSurvey
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }
    if (Array.isArray(current)) {
      current.splice(path[path.length - 1], 1)
    } else {
      delete current[path[path.length - 1]]
    }
    setSurvey(newSurvey)
  }

  const handleCreate = (type, path) => {
    const newSurvey = { ...survey }
    let current = newSurvey
    for (let i = 0; i < path.length; i++) {
      current = current[path[i]]
    }
    switch (type) {
      case 'chapter':
        current.push({ title: "New Chapter", questions: [] })
        break
      case 'question':
        current.push({ text: "New Question", options: [], subQuestions: [], categories: [] })
        break
      case 'option':
        current.push("New Option")
        break
      case 'subQuestion':
        current.push({ text: "New Sub-Question", options: [] })
        break
      case 'category':
        newSurvey.categories.push("New Category")
        break
    }
    setSurvey(newSurvey)
  }

  const handleDeleteSurvey = () => {
    // In a real application, you would delete the survey from your backend here
    console.log("Survey deleted")
    // For this example, we'll just reset the survey to an empty state
    setSurvey({
      title: "New Survey",
      categories: [],
      chapters: []
    })
  }

  const renderEditForm = () => (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {editingItem?.type}</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={editingItem?.title || editingItem?.text || editingItem} 
                onChange={(e) => setEditingItem({
                  ...editingItem, 
                  [editingItem?.title ? 'title' : 'text']: e.target.value
                })} 
              />
            </div>
            {(editingItem?.type === 'question' || editingItem?.type === 'subQuestion') && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="options">Options (comma-separated)</Label>
                <Input 
                  id="options" 
                  value={editingItem.options.join(', ')} 
                  onChange={(e) => setEditingItem({...editingItem, options: e.target.value.split(', ')})} 
                />
              </div>
            )}
            {editingItem?.type === 'question' && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="categories">Categories (comma-separated)</Label>
                <Input 
                  id="categories" 
                  value={editingItem.categories.join(', ')} 
                  onChange={(e) => setEditingItem({...editingItem, categories: e.target.value.split(', ')})} 
                />
              </div>
            )}
          </div>
        </form>
        <DialogFooter>
          <button className="survey-button survey-button-primary" type="submit" onClick={handleUpdate}>Update</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const DeleteConfirmation = ({ onConfirm, itemType }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="survey-button survey-button-destructive">
          <Trash className="w-4 h-4 mr-2" /> Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {itemType}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            <Trash className="w-4 h-4 mr-2" /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const renderSurveyStructure = () => (
    <Accordion type="single" collapsible className="w-full">
      {survey.chapters.map((chapter, chapterIndex) => (
        <AccordionItem value={`chapter-${chapterIndex}`} key={chapterIndex} className="survey-chapter">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            {chapter.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Chapter Actions:</span>
                <div className="space-x-2">
                  <button className="survey-button survey-button-outline" onClick={() => handleEdit(chapter, 'chapter', ['chapters', chapterIndex])}>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </button>
                  <DeleteConfirmation onConfirm={() => handleDelete(['chapters', chapterIndex])} itemType="chapter" />
                </div>
              </div>
              {chapter.questions.map((question, questionIndex) => (
                <Accordion type="single" collapsible className="w-full survey-question" key={questionIndex}>
                  <AccordionItem value={`question-${chapterIndex}-${questionIndex}`} className="border-none">
                    <AccordionTrigger className="text-md hover:no-underline">
                      {question.text}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Question Actions:</span>
                          <div className="space-x-2">
                            <button className="survey-button survey-button-outline" onClick={() => handleEdit(question, 'question', ['chapters', chapterIndex, 'questions', questionIndex])}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </button>
                            <DeleteConfirmation onConfirm={() => handleDelete(['chapters', chapterIndex, 'questions', questionIndex])} itemType="question" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <strong>Options:</strong>
                          <ul className="survey-list">
                            {question.options.map((option, optionIndex) => (
                              <li key={optionIndex} className="flex justify-between items-center">
                                {option}
                                <div className="space-x-2">
                                  <button className="survey-button survey-button-outline" onClick={() => handleEdit(option, 'option', ['chapters', chapterIndex, 'questions', questionIndex, 'options', optionIndex])}>
                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                  </button>
                                  <DeleteConfirmation onConfirm={() => handleDelete(['chapters', chapterIndex, 'questions', questionIndex, 'options', optionIndex])} itemType="option" />
                                </div>
                              </li>
                            ))}
                          </ul>
                          <button className="survey-button survey-button-outline" onClick={() => handleCreate('option', ['chapters', chapterIndex, 'questions', questionIndex, 'options'])}>
                            <Plus className="w-4 h-4 mr-2" /> Add Option
                          </button>
                        </div>
                        <div className="space-y-2">
                          <strong>Sub-questions:</strong>
                          {question.subQuestions.map((subQuestion, subIndex) => (
                            <div key={subIndex} className="survey-subquestion space-y-2">
                              <div className="flex justify-between items-center">
                                <span>{subQuestion.text}</span>
                                <div className="space-x-2">
                                  <button className="survey-button survey-button-outline" onClick={() => handleEdit(subQuestion, 'subQuestion', ['chapters', chapterIndex, 'questions', questionIndex, 'subQuestions', subIndex])}>
                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                  </button>
                                  <DeleteConfirmation onConfirm={() => handleDelete(['chapters', chapterIndex, 'questions', questionIndex, 'subQuestions', subIndex])} itemType="sub-question" />
                                </div>
                              </div>
                              <ul className="survey-list">
                                {subQuestion.options.map((option, optionIndex) => (
                                  <li key={optionIndex} className="flex justify-between items-center">
                                    {option}
                                    <div className="space-x-2">
                                      <button className="survey-button survey-button-outline" onClick={() => handleEdit(option, 'option', ['chapters', chapterIndex, 'questions', questionIndex, 'subQuestions', subIndex, 'options', optionIndex])}>
                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                      </button>
                                      <DeleteConfirmation onConfirm={() => handleDelete(['chapters', chapterIndex, 'questions', questionIndex, 'subQuestions', subIndex, 'options', optionIndex])} itemType="sub-question option" />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <button className="survey-button survey-button-outline" onClick={() => handleCreate('option', ['chapters', chapterIndex, 'questions', questionIndex, 'subQuestions', subIndex, 'options'])}>
                                <Plus className="w-4 h-4 mr-2" /> Add Option
                              </button>
                            </div>
                          ))}
                          <button className="survey-button survey-button-outline" onClick={() => handleCreate('subQuestion', ['chapters', chapterIndex, 'questions', questionIndex, 'subQuestions'])}>
                            <Plus className="w-4 h-4 mr-2" /> Add Sub-question
                          </button>
                        </div>
                        <div>
                          <strong>Categories:</strong> {question.categories.join(', ')}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              <button className="survey-button survey-button-outline" onClick={() => handleCreate('question', ['chapters', chapterIndex, 'questions'])}>
                <Plus className="w-4 h-4 mr-2" /> Add Question
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="survey-trigger">
          <h2>{survey.title}</h2>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{survey.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card className="survey-structure">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Survey Structure</CardTitle>
              <DeleteConfirmation onConfirm={handleDeleteSurvey} itemType="survey" />
            </CardHeader>
            <CardContent>
              {renderSurveyStructure()}
              <button className="survey-button survey-button-primary mt-4" onClick={() => handleCreate('chapter', ['chapters'])}>
                <Plus className="w-4 h-4 mr-2" /> Add Chapter
              </button>
            </CardContent>
          </Card>
          <Card className="survey-categories">
            <CardHeader>
              <CardTitle className="text-xl">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="survey-list">
                {survey.categories.map((category, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {category}
                    <div className="space-x-2">
                      <button className="survey-button survey-button-outline" onClick={() => handleEdit(category, 'category', ['categories', index])}>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </button>
                      <DeleteConfirmation onConfirm={() => handleDelete(['categories', index])} itemType="category" />
                    </div>
                  </li>
                ))}
              </ul>
              <button className="survey-button survey-button-primary mt-4" onClick={() => handleCreate('category', ['categories'])}>
                <Plus className="w-4 h-4 mr-2" /> Add Category
              </button>
            </CardContent>
          </Card>
        </div>
        {renderEditForm()}
      </DialogContent>
    </Dialog>
  )
}