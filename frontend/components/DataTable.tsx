import { useState } from 'react';
import { EVDataItem } from '@/utils/dataTransformers';

type DataTableProps = {
  data: EVDataItem[];
  darkMode?: boolean;
};

export function DataTable({ data, darkMode = false }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof EVDataItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const recordsPerPage = 10;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const handleSort = (column: keyof EVDataItem) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;

    const valA = a[sortBy];
    const valB = b[sortBy];

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const currentRecords = sortedData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = () => {
    if (totalPages <= 5) return pageNumbers;

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }
  };

  const columns: { key: keyof EVDataItem, label: string }[] = [
    { key: "Make", label: "Make" },
    { key: "Model", label: "Model" },
    { key: "Model Year", label: "Year" },
    { key: "Electric Vehicle Type", label: "Type" },
    { key: "City", label: "City" },
    { key: "State", label: "State" }
  ];

  const tableContainerClass = darkMode
    ? "bg-gray-900 rounded-lg shadow overflow-hidden"
    : "bg-white rounded-lg shadow overflow-hidden";

  const tableHeaderClass = darkMode
    ? "bg-gray-800"
    : "bg-gray-50";

  const tableHeaderCellClass = darkMode
    ? "px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700"
    : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100";

  const tableBodyClass = darkMode
    ? "bg-gray-900 divide-y divide-gray-700"
    : "bg-white divide-y divide-gray-200";

  const tableRowHoverClass = darkMode
    ? "hover:bg-gray-800"
    : "hover:bg-gray-50";

  const tableCellClass = darkMode
    ? "px-6 py-4 whitespace-nowrap text-sm text-gray-300"
    : "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

  const paginationContainerClass = darkMode
    ? "bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6"
    : "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6";

  const paginationTextClass = darkMode
    ? "text-sm text-gray-300"
    : "text-sm text-gray-700";

  const paginationButtonClass = (isActive: boolean, isDisabled: boolean) => {
    if (darkMode) {
      if (isDisabled) return "relative inline-flex items-center px-2 py-2 border border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed";
      if (isActive) return "bg-blue-900 border-blue-700 text-blue-300 z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
      return "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
    } else {
      if (isDisabled) return "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-gray-300 cursor-not-allowed";
      if (isActive) return "bg-blue-50 border-blue-500 text-blue-600 z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
      return "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
    }
  };

  return (
    <div className={tableContainerClass}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={tableHeaderClass}>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={tableHeaderCellClass}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortBy === column.key && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={tableBodyClass}>
            {currentRecords.length > 0 ? (
              currentRecords.map((item, index) => (
                <tr key={index} className={tableRowHoverClass}>
                  {columns.map(column => (
                    <td key={column.key} className={tableCellClass}>
                      {item[column.key]?.toString() || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={`${tableCellClass} text-center`}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={paginationContainerClass}>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className={paginationTextClass}>
                Showing <span className="font-medium">{firstIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(lastIndex, data.length)}</span> of{' '}
                <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`${paginationButtonClass(false, currentPage === 1)} rounded-l-md`}
                >
                  Previous
                </button>

                {getVisiblePages().map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={paginationButtonClass(currentPage === number, false)}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`${paginationButtonClass(false, currentPage === totalPages || totalPages === 0)} rounded-r-md`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}