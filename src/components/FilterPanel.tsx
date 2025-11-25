import { Filter, MapPin, Building2, X, Menu } from 'lucide-react';
import { Plant, PlantType } from '../types';

interface FilterPanelProps {
  plants: Plant[];
  selectedState: string | null;
  selectedDistrict: string | null;
  selectedType: PlantType | null;
  onStateChange: (state: string | null) => void;
  onDistrictChange: (district: string | null) => void;
  onTypeChange: (type: PlantType | null) => void;
  isOpen?: boolean;
  onToggle?: () => void;
  showHeader?: boolean;
}

export default function FilterPanel({
  plants,
  selectedState,
  selectedDistrict,
  selectedType,
  onStateChange,
  onDistrictChange,
  onTypeChange,
  isOpen = true,
  onToggle,
  showHeader = true
}: FilterPanelProps) {
  const states = Array.from(new Set(plants.map(p => p.state))).sort();
  const districts = selectedState
    ? Array.from(new Set(plants.filter(p => p.state === selectedState).map(p => p.district))).sort()
    : [];

  const plantTypes: PlantType[] = ['steel', 'sponge_iron', 'pellets', 'blast_furnace'];

  const getTypeColor = (type: PlantType) => {
    switch (type) {
      case 'steel': return 'bg-red-500';
      case 'sponge_iron': return 'bg-amber-500';
      case 'pellets': return 'bg-blue-500';
      case 'blast_furnace': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeCount = (type: PlantType) => {
    let filtered = plants.filter(p => p.type === type);
    if (selectedState) filtered = filtered.filter(p => p.state === selectedState);
    if (selectedDistrict) filtered = filtered.filter(p => p.district === selectedDistrict);
    return filtered.length;
  };

  return (
    <>
      {/* Mobile Toggle Button - only show when not in mobile sidebar context */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="lg:hidden fixed top-4 left-4 z-40 bg-white rounded-lg shadow-lg p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${onToggle ? 'fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30' : ''}
        ${onToggle ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''}
        ${onToggle ? 'top-0 left-0 h-full w-80 bg-white shadow-xl lg:shadow-lg' : ''}
        ${onToggle ? 'lg:rounded-xl lg:p-6 p-6' : ''}
        space-y-4 overflow-y-auto
      `}>
        {showHeader && onToggle && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

      <div className="mb-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <MapPin className="w-4 h-4" />
          State
        </label>
        <select
          value={selectedState || ''}
          onChange={(e) => {
            onStateChange(e.target.value || null);
            onDistrictChange(null);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {selectedState && districts.length > 0 && (
        <div className="mb-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <MapPin className="w-4 h-4" />
            District
          </label>
          <select
            value={selectedDistrict || ''}
            onChange={(e) => onDistrictChange(e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Districts</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Building2 className="w-4 h-4" />
          Plant Type
        </label>
        <div className="space-y-2">
          {plantTypes.map(type => (
            <button
              key={type}
              onClick={() => onTypeChange(selectedType === type ? null : type)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                selectedType === type
                  ? 'bg-gray-100 border-2 border-gray-400'
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(type)}`} />
                <span className="capitalize text-sm font-medium">
                  {type.replace('_', ' ')}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-600">
                {getTypeCount(type)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {(selectedState || selectedDistrict || selectedType) && (
        <button
          onClick={() => {
            onStateChange(null);
            onDistrictChange(null);
            onTypeChange(null);
          }}
          className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          Clear All Filters
        </button>
      )}
      </div>

      {/* Mobile Overlay */}
      {onToggle && isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}
    </>
  );
}
