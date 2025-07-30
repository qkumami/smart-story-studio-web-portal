// AI Configuration for Smart Story Studio Web Portal

export const AI_CONFIG = {
  // OpenAI API Configuration
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  
  // Model Configuration
  MODEL: 'gpt-4',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  
  // Content Limits
  MAX_INPUT_LENGTH: 2000,
  MAX_WORDS_PER_SECTION: 200,
  
  // Australian English Settings
  USE_AUSTRALIAN_ENGLISH: true,
  
  // Security Settings
  ENABLE_INPUT_SANITIZATION: true,
  ENABLE_VALIDATION: true
};

// Validation function for API key
export const validateApiKey = (): boolean => {
  return AI_CONFIG.OPENAI_API_KEY.length > 0;
};

// Get API key with validation
export const getApiKey = (): string => {
  if (!validateApiKey()) {
    throw new Error('OpenAI API key not configured. Please set NEXT_PUBLIC_OPENAI_API_KEY environment variable.');
  }
  return AI_CONFIG.OPENAI_API_KEY;
}; 