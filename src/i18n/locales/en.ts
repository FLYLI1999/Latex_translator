export default {
  common: {
    upload: 'Upload',
    download: 'Download', 
    save: 'Save',
    copy: 'Copy',
    settings: 'Settings',
    translate: 'Translate',
    translating: 'Translating...',
    sourceText: 'Source text will appear here',
    translatedText: 'Translated content will appear here',
    english: 'English',
    chinese: 'Chinese',
    japanese: 'Japanese',
    korean: 'Korean',
    french: 'French',
    german: 'German',
    spanish: 'Spanish',
    russian: 'Russian',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    appTitle: 'LaTeX Translator',
    cancel: 'Cancel',
    reset: 'Reset',
    apply: 'Apply',
    add: 'Add',
    remove: 'Remove',
    swapLanguages: 'Swap Languages',
    close: 'Close',
    languageChange: {
      pending: 'Switching language...',
      success: 'Language switched successfully',
      error: 'Failed to switch language',
      confirm: 'Changing language may affect current content, continue?'
    },
    select: 'Select',
    edit: 'Edit',
    delete: 'Delete'
  },
  auth: {
    title: 'Login',
    retrying: 'Retrying login...'
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
      modelId: 'Model ID',
      modelName: 'Model Name',
      models: 'Available Models'
    },
    prompt: {
      title: 'Prompt Settings',
      systemPrompt: 'System Prompt',
      variables: 'Available Variables',
      placeholder: 'Enter prompt...',
      templates: 'Template List',
      searchTemplates: 'Search templates...',
      newTemplate: 'New Template',
      editTemplate: 'Edit Template',
      templateName: 'Template Name',
      templateDescription: 'Description',
      templateContent: 'Content',
      editor: 'Prompt Editor',
      tags: 'Tags',
      addTag: 'Add Tag',
      tagPlaceholder: 'Enter tag name, press Enter or comma to add',
      dragToReorder: 'Drag to reorder',
      confirmDelete: 'Are you sure you want to delete this template?',
      builtInTemplate: 'Built-in Template',
      customTemplate: 'Custom Template',
      tagInputTip: 'Use comma or Enter key to separate multiple tags',
      noTags: 'No tags'
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
      downloadFilePrefix: 'Download File Prefix'
    }
  },
  errors: {
    uploadFailed: 'File upload failed',
    downloadFailed: 'No content to download',
    saveFailed: 'No content to save',
    translateFailed: 'Translation failed',
    apiConfigRequired: 'Please configure API settings first',
    emptyContent: 'Please enter content to translate',
    renderError: 'Render error',
    noContentToCopy: 'No content to copy',
    copyFailed: 'Failed to copy to clipboard',
    i18nInitFailed: 'Language initialization failed',
    i18nChangeFailed: 'Language initialization failed',
    templateNameRequired: 'Template name is required',
    templateContentRequired: 'Template content is required',
    duplicateTag: 'Tag already exists',
    invalidTag: 'Invalid tag',
    cannotReorderBuiltIn: 'Cannot reorder built-in templates',
    updateSettingsFailed: 'Failed to update settings',
    saveTemplateFailed: 'Failed to save template',
    updateOrderFailed: 'Failed to update order',
    deleteTemplateFailed: 'Failed to delete template'
  },
  success: {
    uploadSuccess: 'File uploaded successfully',
    translateSuccess: 'Translation successful',
    copySuccess: 'Copied to clipboard',
    templateSaved: 'Template saved successfully',
    templateDeleted: 'Template deleted successfully'
  }
};