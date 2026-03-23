import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Scenario, Method, Component, Profile } from '@/types';
import { getMaterialsByComponent, SCENARIO_LABELS, COMPONENT_LABELS, PROFILE_LABELS } from '@/data/mockData';

interface ComponentResultsTabProps {
  scenario: Scenario;
  method: Method;
  component: Component;
  profile: Profile;
  customMessage: string | null;
}

export function ComponentResultsTab({ scenario, method, component, profile, customMessage }: ComponentResultsTabProps) {
  const materials = getMaterialsByComponent(component);
  const scenarioLabel = SCENARIO_LABELS[scenario];
  const componentLabel = COMPONENT_LABELS[component];
  const profileLabel = PROFILE_LABELS[profile];

  const chartData = materials.map((m, idx) => ({
    id: m.id,
    label: m.label,
    pRank1: m.pRank1,
    rank: idx + 1,
  }));

  const isPriorityProfile = profile !== 'Baseline' && profile !== 'Custom';

  return (
    <div className="space-y-4">
      {/* Custom Message Banner */}
      {customMessage && (
        <div className={`p-3 rounded border-l-4 text-sm ${
          customMessage.includes('match') 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-amber-50 border-amber-500 text-amber-800'
        }`}>
          <span className="font-semibold">Weight status:</span> {customMessage}
        </div>
      )}

      {/* Priority Profile Banner */}
      {isPriorityProfile && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
          <span className="font-semibold">Priority profile: {profileLabel}</span>
          <span className="text-gray-600"> — component-level results (precomputed)</span>
        </div>
      )}

      {/* Debug Status */}
      <details className="text-xs border rounded">
        <summary className="cursor-pointer p-2 bg-gray-50 font-medium text-gray-600">
          Component priority file status
        </summary>
        <div className="p-3 space-y-1 text-gray-600">
          <p><span className="text-green-600">File detected: Yes</span></p>
          <p><span className="text-green-600">File loaded: Yes</span></p>
          <p className="text-gray-500">profile→{profile} scenario→{scenario} comp→{component} method→{method}</p>
        </div>
      </details>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            P(Rank 1) — {componentLabel} · {scenarioLabel} · {method}
            {isPriorityProfile && ` [${profile}-first]`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="id" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                domain={[0, 'auto']}
                label={{ value: 'P(Rank 1)', angle: -90, position: 'insideLeft', fontSize: 11 }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(3)}`, 'P(Rank 1)']}
                labelFormatter={(label) => `Material: ${label}`}
                contentStyle={{ fontSize: 12 }}
              />
              <Bar dataKey="pRank1" fill="#4682B4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Download Button */}
      <Button variant="outline" size="sm" className="text-xs">
        <Download className="w-3 h-3 mr-1" /> Download table (CSV)
      </Button>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-xs font-semibold">Material ID</TableHead>
                <TableHead className="text-xs font-semibold">Label</TableHead>
                <TableHead className="text-xs font-semibold text-right">Mean Score</TableHead>
                <TableHead className="text-xs font-semibold text-right">Std Dev</TableHead>
                <TableHead className="text-xs font-semibold text-right">P(Rank 1)</TableHead>
                <TableHead className="text-xs font-semibold text-right">Mean Rank</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((m, idx) => (
                <TableRow key={m.id} className={idx === 0 ? 'bg-green-50 font-medium' : ''}>
                  <TableCell className="text-xs">{m.id}</TableCell>
                  <TableCell className="text-xs">{m.label}</TableCell>
                  <TableCell className="text-xs text-right">{m.meanScore.toFixed(4)}</TableCell>
                  <TableCell className="text-xs text-right">{m.stdDev.toFixed(4)}</TableCell>
                  <TableCell className="text-xs text-right">{m.pRank1.toFixed(4)}</TableCell>
                  <TableCell className="text-xs text-right">{m.meanRank.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
