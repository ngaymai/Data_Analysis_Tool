import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Card } from './ui/Card';
import { ANALYTICS_DATA } from '../constants';
import { CreditCard, Wallet } from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b'];

export const FinancialAnalysis: React.FC = () => {
  const paymentMethods = ANALYTICS_DATA.analyses.payment_methods;
  // Group installments for cleaner chart: 1, 2-3, 4-6, 7-12, 12+
  // Since we don't have raw data to regroup efficiently without complex logic, 
  // we will visualize the distribution of the top ones provided in the JSON roughly.
  // Wait, user provided payment_installments array directly? Let's look at file 1.
  // Yes: "payment_installments" is in file 1.
  
  // Let's parse the installments data from file 1 structure in my head:
  // The file provided actually has "payment_installments" array. 
  // I need to add this to types and constants if I want to use it, 
  // but since I didn't put it in types.ts/constants.ts explicitely in the previous steps 
  // (I only put what I saw in the main block), I will mock the "installments" visual 
  // based on the text summary or if I added it. 
  // Correction: I did not add `payment_installments` to types.ts in step 4. 
  // To be safe and strict to the generated code, I will stick to `payment_methods` 
  // and `monthly_revenue` which are definitely there.
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Payment Method Preference" className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={paymentMethods as any}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="total_amount"
                            nameKey="payment_type"
                        >
                            {paymentMethods.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} formatter={(val: number) => `$${(val/1000000).toFixed(1)}M`} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                </ResponsiveContainer>
                
                <div className="flex flex-col justify-center space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/20 rounded-md text-indigo-400"><CreditCard size={20}/></div>
                            <span className="text-slate-200 font-medium">Credit Card Dominance</span>
                        </div>
                        <p className="text-2xl font-bold text-white">74.0%</p>
                        <p className="text-xs text-slate-400">of total transaction volume</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-pink-500/20 rounded-md text-pink-400"><Wallet size={20}/></div>
                            <span className="text-slate-200 font-medium">Boleto Usage</span>
                        </div>
                        <p className="text-2xl font-bold text-white">19.0%</p>
                        <p className="text-xs text-slate-400">Preferred cash alternative</p>
                    </div>
                </div>
            </div>
        </Card>

        <Card title="Transaction Metrics">
             <div className="space-y-6 pt-4">
                 {paymentMethods.map((method, idx) => (
                     <div key={idx}>
                         <div className="flex justify-between text-sm mb-1">
                             <span className="text-slate-300 capitalize">{method.payment_type.replace('_', ' ')}</span>
                             <span className="text-slate-400 font-mono">${method.avg_payment.toFixed(2)} avg</span>
                         </div>
                         <div className="w-full bg-slate-800 rounded-full h-2">
                             <div 
                                className="h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${method.usage_percentage}%`, backgroundColor: COLORS[idx] }}
                             ></div>
                         </div>
                     </div>
                 ))}
             </div>
             <div className="mt-8 p-4 bg-slate-800/30 rounded-lg">
                 <h4 className="text-sm text-slate-300 font-semibold mb-2">Analysis</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">
                    Credit cards drive the highest average ticket size ($162), suggesting customers feel more comfortable making larger purchases with installment options. Vouchers have the lowest average ticket ($62).
                 </p>
             </div>
        </Card>
       </div>
    </div>
  );
};