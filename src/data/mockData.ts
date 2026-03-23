import type { Material, BuildingCombination, MethodAgreement, BiogenicShift, Indicator } from '@/types';

// Component labels
export const COMPONENT_LABELS: Record<string, string> = {
  ExternalWall: 'External Wall',
  FloorSlab: 'Floor / Slab',
  Roof: 'Roof',
  StructuralFrame: 'Structural Frame',
};

// Scenario labels
export const SCENARIO_LABELS: Record<string, string> = {
  Sus_Rep: 'Sustainability – Reported GWP',
  Sus_Fos: 'Sustainability – Fossil-only GWP',
  Cir_Rep: 'Circularity – Reported GWP',
  Cir_Fos: 'Circularity – Fossil-only GWP',
};

// Priority profile labels
export const PROFILE_LABELS: Record<string, string> = {
  Baseline: 'Baseline (AHP weights, equal multipliers)',
  Economic: 'Economic-first (Economic criteria ×3.0)',
  Social: 'Social-first (Social criteria ×3.0)',
  Environmental: 'Environmental-first (Environmental criteria ×3.0)',
  Technical: 'Technical-first (Technical criteria ×3.0)',
  Custom: 'Custom (sliders active — framework demo)',
};

// Mock materials data
export const mockMaterials: Material[] = [
  { id: 'EW_001', label: 'Timber frame with cellulose insulation', component: 'ExternalWall', meanScore: 0.8234, stdDev: 0.0456, pRank1: 0.342, meanRank: 2.1 },
  { id: 'EW_002', label: 'CLT panel with wood fiber insulation', component: 'ExternalWall', meanScore: 0.7891, stdDev: 0.0523, pRank1: 0.281, meanRank: 2.8 },
  { id: 'EW_003', label: 'Concrete block with EPS insulation', component: 'ExternalWall', meanScore: 0.6543, stdDev: 0.0489, pRank1: 0.156, meanRank: 4.2 },
  { id: 'EW_004', label: 'Steel frame with mineral wool', component: 'ExternalWall', meanScore: 0.5987, stdDev: 0.0612, pRank1: 0.089, meanRank: 5.5 },
  { id: 'EW_005', label: 'Brick cavity wall with EPS', component: 'ExternalWall', meanScore: 0.5432, stdDev: 0.0556, pRank1: 0.067, meanRank: 6.3 },
  { id: 'EW_006', label: 'Straw bale with lime plaster', component: 'ExternalWall', meanScore: 0.7210, stdDev: 0.0789, pRank1: 0.065, meanRank: 6.5 },
  { id: 'EW_007', label: 'Hempcrete block', component: 'ExternalWall', meanScore: 0.6987, stdDev: 0.0723, pRank1: 0.000, meanRank: 8.0 },
  { id: 'EW_008', label: 'Precast concrete sandwich panel', component: 'ExternalWall', meanScore: 0.5123, stdDev: 0.0589, pRank1: 0.000, meanRank: 9.2 },
];

export const mockFloorSlabMaterials: Material[] = [
  { id: 'FS_001', label: 'CLT floor panel', component: 'FloorSlab', meanScore: 0.8123, stdDev: 0.0421, pRank1: 0.389, meanRank: 1.8 },
  { id: 'FS_002', label: 'Timber I-joist with OSB', component: 'FloorSlab', meanScore: 0.7789, stdDev: 0.0512, pRank1: 0.267, meanRank: 2.6 },
  { id: 'FS_003', label: 'Reinforced concrete slab', component: 'FloorSlab', meanScore: 0.6234, stdDev: 0.0487, pRank1: 0.145, meanRank: 4.1 },
  { id: 'FS_004', label: 'Hollow core concrete plank', component: 'FloorSlab', meanScore: 0.5890, stdDev: 0.0534, pRank1: 0.098, meanRank: 5.0 },
  { id: 'FS_005', label: 'Steel composite deck', component: 'FloorSlab', meanScore: 0.5567, stdDev: 0.0612, pRank1: 0.067, meanRank: 5.8 },
  { id: 'FS_006', label: 'Cross-laminated bamboo', component: 'FloorSlab', meanScore: 0.7345, stdDev: 0.0698, pRank1: 0.034, meanRank: 6.7 },
];

