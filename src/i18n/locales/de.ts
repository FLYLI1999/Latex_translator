export default {
  common: {
    upload: 'Hochladen',
    download: 'Herunterladen',
    save: 'Speichern', 
    settings: 'Einstellungen',
    translate: 'Übersetzen',
    translating: 'Übersetzung läuft...',
    sourceText: 'Ausgangstext erscheint hier',
    translatedText: 'Übersetzter Text erscheint hier',
    english: 'Englisch',
    chinese: 'Chinesisch',
    japanese: 'Japanisch', 
    korean: 'Koreanisch',
    french: 'Französisch',
    german: 'Deutsch',
    spanish: 'Spanisch',
    russian: 'Russisch',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    appTitle: 'LaTeX Übersetzer',
    cancel: 'Abbrechen',
    add: 'Hinzufügen',
    remove: 'Entfernen',
    languageChange: {
      pending: 'Sprache wird gewechselt...',
      success: 'Sprache erfolgreich gewechselt',
      error: 'Sprachwechsel fehlgeschlagen',
      confirm: 'Sprachwechsel kann den aktuellen Inhalt beeinflussen, fortfahren?'
    },
    select: 'Auswählen',
    edit: 'Bearbeiten',
    delete: 'Löschen'
  },
  settings: {
    provider: {
      title: 'Anbieter-Einstellungen',
      name: 'Anbieter-Name',
      apiKey: 'API-Schlüssel',
      apiUrl: 'API-URL',
      urlPlaceholder: 'z.B. https://api.example.com/v1',
      model: 'Modell',
      modelPlaceholder: 'z.B. gpt-3.5-turbo'
    },
    prompt: {
      title: 'Prompt-Einstellungen',
      systemPrompt: 'System-Prompt',
      variables: 'Verfügbare Variablen',
      placeholder: 'Prompt eingeben...',
      templates: 'Vorlagen-Liste',
      searchTemplates: 'Vorlagen durchsuchen...',
      newTemplate: 'Neue Vorlage',
      editTemplate: 'Vorlage bearbeiten',
      templateName: 'Vorlagenname',
      templateDescription: 'Beschreibung',
      templateContent: 'Inhalt',
      editor: 'Prompt-Editor',
      tags: 'Tags',
      addTag: 'Tag hinzufügen',
      tagPlaceholder: 'Tag-Namen eingeben, Enter oder Komma zum Hinzufügen',
      dragToReorder: 'Ziehen zum Neuordnen',
      confirmDelete: 'Möchten Sie diese Vorlage wirklich löschen?',
      builtInTemplate: 'Integrierte Vorlage',
      customTemplate: 'Benutzerdefinierte Vorlage',
      tagInputTip: 'Komma oder Enter-Taste verwenden, um mehrere Tags zu trennen',
      noTags: 'Keine Tags'
    },
    other: {
      title: 'Weitere Einstellungen',
      maxRequests: 'Maximale gleichzeitige Anfragen',
      maxRequestsDesc: 'Anzahl gleichzeitiger Übersetzungsanfragen (1-10)',
      renderLatex: 'LaTeX-Rendering aktivieren',
      renderLatexDesc: 'LaTeX-Formeln im Vorschaufenster rendern',
      autoTranslate: 'Automatische Übersetzung',
      autoTranslateDesc: 'Übersetzung automatisch nach Textänderungen starten',
      chunkSize: 'Chunk-Größe (Zeichen)',
      chunkDelay: 'Verzögerung zwischen Chunks (ms)',
      defaultSourceLang: 'Standard-Ausgangssprache',
      defaultTargetLang: 'Standard-Zielsprache',
      temperature: 'Temperatur',
      temperatureDesc: 'Zufälligkeit des generierten Texts (0-2)',
      defaultApiUrl: 'Standard-API-URL',
      downloadFilePrefix: 'Download-Datei-Präfix'
    }
  },
  errors: {
    uploadFailed: 'Datei-Upload fehlgeschlagen',
    downloadFailed: 'Keine Inhalte zum Herunterladen',
    saveFailed: 'Keine Inhalte zum Speichern',
    translateFailed: 'Übersetzung fehlgeschlagen',
    apiConfigRequired: 'Bitte zuerst API-Einstellungen konfigurieren',
    emptyContent: 'Bitte Inhalt zum Übersetzen eingeben',
    renderError: 'Rendering-Fehler',
    i18nChangeFailed: 'Sprachinitialisierung fehlgeschlagen',
    i18nInitFailed: 'Sprachinitialisierung fehlgeschlagen',
    templateNameRequired: 'Vorlagenname ist erforderlich',
    templateContentRequired: 'Vorlageninhalt ist erforderlich',
    duplicateTag: 'Tag existiert bereits',
    invalidTag: 'Ungültiger Tag',
    noContentToCopy: 'Keine Inhalte zum Kopieren',
    copyFailed: 'Kopieren in die Zwischenablage fehlgeschlagen'
  },
  success: {
    uploadSuccess: 'Datei erfolgreich hochgeladen',
    translateSuccess: 'Übersetzung erfolgreich',
    copySuccess: 'In Zwischenablage kopiert',
    templateSaved: 'Vorlage erfolgreich gespeichert',
    templateDeleted: 'Vorlage erfolgreich gelöscht'
  }
};
