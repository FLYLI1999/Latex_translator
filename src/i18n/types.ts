export interface TranslationKeys {
  common: {
    upload: string;
    download: string;
    save: string;
    copy: string;
    settings: string;
    translate: string;
    translating: string;
    sourceText: string;
    translatedText: string;
    english: string;
    chinese: string;
    japanese: string;
    korean: string;
    french: string;
    german: string;
    spanish: string;
    russian: string;
    darkMode: string;
    lightMode: string;
    appTitle: string;
    cancel: string;
    reset: string;
    apply: string;
    add: string;
    remove: string;
    swapLanguages: string;
    close: string;
    languageChange: {
      pending: string;
      success: string;
      error: string;
      confirm: string;
    };
    select: string;
    edit: string;
    delete: string;
  };
  auth: {
    title: string;
    retrying: string;
  };
  settings: {
    provider: {
      title: string;
      name: string;
      apiKey: string;
      apiUrl: string;
      urlPlaceholder: string;
      model: string;
      modelPlaceholder: string;
      modelId: string;
      modelName: string;
      models: string;
    };
    prompt: {
      title: string;
      systemPrompt: string;
      variables: string;
      searchTemplates: string;
      newTemplate: string;
      editTemplate: string;
      templateName: string;
      templateDescription: string;
      templateContent: string;
      editor: string;
      tags: string;
      addTag: string;
      tagPlaceholder: string;
      dragToReorder: string;
      confirmDelete: string;
      builtInTemplate: string;
      customTemplate: string;
      templates: string;
      placeholder: string;
      tagInputTip: string;
      noTags: string;
    };
    other: {
      title: string;
      maxRequests: string;
      maxRequestsDesc: string;
      renderLatex: string;
      renderLatexDesc: string;
      autoTranslate: string;
      autoTranslateDesc: string;
      chunkSize: string;
      chunkDelay: string;
      defaultSourceLang: string;
      defaultTargetLang: string;
      temperature: string;
      temperatureDesc: string;
      defaultApiUrl: string;
      downloadFilePrefix: string;
    };
  };
  errors: {
    uploadFailed: string;
    downloadFailed: string;
    saveFailed: string;
    translateFailed: string;
    apiConfigRequired: string;
    emptyContent: string;
    renderError: string;
    noContentToCopy: string;
    copyFailed: string;
    i18nInitFailed: string;
    i18nChangeFailed: string;
    templateNameRequired: string;
    templateContentRequired: string;
    duplicateTag: string;
    invalidTag: string;
    cannotReorderBuiltIn: string;
    updateSettingsFailed: string;
    saveTemplateFailed: string;
    updateOrderFailed: string;
    deleteTemplateFailed: string;
  };
  success: {
    uploadSuccess: string;
    translateSuccess: string;
    copySuccess: string;
    templateSaved: string;
    templateDeleted: string;
  };
}

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: TranslationKeys;
    };
  }
}
