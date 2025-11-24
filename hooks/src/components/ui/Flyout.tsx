import type { SelectedItemProps } from '../../types/types';
import { downloadCsv } from '../../utils/downloadCsv';

interface FlyoutProps {
  countSelected: number;
  unSelectAll: () => void;
  selectedItems: SelectedItemProps[];
}
export const Flyout = ({
  countSelected,
  unSelectAll,
  selectedItems,
}: FlyoutProps) => {
  const filtered = selectedItems.filter((i) => i.checked);

  const handleDownload = () => {
    downloadCsv(filtered);
  };
  return (
    <div className="flyout-panel">
      <p className="flyout-header">
        {countSelected > 1
          ? `${countSelected} items selected`
          : '1 item selected'}
      </p>
      <div className="flyout-actions">
        <button
          type="button"
          className="button unselect-btn"
          onClick={unSelectAll}
        >
          Unselect All
        </button>
        <button
          type="button"
          className="button download-btn"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};
