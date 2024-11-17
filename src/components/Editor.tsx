import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import useStore from '../store';

const Editor: React.FC = () => {
  const { sourceText, setSourceText, darkMode } = useStore();

  return (
    <div className="h-[calc(100vh-16rem)]">
      <MonacoEditor
        height="100%"
        defaultLanguage="latex"
        theme={darkMode ? 'vs-dark' : 'light'}
        value={sourceText}
        onChange={(value) => setSourceText(value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default Editor;