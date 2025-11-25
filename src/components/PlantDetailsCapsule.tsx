import { Plant } from '../types';
import { X, MapPin, Building2, Zap, Factory } from 'lucide-react';

interface PlantDetailsCapsuleProps {
  plant: Plant;
  onClose: () => void;
}

export default function PlantDetailsCapsule({ plant, onClose }: PlantDetailsCapsuleProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'steel':
        return <Building2 className="w-4 h-4" />;
      case 'sponge_iron':
        return <Factory className="w-4 h-4" />;
      case 'pellets':
        return <Zap className="w-4 h-4" />;
      case 'blast_furnace':
        return <Factory className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'steel':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'sponge_iron':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'pellets':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'blast_furnace':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'under_construction':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'planned':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const parseCategories = () => {
    if (!plant.category || !plant.categoryCapacity) return [];
    
    const categories = plant.category.split(',').map(c => c.trim());
    const capacities = plant.categoryCapacity.split(',').map(c => c.trim());
    
    return categories.map((category, index) => ({
      category,
      capacity: capacities[index] || '0'
    }));
  };

  const categoryData = parseCategories();

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 max-w-sm w-full z-[1000] max-h-[80vh] overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{plant.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{plant.district}, {plant.state}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Plant Type and Status */}
        <div className="flex gap-2 flex-wrap">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getTypeColor(plant.type)}`}>
            {getTypeIcon(plant.type)}
            <span className="capitalize">{plant.type.replace('_', ' ')}</span>
          </div>
          <div className={`px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(plant.status)}`}>
            <span className="capitalize">{plant.status.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Total Capacity */}
        {plant.capacity && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-700 mb-1">Total Capacity</div>
            <div className="text-lg font-bold text-gray-900">{plant.capacity}</div>
          </div>
        )}

        {/* Category Details for Steel Plants */}
        {plant.type === 'steel' && categoryData.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-3">Production Categories</div>
            <div className="space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-900">{item.category}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-700">{item.capacity} Tonnes</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coordinates */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm font-medium text-gray-700 mb-1">Coordinates</div>
          <div className="text-sm text-gray-600">
            <div>Lat: {plant.latitude.toFixed(4)}</div>
            <div>Lng: {plant.longitude.toFixed(4)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
