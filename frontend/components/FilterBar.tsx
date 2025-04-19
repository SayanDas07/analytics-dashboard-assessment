import { useState, useEffect } from 'react';
import { EVDataItem } from '@/utils/dataTransformers';
import { ChevronDown, X, Filter, RotateCcw, Trash2 } from 'lucide-react';

type FilterProps = {
  data: EVDataItem[];
  onFilterChange: (filteredData: EVDataItem[]) => void;
  darkMode?: boolean;
};

export function FilterBar({ data, onFilterChange, darkMode = false }: FilterProps) {
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  const makes = [...new Set(data.map(item => item.Make))].sort();
  const years = [...new Set(data.map(item => item["Model Year"]))].sort((a, b) => Number(b) - Number(a));
  const counties = [...new Set(data.map(item => item.County))].sort();
  const types = [...new Set(data.map(item => item["Electric Vehicle Type"]))].sort();

  useEffect(() => {
    let filteredData = [...data];
    let activeCount = 0;

    if (selectedMake) {
      filteredData = filteredData.filter(item => item.Make === selectedMake);
      activeCount++;
    }

    if (selectedYear) {
      filteredData = filteredData.filter(item => String(item["Model Year"]) === selectedYear);
      activeCount++;
    }

    if (selectedCounty) {
      filteredData = filteredData.filter(item => item.County === selectedCounty);
      activeCount++;
    }

    if (selectedType) {
      filteredData = filteredData.filter(item => item["Electric Vehicle Type"] === selectedType);
      activeCount++;
    }

    setActiveFiltersCount(activeCount);
    onFilterChange(filteredData);
  }, [selectedMake, selectedYear, selectedCounty, selectedType, data, onFilterChange]);

  const resetFilters = () => {
    setSelectedMake('');
    setSelectedYear('');
    setSelectedCounty('');
    setSelectedType('');
  };

  const clearFilter = (type: 'make' | 'year' | 'county' | 'type') => {
    switch (type) {
      case 'make':
        setSelectedMake('');
        break;
      case 'year':
        setSelectedYear('');
        break;
      case 'county':
        setSelectedCounty('');
        break;
      case 'type':
        setSelectedType('');
        break;
    }
  };

  return (
    <div
      className={`rounded-lg shadow mb-6 overflow-hidden transition-all
        ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
    >
      <div
        className={`flex justify-between items-center p-4 cursor-pointer border-b
          ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-200'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Filter className={`${darkMode ? 'text-gray-100' : 'text-indigo-600'} mr-2 h-5 w-5`} />
          <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Filters
            {activeFiltersCount > 0 && (
              <span className={`ml-2 ${darkMode ? 'bg-blue-400 text-black' : 'bg-indigo-600 text-white'} text-xs py-1 px-2 rounded-full`}>
                {activeFiltersCount}
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center">
          {activeFiltersCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetFilters();
              }}
              className={`text-sm px-3 py-1 mr-3 flex items-center transition-colors
                ${darkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-700'}`}
              aria-label="Reset all filters"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
          <ChevronDown
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''} 
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Manufacturer
              </label>
              <div className="relative">
                <select
                  className={`w-full p-2 pl-3 pr-8 rounded-md focus:ring-2 transition-all appearance-none
                    ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-indigo-200 focus:border-indigo-400'}`}
                  value={selectedMake}
                  onChange={e => setSelectedMake(e.target.value)}
                  aria-label="Select manufacturer"
                >
                  <option value="">All Manufacturers</option>
                  {makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                {selectedMake && (
                  <button
                    className={`absolute right-8 top-1/2 -translate-y-1/2 
                      ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('make');
                    }}
                    aria-label="Clear manufacturer filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Model Year
              </label>
              <div className="relative">
                <select
                  className={`w-full p-2 pl-3 pr-8 rounded-md focus:ring-2 transition-all appearance-none
                    ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-indigo-200 focus:border-indigo-400'}`}
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  aria-label="Select model year"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                {selectedYear && (
                  <button
                    className={`absolute right-8 top-1/2 -translate-y-1/2 
                      ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('year');
                    }}
                    aria-label="Clear year filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                County
              </label>
              <div className="relative">
                <select
                  className={`w-full p-2 pl-3 pr-8 rounded-md focus:ring-2 transition-all appearance-none
                    ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-indigo-200 focus:border-indigo-400'}`}
                  value={selectedCounty}
                  onChange={e => setSelectedCounty(e.target.value)}
                  aria-label="Select county"
                >
                  <option value="">All Counties</option>
                  {counties.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                {selectedCounty && (
                  <button
                    className={`absolute right-8 top-1/2 -translate-y-1/2 
                      ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('county');
                    }}
                    aria-label="Clear county filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Vehicle Type
              </label>
              <div className="relative">
                <select
                  className={`w-full p-2 pl-3 pr-8 rounded-md focus:ring-2 transition-all appearance-none
                    ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-indigo-200 focus:border-indigo-400'}`}
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  aria-label="Select vehicle type"
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                {selectedType && (
                  <button
                    className={`absolute right-8 top-1/2 -translate-y-1/2 
                      ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter('type');
                    }}
                    aria-label="Clear vehicle type filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className={`mt-4 pt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-100'}`}>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap gap-2 flex-grow">
                  {selectedMake && (
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}
                    >
                      Make: {selectedMake}
                      <button
                        onClick={() => clearFilter('make')}
                        className={`ml-1 ${darkMode ? 'text-indigo-400 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-900'}`}
                        aria-label="Remove make filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedYear && (
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}
                    >
                      Year: {selectedYear}
                      <button
                        onClick={() => clearFilter('year')}
                        className={`ml-1 ${darkMode ? 'text-indigo-400 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-900'}`}
                        aria-label="Remove year filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedCounty && (
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}
                    >
                      County: {selectedCounty}
                      <button
                        onClick={() => clearFilter('county')}
                        className={`ml-1 ${darkMode ? 'text-indigo-400 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-900'}`}
                        aria-label="Remove county filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedType && (
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}
                    >
                      Type: {selectedType}
                      <button
                        onClick={() => clearFilter('type')}
                        className={`ml-1 ${darkMode ? 'text-indigo-400 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-900'}`}
                        aria-label="Remove type filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  onClick={resetFilters}
                  className={`mt-2 sm:mt-0 flex items-center px-3 py-2 rounded-md transition-colors text-sm font-medium
                    ${darkMode
                      ? 'bg-red-900 text-red-300 hover:bg-red-800 hover:text-red-200'
                      : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                  aria-label="Remove all filters"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span>Remove Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}