export const mockRoofMaterials: Material[] = [
  { id: 'RF_001', label: 'Timber truss with cellulose', component: 'Roof', meanScore: 0.8345, stdDev: 0.0398, pRank1: 0.412, meanRank: 1.6 },
  { id: 'RF_002', label: 'CLT roof panel with wood fiber', component: 'Roof', meanScore: 0.7987, stdDev: 0.0476, pRank1: 0.289, meanRank: 2.4 },
  { id: 'RF_003', label: 'Steel portal frame with mineral wool', component: 'Roof', meanScore: 0.6123, stdDev: 0.0554, pRank1: 0.123, meanRank: 4.5 },
  { id: 'RF_004', label: 'Concrete roof with EPS', component: 'Roof', meanScore: 0.5789, stdDev: 0.0512, pRank1: 0.089, meanRank: 5.3 },
  { id: 'RF_005', label: 'Green roof with timber structure', component: 'Roof', meanScore: 0.7234, stdDev: 0.0689, pRank1: 0.087, meanRank: 5.4 },
];

export const mockStructuralFrameMaterials: Material[] = [
  { id: 'ST_001', label: 'Glulam columns and beams', component: 'StructuralFrame', meanScore: 0.8456, stdDev: 0.0387, pRank1: 0.456, meanRank: 1.4 },
  { id: 'ST_002', label: 'CLT core with timber frame', component: 'StructuralFrame', meanScore: 0.8123, stdDev: 0.0456, pRank1: 0.312, meanRank: 2.1 },
  { id: 'ST_003', label: 'Reinforced concrete frame', component: 'StructuralFrame', meanScore: 0.6345, stdDev: 0.0523, pRank1: 0.098, meanRank: 4.8 },
  { id: 'ST_004', label: 'Steel frame with concrete core', component: 'StructuralFrame', meanScore: 0.5987, stdDev: 0.0589, pRank1: 0.067, meanRank: 5.6 },
  { id: 'ST_005', label: 'Hybrid timber-concrete', component: 'StructuralFrame', meanScore: 0.7567, stdDev: 0.0612, pRank1: 0.067, meanRank: 5.6 },
  { id: 'ST_006', label: 'Bamboo structural system', component: 'StructuralFrame', meanScore: 0.7234, stdDev: 0.0745, pRank1: 0.000, meanRank: 7.5 },
];

// Get materials by component
export const getMaterialsByComponent = (component: string): Material[] => {
  switch (component) {
    case 'ExternalWall': return mockMaterials;
    case 'FloorSlab': return mockFloorSlabMaterials;
    case 'Roof': return mockRoofMaterials;
    case 'StructuralFrame': return mockStructuralFrameMaterials;
    default: return mockMaterials;
  }
};

