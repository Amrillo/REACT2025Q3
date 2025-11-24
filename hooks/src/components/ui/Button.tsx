type ButtonProps = {
  clearInput?: () => void;
  closeIcon?: string;
  classname?: string;
  onCloseItem?: () => void;
  throwError?: () => void;
  refresh?: () => void;
  children?: React.ReactNode;
};

export const Button = ({
  clearInput,
  closeIcon,
  classname,
  onCloseItem,
  throwError,
  refresh,
  children,
}: ButtonProps) => {
  const handleClick = () => {
    const action = onCloseItem ?? clearInput ?? throwError ?? refresh;
    action?.();
  };
  return (
    <button type="button" className={classname} onClick={handleClick}>
      {closeIcon && <img src={closeIcon} alt="close icon" />}
      {children}
    </button>
  );
};
