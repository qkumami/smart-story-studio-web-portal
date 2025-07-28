'use client';

import { useState } from 'react';
import { ThickCursorTextField } from '@/components/ui/ThickCursorTextField';
import { ThickCursorTextEditor } from '@/components/ui/ThickCursorTextEditor';

export default function HomePage() {
  const [educatorName, setEducatorName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState('');
  const [engagementSummary, setEngagementSummary] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState('');
  const [whatsNext, setWhatsNext] = useState('');

  return (
    <div className="page-background">
      <div className="container">
        <div className="form-container">
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Smart Story Studio - Web Portal
          </h1>
          <p className="text-center mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            iOS-Matching Web Interface - Thursday Client Demo
          </p>

          <div className="form-fields">
            <div>
              <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
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
              <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
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
              <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
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
              <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
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
              <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
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
              <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                What's Next
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Report Preview
          </h2>
          <div className="space-y-4">
            <div>
              <strong>Educator:</strong> {educatorName || 'Not specified'}
            </div>
            <div>
              <strong>Student:</strong> {studentName || 'Not specified'}
            </div>
            <div>
              <strong>Date:</strong> {date || 'Not specified'}
            </div>
            <div>
              <strong>Engagement Summary:</strong>
              <p className="mt-1">{engagementSummary || 'No content yet'}</p>
            </div>
            <div>
              <strong>Learning Outcomes:</strong>
              <p className="mt-1">{learningOutcomes || 'No content yet'}</p>
            </div>
            <div>
              <strong>What's Next:</strong>
              <p className="mt-1">{whatsNext || 'No content yet'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