// Mock building combinations
export const mockBuildingCombinations: BuildingCombination[] = [
  { combinationID: 'Combo_A1', externalWall: 'EW_001', floorSlab: 'FS_001', roof: 'RF_001', structuralFrame: 'ST_001', meanScore: 0.8289, probRank1: 0.312, meanRank: 1.8, contribExternalWall: 0.28, contribFloorSlab: 0.24, contribRoof: 0.26, contribStructuralFrame: 0.22 },
  { combinationID: 'Combo_A2', externalWall: 'EW_001', floorSlab: 'FS_001', roof: 'RF_001', structuralFrame: 'ST_002', meanScore: 0.8156, probRank1: 0.234, meanRank: 2.2, contribExternalWall: 0.29, contribFloorSlab: 0.25, contribRoof: 0.27, contribStructuralFrame: 0.19 },
  { combinationID: 'Combo_A3', externalWall: 'EW_002', floorSlab: 'FS_001', roof: 'RF_001', structuralFrame: 'ST_001', meanScore: 0.8023, probRank1: 0.178, meanRank: 2.6, contribExternalWall: 0.30, contribFloorSlab: 0.23, contribRoof: 0.25, contribStructuralFrame: 0.22 },
  { combinationID: 'Combo_A4', externalWall: 'EW_001', floorSlab: 'FS_002', roof: 'RF_001', structuralFrame: 'ST_001', meanScore: 0.7987, probRank1: 0.123, meanRank: 3.0, contribExternalWall: 0.28, contribFloorSlab: 0.23, contribRoof: 0.26, contribStructuralFrame: 0.23 },
  { combinationID: 'Combo_A5', externalWall: 'EW_002', floorSlab: 'FS_002', roof: 'RF_002', structuralFrame: 'ST_002', meanScore: 0.7845, probRank1: 0.067, meanRank: 3.8, contribExternalWall: 0.31, contribFloorSlab: 0.24, contribRoof: 0.26, contribStructuralFrame: 0.19 },
  { combinationID: 'Combo_B1', externalWall: 'EW_003', floorSlab: 'FS_003', roof: 'RF_003', structuralFrame: 'ST_003', meanScore: 0.6234, probRank1: 0.045, meanRank: 4.5, contribExternalWall: 0.27, contribFloorSlab: 0.26, contribRoof: 0.25, contribStructuralFrame: 0.22 },
  { combinationID: 'Combo_B2', externalWall: 'EW_003', floorSlab: 'FS_004', roof: 'RF_003', structuralFrame: 'ST_003', meanScore: 0.5987, probRank1: 0.023, meanRank: 5.2, contribExternalWall: 0.28, contribFloorSlab: 0.25, contribRoof: 0.26, contribStructuralFrame: 0.21 },
  { combinationID: 'Combo_B3', externalWall: 'EW_004', floorSlab: 'FS_003', roof: 'RF_004', structuralFrame: 'ST_004', meanScore: 0.5768, probRank1: 0.012, meanRank: 6.1, contribExternalWall: 0.26, contribFloorSlab: 0.27, contribRoof: 0.24, contribStructuralFrame: 0.23 },
  { combinationID: 'Combo_B4', externalWall: 'EW_005', floorSlab: 'FS_005', roof: 'RF_003', structuralFrame: 'ST_004', meanScore: 0.5543, probRank1: 0.006, meanRank: 7.0, contribExternalWall: 0.29, contribFloorSlab: 0.24, contribRoof: 0.25, contribStructuralFrame: 0.22 },
  { combinationID: 'Combo_B5', externalWall: 'EW_004', floorSlab: 'FS_005', roof: 'RF_004', structuralFrame: 'ST_003', meanScore: 0.5321, probRank1: 0.000, meanRank: 8.5, contribExternalWall: 0.27, contribFloorSlab: 0.25, contribRoof: 0.26, contribStructuralFrame: 0.22 },
];

// Mock method agreement data
export const mockMethodAgreement: MethodAgreement[] = [
  { method1: 'MIVES', method2: 'TOPSIS', spearmanRho: 0.723, pValue: 0.0001 },
  { method1: 'MIVES', method2: 'VIKOR', spearmanRho: 0.891, pValue: 0.0001 },
  { method1: 'TOPSIS', method2: 'VIKOR', spearmanRho: 0.812, pValue: 0.0001 },
];

// Mock biogenic shift data
export const mockBiogenicShifts: BiogenicShift[] = [
  { material: 'EW_001', label: 'Timber frame with cellulose insulation', rankReported: 1.2, rankFossilOnly: 3.8, deltaRank: 2.6 },
  { material: 'EW_002', label: 'CLT panel with wood fiber insulation', rankReported: 2.1, rankFossilOnly: 4.5, deltaRank: 2.4 },
  { material: 'RF_001', label: 'Timber truss with cellulose', rankReported: 1.4, rankFossilOnly: 3.2, deltaRank: 1.8 },
  { material: 'ST_001', label: 'Glulam columns and beams', rankReported: 1.6, rankFossilOnly: 3.0, deltaRank: 1.4 },
  { material: 'RF_005', label: 'Green roof with timber structure', rankReported: 4.2, rankFossilOnly: 5.1, deltaRank: 0.9 },
  { material: 'FS_001', label: 'CLT floor panel', rankReported: 2.0, rankFossilOnly: 2.6, deltaRank: 0.6 },
  { material: 'EW_006', label: 'Straw bale with lime plaster', rankReported: 5.8, rankFossilOnly: 5.2, deltaRank: -0.6 },
  { material: 'EW_003', label: 'Concrete block with EPS insulation', rankReported: 4.5, rankFossilOnly: 3.8, deltaRank: -0.7 },
  { material: 'FS_003', label: 'Reinforced concrete slab', rankReported: 4.8, rankFossilOnly: 3.9, deltaRank: -0.9 },
  { material: 'ST_003', label: 'Reinforced concrete frame', rankReported: 5.2, rankFossilOnly: 4.1, deltaRank: -1.1 },
  { material: 'EW_004', label: 'Steel frame with mineral wool', rankReported: 6.0, rankFossilOnly: 4.5, deltaRank: -1.5 },
  { material: 'ST_004', label: 'Steel frame with concrete core', rankReported: 6.5, rankFossilOnly: 4.8, deltaRank: -1.7 },
];

