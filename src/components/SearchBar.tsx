import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Plant } from '../types';

interface SearchBarProps {
  plants: Plant[];
  onPlantSelect: (plant: Plant | null) => void;
  selectedPlant: Plant | null;
}

export default function SearchBar({ plants, onPlantSelect, selectedPlant }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = plants.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlants(filtered);
      setIsOpen(true);
    } else {
      setFilteredPlants([]);
      setIsOpen(false);
    }
  }, [searchTerm, plants]);

  const handleSelect = (plant: Plant) => {
    onPlantSelect(plant);
    setSearchTerm(plant.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    onPlantSelect(null);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by plant name, location, or type..."
          className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && filteredPlants.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredPlants.map((plant) => (
            <button
              key={plant.id}
              onClick={() => handleSelect(plant)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{plant.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                <span className="capitalize">{plant.type.replace('_', ' ')}</span>
                {' • '}
                {plant.district}, {plant.state}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && searchTerm && filteredPlants.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
          <p className="text-gray-500 text-center">No plants found</p>
        </div>
      )}
    </div>
  );
}
