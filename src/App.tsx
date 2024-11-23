import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { Github, Settings, BookOpen, Save, Download, Upload, Clipboard } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import useStore from './store';
import AuthPage from './components/auth/AuthPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import SettingsDialog from './components/settings/SettingsDialog';
import LanguageSwitch from './components/LanguageSwitch';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './store/auth';

function App() {
  const { darkMode, openSettings, uploadFile, downloadFile, saveFile, copyToClipboard } = useStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    document.title = i18n.t('common.appTitle');
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
          <ToastContainer
            position="top-right"
            theme={darkMode ? 'dark' : 'light'}
            autoClose={3000}
          />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
                    <header className="border-b border-gray-200 dark:border-gray-800">
                      <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                              {i18n.t('common.appTitle')}
                            </h1>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={uploadFile}
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              title={i18n.t('common.upload')}
                            >
                              <Upload className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={downloadFile}
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              title={i18n.t('common.download')}
                            >
                              <Download className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={copyToClipboard}
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              title={i18n.t('common.copy')}
                            >
                              <Clipboard className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={saveFile}
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              title={i18n.t('common.save')}
                            >
                              <Save className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={openSettings}
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              title={i18n.t('common.settings')}
                            >
                              <Settings className="h-5 w-5" />
                            </button>
                            <a
                              href="https://github.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                              <Github className="h-5 w-5" />
                            </a>
                            <LanguageSwitch />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Toolbar />
                        </div>
                      </div>
                    </header>
                    <main className="container mx-auto px-4 py-6">
                      <div className="mt-6 grid grid-cols-2 gap-6">
                        <Editor />
                        <Preview />
                      </div>
                    </main>
                    <SettingsDialog />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;