'use client'

import React, { useState } from 'react'
import { Header } from "../components/Header";
import { Survey } from "../components/Survey"
import { CreateSurvey } from '../components/CreateSurvey'
import '../styles/home.css'
export const Home = () => {
  const initialSurveyJson = {
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
  }

  const [surveys, setSurveys] = useState([initialSurveyJson])

  const handleCreateSurvey = (newSurvey) => {
    setSurveys([...surveys, newSurvey])
  }

  return (
    <>
      <Header></Header>
      <main className='hm-main-container'>
      <CreateSurvey onCreateSurvey={handleCreateSurvey} />
        {surveys.map((survey, index) => (
          <Survey key={index} surveyJson={survey} />
        ))}
      </main>

    </>
  )
}