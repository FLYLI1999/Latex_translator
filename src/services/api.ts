import axios from 'axios';
import { TranslationSettings } from '../types';
import { useTemplateStore } from '../store/templates';

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
  
  if (!settings.selected_template_id) {
    console.error('No template selected:', settings);
    throw new Error('未选择翻译模板');
  }

  const templates = useTemplateStore.getState().templates;
  if (templates.length === 0) {
    console.error('No templates available');
    throw new Error('模板列表为空');
  }

  const selectedTemplate = templates.find(t => t.id === settings.selected_template_id);
  if (!selectedTemplate) {
    console.error('Selected template not found:', settings.selected_template_id);
    throw new Error('所选模板不存在或已被删除');
  }

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
          content: selectedTemplate.content
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