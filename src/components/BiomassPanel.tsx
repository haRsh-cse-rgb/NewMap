import { useState, useEffect } from 'react';
import { Leaf, TrendingUp, BarChart3, X, Table, BarChart } from 'lucide-react';

interface CropData {
  kharifRice: number;
  rabiRice: number;
  wheat: number;
  cotton: number;
  sugarcane: number;
}

interface District {
  name: string;
  bioenergyPotential: CropData;
  grossBiomass: CropData;
  surplusBiomass: CropData;
}

interface BiomassPanelProps {
  stateName: string | null;
  districtName: string | null;
  onClose: () => void;
}

type ViewMode = 'table' | 'chart';

export default function BiomassPanel({ stateName, districtName, onClose }: BiomassPanelProps) {
  const [districtData, setDistrictData] = useState<District | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'bioenergy' | 'gross' | 'surplus'>('bioenergy');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  useEffect(() => {
    if (stateName && districtName) {
      loadDistrictData(stateName, districtName);
    } else {
      setDistrictData(null);
    }
  }, [stateName, districtName]);

  const loadDistrictData = async (state: string, district: string) => {
    setLoading(true);
    try {
      const fileName = state.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch(`/biomass-data/${fileName}.json`);

      if (!response.ok) {
        setDistrictData(null);
        return;
      }

      const data = await response.json();
      const found = data.districts.find((d: District) => d.name === district);
      setDistrictData(found || null);
    } catch (error) {
      console.error('Error loading district data:', error);
      setDistrictData(null);
    } finally {
      setLoading(false);
    }
  };

  const getCropData = (category: 'bioenergy' | 'gross' | 'surplus'): CropData | null => {
    if (!districtData) return null;

    switch (category) {
      case 'bioenergy':
        return districtData.bioenergyPotential;
      case 'gross':
        return districtData.grossBiomass;
      case 'surplus':
        return districtData.surplusBiomass;
    }
  };

  const getUnit = () => {
    return activeTab === 'bioenergy' ? 'GJ' : 'Kilo tonnes';
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'bioenergy':
        return 'Bioenergy Potential';
      case 'gross':
        return 'Gross Biomass';
      case 'surplus':
        return 'Surplus Biomass';
    }
  };

  const renderTableView = () => {
    const cropData = getCropData(activeTab);
    if (!cropData) return null;

    const crops = [
      { label: 'Kharif Rice', value: cropData.kharifRice },
      { label: 'Rabi Rice', value: cropData.rabiRice },
      { label: 'Wheat', value: cropData.wheat },
      { label: 'Cotton', value: cropData.cotton },
      { label: 'Sugarcane', value: cropData.sugarcane },
    ];

    const hasData = crops.some(c => c.value > 0);

    if (!hasData) {
      return (
        <div className="text-center py-12 text-gray-500">
          No {getTitle()} data available for this district
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Crop Type</th>
              <th className="text-right py-4 px-4 font-semibold text-gray-700">
                Value ({getUnit()})
              </th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              crop.value > 0 && (
                <tr key={crop.label} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800">{crop.label}</td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900">
                    {crop.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderChartView = () => {
    const cropData = getCropData(activeTab);
    if (!cropData) return null;

    const crops = [
      { label: 'Kharif Rice', value: cropData.kharifRice, color: 'bg-amber-500' },
      { label: 'Rabi Rice', value: cropData.rabiRice, color: 'bg-yellow-500' },
      { label: 'Wheat', value: cropData.wheat, color: 'bg-orange-500' },
      { label: 'Cotton', value: cropData.cotton, color: 'bg-blue-500' },
      { label: 'Sugarcane', value: cropData.sugarcane, color: 'bg-green-600' },
    ];

    const maxValue = Math.max(...crops.map(c => c.value));
    const hasData = maxValue > 0;

    if (!hasData) {
      return (
        <div className="text-center py-12 text-gray-500">
          No {getTitle()} data available for this district
        </div>
      );
    }

    return (
      <div className="space-y-6 py-4">
        {crops.map((crop) => (
          crop.value > 0 && (
            <div key={crop.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{crop.label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {crop.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getUnit()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className={`${crop.color} h-full flex items-center justify-end px-3 text-white text-xs font-medium transition-all duration-500`}
                  style={{ width: `${(crop.value / maxValue) * 100}%` }}
                >
                  {((crop.value / maxValue) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    );
  };

  if (!stateName || !districtName) {
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-4 text-gray-700">Loading biomass data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{districtName}</h2>
              <p className="text-sm text-gray-600">{stateName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {!districtData ? (
          <div className="p-8 text-center text-gray-500">
            No biomass data available for this district
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('bioenergy')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'bioenergy'
                      ? 'bg-green-600 text-white font-semibold'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Bioenergy Potential</span>
                </button>
                <button
                  onClick={() => setActiveTab('gross')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'gross'
                      ? 'bg-green-600 text-white font-semibold'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Gross Biomass</span>
                </button>
                <button
                  onClick={() => setActiveTab('surplus')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'surplus'
                      ? 'bg-green-600 text-white font-semibold'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm">Surplus Biomass</span>
                </button>
              </div>

              <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'table'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Table View"
                >
                  <Table className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'chart'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Chart View"
                >
                  <BarChart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {viewMode === 'table' ? renderTableView() : renderChartView()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
