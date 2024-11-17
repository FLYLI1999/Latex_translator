import React, { useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import useStore from '../store';

interface LatexRendererProps {
  content: string;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ content }) => {
  const { setRenderError } = useStore();

  useEffect(() => {
    const renderMath = () => {
      const mathElements = document.getElementsByClassName('math');
      Array.from(mathElements).forEach((element) => {
        try {
          katex.render(element.textContent || '', element as HTMLElement, {
            throwOnError: true,
            displayMode: element.classList.contains('display'),
          });
        } catch (error) {
          if (error instanceof Error) {
            setRenderError(error.message);
          } else {
            setRenderError('Unknown error during LaTeX rendering');
          }
        }
      });
    };

    try {
      setRenderError('');
      renderMath();
    } catch (error) {
      if (error instanceof Error) {
        setRenderError(error.message);
      } else {
        setRenderError('Unknown error during LaTeX rendering');
      }
    }
  }, [content, setRenderError]);

  const processContent = (text: string) => {
    // Replace display math mode
    text = text.replace(/\$\$(.*?)\$\$/g, '<div class="math display">$1</div>');
    // Replace inline math mode
    text = text.replace(/\$(.*?)\$/g, '<span class="math inline">$1</span>');
    return text;
  };

  return (
    <div
      className="latex-content"
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  );
};

export default LatexRenderer;