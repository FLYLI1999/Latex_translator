export interface TranslationKeys {
  common: {
    upload: string;
    download: string;
    save: string;
    cancel: string;
    settings: string;
    translate: string;
    translating: string;
    sourceText: string;
    translatedText: string;
    english: string;
    chinese: string;
    darkMode: string;
    lightMode: string;
    appTitle: string;
    languageChange: {
      confirm: string;
      pending: string;
      success: string;
      error: string;
    };
    select: string;
    edit: string;
    delete: string;
  };
  settings: {
    provider: Record<string, string>;
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
      tagInputTip: string;
      noTags: string;
      dragToReorder: string;
      confirmDelete: string;
      builtInTemplate: string;
      customTemplate: string;
      templates: string;
      placeholder: string;
    };
    other: Record<string, string>;
  };
  errors: {
    emptyContent: string;
    apiConfigRequired: string;
    translateFailed: string;
    uploadFailed: string;
    downloadFailed: string;
    saveFailed: string;
    i18nChangeFailed: string;
    i18nInitFailed: string;
    renderError: string;
    noContentToCopy: string;
    copyFailed: string;
    templateNameRequired: string;
    templateContentRequired: string;
    duplicateTag: string;
    invalidTag: string;
  };
  success: {
    translateSuccess: string;
    uploadSuccess: string;
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
