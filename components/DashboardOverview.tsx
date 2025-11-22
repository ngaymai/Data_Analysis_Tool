import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { 
  DollarSign, ShoppingBag, Users, Package, TrendingUp, Clock, Database
} from 'lucide-react';
import { Card, StatCard } from './ui/Card';
import { ANALYTICS_DATA, PERFORMANCE_DATA } from '../constants';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#3b82f6', '#f59e0b'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
};

const formatName = (name: string) => {
  if (!name) return '';
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const DashboardOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'all' | '6m' | '12m'>('all');
  
  const overview = ANALYTICS_DATA.analyses.business_overview[0];
  const rawRevenueData = ANALYTICS_DATA.analyses.revenue_monthly.slice().reverse();
  
  // Filter logic for revenue
  const revenueData = React.useMemo(() => {
    if (timeRange === '6m') return rawRevenueData.slice(-6);
    if (timeRange === '12m') return rawRevenueData.slice(-12);
    return rawRevenueData;
  }, [timeRange, rawRevenueData]);

  const orderStatus = ANALYTICS_DATA.analyses.order_status.filter(s => s.percentage > 0.1); 

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Revenue" 
          value={formatCurrency(overview.total_revenue)}
          subValue="Lifetime volume"
          icon={<DollarSign size={24} />}
          trend="up"
        />
        <StatCard 
          label="Total Orders" 
          value={overview.total_orders.toLocaleString()}
          subValue={`${overview.active_days} active days`}
          icon={<ShoppingBag size={24} />}
        />
        <StatCard 
          label="Total Customers" 
          value={overview.total_customers.toLocaleString()}
          subValue="Registered buyers"
          icon={<Users size={24} />}
        />
        <StatCard 
          label="Avg Order Value" 
          value={formatCurrency(overview.avg_order_value)}
          subValue="Per transaction"
          icon={<TrendingUp size={24} />}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
             <h3 className="text-lg font-semibold text-slate-100">Revenue Trend</h3>
             <div className="flex gap-2">
               <select 
                 className="bg-slate-800 text-xs text-slate-300 border border-slate-700 rounded px-2 py-1 outline-none focus:border-indigo-500"
                 value={timeRange}
                 onChange={(e) => setTimeRange(e.target.value as any)}
               >
                 <option value="all">All Time</option>
                 <option value="12m">Last 12 Months</option>
                 <option value="6m">Last 6 Months</option>
               </select>
             </div>
          </div>
          <div className="h-80 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8'}} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8'}} 
                  tickFormatter={(val) => `$${val / 1000000}M`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  formatter={(value: number, name: string) => {
                      // Map technical dataKeys to readable names for the tooltip
                      const readableName = name === 'total_revenue' ? 'Total Revenue' : 
                                         name === 'product_revenue' ? 'Product Revenue' : name;
                      return [formatCurrency(value), readableName];
                  }}
                />
                <Legend verticalAlign="top" height={36}/>
                <Line 
                  type="monotone" 
                  dataKey="total_revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ fill: '#6366f1', strokeWidth: 2 }} 
                  activeDot={{ r: 8 }}
                  name="Total Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="product_revenue" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  name="Product Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Order Status Distribution">
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatus as any}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="order_status" 
                >
                  {orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                   formatter={(value: number, name: string, props: any) => [
                     `${value.toLocaleString()} (${props.payload.percentage}%)`, 
                     formatName(name)
                   ]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="capitalize text-xs text-slate-400 ml-1">{formatName(value)}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Categories & System Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Top Categories by Revenue" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.analyses.revenue_by_category.slice(0, 5)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="category" 
                  type="category" 
                  width={120} 
                  stroke="#94a3b8"
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  tickFormatter={formatName}
                />
                <Tooltip 
                  cursor={{fill: '#334155', opacity: 0.2}}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={formatName}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Analysis Performance">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={16}/> <span className="text-sm">Total Time</span>
                 </div>
                 <span className="font-mono text-emerald-400">{PERFORMANCE_DATA.metadata.total_analysis_time}</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2 text-slate-400">
                    <Database size={16}/> <span className="text-sm">Database</span>
                 </div>
                 <span className="font-mono text-xs text-slate-500 truncate max-w-[120px]" title={PERFORMANCE_DATA.metadata.database_path}>
                    duckdb
                 </span>
              </div>
              
              <div className="border-t border-slate-800 pt-3">
                 <p className="text-xs text-slate-500 mb-2">Processing Breakdown</p>
                 <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {Object.entries(PERFORMANCE_DATA.timing_statistics).map(([key, stat], idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                         <span className="text-slate-300 truncate w-2/3" title={key}>{key.split('. ')[1] || key}</span>
                         <span className="text-slate-500">{stat.time_seconds.toFixed(1)}s ({stat.percentage})</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};