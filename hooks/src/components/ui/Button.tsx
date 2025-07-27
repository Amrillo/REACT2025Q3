type ButtonProps = {
  clearInput?: () => void;
  closeIcon: string;
  classname?: string;
  onCloseItem?: () => void;
};

export const Button = ({
  clearInput,
  closeIcon,
  classname,
  onCloseItem,
}: ButtonProps) => {
  const handleClick = () => {
    if (onCloseItem) {
      onCloseItem();
    } else if (clearInput) {
      clearInput();
    }
  };
  return (
    <button type="button" className={classname} onClick={handleClick}>
      <img src={closeIcon} alt="close icon" />
    </button>
  );
};
