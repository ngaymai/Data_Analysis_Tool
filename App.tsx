import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { ProductAnalysis } from './components/ProductAnalysis';
import { CustomerAnalysis } from './components/CustomerAnalysis';
import { FinancialAnalysis } from './components/FinancialAnalysis';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'products':
        return <ProductAnalysis />;
      case 'customers':
        return <CustomerAnalysis />;
      case 'financials':
        return <FinancialAnalysis />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-20">
          <span className="font-bold text-xl text-white">Olist Analytics</span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 absolute w-full top-16 z-10 shadow-xl">
            <nav className="flex flex-col gap-2">
              {['Overview', 'Products', 'Customers', 'Financials'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg ${
                    activeTab === item.toLowerCase() ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white capitalize">{activeTab}</h1>
                <p className="text-slate-400 mt-1">
                  {activeTab === 'overview' && 'Key performance indicators and business health.'}
                  {activeTab === 'products' && 'Deep dive into catalog performance and sales.'}
                  {activeTab === 'customers' && 'Demographics, reviews, and VIP buyer segments.'}
                  {activeTab === 'financials' && 'Revenue streams, payment methods, and logistics.'}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
                  Live Data
                </span>
              </div>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
