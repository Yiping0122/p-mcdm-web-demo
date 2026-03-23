// P-MCDM Material Selector Types

export type Material = {
  id: string;
  label: string;
  component: string;
  meanScore: number;
  stdDev: number;
  pRank1: number;
  meanRank: number;
}

export type BuildingCombination = {
  combinationID: string;
  externalWall: string;
  floorSlab: string;
  roof: string;
  structuralFrame: string;
  meanScore: number;
  probRank1: number;
  meanRank: number;
  contribExternalWall?: number;
  contribFloorSlab?: number;
  contribRoof?: number;
  contribStructuralFrame?: number;
}

export type MethodAgreement = {
  method1: string;
  method2: string;
  spearmanRho: number;
  pValue: number;
}

export type BiogenicShift = {
  material: string;
  label: string;
  rankReported: number;
  rankFossilOnly: number;
  deltaRank: number;
}

export type Indicator = {
  name: string;
  distribution: string;
  paramA: number;
  paramB: number;
  paramC: number;
  active: boolean;
  direction?: string;
  criterion?: string;
  requirement?: string;
}

export type Scenario = 'Sus_Rep' | 'Sus_Fos' | 'Cir_Rep' | 'Cir_Fos';
export type Method = 'MIVES' | 'TOPSIS' | 'VIKOR';
export type Component = 'ExternalWall' | 'FloorSlab' | 'Roof' | 'StructuralFrame';
export type Profile = 'Baseline' | 'Economic' | 'Social' | 'Environmental' | 'Technical' | 'Custom';

export type Quantities = {
  externalWall: number;
  floorSlab: number;
  roof: number;
  structuralFrame: number;
}

export type WeightMultipliers = {
  economic: number;
  environmental: number;
  social: number;
  technical: number;
}
