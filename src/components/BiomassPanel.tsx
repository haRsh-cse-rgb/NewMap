import { useState, useEffect } from 'react';
import { Leaf, TrendingUp, BarChart3, X, Table, BarChart, PieChart, Donut } from 'lucide-react';

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

type CropItem = {
  label: string;
  value: number;
  color: string;
  bgColor: string;
};

type ViewMode = 'table' | 'bar' | 'pie' | 'donut';

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
      { label: 'Kharif Rice', value: cropData.kharifRice, color: '#f59e0b', bgColor: 'bg-amber-500' },
      { label: 'Rabi Rice', value: cropData.rabiRice, color: '#eab308', bgColor: 'bg-yellow-500' },
      { label: 'Wheat', value: cropData.wheat, color: '#f97316', bgColor: 'bg-orange-500' },
      { label: 'Cotton', value: cropData.cotton, color: '#3b82f6', bgColor: 'bg-blue-500' },
      { label: 'Sugarcane', value: cropData.sugarcane, color: '#16a34a', bgColor: 'bg-green-600' },
    ];

    const filteredCrops = crops.filter(crop => crop.value > 0);
    const hasData = filteredCrops.length > 0;

    if (!hasData) {
      return (
        <div className="text-center py-12 text-gray-500">
          No {getTitle()} data available for this district
        </div>
      );
    }

    const totalValue = filteredCrops.reduce((sum, crop) => sum + crop.value, 0);

    if (viewMode === 'pie' || viewMode === 'donut') {
      return renderPieChart(filteredCrops, totalValue);
    }

    return renderBarChart(filteredCrops);
  };

  const renderPieChart = (crops: CropItem[], totalValue: number) => {
    let cumulativePercentage = 0;
    const radius = viewMode === 'donut' ? 60 : 80;
    const innerRadius = viewMode === 'donut' ? 40 : 0;

    return (
      <div className="py-4">
        <div className="relative w-80 h-80 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {crops.length === 1 ? (
              <>
                <circle cx="100" cy="100" r={radius} fill={crops[0].color} />
                {viewMode === 'donut' && (
                  <circle cx="100" cy="100" r={innerRadius} fill="white" />
                )}
              </>
            ) : (
              crops.map((crop) => {
                const percentage = (crop.value / totalValue) * 100;
                const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
                const endAngle = (cumulativePercentage + percentage) * 3.6;
                const largeArcFlag = percentage > 50 ? 1 : 0;
                
                const x1 = 100 + radius * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + radius * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + radius * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 100 + radius * Math.sin((endAngle * Math.PI) / 180);
                
                const x3 = 100 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
                const y3 = 100 + innerRadius * Math.sin((endAngle * Math.PI) / 180);
                const x4 = 100 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
                const y4 = 100 + innerRadius * Math.sin((startAngle * Math.PI) / 180);

                const pathData = viewMode === 'donut' 
                  ? `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`
                  : `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                cumulativePercentage += percentage;

                return (
                  <path
                    key={crop.label}
                    d={pathData}
                    fill={crop.color}
                    stroke="white"
                    strokeWidth="2"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                );
              })
            )}
          </svg>
          
          {viewMode === 'donut' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalValue.toFixed(1)}</div>
                <div className="text-sm text-gray-600">{getUnit()}</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {crops.map((crop) => {
            const percentage = (crop.value / totalValue) * 100;
            return (
              <div key={crop.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: crop.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{crop.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {crop.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getUnit()}
                  </div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBarChart = (crops: CropItem[]) => {
    const maxValue = Math.max(...crops.map(c => c.value));

    return (
      <div className="space-y-4 py-4">
        {crops.map((crop) => (
          <div key={crop.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{crop.label}</span>
              <span className="text-sm font-semibold text-gray-900">
                {crop.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getUnit()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className={`${crop.bgColor} h-full flex items-center justify-end px-3 text-white text-xs font-medium transition-all duration-500`}
                style={{ width: `${(crop.value / maxValue) * 100}%` }}
              >
                {((crop.value / maxValue) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
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
                {/* <button
                  onClick={() => setViewMode('bar')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'bar'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Bar Chart"
                >
                  <BarChart className="w-4 h-4" />
                </button> */}
                <button
                  onClick={() => setViewMode('pie')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'pie'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Pie Chart"
                >
                  <PieChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('donut')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'donut'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Donut Chart"
                >
                  <Donut className="w-4 h-4" />
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
