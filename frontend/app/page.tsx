"use client";
import Link from "next/link";
import { ArrowRight, BarChart2, PieChart, TrendingUp, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 text-white">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-700 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-full p-1.5 shadow-lg shadow-blue-500/20">
            <BarChart2 size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">EV Registrations Analysis</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/creator" className="text-gray-300 hover:text-white transition-colors font-medium">Creator</Link>
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-md px-4 py-2 transition-all duration-300 font-medium shadow-md hover:shadow-lg shadow-blue-700/20"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 leading-tight">
              EV Registrations Analysis
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Comprehensive insights into electric vehicle adoption trends with powerful visualization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-md px-6 py-3 font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-900/20 transform hover:translate-y-px"
              >
                <span>Explore Dashboard</span>
                <ArrowRight size={18} className="animate-pulse" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gradient-to-b from-gray-800/70 to-gray-900/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-white">
            Powerful Insights at Your Fingertips
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            This platform offers comprehensive tools to analyze and understand electric vehicle registration data across regions and time periods.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-900/10 transform hover:-translate-y-1">
              <div className="bg-blue-600/20 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                <BarChart2 className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">Advanced Filtering</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Filter data by year, region, or manufacturer to focus on insights most relevant to your analysis.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-900/10 transform hover:-translate-y-1">
              <div className="bg-blue-600/20 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                <PieChart className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">Market Leaders</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Identify top manufacturers and models with detailed breakdown charts and comparative analysis.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-900/10 transform hover:-translate-y-1">
              <div className="bg-blue-600/20 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                <MapPin className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">Geographic Distribution</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Visualize EV adoption across regions with interactive graphs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-900/10 transform hover:-translate-y-1">
              <div className="bg-blue-600/20 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                <TrendingUp className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">Growth Trends</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Track Electric Vehicles registration growth over time with dynamic line graphs and year-over-year comparisons.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="px-6 py-8 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400 mt-2">© 2025 • All rights reserved</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Created by</span>
            <Link
              href="https://github.com/SayanDas07"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Sayan Das</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}