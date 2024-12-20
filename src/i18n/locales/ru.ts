export default {
  common: {
    upload: 'Загрузить',
    download: 'Скачать',
    save: 'Сохранить',
    settings: 'Настройки', 
    translate: 'Перевести',
    translating: 'Перевод...',
    sourceText: 'Исходный текст появится здесь',
    translatedText: 'Переведенный текст появится здесь',
    english: 'Английский',
    chinese: 'Китайский',
    japanese: 'Японский',
    korean: 'Корейский',
    french: 'Французский',
    german: 'Немецкий',
    spanish: 'Испанский',
    russian: 'Русский',
    darkMode: 'Темная тема',
    lightMode: 'Светлая тема',
    appTitle: 'LaTeX переводчик',
    cancel: 'Отмена',
    add: 'Добавить',
    remove: 'Удалить',
    languageChange: {
      pending: 'Переключение языка...',
      success: 'Язык успешно изменен',
      error: 'Не удалось переключить язык',
      confirm: 'Изменение языка может повлиять на текущий контент, продолжить?'
    },
    select: 'Выбрать',
    edit: 'Редактировать',
    delete: 'Удалить'
  },
  settings: {
    provider: {
      title: 'Настройки провайдера',
      name: 'Имя провайдера',
      apiKey: 'API ключ',
      apiUrl: 'API URL',
      urlPlaceholder: 'например, https://api.example.com/v1',
      model: 'Модель',
      modelPlaceholder: 'например, gpt-3.5-turbo',
    },
    prompt: {
      title: 'Настройки подсказок',
      systemPrompt: 'Системная подсказка',
      variables: 'Доступные переменные',
      placeholder: 'Введите подсказку...',
      templates: 'Список шаблонов',
      searchTemplates: 'Поиск шаблонов...',
      newTemplate: 'Новый шаблон',
      editTemplate: 'Редактировать шаблон',
      templateName: 'Название шаблона',
      templateDescription: 'Описание',
      templateContent: 'Содержание',
      editor: 'Редактор подсказок',
      tags: 'Теги',
      addTag: 'Добавить тег',
      tagPlaceholder: 'Введите имя тега, нажмите Enter или запятую для добавления',
      dragToReorder: 'Перетащите для изменения порядка',
      confirmDelete: 'Вы уверены, что хотите удалить этот шаблон?',
      builtInTemplate: 'Встроенный шаблон',
      customTemplate: 'Пользовательский шаблон',
      tagInputTip: 'Используйте запятую или клавишу Enter для разделения тегов',
      noTags: 'Нет тегов',
    },
    other: {
      title: 'Другие настройки',
      maxRequests: 'Максимум одновременных запросов',
      maxRequestsDesc: 'Количество одновременных запросов на перевод (1-10)',
      renderLatex: 'Включить рендеринг LaTeX',
      renderLatexDesc: 'Отображать формулы LaTeX в окне предпросмотра',
      autoTranslate: 'Автоматический перевод',
      autoTranslateDesc: 'Начинать перевод автоматически после изменения текста',
      chunkSize: 'Размер фрагмента (символы)',
      chunkDelay: 'Задержка между фрагментами (мс)',
      defaultSourceLang: 'Язык источника по умолчанию',
      defaultTargetLang: 'Целевой язык по умолчанию',
      temperature: 'Температура',
      temperatureDesc: 'Случайность генерируемого текста (0-2)',
      defaultApiUrl: 'URL API по умолчанию',
      downloadFilePrefix: 'Префикс загружаемого файла',
    },
  },
  errors: {
    uploadFailed: 'Не удалось загрузить файл',
    downloadFailed: 'Нет содержимого для скачивания',
    saveFailed: 'Нет содержимого для сохранения',
    translateFailed: 'Ошибка перевода',
    apiConfigRequired: 'Сначала настройте параметры API',
    emptyContent: 'Введите содержимое для перевода',
    renderError: 'Ошибка рендеринга',
    i18nChangeFailed: 'Не удалось инициализировать язык',
    i18nInitFailed: 'Не удалось инициализировать язык',
    templateNameRequired: 'Требуется название шаблона',
    templateContentRequired: 'Требуется содержимое шаблона',
    duplicateTag: 'Тег уже существует',
    invalidTag: 'Недопустимый тег',
    noContentToCopy: 'Нет содержимого для копирования',
    copyFailed: 'Не удалось скопировать в буфер обмена'
  },
  success: {
    uploadSuccess: 'Файл успешно загружен',
    translateSuccess: 'Перевод выполнен успешно',
    copySuccess: 'Скопировано в буфер обмена',
    templateSaved: 'Шаблон успешно сохранен',
    templateDeleted: 'Шаблон успешно удален'
  },
};
