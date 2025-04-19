export interface EVDataItem {
  VIN: string;
  County: string;
  City: string;
  State: string;
  "Postal Code": string;
  "Model Year": string;
  Make: string;
  Model: string;
  "Electric Vehicle Type": string;
  "Clean Alternative Fuel Vehicle": string;
  [key: string]: string;
}

export interface MakeCount {
  Make: string;
  count: number;
}

export interface YearData {
  year: string;
  count: number;
}

export interface TypeData {
  name: string;
  value: number;
}

export interface ProcessedData {
  totalEVs: number;
  topMakes: MakeCount[];
  yearData: YearData[];
  typeData: TypeData[];
  uniqueCities: number;
  latestYear: YearData | null;
  previousYear: YearData | null;
  yearOverYearGrowth: number;
  stateData: { state: string; count: number }[];
  cityData: { city: string; count: number }[];

}

export function processEVData(data: EVDataItem[]): ProcessedData {
  const totalEVs = data.length;

  const makeCountMap = new Map<string, number>();
  data.forEach(item => {
    const make = item.Make || 'Unknown';
    makeCountMap.set(make, (makeCountMap.get(make) || 0) + 1);
  });

  const topMakes = Array.from(makeCountMap.entries())
    .map(([Make, count]) => ({ Make, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const yearCountMap = new Map<string, number>();
  data.forEach(item => {
    const year = item["Model Year"] || 'Unknown';
    yearCountMap.set(year, (yearCountMap.get(year) || 0) + 1);
  });

  const yearData = Array.from(yearCountMap.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => Number(a.year) - Number(b.year))
    .filter(item => item.year !== 'Unknown' && !isNaN(Number(item.year)));


  const typeCountMap = new Map<string, number>();
  data.forEach(item => {
    const type = item["Electric Vehicle Type"] || 'Unknown';
    typeCountMap.set(type, (typeCountMap.get(type) || 0) + 1);
  });


  const typeData = Array.from(typeCountMap.entries())
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.name !== 'Unknown');


  const uniqueCities = new Set(data.map(item => `${item.City}, ${item.State}`)).size;

  const latestYear = yearData.length > 0 ? yearData[yearData.length - 1] : null;
  const previousYear = yearData.length > 1 ? yearData[yearData.length - 2] : null;

  let yearOverYearGrowth = 0;
  if (latestYear && previousYear && previousYear.count > 0) {
    yearOverYearGrowth = Math.round(((latestYear.count - previousYear.count) / previousYear.count) * 100);
  }

  const stateCountMap = new Map<string, number>();
  data.forEach(item => {
    const state = item.State || 'Unknown';
    stateCountMap.set(state, (stateCountMap.get(state) || 0) + 1);
  });

  const stateData = Array.from(stateCountMap.entries())
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count);

  const cityCountMap = new Map<string, number>();
  data.forEach(item => {
    const city = item.City || 'Unknown';
    cityCountMap.set(city, (cityCountMap.get(city) || 0) + 1);
  });

  const cityData = Array.from(cityCountMap.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
  return {
    totalEVs,
    topMakes,
    yearData,
    typeData,
    uniqueCities,
    latestYear,
    previousYear,
    yearOverYearGrowth,
    stateData,
    cityData,
  };
}