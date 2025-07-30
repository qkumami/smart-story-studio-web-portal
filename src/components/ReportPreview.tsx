// Report Preview Component for Smart Story Studio Web Portal
// Matches iOS Build 3 preview functionality

import React from 'react';
import { pdfService } from '@/utils/pdfService';
import { emailService } from '@/utils/emailService';

interface ReportPreviewProps {
  title: string;
  educatorName: string;
  studentName: string;
  room: string;
  date: string;
  content: string;
  reportType: 'Daily' | 'Progress' | 'Observation';
  onBack: () => void;
  onHome: () => void;
}

export default function ReportPreview({
  title,
  educatorName,
  studentName,
  room,
  date,
  content,
  reportType,
  onBack,
  onHome
}: ReportPreviewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);
  const [isSendingEmail, setIsSendingEmail] = React.useState(false);
  const [showEmailInput, setShowEmailInput] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [error, setError] = React.useState('');

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      setError('');
      
      await pdfService.downloadPDF({
        title,
        educatorName,
        studentName,
        room,
        date,
        content,
        reportType
      });
    } catch (error) {
      console.error('PDF download error:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailAddress.trim()) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSendingEmail(true);
      setError('');
      
      // Generate PDF blob
      const pdfBlob = await pdfService.getPDFBlob({
        title,
        educatorName,
        studentName,
        room,
        date,
        content,
        reportType
      });

      // Send email with PDF attachment
      await emailService.sendReportEmail(
        emailAddress,
        reportType,
        studentName,
        date,
        pdfBlob
      );

      setShowEmailInput(false);
      setEmailAddress('');
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Email sending error:', error);
      setError('Failed to send email. Please try again.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="page-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={onBack}
              className="text-xl font-semibold text-blue-600 flex items-center bg-white bg-opacity-80 px-3 py-2 rounded-lg shadow-sm"
            >
              ← Back
            </button>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <h1 className="text-2xl font-black text-black">Report Preview</h1>
            </div>
            <button 
              onClick={onHome}
              className="text-lg font-semibold text-white flex items-center bg-blue-600 px-3 py-2 rounded-lg shadow-sm"
            >
              🏠 Home
            </button>
          </div>

          {/* Report Info */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-lg text-black">
              <div><strong>Date:</strong> {formattedDate}</div>
              <div><strong>Educator:</strong> {educatorName}</div>
              <div><strong>Student:</strong> {studentName}</div>
              <div><strong>Room:</strong> {room}</div>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-lg">
              {content}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex-1 p-4 text-xl font-bold text-white bg-blue-600 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button
              onClick={() => setShowEmailInput(true)}
              disabled={isSendingEmail}
              className="flex-1 p-4 text-xl font-bold text-white bg-green-600 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isSendingEmail ? 'Sending...' : 'Send via Email'}
            </button>
          </div>

          {/* Email Input Modal */}
          {showEmailInput && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-bold text-black mb-4">Send Report via Email</h3>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full p-3 border border-gray-300 rounded-lg text-black mb-4"
                />
                {error && (
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleSendEmail}
                    disabled={isSendingEmail || !emailAddress.trim()}
                    className="flex-1 p-3 text-white bg-blue-600 rounded-lg disabled:opacity-50"
                  >
                    {isSendingEmail ? 'Sending...' : 'Send'}
                  </button>
                  <button
                    onClick={() => {
                      setShowEmailInput(false);
                      setEmailAddress('');
                      setError('');
                    }}
                    className="flex-1 p-3 text-gray-600 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && !showEmailInput && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 