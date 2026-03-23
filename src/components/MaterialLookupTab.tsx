import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Info, Database, BarChart3, Building2, Leaf } from 'lucide-react';
import type { Scenario, Method } from '@/types';
import { ALL_MATERIALS, mockIndicators, mockBiogenicShifts, COMPONENT_LABELS, getMaterialsByComponent } from '@/data/mockData';

interface MaterialLookupTabProps {
  scenario: Scenario;
  method: Method;
}

export function MaterialLookupTab({ scenario, method }: MaterialLookupTabProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');

  const material = ALL_MATERIALS.find(m => m.id === selectedMaterial);
  const componentLabel = material ? COMPONENT_LABELS[material.component] : '';
  
  // Get component-level performance
  const componentMaterials = material ? getMaterialsByComponent(material.component) : [];
  const materialPerformance = componentMaterials.find(m => m.id === selectedMaterial);
  const rankPosition = materialPerformance ? componentMaterials.findIndex(m => m.id === selectedMaterial) + 1 : 0;

  // Get building appearances
  const buildingAppearances = [
    { scenario: 'Sustainability – Reported GWP', count: 3 },
    { scenario: 'Sustainability – Fossil-only GWP', count: 2 },
    { scenario: 'Circularity – Reported GWP', count: 4 },
    { scenario: 'Circularity – Fossil-only GWP', count: 3 },
  ];

  // Get biogenic shift
  const biogenicShift = mockBiogenicShifts.find(s => s.material === selectedMaterial);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
          <Database className="w-4 h-4" /> RDF Material Lookup
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          Query material metadata, indicator uncertainty models, and performance summaries from the RDF knowledge graph and precomputed results. No raw SPARQL required — all queries are guided.
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium">Select material:</span>
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <SelectTrigger className="w-[400px] text-xs">
              <SelectValue placeholder="Material ID — Label [Component]" />
            </SelectTrigger>
            <SelectContent>
              {ALL_MATERIALS.map((m) => (
                <SelectItem key={m.id} value={m.id} className="text-xs">
                  {m.id} — {m.label} [{COMPONENT_LABELS[m.component]}]
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!selectedMaterial && (
        <div className="p-8 text-center text-gray-400 text-sm">
          Select a material above to view its profile.
        </div>
      )}

      {selectedMaterial && material && (
        <>
          {/* RDF Provenance Note */}
          <div className="text-[10px] text-gray-500 italic">
            <span className="font-semibold">RDF layer:</span>
            Metadata retrieved from pmcdm_with_results.ttl · URI: https://pmcdm.org/material/{material.id}
          </div>

          {/* Material Metadata */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Info className="w-4 h-4" /> Material metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs font-semibold w-40">Material ID</TableCell>
                    <TableCell className="text-xs">{material.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs font-semibold">Label</TableCell>
                    <TableCell className="text-xs">{material.label}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs font-semibold">Component group</TableCell>
                    <TableCell className="text-xs">{componentLabel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs font-semibold">RDF URI</TableCell>
                    <TableCell className="text-xs font-mono text-[10px]">
                      https://pmcdm.org/material/{material.id}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Indicator Profile */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Indicator profile (RDF uncertainty model)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-xs font-semibold">Indicator</TableHead>
                    <TableHead className="text-xs font-semibold">Distribution</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Param A (μ/lo)</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Param B (σ/mode)</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Param C (hi)</TableHead>
                    <TableHead className="text-xs font-semibold text-center">Active</TableHead>
                    <TableHead className="text-xs font-semibold">Direction</TableHead>
                    <TableHead className="text-xs font-semibold">Criterion</TableHead>
                    <TableHead className="text-xs font-semibold">Requirement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockIndicators.map((ind) => (
                    <TableRow key={ind.name} className={!ind.active ? 'text-gray-400' : ''}>
                      <TableCell className="text-xs">{ind.name}</TableCell>
                      <TableCell className="text-xs">{ind.distribution}</TableCell>
                      <TableCell className="text-xs text-right">{ind.paramA.toFixed(2)}</TableCell>
                      <TableCell className="text-xs text-right">{ind.paramB > 0 ? ind.paramB.toFixed(2) : '—'}</TableCell>
                      <TableCell className="text-xs text-right">{ind.paramC > 0 ? ind.paramC.toFixed(2) : '—'}</TableCell>
                      <TableCell className="text-xs text-center">
                        <Badge variant={ind.active ? 'default' : 'secondary'} className="text-[9px] py-0">
                          {ind.active ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{ind.direction || '—'}</TableCell>
                      <TableCell className="text-xs">{ind.criterion || '—'}</TableCell>
                      <TableCell className="text-xs">{ind.requirement || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Component-level Performance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Component-level performance (baseline)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {materialPerformance ? (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs font-semibold w-40">Mean Score</TableCell>
                      <TableCell className="text-xs">{materialPerformance.meanScore.toFixed(4)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">Std Dev</TableCell>
                      <TableCell className="text-xs">{materialPerformance.stdDev.toFixed(4)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">P(Rank 1)</TableCell>
                      <TableCell className="text-xs">{materialPerformance.pRank1.toFixed(4)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">Mean Rank</TableCell>
                      <TableCell className="text-xs">{materialPerformance.meanRank.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">Rank position</TableCell>
                      <TableCell className="text-xs">{rankPosition} / {componentMaterials.length} materials</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">Source</TableCell>
                      <TableCell className="text-xs">Baseline PKL · {scenario} · {method}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-xs text-gray-500">
                  No baseline component data for {material.id} / {scenario} / {method}.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Component Priority Note */}
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded text-xs text-green-800">
            Component-priority results file loaded. Priority-profile data available in the Component Results tab.
          </div>

          {/* Building-level Relevance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Building-level relevance (baseline QWIA top-10)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50">
                    <TableHead className="text-xs font-semibold">Scenario</TableHead>
                    <TableHead className="text-xs font-semibold text-right">In Top-10</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buildingAppearances.map((app) => (
                    <TableRow key={app.scenario}>
                      <TableCell className="text-xs">{app.scenario}</TableCell>
                      <TableCell className="text-xs text-right">{app.count} / 10</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Biogenic Carbon Sensitivity */}
          {biogenicShift && (
            <div className="bg-gray-50 border-l-4 border-gray-400 p-3 rounded text-xs">
              <span className="font-semibold flex items-center gap-1">
                <Leaf className="w-3 h-3" /> Biogenic carbon sensitivity:
              </span>
              Mean rank {biogenicShift.deltaRank > 0 ? 'falls' : 'rises'} by {Math.abs(biogenicShift.deltaRank).toFixed(1)} positions when switching from Reported to Fossil-only GWP ({scenario.startsWith('Sus') ? 'Sus' : 'Cir'} scenarios, QWIA TOPSIS). Rank (Reported): {biogenicShift.rankReported.toFixed(1)} → Rank (Fossil-only): {biogenicShift.rankFossilOnly.toFixed(1)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
