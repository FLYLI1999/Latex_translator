export default {
    common: {
      upload: '上传',
      download: '下载',
      save: '保存',
      settings: '设置',
      translate: '翻译',
      translating: '正在翻译...',
      sourceText: '源文本将显示在此处',
      translatedText: '翻译内容将显示在此处',
      english: '英文',
      chinese: '中文',
      darkMode: '深色模式',
      lightMode: '浅色模式',
      appTitle: 'LaTeX 翻译器',
      languageChange: {
        pending: '正在切换语言...',
        success: '语言切换成功',
        error: '语言切换失败',
        confirm: '切换语言可能会影响当前编辑的内容，是否继续？'
      },
    },
    settings: {
      provider: {
        title: '提供者设置',
        name: '提供者名称',
        apiKey: 'API 密钥',
        apiUrl: 'API URL',
        urlPlaceholder: '例如: https://api.example.com/v1',
        model: '模型',
        modelPlaceholder: '例如: gpt-3.5-turbo',
      },
      prompt: {
        title: '提示设置',
        systemPrompt: '系统提示',
        variables: '可用变量',
        placeholder: 'You are a LaTeX document translator...',
      },
      other: {
        title: '其他设置',
        maxRequests: '最大并发请求数',
        maxRequestsDesc: '同时进行的翻译请求数量（1-10）',
        renderLatex: '启用 LaTeX 渲染',
        renderLatexDesc: '在预览窗口中渲染 LaTeX 公式',
        autoTranslate: '自动翻译',
        autoTranslateDesc: '文本更改后自动开始翻译',
        chunkSize: '块大小（字符）',
        chunkDelay: '块间延迟（毫秒）',
        defaultSourceLang: '默认源语言',
        defaultTargetLang: '默认目标语言',
        temperature: '温度',
        temperatureDesc: '生成文本的随机性（0-2）',
        defaultApiUrl: '默认 API URL',
        downloadFilePrefix: '下载文件前缀',
      },
    },
    errors: {
      uploadFailed: '文件上传失败',
      downloadFailed: '无可下载内容',
      saveFailed: '无可保存内容',
      translateFailed: '翻译失败',
      apiConfigRequired: '请先配置 API 设置',
      emptyContent: '请输入需要翻译的内容',
      renderError: 'LaTeX 渲染错误',
      noContentToCopy: '没有可复制的内容',
      copyFailed: '复制失败',
      i18nInitFailed: '初始化翻译失败',
      i18nChangeFailed: '语言切换失败'
    },
    success: {
      uploadSuccess: '文件上传成功',
      translateSuccess: '翻译完成',
      copySuccess: '复制成功',
    },
  };