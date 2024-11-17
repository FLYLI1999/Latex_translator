export interface TranslationKeys {
  common: {
    upload: string;
    download: string;
    save: string;
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
  };
  settings: {
    provider: Record<string, string>;
    prompt: Record<string, string>;
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
  };
  success: {
    translateSuccess: string;
    uploadSuccess: string;
    copySuccess: string;
  };
}

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: TranslationKeys;
    };
  }
}
