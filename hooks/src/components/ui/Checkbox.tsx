import { useState } from 'react';

export const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        className="checkbox checkbox-input"
        id="select"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="select"></label>
      <span>{isChecked ? 'Selected' : 'Select'}</span>
    </div>
  );
};
