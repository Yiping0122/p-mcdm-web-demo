import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Scenario, Method, Profile, Quantities } from '@/types';
import { mockBuildingCombinations, SCENARIO_LABELS, PROFILE_LABELS, DEFAULT_QUANTITIES } from '@/data/mockData';

interface BuildingCombinationsTabProps {
  scenario: Scenario;
  method: Method;
  profile: Profile;
  quantities: Quantities;
  customMessage: string | null;
}

export function BuildingCombinationsTab({ scenario, method, profile, quantities, customMessage }: BuildingCombinationsTabProps) {
  const scenarioLabel = SCENARIO_LABELS[scenario];
  const profileLabel = PROFILE_LABELS[profile];
  const isPriorityProfile = profile !== 'Baseline' && profile !== 'Custom';
  const isCustom = profile === 'Custom';

  // Check if quantities differ from default
  const isDefaultQty = 
    Math.abs(quantities.externalWall - DEFAULT_QUANTITIES.externalWall) <= 0.5 &&
    Math.abs(quantities.floorSlab - DEFAULT_QUANTITIES.floorSlab) <= 0.5 &&
    Math.abs(quantities.roof - DEFAULT_QUANTITIES.roof) <= 0.5 &&
    Math.abs(quantities.structuralFrame - DEFAULT_QUANTITIES.structuralFrame) <= 0.5;

  const top5Data = mockBuildingCombinations.slice(0, 5);
  const top10Data = mockBuildingCombinations.slice(0, 10);

  // Contribution data for stacked bar
  const contribData = top10Data.map(c => ({
    combination: c.combinationID,
    EW: c.contribExternalWall || 0,
    FS: c.contribFloorSlab || 0,
    RF: c.contribRoof || 0,
    ST: c.contribStructuralFrame || 0,
  }));

  const COLORS = ['#4472C4', '#ED7D31', '#A9D18E', '#FFC000'];

  if (isPriorityProfile) {
    return (
      <div className="space-y-4">
        {/* Custom Message */}
        {customMessage && (
          <div className={`p-3 rounded border-l-4 text-sm ${
            customMessage.includes('match') 
              ? 'bg-green-50 border-green-500 text-green-800' 
              : 'bg-amber-50 border-amber-500 text-amber-800'
          }`}>
            <span className="font-semibold">Weight status:</span> {customMessage}
          </div>
        )}

        {/* Profile Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
          <span className="font-semibold">Priority profile: {profileLabel}</span>
          <span className="text-gray-600"> · {scenarioLabel} · {method}</span>
        </div>

        {/* Top-1 Card */}
        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
          <h4 className="text-sm font-semibold mb-2">Top-ranked building configuration</h4>
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-bold text-indigo-900">{top5Data[0].combinationID}</span>
            <span className="text-sm text-gray-600">
              Mean Score: {top5Data[0].meanScore.toFixed(4)} 
              P(Rank 1): {top5Data[0].probRank1.toFixed(3)} 
              Mean Rank: {top5Data[0].meanRank.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            EW: {top5Data[0].externalWall} FS: {top5Data[0].floorSlab} RF: {top5Data[0].roof} ST: {top5Data[0].structuralFrame}
          </p>
        </div>

        {/* Top-5 Table */}
        <div>
          <h4 className="text-sm font-semibold mb-2">
            Top-5 building configurations · {profileLabel} · {scenarioLabel} · {method}
          </h4>
          <p className="text-xs text-gray-500 mb-3">
            Building-configuration level results (QWIA, N=2000 LHS). Each row represents a full 4-component combination.
          </p>
          
          <Button variant="outline" size="sm" className="text-xs mb-2">
            <Download className="w-3 h-3 mr-1" /> Download top-5 ({profile}-first, CSV)
          </Button>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-100">
                    <TableHead className="text-xs font-semibold">Rank</TableHead>
                    <TableHead className="text-xs font-semibold">Combination</TableHead>
                    <TableHead className="text-xs font-semibold">EW</TableHead>
                    <TableHead className="text-xs font-semibold">FS</TableHead>
                    <TableHead className="text-xs font-semibold">RF</TableHead>
                    <TableHead className="text-xs font-semibold">ST</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Mean Score</TableHead>
                    <TableHead className="text-xs font-semibold text-right">P(Rank 1)</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Mean Rank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {top5Data.map((c, idx) => (
                    <TableRow key={c.combinationID} className={idx === 0 ? 'bg-green-50 font-medium' : ''}>
                      <TableCell className="text-xs">{idx + 1}</TableCell>
                      <TableCell className="text-xs">{c.combinationID}</TableCell>
                      <TableCell className="text-xs">{c.externalWall}</TableCell>
                      <TableCell className="text-xs">{c.floorSlab}</TableCell>
                      <TableCell className="text-xs">{c.roof}</TableCell>
                      <TableCell className="text-xs">{c.structuralFrame}</TableCell>
                      <TableCell className="text-xs text-right">{c.meanScore.toFixed(4)}</TableCell>
                      <TableCell className="text-xs text-right">{c.probRank1.toFixed(4)}</TableCell>
                      <TableCell className="text-xs text-right">{c.meanRank.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* P(Rank 1) Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              P(Rank 1) — Top-5 configurations · {profileLabel} · {method}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={top5Data} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis 
                  dataKey="combinationID" 
                  angle={-20} 
                  textAnchor="end" 
                  height={60}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  label={{ value: 'P(Rank 1)', angle: -90, position: 'insideLeft', fontSize: 11 }}
                />
                <Tooltip formatter={(v: number) => [v.toFixed(3), 'P(Rank 1)']} contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="probRank1" fill="#1565c0" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SBCA Note */}
        <div className="bg-gray-100 border-l-4 border-gray-400 p-3 rounded text-xs">
          <span className="font-semibold">SBCA not available for priority profiles:</span>
          SBCA reuses fixed precomputed component-level mean scores and cannot reflect criterion weight changes. Use Baseline profile to view SBCA results.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Custom Message */}
      {customMessage && (
        <div className={`p-3 rounded border-l-4 text-sm ${
          customMessage.includes('match') 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-amber-50 border-amber-500 text-amber-800'
        }`}>
          <span className="font-semibold">Weight status:</span> {customMessage}
        </div>
      )}

      {/* Custom Profile Note */}
      {isCustom && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-sm">
          <span className="font-semibold">Custom profile:</span>
          Sliders are active for framework demonstration. The tables below show the baseline precomputed results as a reference — live QWIA recomputation is not triggered. Select a named priority profile to load precomputed requirement-priority results.
        </div>
      )}

      {/* Quantity Note */}
      {!isDefaultQty && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-sm">
          <span className="font-semibold">Quantity note:</span>
          The entered quantities differ from the IFC-derived baseline. QWIA recomputation (≈ 40 s per scenario) is not available in this prototype — the tables below reflect the precomputed baseline.
        </div>
      )}

      {/* QWIA Section */}
      <div>
        <h4 className="text-sm font-semibold mb-1">
          QWIA — Top-10 building combinations · {scenarioLabel} · {method}
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          Quantity-Weighted Indicator Aggregation (QWIA): building score is the normalised sum of component indicator values weighted by IFC-derived floor-area / length quantities.
        </p>

        <Button variant="outline" size="sm" className="text-xs mb-2">
          <Download className="w-3 h-3 mr-1" /> Download QWIA top-10 (CSV)
        </Button>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-xs font-semibold">Combination</TableHead>
                  <TableHead className="text-xs font-semibold">EW</TableHead>
                  <TableHead className="text-xs font-semibold">FS</TableHead>
                  <TableHead className="text-xs font-semibold">RF</TableHead>
                  <TableHead className="text-xs font-semibold">ST</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Mean Score</TableHead>
                  <TableHead className="text-xs font-semibold text-right">P(Rank 1)</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Mean Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top10Data.map((c, idx) => (
                  <TableRow key={c.combinationID} className={idx === 0 ? 'bg-green-50 font-medium' : ''}>
                    <TableCell className="text-xs">{c.combinationID}</TableCell>
                    <TableCell className="text-xs">{c.externalWall}</TableCell>
                    <TableCell className="text-xs">{c.floorSlab}</TableCell>
                    <TableCell className="text-xs">{c.roof}</TableCell>
                    <TableCell className="text-xs">{c.structuralFrame}</TableCell>
                    <TableCell className="text-xs text-right">{c.meanScore.toFixed(4)}</TableCell>
                    <TableCell className="text-xs text-right">{c.probRank1.toFixed(4)}</TableCell>
                    <TableCell className="text-xs text-right">{c.meanRank.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* P(Rank 1) Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            P(Rank 1) — Top-10 QWIA combinations · {method}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top10Data} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="combinationID" 
                angle={-30} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 9 }}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                label={{ value: 'P(Rank 1)', angle: -90, position: 'insideLeft', fontSize: 11 }}
              />
              <Tooltip formatter={(v: number) => [v.toFixed(3), 'P(Rank 1)']} contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="probRank1" fill="#008080" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Component Contribution Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Component Contribution Share — Top-10 QWIA combinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={contribData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="combination" 
                angle={-30} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 9 }}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                label={{ value: 'Fractional contribution', angle: -90, position: 'insideLeft', fontSize: 11 }}
              />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="EW" stackId="a" fill={COLORS[0]} name="EW" />
              <Bar dataKey="FS" stackId="a" fill={COLORS[1]} name="FS" />
              <Bar dataKey="RF" stackId="a" fill={COLORS[2]} name="RF" />
              <Bar dataKey="ST" stackId="a" fill={COLORS[3]} name="ST" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* SBCA Section */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-1">
          SBCA — Top-10 building combinations · {scenarioLabel} · {method}
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          Score-Based Component Aggregation (SBCA): building score is a quantity-share-weighted sum of precomputed component mean scores.
        </p>

        <Button variant="outline" size="sm" className="text-xs mb-2">
          <Download className="w-3 h-3 mr-1" /> Download SBCA top-10 (CSV)
        </Button>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50">
                  <TableHead className="text-xs font-semibold">Combination</TableHead>
                  <TableHead className="text-xs font-semibold">EW</TableHead>
                  <TableHead className="text-xs font-semibold">FS</TableHead>
                  <TableHead className="text-xs font-semibold">RF</TableHead>
                  <TableHead className="text-xs font-semibold">ST</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Building Score</TableHead>
                  <TableHead className="text-xs font-semibold text-right">P(Rank 1)</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Mean Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top10Data.map((c, idx) => (
                  <TableRow key={c.combinationID} className={idx === 0 ? 'bg-green-50 font-medium' : ''}>
                    <TableCell className="text-xs">{c.combinationID}</TableCell>
                    <TableCell className="text-xs">{c.externalWall}</TableCell>
                    <TableCell className="text-xs">{c.floorSlab}</TableCell>
                    <TableCell className="text-xs">{c.roof}</TableCell>
                    <TableCell className="text-xs">{c.structuralFrame}</TableCell>
                    <TableCell className="text-xs text-right">{c.meanScore.toFixed(4)}</TableCell>
                    <TableCell className="text-xs text-right">{c.probRank1.toFixed(4)}</TableCell>
                    <TableCell className="text-xs text-right">{c.meanRank.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
