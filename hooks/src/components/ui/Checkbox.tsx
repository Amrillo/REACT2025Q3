import { type FC } from 'react';

interface CheckboxProps {
  id: string | undefined;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({id, checked, onChange}) => {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        className="checkbox checkbox-input"
        id={id}
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
      />
      <label htmlFor={id}></label>
      <span
        id={`${id}-label`}
        className={checked ? 'checkbox-text selected' : 'checkbox-text'}>
        {checked ? 'Selected' : 'Select'}</span>
    </div>
  );
};
