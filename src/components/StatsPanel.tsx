import { Factory, Zap, MapPin, Building2 } from 'lucide-react';
import { Plant } from '../types';

interface StatsPanelProps {
  plants: Plant[];
}

export default function StatsPanel({ plants }: StatsPanelProps) {
  const totalPlants = plants.length;
  const underConstructionPlants = plants.filter(p => p.status === 'under_construction').length;
  const uniqueDistricts = new Set(plants.map(p => p.district)).size;
  const uniqueStates = new Set(plants.map(p => p.state)).size;

  const steelPlants = plants.filter(p => p.type === 'steel').length;
  const spongeIronPlants = plants.filter(p => p.type === 'sponge_iron').length;
  const pelletsPlants = plants.filter(p => p.type === 'pellets').length;
  const blastFurnacePlants = plants.filter(p => p.type === 'blast_furnace').length;

  const stats = [
    {
      label: 'Total Plants',
      value: totalPlants,
      icon: Factory,
      color: 'bg-blue-500'
    },
    // {
    //   label: 'Under Construction',
    //   value: underConstructionPlants,
    //   icon: Building2,
    //   color: 'bg-yellow-500'
    // },
    {
      label: 'States',
      value: uniqueStates,
      icon: MapPin,
      color: 'bg-orange-500'
    },
    {
      label: 'Districts',
      value: uniqueDistricts,
      icon: MapPin,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className={`${stat.color} rounded-lg p-2`}>
                <stat.icon className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Distribution by Type</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-gray-700">Steel</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{steelPlants}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${(steelPlants / totalPlants) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium text-gray-700">Sponge Iron</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{spongeIronPlants}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all"
                style={{ width: `${(spongeIronPlants / totalPlants) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-gray-700">Pellets</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{pelletsPlants}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(pelletsPlants / totalPlants) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm font-medium text-gray-700">Blast Furnace</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{blastFurnacePlants}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${(blastFurnacePlants / totalPlants) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
