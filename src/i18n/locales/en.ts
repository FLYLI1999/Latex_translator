export default {
  common: {
    upload: 'Upload',
    download: 'Download',
    save: 'Save',
    settings: 'Settings',
    translate: 'Translate',
    translating: 'Translating...',
    sourceText: 'Source text will appear here',
    translatedText: 'Translated content will appear here',
    english: 'English',
    chinese: 'Chinese',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    appTitle: 'LaTeX Translator',
    languageChange: {
      pending: 'Switching language...',
      success: 'Language switched successfully',
      error: 'Failed to switch language',
      confirm: 'Changing language may affect current content, continue?'
    }
  },
  settings: {
    provider: {
      title: 'Provider Settings',
      name: 'Provider Name',
      apiKey: 'API Key',
      apiUrl: 'API URL',
      urlPlaceholder: 'e.g. https://api.example.com/v1',
      model: 'Model',
      modelPlaceholder: 'e.g. gpt-3.5-turbo',
    },
    prompt: {
      title: 'Prompt Settings',
      systemPrompt: 'System Prompt',
      variables: 'Available variables',
      placeholder: 'You are a LaTeX document translator...',
    },
    other: {
      title: 'Other Settings',
      maxRequests: 'Max Concurrent Requests',
      maxRequestsDesc: 'Number of simultaneous translation requests (1-10)',
      renderLatex: 'Enable LaTeX Rendering',
      renderLatexDesc: 'Render LaTeX formulas in preview window',
      autoTranslate: 'Auto Translate',
      autoTranslateDesc: 'Start translation automatically after text changes',
      chunkSize: 'Chunk Size (characters)',
      chunkDelay: 'Delay Between Chunks (ms)',
      defaultSourceLang: 'Default Source Language',
      defaultTargetLang: 'Default Target Language',
      temperature: 'Temperature',
      temperatureDesc: 'Randomness of generated text (0-2)',
      defaultApiUrl: 'Default API URL',
      downloadFilePrefix: 'Download File Prefix',
    },
  },
  errors: {
    uploadFailed: 'File upload failed',
    downloadFailed: 'No content to download',
    saveFailed: 'No content to save',
    translateFailed: 'Translation failed',
    apiConfigRequired: 'Please configure API settings first',
    emptyContent: 'Please enter content to translate',
    renderError: 'Render error',
    i18nChangeFailed: 'Language change failed',
    i18nInitFailed: 'Language initialization failed',
  },
  success: {
    uploadSuccess: 'File uploaded successfully',
    translateSuccess: 'Translation successful',
    copySuccess: 'Copied to clipboard',
  },
};