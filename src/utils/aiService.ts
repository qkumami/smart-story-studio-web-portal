// AI Service for Smart Story Studio Web Portal
// Implements OpenAI GPT-4 integration similar to iOS Build 3

interface DailyAIResponse {
  engagementSummary: string;
  engagementSummaryWordCount?: number;
  learning: string;
  learningWordCount?: number;
  whatsNext: string;
  whatsNextWordCount?: number;
  educatorComment: string;
  educatorCommentWordCount?: number;
}

interface ObservationAIResponse {
  activity: string;
  whatsNext: string;
  comment: string;
}

interface ProgressAIResponse {
  emotional?: string;
  physical?: string;
  social?: string;
  cognitive?: string;
  language?: string;
  whatsNext?: string;
  educatorComment?: string;
}

import { AI_CONFIG, getApiKey } from '@/config/ai';

class AIService {
  private endpoint = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    // API key will be retrieved dynamically to handle environment changes
  }

  // Security validation
  private sanitizeInput(input: string): string {
    // Remove potentially dangerous characters and limit length
    let sanitized = input
      .replace(/<script>/g, '')
      .replace(/<\/script>/g, '')
      .replace(/javascript:/g, '')
      .replace(/data:/g, '')
      .trim();

    // Limit input length to prevent abuse
    return sanitized.substring(0, 2000);
  }

  private validateInput(input: string): boolean {
    // Check for empty content
    if (!input || input.length === 0) return false;
    if (input.length > 2000) return false;
    if (input.includes('<script>')) return false;
    if (input.includes('javascript:')) return false;
    return true;
  }

  // Apply Australian English spelling corrections
  private applyAustralianSpelling(text: string): string {
    const spellingCorrections: { [key: string]: string } = {
      'color': 'colour',
      'favorite': 'favourite',
      'behavior': 'behaviour',
      'center': 'centre',
      'theater': 'theatre',
      'labor': 'labour',
      'honor': 'honour',
      'neighbor': 'neighbour',
      'realize': 'realise',
      'organize': 'organise',
      'analyze': 'analyse',
      'criticize': 'criticise',
      'memorize': 'memorise',
      'recognize': 'recognise',
      'specialize': 'specialise',
      'summarize': 'summarise',
      'utilize': 'utilise'
    };

    let correctedText = text;
    
    for (const [americanSpelling, australianSpelling] of Object.entries(spellingCorrections)) {
      // Replace whole words only (case-insensitive)
      const pattern = new RegExp(`\\b${americanSpelling}\\b`, 'gi');
      correctedText = correctedText.replace(pattern, australianSpelling);
      
      // Handle capitalized versions
      const capitalizedAmerican = americanSpelling.charAt(0).toUpperCase() + americanSpelling.slice(1);
      const capitalizedAustralian = australianSpelling.charAt(0).toUpperCase() + australianSpelling.slice(1);
      const capitalPattern = new RegExp(`\\b${capitalizedAmerican}\\b`, 'g');
      correctedText = correctedText.replace(capitalPattern, capitalizedAustralian);
    }
    
    return correctedText;
  }

  private async makeOpenAIRequest(prompt: string): Promise<string> {
    const apiKey = getApiKey();

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert early childhood educator. Write professional, engaging reports in Australian English. Use positive, encouraging language that celebrates children\'s achievements and provides constructive guidance for their continued development.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;
      
      if (!aiResponse) {
        throw new Error('No response from OpenAI');
      }

      // Apply Australian English corrections
      return this.applyAustralianSpelling(aiResponse);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  // Generate Daily Report
  async generateDailyReport(
    educatorName: string,
    studentName: string,
    room: string,
    date: string,
    engagementSummary: string,
    learning: string,
    whatsNext: string,
    educatorComment: string
  ): Promise<DailyAIResponse> {
    const sanitizedEngagement = this.sanitizeInput(engagementSummary);
    const sanitizedLearning = this.sanitizeInput(learning);
    const sanitizedWhatsNext = this.sanitizeInput(whatsNext);
    const sanitizedComment = this.sanitizeInput(educatorComment);

    if (!this.validateInput(sanitizedEngagement)) {
      throw new Error('Invalid engagement summary input');
    }

    const prompt = `Generate a professional daily progress report for early childhood education.

Context:
- Educator: ${educatorName}
- Student: ${studentName}
- Room: ${room}
- Date: ${date}

Based on the following information, create engaging, professional content:

Engagement Summary: ${sanitizedEngagement}
Learning Activities: ${sanitizedLearning}
What's Next: ${sanitizedWhatsNext}
Educator's Comment: ${sanitizedComment}

Please provide:
1. An engaging engagement summary (max 150 words)
2. Learning highlights (max 200 words)
3. What's next for the child's development (max 150 words)
4. A professional educator comment (max 100 words)

Use Australian English spelling and positive, encouraging language.`;

    const aiResponse = await this.makeOpenAIRequest(prompt);
    
    // Parse the AI response (you might want to use a more structured approach)
    const sections = aiResponse.split('\n\n');
    
    return {
      engagementSummary: sections[0] || 'Engagement summary not generated',
      engagementSummaryWordCount: sections[0]?.split(' ').length || 0,
      learning: sections[1] || 'Learning highlights not generated',
      learningWordCount: sections[1]?.split(' ').length || 0,
      whatsNext: sections[2] || 'Next steps not generated',
      whatsNextWordCount: sections[2]?.split(' ').length || 0,
      educatorComment: sections[3] || 'Educator comment not generated',
      educatorCommentWordCount: sections[3]?.split(' ').length || 0
    };
  }

  // Generate Progress Report
  async generateProgressReport(
    educatorName: string,
    studentName: string,
    room: string,
    date: string,
    progressAreas: string,
    achievements: string,
    nextSteps: string
  ): Promise<ProgressAIResponse> {
    const sanitizedProgress = this.sanitizeInput(progressAreas);
    const sanitizedAchievements = this.sanitizeInput(achievements);
    const sanitizedNextSteps = this.sanitizeInput(nextSteps);

    if (!this.validateInput(sanitizedProgress)) {
      throw new Error('Invalid progress areas input');
    }

    const prompt = `Generate a comprehensive progress report for early childhood education.

Context:
- Educator: ${educatorName}
- Student: ${studentName}
- Room: ${room}
- Date: ${date}

Based on the following information, create detailed progress assessments:

Progress Areas Observed: ${sanitizedProgress}
Achievements: ${sanitizedAchievements}
Next Steps: ${sanitizedNextSteps}

Please provide detailed assessments for each developmental area:
1. Emotional Development (max 150 words)
2. Physical Development (max 150 words)
3. Social Development (max 150 words)
4. Cognitive Development (max 150 words)
5. Language Development (max 150 words)
6. What's Next for continued development (max 200 words)
7. Educator's overall comment (max 100 words)

Use Australian English spelling and professional, encouraging language that celebrates achievements while providing constructive guidance.`;

    const aiResponse = await this.makeOpenAIRequest(prompt);
    
    // Parse the AI response into sections
    const sections = aiResponse.split('\n\n');
    
    return {
      emotional: sections[0] || 'Emotional development assessment not generated',
      physical: sections[1] || 'Physical development assessment not generated',
      social: sections[2] || 'Social development assessment not generated',
      cognitive: sections[3] || 'Cognitive development assessment not generated',
      language: sections[4] || 'Language development assessment not generated',
      whatsNext: sections[5] || 'Next steps not generated',
      educatorComment: sections[6] || 'Educator comment not generated'
    };
  }

  // Generate Observation Report
  async generateObservationReport(
    educatorName: string,
    studentName: string,
    room: string,
    date: string,
    activityDescription: string,
    focusAreas: string[]
  ): Promise<ObservationAIResponse> {
    const sanitizedActivity = this.sanitizeInput(activityDescription);

    if (!this.validateInput(sanitizedActivity)) {
      throw new Error('Invalid activity description input');
    }

    const prompt = `Generate a detailed observation report for early childhood education.

Context:
- Educator: ${educatorName}
- Student: ${studentName}
- Room: ${room}
- Date: ${date}
- Focus Areas: ${focusAreas.join(', ')}

Activity Description: ${sanitizedActivity}

Please provide:
1. A detailed activity description with observations (max 300 words)
2. What's next for the child's development based on this observation (max 200 words)
3. Professional educator comment (max 150 words)

Use Australian English spelling and detailed, professional language that captures the child's engagement and learning moments.`;

    const aiResponse = await this.makeOpenAIRequest(prompt);
    
    // Parse the AI response into sections
    const sections = aiResponse.split('\n\n');
    
    return {
      activity: sections[0] || 'Activity description not generated',
      whatsNext: sections[1] || 'Next steps not generated',
      comment: sections[2] || 'Educator comment not generated'
    };
  }
}

// Export singleton instance
export const aiService = new AIService(); 