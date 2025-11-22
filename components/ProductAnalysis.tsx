import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Card } from './ui/Card';
import { ANALYTICS_DATA } from '../constants';
import { Star, Package, ArrowUp, ArrowDown } from 'lucide-react';

type SortKey = 'total_revenue' | 'quantity_sold' | 'avg_review_score';

const formatName = (name: string) => {
  if (!name) return '';
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const ProductAnalysis: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>('total_revenue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const topProducts = ANALYTICS_DATA.analyses.product_top_selling;
  const categoryStats = ANALYTICS_DATA.analyses.revenue_by_category;

  const uniqueCategories = useMemo(() => {
      const cats = new Set(topProducts.map(p => p.product_category_name_english));
      return Array.from(cats).filter(Boolean);
  }, [topProducts]);

  const filteredAndSortedProducts = useMemo(() => {
      let data = [...topProducts];
      
      if (categoryFilter !== 'all') {
          data = data.filter(p => p.product_category_name_english === categoryFilter);
      }

      return data.sort((a, b) => {
          const valA = a[sortKey];
          const valB = b[sortKey];
          return sortDir === 'asc' ? valA - valB : valB - valA;
      });
  }, [topProducts, sortKey, sortDir, categoryFilter]);

  const handleSort = (key: SortKey) => {
      if (sortKey === key) {
          setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      } else {
          setSortKey(key);
          setSortDir('desc');
      }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
      if (sortKey !== column) return <span className="w-4 inline-block"></span>;
      return sortDir === 'asc' ? <ArrowUp size={12} className="inline" /> : <ArrowDown size={12} className="inline" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Category Performance (Revenue vs Volume)">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} margin={{top: 20, right: 30, left: 20, bottom: 60}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="category" 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8', fontSize: 10}} 
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  tickFormatter={formatName}
                />
                <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} 
                  labelFormatter={formatName}
                />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 px-6 py-4 gap-3">
             <h3 className="text-lg font-semibold text-slate-100">Top Selling Products</h3>
             <div className="flex gap-2">
                 <select
                    className="bg-slate-800 text-xs text-slate-300 border border-slate-700 rounded px-2 py-1 outline-none focus:border-indigo-500 max-w-[150px] truncate"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                 >
                     <option value="all">All Categories</option>
                     {uniqueCategories.map(c => <option key={c} value={c}>{formatName(c)}</option>)}
                 </select>
             </div>
          </div>
          <div className="overflow-auto h-96">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-200 uppercase bg-slate-800/50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Product ID</th>
                  <th className="px-4 py-3">Category</th>
                  <th 
                    className="px-4 py-3 text-right cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('quantity_sold')}
                  >
                    Sold <SortIcon column="quantity_sold" />
                  </th>
                  <th 
                    className="px-4 py-3 text-right cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('total_revenue')}
                  >
                    Revenue <SortIcon column="total_revenue" />
                  </th>
                  <th 
                    className="px-4 py-3 text-center cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('avg_review_score')}
                  >
                    Review <SortIcon column="avg_review_score" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.map((product, idx) => (
                  <tr key={product.product_id + idx} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 truncate max-w-[100px]">
                      {product.product_id.substring(0, 8)}...
                    </td>
                    <td className="px-4 py-3 text-slate-300">{formatName(product.product_category_name_english)}</td>
                    <td className="px-4 py-3 text-right">{product.quantity_sold}</td>
                    <td className="px-4 py-3 text-right text-emerald-400">
                      ${product.total_revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center items-center gap-1">
                      <span className="text-amber-400 font-bold">{product.avg_review_score.toFixed(1)}</span>
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                    </td>
                  </tr>
                ))}
                {filteredAndSortedProducts.length === 0 && (
                    <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No products found matching filter.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card title="Product Portfolio Breakdown">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-slate-400 text-sm mb-1">Total Unique Products</div>
                    <div className="text-2xl font-bold text-white">2.5M+</div>
                    <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                        <Package size={12}/> Active catalog
                    </div>
                </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-slate-400 text-sm mb-1">Avg Product Price</div>
                    <div className="text-2xl font-bold text-white">$116.26</div>
                    <div className="text-xs text-slate-500 mt-2">Computers & Accessories</div>
                </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-slate-400 text-sm mb-1">Highest Revenue Cat</div>
                    <div className="text-2xl font-bold text-white">Health Beauty</div>
                    <div className="text-xs text-emerald-400 mt-2">$98.6M Revenue</div>
                </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-slate-400 text-sm mb-1">Highest Avg Ticket</div>
                    <div className="text-2xl font-bold text-white">$199.04</div>
                    <div className="text-xs text-slate-500 mt-2">Watches Gifts</div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};