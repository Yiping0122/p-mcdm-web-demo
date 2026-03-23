import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import type { Scenario, Profile } from '@/types';
import { mockBiogenicShifts, SCENARIO_LABELS, PROFILE_LABELS, SUMMARY_STATS } from '@/data/mockData';

interface AnalysisTabProps {
  scenario: Scenario;
  profile: Profile;
}

export function AnalysisTab({ scenario, profile }: AnalysisTabProps) {
  const scenarioLabel = SCENARIO_LABELS[scenario];
  const isPriorityProfile = profile !== 'Baseline' && profile !== 'Custom';
  const isCircularity = scenario.startsWith('Cir');
  const prefix = isCircularity ? 'Cir' : 'Sus';

  // All scenarios agreement data
  const allScenarios = [
    { key: 'Sus_Rep', label: 'Sustainability – Reported GWP', mivesTopsis: 0.723, mivesVikor: 0.891, topsisVikor: 0.812 },
    { key: 'Sus_Fos', label: 'Sustainability – Fossil-only GWP', mivesTopsis: 0.845, mivesVikor: 0.912, topsisVikor: 0.834 },
    { key: 'Cir_Rep', label: 'Circularity – Reported GWP', mivesTopsis: 0.789, mivesVikor: 0.867, topsisVikor: 0.798 },
    { key: 'Cir_Fos', label: 'Circularity – Fossil-only GWP', mivesTopsis: 0.812, mivesVikor: 0.934, topsisVikor: 0.845 },
  ];

  return (
    <div className="space-y-4">
      {/* Circularity Framework Note */}
      {isCircularity && (
        <div className="bg-gray-100 border-l-4 border-gray-400 p-3 rounded text-sm">
          <span className="font-semibold">Shared framework note:</span>
          The prototype uses a shared four-dimension assessment framework (Economic, Social, Environmental, Technical) across both Sustainability and Circularity contexts. The current Circularity-side formal experiment is most fully operationalised across the Economic, Environmental, and Technical dimensions; Social is retained in the shared framework representation while a formally expanded Social-priority result layer for Circularity remains a planned future extension.
        </div>
      )}

      {/* Priority Profile Context */}
      {isPriorityProfile && (
        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
          <h4 className="text-sm font-semibold mb-2">
            Requirement context: {PROFILE_LABELS[profile]} · {scenarioLabel}
          </h4>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>
              <span className="font-semibold">Top-1 configuration changes:</span>
              Baseline winner Combo_A1 (P(rank 1) = 0.312) is replaced by Combo_A3 (P(rank 1) = 0.289) under {PROFILE_LABELS[profile]}.
            </li>
            <li>
              <span className="font-semibold">MIVES–TOPSIS agreement weakens:</span>
              ρ = 0.723 (baseline) → 0.654 ({PROFILE_LABELS[profile]}) [Δ = -0.069].
            </li>
          </ul>
        </div>
      )}

      {/* Key Findings Summary */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <h4 className="text-sm font-semibold mb-2">Key findings from the baseline experiment</h4>
        <ul className="text-xs space-y-1 list-disc list-inside">
          <li>
            <span className="font-semibold">Best building combination (Sus/Reported, QWIA TOPSIS):</span>
            {SUMMARY_STATS.topCombo} — mean score {SUMMARY_STATS.topScore}, P(rank 1) = {SUMMARY_STATS.topProb}%
          </li>
          <li>
            <span className="font-semibold">Dominant component:</span>
            {SUMMARY_STATS.domComp} accounts for {SUMMARY_STATS.domShare}% of the building score (mean across top-10 QWIA TOPSIS combinations)
          </li>
          <li>
            <span className="font-semibold">Largest biogenic carbon effect:</span>
            {SUMMARY_STATS.bioMat} ({SUMMARY_STATS.bioLabel}) — mean rank shifts +{SUMMARY_STATS.bioShift} positions when switching from Reported to Fossil-only GWP (Sus, QWIA TOPSIS)
          </li>
          <li>
            <span className="font-semibold">MIVES–VIKOR agreement:</span>
            Spearman ρ = {SUMMARY_STATS.mvMin}–{SUMMARY_STATS.mvMax} across all four scenarios (consistently strong)
          </li>
          <li>
            <span className="font-semibold">MIVES–TOPSIS divergence:</span>
            ρ = {SUMMARY_STATS.mtSusRep} under Sus/Reported GWP — TOPSIS ideal point is distorted by extreme negative biogenic GWP values; agreement recovers to ρ ≥ 0.71 in all other scenarios
          </li>
        </ul>
      </div>

      {/* Method Agreement Heatmap */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Method Agreement (Spearman ρ) — {scenarioLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-gray-100 p-2 rounded text-xs font-semibold"></div>
            <div className="bg-gray-100 p-2 rounded text-xs font-semibold">MIVES</div>
            <div className="bg-gray-100 p-2 rounded text-xs font-semibold">TOPSIS</div>
            <div className="bg-gray-100 p-2 rounded text-xs font-semibold">VIKOR</div>
            
            <div className="bg-gray-100 p-2 rounded text-xs font-semibold flex items-center justify-center">MIVES</div>
            <div className="bg-green-200 p-2 rounded text-xs font-bold">1.000</div>
            <div className="bg-yellow-200 p-2 rounded text-xs font-bold">
              {allScenarios.find(s => s.key === scenario)?.mivesTopsis.toFixed(3)}
            </div>
            <div className="bg-green-200 p-2 rounded text-xs font-bold">
              {allScenarios.find(s => s.key === scenario)?.mivesVikor.toFixed(3)}
            </div>
            
            <div className="bg-gray-100 p-2 rounded text-xs font-semibold flex items-center justify-center">TOPSIS</div>
            <div className="bg-yellow-200 p-2 rounded text-xs font-bold">
              {allScenarios.find(s => s.key === scenario)?.mivesTopsis.toFixed(3)}
            </div>
            <div className="bg-green-200 p-2 rounded text-xs font-bold">1.000</div>
            <div className="bg-green-200 p-2 rounded text-xs font-bold">
              {allScenarios.find(s => s.key === scenario)?.topsisVikor.toFixed(3)}
            </div>
            
            <div className="bg-gray-100 p-2 rounded text-xs font-semibold flex items-center justify-center">VIKOR</div>
            <div className="bg-green-200 p-2 rounded text-xs font-bold">
              {allScenarios.find(s => s.key === scenario)?.mivesVikor.toFixed(3)}
            </div>
            <div className="bg-green-200 p-2 rounded text-xs font-bold">
              {allScenarios.find(s => s.key === scenario)?.topsisVikor.toFixed(3)}
            </div>
            <div className="bg-green-200 p-2 rounded text-xs font-bold">1.000</div>
          </div>
        </CardContent>
      </Card>

      {/* Method Agreement Table */}
      <div>
        <h4 className="text-sm font-semibold mb-2">Method Agreement (Spearman ρ) — All Scenarios</h4>
        <Button variant="outline" size="sm" className="text-xs mb-2">
          <Download className="w-3 h-3 mr-1" /> Download agreement table (CSV)
        </Button>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-xs font-semibold">Scenario</TableHead>
                  <TableHead className="text-xs font-semibold text-right">MIVES–TOPSIS</TableHead>
                  <TableHead className="text-xs font-semibold text-right">MIVES–VIKOR</TableHead>
                  <TableHead className="text-xs font-semibold text-right">TOPSIS–VIKOR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allScenarios.map((s) => (
                  <TableRow key={s.key} className={s.key === scenario ? 'bg-blue-50' : ''}>
                    <TableCell className="text-xs">{s.label}</TableCell>
                    <TableCell className="text-xs text-right">{s.mivesTopsis.toFixed(3)}</TableCell>
                    <TableCell className="text-xs text-right">{s.mivesVikor.toFixed(3)}</TableCell>
                    <TableCell className="text-xs text-right">{s.topsisVikor.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Biogenic Carbon Rank Shift */}
      <div>
        <h4 className="text-sm font-semibold mb-1">
          Biogenic Carbon Effect: Mean Rank Shift (Reported → Fossil-only, QWIA TOPSIS, {prefix})
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          Positive Δ rank = material falls in the ranking when biogenic credits are excluded (penalised under Fossil-only). 
          Negative Δ rank = material rises (benefits from excluding biogenic carbon). 
          Red bars: shift &gt; +5; green bars: shift &lt; −5.
        </p>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Mean rank shift by biogenic carbon treatment (QWIA TOPSIS, {prefix})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockBiogenicShifts} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis 
                  dataKey="material" 
                  angle={-30} 
                  textAnchor="end" 
                  height={50}
                  tick={{ fontSize: 9 }}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  label={{ value: 'Δ Mean Rank (Fossil-only − Reported)', angle: -90, position: 'insideLeft', fontSize: 10 }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value > 0 ? '+' : ''}${value.toFixed(1)}`, 'Δ Rank']}
                  labelFormatter={(label) => `Material: ${label}`}
                  contentStyle={{ fontSize: 12 }}
                />
                <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
                <Bar dataKey="deltaRank">
                  {mockBiogenicShifts.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.deltaRank > 5 ? '#c00' : entry.deltaRank < -5 ? '#090' : '#888'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Button variant="outline" size="sm" className="text-xs mt-2">
          <Download className="w-3 h-3 mr-1" /> Download rank-shift table (CSV)
        </Button>

        <Card className="mt-2">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-xs font-semibold">Material</TableHead>
                  <TableHead className="text-xs font-semibold">Label</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Rank (Reported)</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Rank (Fossil-only)</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Δ Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBiogenicShifts.map((s) => (
                  <TableRow 
                    key={s.material} 
                    className={s.deltaRank > 5 ? 'text-red-600' : s.deltaRank < -5 ? 'text-green-600' : ''}
                  >
                    <TableCell className="text-xs">{s.material}</TableCell>
                    <TableCell className="text-xs">{s.label}</TableCell>
                    <TableCell className="text-xs text-right">{s.rankReported.toFixed(1)}</TableCell>
                    <TableCell className="text-xs text-right">{s.rankFossilOnly.toFixed(1)}</TableCell>
                    <TableCell className="text-xs text-right font-medium">
                      {s.deltaRank > 0 ? '+' : ''}{s.deltaRank.toFixed(1)}
                    </TableCell>
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
