import React, { forwardRef } from 'react';

export interface ThickCursorTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  contentType?: 'name' | 'content';
  font?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  minHeight?: string;
  maxHeight?: string;
}

export const ThickCursorTextEditor = forwardRef<HTMLTextAreaElement, ThickCursorTextEditorProps>(
  ({ value, onChange, placeholder = '', contentType = 'content', font = 'var(--font-family)', className, disabled = false, required = false, autoFocus = false, name, id, minHeight = 'var(--texteditor-min-height)', maxHeight = 'var(--texteditor-max-height)' }, ref) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    const getTextareaAttributes = () => {
      if (contentType === 'name') {
        return {
          autoComplete: 'name',
          autoCorrect: 'off',
          autoCapitalize: 'words',
          spellCheck: false,
        };
      }
      return {
        autoComplete: 'off',
        autoCorrect: 'on',
        autoCapitalize: 'sentences',
        spellCheck: true,
      };
    };

    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          name={name}
          id={id}
          {...getTextareaAttributes()}
          className={`texteditor-base ${className || ''}`}
          style={{
            caretWidth: '5px',
            fontFamily: font,
            minHeight,
            maxHeight,
          }}
        />
      </div>
    );
  }
);

ThickCursorTextEditor.displayName = 'ThickCursorTextEditor';
