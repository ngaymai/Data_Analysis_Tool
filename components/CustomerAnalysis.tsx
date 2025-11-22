import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Card } from './ui/Card';
import { ANALYTICS_DATA } from '../constants';
import { MapPin, Truck, ArrowRightLeft } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#6366f1'];

export const CustomerAnalysis: React.FC = () => {
  const [cityMetric, setCityMetric] = useState<'revenue' | 'orders'>('revenue');
  
  const cityData = [...ANALYTICS_DATA.analyses.customer_by_city].sort((a, b) => {
      if (cityMetric === 'revenue') return b.total_revenue - a.total_revenue;
      return b.order_count - a.order_count;
  });
  
  const reviewData = ANALYTICS_DATA.analyses.review_scores;
  const deliveryData = ANALYTICS_DATA.analyses.delivery_by_state;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
           <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
             <h3 className="text-lg font-semibold text-slate-100">
                Top Cities by {cityMetric === 'revenue' ? 'Revenue' : 'Orders'}
             </h3>
             <button 
                onClick={() => setCityMetric(prev => prev === 'revenue' ? 'orders' : 'revenue')}
                className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-slate-700 transition-colors"
             >
                <ArrowRightLeft size={12} />
                Switch to {cityMetric === 'revenue' ? 'Orders' : 'Revenue'}
             </button>
           </div>
           <div className="h-80 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis 
                    type="number" 
                    stroke="#94a3b8" 
                    tickFormatter={(val) => cityMetric === 'revenue' ? `$${val/1000000}M` : `${val/1000}k`} 
                />
                <YAxis 
                    dataKey="customer_city" 
                    type="category" 
                    stroke="#94a3b8" 
                    width={100}
                    tick={{ style: { textTransform: 'capitalize' }, fill: '#94a3b8' }}
                />
                <Tooltip 
                    cursor={{fill: '#334155', opacity: 0.2}}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                    formatter={(val: number) => cityMetric === 'revenue' ? `$${val.toLocaleString()}` : val.toLocaleString()}
                />
                <Bar 
                    dataKey={cityMetric === 'revenue' ? 'total_revenue' : 'order_count'} 
                    fill="#3b82f6" 
                    radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Customer Satisfaction (Stars)">
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reviewData as any}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="review_count"
                  nameKey="review_score"
                >
                  {reviewData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#34d399' : index === 2 ? '#fbbf24' : '#f87171'} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} 
                    formatter={(val: number, name: string) => [val.toLocaleString(), `${name} Star`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
                <div className="text-3xl font-bold text-emerald-400">59%</div>
                <div className="text-sm text-slate-400">5-Star Reviews</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Delivery Times by State (Days)">
           <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="customer_state" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                    cursor={{fill: '#334155', opacity: 0.2}}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                />
                <Bar dataKey="avg_delivery_days" fill="#f59e0b" radius={[4, 4, 0, 0]}>
                    {deliveryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.avg_delivery_days > 14 ? '#ef4444' : '#f59e0b'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg flex items-start gap-3">
            <Truck className="text-amber-500 shrink-0 mt-1" size={18} />
            <div>
                <h4 className="text-sm font-semibold text-slate-200">Logistics Insight</h4>
                <p className="text-xs text-slate-400 mt-1">
                    SP (São Paulo) has the fastest delivery average (8.7 days), while remote states like ES average over 15 days. 
                    Consider optimizing logistics partners for RJ/ES regions.
                </p>
            </div>
          </div>
        </Card>
        
        <Card title="VIP Customers">
           <div className="space-y-4">
               {ANALYTICS_DATA.analyses.customer_vip.slice(0, 5).map((vip, idx) => (
                   <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                       <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
                               {vip.customer_state}
                           </div>
                           <div>
                               <div className="text-sm font-medium text-slate-200 w-32 truncate">{vip.customer_id}</div>
                               <div className="text-xs text-slate-500 flex items-center gap-1">
                                   <MapPin size={10} /> {vip.customer_city}
                               </div>
                           </div>
                       </div>
                       <div className="text-right">
                           <div className="text-sm font-bold text-emerald-400">${vip.total_spent.toLocaleString()}</div>
                           <div className="text-xs text-slate-500">1 Big Ticket Order</div>
                       </div>
                   </div>
               ))}
           </div>
        </Card>
      </div>
    </div>
  );
};