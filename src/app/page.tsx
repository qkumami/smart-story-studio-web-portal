'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThickCursorTextField } from '@/components/ui/ThickCursorTextField';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const [educatorFirstName, setEducatorFirstName] = useState('');
  const [educatorLastName, setEducatorLastName] = useState('');
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [room, setRoom] = useState('');
  const [reportType, setReportType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form validation
  const isFormValid = educatorFirstName.trim() && educatorLastName.trim() && room && reportType;
  
  const categories = ["Infant", "Toddler", "3-Year Kinder", "4-Year Kinder"];
  const reportTypes = ["Observation", "Daily", "Progress"];
  
  const handleContinue = () => {
    if (!isFormValid) {
      alert('Please fill in all required fields before continuing.');
      return;
    }
    
    setIsGenerating(true);
    
    // Build URL with form data
    const params = new URLSearchParams({
      educatorFirstName: educatorFirstName.trim(),
      educatorLastName: educatorLastName.trim(),
      studentFirstName: studentFirstName.trim(),
      studentLastName: studentLastName.trim(),
      date: date,
      room: room,
      reportType: reportType
    });
    
    // Navigate to appropriate report page
    setTimeout(() => {
      switch (reportType) {
        case 'Observation':
          router.push(`/observation?${params.toString()}`);
          break;
        case 'Daily':
          router.push(`/daily?${params.toString()}`);
          break;
        case 'Progress':
          router.push(`/progress?${params.toString()}`);
          break;
        default:
          alert('Invalid report type selected.');
          setIsGenerating(false);
      }
    }, 1000);
  };

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <div className="page-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <button className="text-xl font-semibold text-black">
              Log Off
            </button>
            <span className="text-xl font-semibold text-black">
              Centre ID: authenticated_user
            </span>
          </div>

          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-30 h-30 mx-auto mb-4 bg-white rounded-3xl shadow-lg flex items-center justify-center p-2">
              <Image
                src="/ss-logo.png"
                alt="Smart Story Studio Logo"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <h1 className="text-4xl font-black text-black">
              Smart Story Studio
            </h1>
          </div>

          {/* Date Row */}
          <div className="bg-white rounded-lg p-4 mb-6 flex justify-between items-center">
            <span className="text-2xl font-semibold text-black">Date</span>
            <span className="text-xl text-black">{formattedDate}</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="opacity-0 absolute"
            />
          </div>

          {/* Educator Name */}
          <div className="mb-6">
            <label className="block text-2xl font-semibold text-black mb-2">
              Educator Name
            </label>
            <div className="flex gap-4">
              <ThickCursorTextField
                value={educatorFirstName}
                onChange={setEducatorFirstName}
                placeholder="First Name"
                contentType="name"
                name="educatorFirstName"
                className="flex-1"
              />
              <ThickCursorTextField
                value={educatorLastName}
                onChange={setEducatorLastName}
                placeholder="Last Name"
                contentType="name"
                name="educatorLastName"
                className="flex-1"
              />
            </div>
          </div>

          {/* Student Name */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-2xl font-semibold text-black">
                Student Name
              </label>
              <span className="ml-2 text-base font-medium text-red-500">
                (Required)
              </span>
            </div>
            <div className="flex gap-4">
              <ThickCursorTextField
                value={studentFirstName}
                onChange={setStudentFirstName}
                placeholder="First Name"
                contentType="name"
                name="studentFirstName"
                className="flex-1"
              />
              <ThickCursorTextField
                value={studentLastName}
                onChange={setStudentLastName}
                placeholder="Last Name"
                contentType="name"
                name="studentLastName"
                className="flex-1"
              />
            </div>
          </div>

          {/* Room Dropdown */}
          <div className="mb-6">
            <label className="block text-2xl font-semibold text-black mb-2">
              Room
            </label>
            <div className="relative">
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full p-4 bg-white rounded-lg border border-gray-300 text-xl appearance-none text-black"
                style={{ paddingRight: '40px' }}
              >
                <option value="" className="text-black">Select</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Report Type Dropdown */}
          <div className="mb-8">
            <label className="block text-2xl font-semibold text-black mb-2">
              Report Type
            </label>
            <div className="relative">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-4 bg-white rounded-lg border border-gray-300 text-xl appearance-none text-black"
                style={{ paddingRight: '40px' }}
              >
                <option value="" className="text-black">Select</option>
                {reportTypes.map((type) => (
                  <option key={type} value={type} className="text-black">
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isFormValid || isGenerating}
            className="w-full p-4 text-2xl font-bold text-white rounded-lg transition-all duration-200"
            style={{
              backgroundColor: isFormValid ? '#AACABB' : 'rgba(128, 128, 128, 0.5)',
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
          >
            {isGenerating ? 'Processing...' : 'Continue'}
          </button>

          {/* Spacer */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
}
