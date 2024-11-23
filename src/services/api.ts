import axios from 'axios';
import { TranslationSettings } from '../types';

export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
  settings: TranslationSettings;
}

export const translateText = async ({ 
  text, 
  sourceLang, 
  targetLang, 
  settings 
}: TranslationRequest) => {
  const { provider } = settings;
  
  const selectedTemplate = settings.templates?.find(t => t.id === settings.selected_template_id);
  const systemPrompt = selectedTemplate?.content || '';
  
  try {
    const api = axios.create({
      baseURL: provider.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provider.apiKey}`,
      },
    });

    const response = await api.post('/chat/completions', {
      model: provider.model,
      messages: [
        {
          role: 'system',
          content: systemPrompt
            .replace('{sourceLang}', sourceLang)
            .replace('{targetLang}', targetLang)
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: settings.temperature || 0.3,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || '翻译失败');
    }
    throw error;
  }
};

export const validateLatex = (text: string): boolean => {
  try {
    // Basic validation of LaTeX syntax
    const balanced = (text.match(/\$/g) || []).length % 2 === 0;
    const validCommands = !text.includes('\\\\') && !text.includes('\\{') && !text.includes('\\}');
    return balanced && validCommands;
  } catch {
    return false;
  }
};