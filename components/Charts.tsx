import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { SequenceItem } from '../types';

interface ChartsProps {
  sequence: SequenceItem[];
}

const Charts: React.FC<ChartsProps> = ({ sequence }) => {
  // Calculate Stats
  const data = sequence.map((item, index) => {
    const tension = 10 - item.vector.r;
    let novelty = 0;
    if (index > 0) {
      const prev = sequence[index - 1];
      const dist = Math.sqrt(Math.pow(item.vector.x - prev.vector.x, 2) + Math.pow(item.vector.y - prev.vector.y, 2));
      novelty = dist + Math.abs(tension - (10 - prev.vector.r));
    }
    return {
      name: index + 1,
      tension: parseFloat(tension.toFixed(1)),
      novelty: parseFloat(novelty.toFixed(1))
    };
  });

  // Pie Data - Tension Distribution
  const tensionCounts = { low: 0, mid: 0, high: 0 };
  sequence.forEach(s => {
    const t = 10 - s.vector.r;
    if (t <= 2) tensionCounts.low++;
    else if (t <= 6) tensionCounts.mid++;
    else tensionCounts.high++;
  });
  const pieTensionData = [
    { name: '低张力 (0-2)', value: tensionCounts.low },
    { name: '中张力 (3-6)', value: tensionCounts.mid },
    { name: '高张力 (7-10)', value: tensionCounts.high },
  ].filter(d => d.value > 0);

  const PIE_COLORS = ['#81C784', '#FFD54F', '#E57373'];

  return (
    <div className="flex flex-col gap-6">
      {/* Line Chart */}
      <div className="h-48 w-full bg-white rounded-2xl p-4 shadow-sm">
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">新鲜感与张力曲线 (Novelty & Tension)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{fontSize: 10}} stroke="#ccc" />
            <YAxis tick={{fontSize: 10}} stroke="#ccc" />
            <Tooltip 
              contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
              itemStyle={{fontSize: '12px'}}
              labelFormatter={(label) => `和弦 ${label}`}
            />
            <Line type="monotone" dataKey="novelty" stroke="#FFB74D" strokeWidth={3} dot={{r:3}} name="新鲜感" />
            <Line type="monotone" dataKey="tension" stroke="#EF5350" strokeWidth={2} strokeDasharray="5 5" name="张力" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="h-48 w-full bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center">
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">张力分布 (Tension Distribution)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieTensionData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {pieTensionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{fontSize: '10px'}}/>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;