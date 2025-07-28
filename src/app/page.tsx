'apos;use client'apos;;

import { useState } from 'apos;react'apos;;
import { ThickCursorTextField } from 'apos;@/components/ui/ThickCursorTextField'apos;;
import { ThickCursorTextEditor } from 'apos;@/components/ui/ThickCursorTextEditor'apos;;

export default function HomePage() {
  const [educatorName, setEducatorName] = useState('apos;'apos;);
  const [studentName, setStudentName] = useState('apos;'apos;);
  const [date, setDate] = useState('apos;'apos;);
  const [engagementSummary, setEngagementSummary] = useState('apos;'apos;);
  const [learningOutcomes, setLearningOutcomes] = useState('apos;'apos;);
  const [whatsNext, setWhatsNext] = useState('apos;'apos;);

  return (
    <div className="page-background">
      <div className="container">
        <div className="form-container">
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
            Smart Story Studio - Web Portal
          </h1>
          <p className="text-center mb-8" style={{ color: 'apos;var(--color-text-secondary)'apos; }}>
            iOS-Matching Web Interface - Thursday Client Demo
          </p>

          <div className="form-fields">
            <div>
              <label className="block mb-2 font-medium" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
                Educator Name
              </label>
              <ThickCursorTextField
                value={educatorName}
                onChange={setEducatorName}
                placeholder="Enter educator name"
                contentType="name"
                name="educatorName"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
                Student Name
              </label>
              <ThickCursorTextField
                value={studentName}
                onChange={setStudentName}
                placeholder="Enter student name"
                contentType="name"
                name="studentName"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="datepicker-base"
                name="date"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
                Engagement Summary
              </label>
              <ThickCursorTextEditor
                value={engagementSummary}
                onChange={setEngagementSummary}
                placeholder="Describe the engagement activities..."
                contentType="content"
                name="engagementSummary"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
                Learning Outcomes
              </label>
              <ThickCursorTextEditor
                value={learningOutcomes}
                onChange={setLearningOutcomes}
                placeholder="What did the child learn?"
                contentType="content"
                name="learningOutcomes"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
                What'apos;s Next
              </label>
              <ThickCursorTextEditor
                value={whatsNext}
                onChange={setWhatsNext}
                placeholder="Plan for next steps..."
                contentType="content"
                name="whatsNext"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button className="button-base button-primary">
                Generate AI Report
              </button>
              <button className="button-base button-secondary">
                Add Media
              </button>
            </div>
          </div>
        </div>

        <div className="report-container">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'apos;var(--color-text-primary)'apos; }}>
            Report Preview
          </h2>
          <div className="space-y-4">
            <div>
              <strong>Educator:</strong> {educatorName || 'apos;Not specified'apos;}
            </div>
            <div>
              <strong>Student:</strong> {studentName || 'apos;Not specified'apos;}
            </div>
            <div>
              <strong>Date:</strong> {date || 'apos;Not specified'apos;}
            </div>
            <div>
              <strong>Engagement Summary:</strong>
              <p className="mt-1">{engagementSummary || 'apos;No content yet'apos;}</p>
            </div>
            <div>
              <strong>Learning Outcomes:</strong>
              <p className="mt-1">{learningOutcomes || 'apos;No content yet'apos;}</p>
            </div>
            <div>
              <strong>What'apos;s Next:</strong>
              <p className="mt-1">{whatsNext || 'apos;No content yet'apos;}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