// Mock indicator data
export const mockIndicators: Indicator[] = [
  { name: 'GWP_Total', distribution: 'LogNormal', paramA: 2.34, paramB: 0.45, paramC: 0, active: true, direction: 'Minimize', criterion: 'Climate Impact', requirement: 'Environmental' },
  { name: 'GWP_Fossil', distribution: 'LogNormal', paramA: 2.12, paramB: 0.38, paramC: 0, active: true, direction: 'Minimize', criterion: 'Climate Impact', requirement: 'Environmental' },
  { name: 'GWP_Biogenic', distribution: 'Normal', paramA: -1.23, paramB: 0.67, paramC: 0, active: true, direction: 'Minimize', criterion: 'Climate Impact', requirement: 'Environmental' },
  { name: 'Cost_Material', distribution: 'Triangular', paramA: 45.5, paramB: 52.3, paramC: 68.9, active: true, direction: 'Minimize', criterion: 'Initial Cost', requirement: 'Economic' },
  { name: 'Cost_Transport', distribution: 'Uniform', paramA: 3.2, paramB: 5.8, paramC: 0, active: true, direction: 'Minimize', criterion: 'Initial Cost', requirement: 'Economic' },
  { name: 'Durability_Years', distribution: 'Normal', paramA: 50, paramB: 8, paramC: 0, active: true, direction: 'Maximize', criterion: 'Service Life', requirement: 'Technical' },
  { name: 'Maintenance_Frequency', distribution: 'Poisson', paramA: 0.15, paramB: 0, paramC: 0, active: true, direction: 'Minimize', criterion: 'Maintenance', requirement: 'Technical' },
  { name: 'Recyclability', distribution: 'Beta', paramA: 7.2, paramB: 2.8, paramC: 0, active: true, direction: 'Maximize', criterion: 'End of Life', requirement: 'Circularity' },
  { name: 'Renewable_Content', distribution: 'Beta', paramA: 8.5, paramB: 1.5, paramC: 0, active: true, direction: 'Maximize', criterion: 'Resource Flow', requirement: 'Circularity' },
  { name: 'Indoor_Air_Quality', distribution: 'Normal', paramA: 0.85, paramB: 0.08, paramC: 0, active: true, direction: 'Maximize', criterion: 'Health Impact', requirement: 'Social' },
  { name: 'Fire_Resistance', distribution: 'Triangular', paramA: 45, paramB: 60, paramC: 90, active: true, direction: 'Maximize', criterion: 'Safety', requirement: 'Technical' },
  { name: 'Acoustic_Performance', distribution: 'Normal', paramA: 52, paramB: 4, paramC: 0, active: true, direction: 'Maximize', criterion: 'Comfort', requirement: 'Social' },
];

// Default quantities
export const DEFAULT_QUANTITIES = {
  externalWall: 123.6,
  floorSlab: 214.7,
  roof: 262.5,
  structuralFrame: 22.4,
};

// Summary stats
export const SUMMARY_STATS = {
  topCombo: 'Combo_A1',
  topScore: 0.829,
  topProb: 31.2,
  domComp: 'External Wall',
  domShare: 28.5,
  bioMat: 'EW_001',
  bioLabel: 'Timber frame with cellulose insulation',
  bioShift: 2.6,
  mvMin: 0.812,
  mvMax: 0.934,
  mtSusRep: 0.723,
};

// All materials for lookup
export const ALL_MATERIALS = [
  ...mockMaterials,
  ...mockFloorSlabMaterials,
  ...mockRoofMaterials,
  ...mockStructuralFrameMaterials,
];
