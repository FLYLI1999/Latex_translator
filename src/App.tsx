import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
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

function App() {
  const { darkMode } = useStore();

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
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
                        <Toolbar />
                        <LanguageSwitch />
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