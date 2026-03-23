import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar } from '@/components/Sidebar';
import { ComponentResultsTab } from '@/components/ComponentResultsTab';
import { BuildingCombinationsTab } from '@/components/BuildingCombinationsTab';
import { AnalysisTab } from '@/components/AnalysisTab';
import { MaterialLookupTab } from '@/components/MaterialLookupTab';
import type { Scenario, Method, Component, Profile, Quantities, WeightMultipliers } from '@/types';
import { DEFAULT_QUANTITIES } from '@/data/mockData';
import './App.css';

function App() {
  // State
  const [scenario, setScenario] = useState<Scenario>('Sus_Rep');
  const [method, setMethod] = useState<Method>('TOPSIS');
  const [component, setComponent] = useState<Component>('ExternalWall');
  const [profile, setProfile] = useState<Profile>('Baseline');
  const [quantities, setQuantities] = useState<Quantities>(DEFAULT_QUANTITIES);
  const [weights, setWeights] = useState<WeightMultipliers>({
    economic: 1.0,
    environmental: 1.0,
    social: 1.0,
    technical: 1.0,
  });
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('component');

  const handleApplyWeights = () => {
    // Check if weights match any precomputed profile
    const allOne = 
      Math.abs(weights.economic - 1.0) < 0.05 &&
      Math.abs(weights.environmental - 1.0) < 0.05 &&
      Math.abs(weights.social - 1.0) < 0.05 &&
      Math.abs(weights.technical - 1.0) < 0.05;

    if (allOne) {
      setProfile('Baseline');
      setCustomMessage('Effective weights match Baseline. Precomputed baseline results loaded.');
    } else if (weights.economic >= 2.8 && weights.economic <= 3.2) {
      setProfile('Economic');
      setCustomMessage('Effective weights match Economic-first profile. Precomputed results loaded.');
    } else if (weights.environmental >= 2.8 && weights.environmental <= 3.2) {
      setProfile('Environmental');
      setCustomMessage('Effective weights match Environmental-first profile. Precomputed results loaded.');
    } else if (weights.social >= 2.8 && weights.social <= 3.2) {
      setProfile('Social');
      setCustomMessage('Effective weights match Social-first profile. Precomputed results loaded.');
    } else if (weights.technical >= 2.8 && weights.technical <= 3.2) {
      setProfile('Technical');
      setCustomMessage('Effective weights match Technical-first profile. Precomputed results loaded.');
    } else {
      setCustomMessage('Custom weights applied: no precomputed profile match found. Showing baseline results as reference. Select a named profile for priority-specific precomputed results.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white px-5 py-3 flex-shrink-0">
        <h1 className="text-xl font-bold m-0">P-MCDM Building Material Selection</h1>
        <p className="text-[11px] text-gray-400 mt-1">
          Research prototype · RDF knowledge graph · LHS N = 2000 · MIVES / TOPSIS / VIKOR · Export charts via the camera icon (top-right of each chart)
        </p>
      </header>

      {/* Prototype Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 px-4 py-2 text-xs flex-shrink-0">
        <span className="font-semibold">Prototype mode:</span>
        Results are precomputed (LHS N = 2000, BasicHouse.ifc quantities). Select Baseline for standard results, a named Priority Profile to load requirement-priority precomputed results, or Custom to set requirement multipliers manually — adjust sliders and click <span className="font-semibold">Apply / Recompute</span> to load the matching precomputed profile (if found).
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 h-full overflow-hidden">
          <Sidebar
            scenario={scenario}
            setScenario={setScenario}
            method={method}
            setMethod={setMethod}
            component={component}
            setComponent={setComponent}
            profile={profile}
            setProfile={(p) => {
              setProfile(p);
              setCustomMessage(null);
            }}
            quantities={quantities}
            setQuantities={setQuantities}
            weights={weights}
            setWeights={setWeights}
            onApplyWeights={handleApplyWeights}
          />
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="mx-4 mt-2 justify-start flex-shrink-0">
              <TabsTrigger value="component" className="text-xs">Component Results</TabsTrigger>
              <TabsTrigger value="building" className="text-xs">Building Combinations</TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs">Analysis & Agreement</TabsTrigger>
              <TabsTrigger value="material" className="text-xs">Material Lookup</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden relative">
              <TabsContent 
                value="component" 
                className={`absolute inset-0 overflow-y-auto p-4 ${activeTab === 'component' ? 'block' : 'hidden'}`}
              >
                <ComponentResultsTab
                  scenario={scenario}
                  method={method}
                  component={component}
                  profile={profile}
                  customMessage={customMessage}
                />
              </TabsContent>

              <TabsContent 
                value="building" 
                className={`absolute inset-0 overflow-y-auto p-4 ${activeTab === 'building' ? 'block' : 'hidden'}`}
              >
                <BuildingCombinationsTab
                  scenario={scenario}
                  method={method}
                  profile={profile}
                  quantities={quantities}
                  customMessage={customMessage}
                />
              </TabsContent>

              <TabsContent 
                value="analysis" 
                className={`absolute inset-0 overflow-y-auto p-4 ${activeTab === 'analysis' ? 'block' : 'hidden'}`}
              >
                <AnalysisTab
                  scenario={scenario}
                  profile={profile}
                />
              </TabsContent>

              <TabsContent 
                value="material" 
                className={`absolute inset-0 overflow-y-auto p-4 ${activeTab === 'material' ? 'block' : 'hidden'}`}
              >
                <MaterialLookupTab
                  scenario={scenario}
                  method={method}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
