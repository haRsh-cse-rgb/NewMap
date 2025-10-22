export interface Plant {
  id: string;
  name: string;
  type: PlantType;
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  capacity?: string;
  category?: string; // Comma-separated categories for steel plants
  categoryCapacity?: string; // Comma-separated capacities corresponding to categories
  status: PlantStatus;
}

export type PlantType = 'steel' | 'sponge_iron' | 'pellets' | 'blast_furnace';

export type PlantStatus = 'operational' | 'under_construction' | 'planned';

export type SteelCategory = 'BOF' | 'EOF' | 'Induction Furnace' | 'rerolling';

export interface District {
  name: string;
  state: string;
  coordinates: [number, number];
  bounds?: [[number, number], [number, number]];
}

export interface BiomassData {
  id: string;
  district: string;
  state: string;
  bioenergy_potential: CropBiomass;
  gross_biomass: CropBiomass;
  surplus_biomass: CropBiomass;
}

export interface CropBiomass {
  kharif_rice: number;
  rabi_rice: number;
  wheat: number;
  cotton: number;
  sugarcane: number;
}

export interface StateBiomassAggregate {
  state: string;
  total_bioenergy_potential: CropBiomass;
  total_gross_biomass: CropBiomass;
  total_surplus_biomass: CropBiomass;
  districts: BiomassData[];
}
