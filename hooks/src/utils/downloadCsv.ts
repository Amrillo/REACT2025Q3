import type { SelectedItemProps } from '../types/types';

export function downloadCsv(array: SelectedItemProps[]) {
  if (array.length === 0) return;
  const csvRows = [];
  csvRows.push(['ID', 'Name', 'URL', 'Checked']);

  array.forEach((item) => {
    csvRows.push([item.id, item.name, item.url, item.checked]);
  });
  const csvContent = csvRows
    .map((row) =>
      row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${array.length}_items.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
