import { useState, useEffect } from 'react';
import { ChevronDown, Eye } from 'lucide-react';

interface District {
  name: string;
  bioenergyPotential: CropData;
  grossBiomass: CropData;
  surplusBiomass: CropData;
}

interface CropData {
  kharifRice: number;
  rabiRice: number;
  wheat: number;
  cotton: number;
  sugarcane: number;
}

interface StateData {
  state: string;
  districts: District[];
}

interface BiomassSelectorProps {
  onDistrictSelect: (stateName: string, districtName: string) => void;
}

const statesAndUTs = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

export default function BiomassSelector({ onDistrictSelect }: BiomassSelectorProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateData, setStateData] = useState<StateData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedState) {
      loadStateData(selectedState);
    } else {
      setStateData(null);
    }
  }, [selectedState]);

  const loadStateData = async (stateName: string) => {
    setLoading(true);
    try {
      const fileName = stateName.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch(`/biomass-data/${fileName}.json`);

      if (!response.ok) {
        setStateData(null);
        return;
      }

      const data = await response.json();
      setStateData(data);
    } catch (error) {
      console.error('Error loading state data:', error);
      setStateData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Biomass Availability</h3>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select State/UT
        </label>
        <div className="relative">
          <select
            value={selectedState || ''}
            onChange={(e) => setSelectedState(e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Choose a state...</option>
            {statesAndUTs.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Loading districts...</p>
        </div>
      )}

      {!loading && selectedState && !stateData && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No data available for {selectedState}
        </div>
      )}

      {!loading && stateData && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-gray-700 mb-1">
            Districts ({stateData.districts.length})
          </h4>
          <div className="max-h-96 overflow-y-auto space-y-1">
            {stateData.districts.map((district) => (
              <button
                key={district.name}
                onClick={() => onDistrictSelect(stateData.state, district.name)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-green-50 rounded-lg transition-colors group border border-transparent hover:border-green-200"
              >
                <span className="text-gray-700 group-hover:text-green-700 font-medium">
                  {district.name}
                </span>
                <Eye className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
