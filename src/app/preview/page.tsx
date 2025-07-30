'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReportPreview from '@/components/ReportPreview';

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get report data from URL params
  const title = searchParams?.get('title') || '';
  const educatorName = searchParams?.get('educatorName') || '';
  const studentName = searchParams?.get('studentName') || '';
  const room = searchParams?.get('room') || '';
  const date = searchParams?.get('date') || '';
  const content = searchParams?.get('content') || '';
  const reportType = searchParams?.get('reportType') as 'Daily' | 'Progress' | 'Observation' || 'Progress';

  const handleBack = () => {
    // Go back to the previous page
    router.back();
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <ReportPreview
      title={title}
      educatorName={educatorName}
      studentName={studentName}
      room={room}
      date={date}
      content={content}
      reportType={reportType}
      onBack={handleBack}
      onHome={handleHome}
    />
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="page-background min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-black">Loading Preview...</div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
} 