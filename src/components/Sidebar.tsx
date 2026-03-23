// Sidebar component - no useState needed
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Upload, FileText } from 'lucide-react';
import type { Scenario, Method, Component, Profile, Quantities, WeightMultipliers } from '@/types';
import { SCENARIO_LABELS, COMPONENT_LABELS, PROFILE_LABELS } from '@/data/mockData';

interface SidebarProps {
  scenario: Scenario;
  setScenario: (s: Scenario) => void;
  method: Method;
  setMethod: (m: Method) => void;
  component: Component;
  setComponent: (c: Component) => void;
  profile: Profile;
  setProfile: (p: Profile) => void;
  quantities: Quantities;
  setQuantities: (q: Quantities) => void;
  weights: WeightMultipliers;
  setWeights: (w: WeightMultipliers) => void;
  onApplyWeights: () => void;
}

export function Sidebar({
  scenario,
  setScenario,
  method,
  setMethod,
  component,
  setComponent,
  profile,
  setProfile,
  quantities,
  setQuantities,
  weights,
  setWeights,
  onApplyWeights,
}: SidebarProps) {

  const handleWeightChange = (key: keyof WeightMultipliers, value: number[]) => {
    setWeights({ ...weights, [key]: value[0] });
    if (profile !== 'Custom') {
      setProfile('Custom');
    }
  };

  const effectiveWeights = () => {
    const base = {
      Economic: 0.25,
      Environmental: 0.25,
      Social: 0.25,
      Technology: 0.25,
    };
    
    const mult = {
      Economic: weights.economic,
      Environmental: weights.environmental,
      Social: weights.social,
      Technology: weights.technical,
    };

    const raw = {
      Economic: base.Economic * mult.Economic,
      Environmental: base.Environmental * mult.Environmental,
      Social: base.Social * mult.Social,
      Technology: base.Technology * mult.Technology,
    };

    const total = Object.values(raw).reduce((a, b) => a + b, 0);
    return {
      Economic: raw.Economic / total,
      Environmental: raw.Environmental / total,
      Social: raw.Social / total,
      Technology: raw.Technology / total,
    };
  };

  return (
    <div className="w-[260px] min-w-[260px] bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 pb-20">
        {/* Scenario */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2">Scenario</h3>
          <RadioGroup value={scenario} onValueChange={(v) => setScenario(v as Scenario)} className="space-y-1">
            {Object.entries(SCENARIO_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-start space-x-2">
                <RadioGroupItem value={key} id={`scenario-${key}`} className="mt-0.5" />
                <Label htmlFor={`scenario-${key}`} className="text-xs leading-tight cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="my-4" />

        {/* Method */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2">MCDM Method</h3>
          <RadioGroup value={method} onValueChange={(v) => setMethod(v as Method)} className="space-y-1">
            {['MIVES', 'TOPSIS', 'VIKOR'].map((m) => (
              <div key={m} className="flex items-center space-x-2">
                <RadioGroupItem value={m} id={`method-${m}`} />
                <Label htmlFor={`method-${m}`} className="text-xs cursor-pointer">{m}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="my-4" />

        {/* Priority Profile */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-1">Priority Profile</h3>
          <p className="text-[10px] text-gray-500 mb-2 leading-tight">
            Baseline uses AHP weights (×1.0 all). Named profiles apply ×3.0 multiplier to the focal requirement.
          </p>
          <RadioGroup value={profile} onValueChange={(v) => setProfile(v as Profile)} className="space-y-1">
            {Object.entries(PROFILE_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-start space-x-2">
                <RadioGroupItem value={key} id={`profile-${key}`} className="mt-0.5" />
                <Label htmlFor={`profile-${key}`} className="text-[11px] leading-tight cursor-pointer">
                  {label.split('(')[0].trim()}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="my-4" />

        {/* Component */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2">Component (Tab 1)</h3>
          <RadioGroup value={component} onValueChange={(v) => setComponent(v as Component)} className="space-y-1">
            {Object.entries(COMPONENT_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={`comp-${key}`} />
                <Label htmlFor={`comp-${key}`} className="text-xs cursor-pointer">{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="my-4" />

        {/* Weight Multipliers */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-1">Requirement Weight Multipliers</h3>
          <p className="text-[10px] text-gray-500 mb-3 leading-tight">
            Multipliers scale baseline AHP requirement weights. Select Custom profile, then click Apply.
          </p>
          
          <div className="space-y-4">
            <div>
              <Label className="text-[11px] mb-1 block">Economic (×{weights.economic.toFixed(1)})</Label>
              <Slider
                value={[weights.economic]}
                onValueChange={(v) => handleWeightChange('economic', v)}
                min={0.1}
                max={3.0}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-[11px] mb-1 block">Environmental (×{weights.environmental.toFixed(1)})</Label>
              <Slider
                value={[weights.environmental]}
                onValueChange={(v) => handleWeightChange('environmental', v)}
                min={0.1}
                max={3.0}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-[11px] mb-1 block">Social (×{weights.social.toFixed(1)})</Label>
              <Slider
                value={[weights.social]}
                onValueChange={(v) => handleWeightChange('social', v)}
                min={0.1}
                max={3.0}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-[11px] mb-1 block">Technical (×{weights.technical.toFixed(1)})</Label>
              <Slider
                value={[weights.technical]}
                onValueChange={(v) => handleWeightChange('technical', v)}
                min={0.1}
                max={3.0}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {profile === 'Custom' && (
            <Button 
              onClick={onApplyWeights}
              size="sm" 
              className="w-full mt-3 text-xs bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100"
            >
              Apply / Recompute
            </Button>
          )}

          {/* Effective Weight Preview */}
          {profile === 'Custom' && (
            <div className="mt-3 p-2 bg-gray-100 rounded text-[10px]">
              <p className="text-gray-500 mb-1 italic">Effective weight preview:</p>
              <table className="w-full">
                <tbody>
                  {Object.entries(effectiveWeights()).map(([req, wt]) => (
                    <tr key={req}>
                      <td className="text-gray-600">{req}:</td>
                      <td className="text-right font-medium">{wt.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Building Quantities */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-1">Building Quantities</h3>
          <p className="text-[10px] text-gray-500 mb-2 leading-tight">
            Default values from BasicHouse.ifc. Edit below or upload a new .ifc file.
          </p>
          
          <div className="space-y-2">
            <div>
              <Label className="text-[11px] mb-0.5 block">Ext. Wall — EW (m²)</Label>
              <Input
                type="number"
                value={quantities.externalWall}
                onChange={(e) => setQuantities({ ...quantities, externalWall: parseFloat(e.target.value) || 0 })}
                className="h-7 text-xs"
              />
            </div>
            <div>
              <Label className="text-[11px] mb-0.5 block">Floor / Slab — FS (m²)</Label>
              <Input
                type="number"
                value={quantities.floorSlab}
                onChange={(e) => setQuantities({ ...quantities, floorSlab: parseFloat(e.target.value) || 0 })}
                className="h-7 text-xs"
              />
            </div>
            <div>
              <Label className="text-[11px] mb-0.5 block">Roof — RF (m²)</Label>
              <Input
                type="number"
                value={quantities.roof}
                onChange={(e) => setQuantities({ ...quantities, roof: parseFloat(e.target.value) || 0 })}
                className="h-7 text-xs"
              />
            </div>
            <div>
              <Label className="text-[11px] mb-0.5 block">Struct. Frame — ST (m)</Label>
              <Input
                type="number"
                value={quantities.structuralFrame}
                onChange={(e) => setQuantities({ ...quantities, structuralFrame: parseFloat(e.target.value) || 0 })}
                className="h-7 text-xs"
              />
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* IFC Upload */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2">IFC Upload</h3>
          <div className="border border-dashed border-gray-300 rounded p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 mx-auto mb-1 text-gray-400" />
            <p className="text-[10px] text-gray-500">Drop file or browse .ifc</p>
          </div>
          <p className="text-[9px] text-gray-400 mt-1">Using manual / IFC-default quantities</p>
        </div>

        <Separator className="my-4" />

        {/* Required Files */}
        <details className="text-xs">
          <summary className="cursor-pointer font-semibold text-[12px] flex items-center gap-1">
            <FileText className="w-3 h-3" /> Required files
          </summary>
          <ul className="mt-2 ml-4 space-y-1 text-[10px] text-gray-600">
            <li>pmcdm.ttl</li>
            <li>results_sustainability.pkl</li>
            <li>results_circularity_v2.pkl</li>
            <li>Building_Results_Full.xlsx</li>
            <li>Building_Results_RequirementPriority.xlsx</li>
            <li className="text-gray-400">BasicHouse.ifc (optional)</li>
          </ul>
        </details>
      </div>
    </div>
  );
}
