import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, trend }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex items-start justify-between hover:border-slate-700 transition-colors">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-slate-100">{value}</h4>
        {subValue && <p className="text-xs text-slate-500 mt-1">{subValue}</p>}
      </div>
      <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
        {icon}
      </div>
    </div>
  );
};
