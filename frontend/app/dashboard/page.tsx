"use client";
import { useEffect, useState, useCallback } from "react";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BarChartEV } from "@/components/BarChartEV";
import { PieChartEV } from "@/components/PieChartEV";
import { LineChartEV } from "@/components/LineChartEV";
import { CityChartEV } from "@/components/MapChartEV";
import { FilterBar } from "@/components/FilterBar";
import { DataTable } from "@/components/DataTable";
import { processEVData, EVDataItem } from "@/utils/dataTransformers";
import axios from "axios";
import { ArrowRight, BarChart2, Home, MoonIcon, SunIcon, User } from "lucide-react";
import Link from "next/link";

const CARD_COLORS = ["#4361ee", "#f72585", "#4cc9f0", "#3a0ca3"];

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {

    if (typeof window === 'undefined') return;

    const savedMode = localStorage.getItem("darkMode");
    let initialMode;

    if (savedMode !== null) {
      initialMode = savedMode === "true";
    } else {

      initialMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    setIsDark(initialMode);

    if (initialMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark(prevMode => {
      const newMode = !prevMode;

      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem("darkMode", String(newMode));
      }

      return newMode;
    });
  }, []);

  return [isDark, toggle];
}

export default function Dashboard() {
  const [data, setData] = useState<EVDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<EVDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const [isDark, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/data");
        if (res.status === 200) {
          const fetchedData = res.data;
          setData(fetchedData);
          setFilteredData(fetchedData);
          setLoading(false);
        } else {
          setError(`Error ${res.status}: ${res.statusText}`);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = useCallback((newFilteredData: EVDataItem[]) => {
    setFilteredData(newFilteredData);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="text-center p-8 max-w-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Error Loading Dashboard</h2>
          <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    totalEVs,
    topMakes,
    yearData,
    typeData,
    uniqueCities,
    latestYear,
    yearOverYearGrowth,
    cityData
  } = processEVData(filteredData);

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>

      <header className={`py-4 px-6 ${isDark ? 'bg-gray-800 shadow-md shadow-gray-900/20' : 'bg-white shadow-md shadow-gray-200/50'} sticky top-0 z-10 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
              <BarChart2 size={20} className="text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              EV Registrations Analysis Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
            >
              <Home size={16} />
              <span className="text-sm font-medium">Home</span>
            </Link>

            <Link
              href="/creator"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
            >
              <User size={16} />
              <span className="text-sm font-medium">Creator</span>
            </Link>

            <button
              onClick={toggleDarkMode as () => void}
              className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 mt-6">
        <FilterBar data={data} onFilterChange={handleFilterChange} darkMode={Boolean(isDark)} />
      </div>

      <div className="px-6 mb-6 flex justify-center">
        <div className={`inline-flex space-x-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "overview"
              ? `text-blue-600 border-b-2 border-blue-600`
              : `${isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "geographic"
              ? `text-blue-600 border-b-2 border-blue-600`
              : `${isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            onClick={() => setActiveTab("geographic")}
          >
            Geographic Data
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "records"
              ? `text-blue-600 border-b-2 border-blue-600`
              : `${isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            onClick={() => setActiveTab("records")}
          >
            Data Records
          </button>
        </div>
      </div>

      <div className="px-6 flex-grow">
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total EVs"
                value={totalEVs.toLocaleString()}
                icon="📊"
                color={CARD_COLORS[0]}
                darkMode={Boolean(isDark)}
              />
              <StatCard
                title="Top Manufacturer"
                value={topMakes[0]?.Make || "N/A"}
                subvalue={`${topMakes[0]?.count.toLocaleString()} vehicles`}
                icon="🏆"
                color={CARD_COLORS[1]}
                darkMode={Boolean(isDark)}
              />
              <StatCard
                title="Geographic Reach"
                value={uniqueCities.toLocaleString()}
                subvalue="unique cities"
                icon="🌎"
                color={CARD_COLORS[2]}
                darkMode={Boolean(isDark)}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Top 5 EV Manufacturers" darkMode={Boolean(isDark)}>
                <BarChartEV data={topMakes} darkMode={Boolean(isDark)} />
              </ChartCard>

              <ChartCard title="EV Type Distribution" darkMode={Boolean(isDark)}>
                <PieChartEV data={typeData} darkMode={Boolean(isDark)} />
              </ChartCard>
            </div>

            <ChartCard
              title="EV Registrations Over Time"
              subtitle={`${yearOverYearGrowth >= 0 ? '+' : ''}${yearOverYearGrowth}% growth in ${latestYear?.year}`}
              darkMode={Boolean(isDark)}
            >
              <LineChartEV data={yearData} darkMode={Boolean(isDark)} />
            </ChartCard>
          </>
        )}

        {activeTab === "geographic" && (
          <ChartCard title="EV Distribution by City" subtitle="Top 15 cities by vehicle count" darkMode={Boolean(isDark)}>
            <CityChartEV data={cityData} darkMode={Boolean(isDark)} />
          </ChartCard>
        )}

        {activeTab === "records" && (
          <ChartCard title="EV Records" subtitle={`Showing ${filteredData.length.toLocaleString()} records`} darkMode={Boolean(isDark)}>
            <DataTable data={filteredData} darkMode={Boolean(isDark)} />
          </ChartCard>
        )}
      </div>

      <footer className={`mt-auto ${isDark ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>© 2025 • All rights reserved</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className={`px-4 py-2 rounded-lg font-medium ${isDark ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              Filtered data: <span className="font-bold">{filteredData.length.toLocaleString()}</span> of <span className="font-bold">{data.length.toLocaleString()}</span> total records
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Created by</span>
              <Link
                href="https://github.com/SayanDas07"
                className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} flex items-center gap-1 transition-colors group`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-medium">Sayan Das</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}