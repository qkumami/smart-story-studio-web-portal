import React, { forwardRef } from 'react';

export interface ThickCursorTextFieldProps {
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
}

export const ThickCursorTextField = forwardRef<HTMLInputElement, ThickCursorTextFieldProps>(
  ({ value, onChange, placeholder = '', contentType = 'content', font = 'var(--font-family)', className, disabled = false, required = false, autoFocus = false, name, id }, ref) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const getInputAttributes = () => {
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
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          name={name}
          id={id}
          {...getInputAttributes()}
          className={`textfield-base ${className || ''}`}
          style={{
            caretColor: 'black',
            fontFamily: font,
          }}
        />
      </div>
    );
  }
);

ThickCursorTextField.displayName = 'ThickCursorTextField';
