import { useState, useMemo } from 'react';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import StatsPanel from './components/StatsPanel';
import BiomassPanel from './components/BiomassPanel';
import BiomassSelector from './components/BiomassSelector';
import PlantDetailsCapsule from './components/PlantDetailsCapsule';
import { samplePlants } from './data/samplePlants';
import { Plant, PlantType } from './types';
import { ArrowLeft, Map as MapIcon, X, Menu } from 'lucide-react';

function App() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<PlantType | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [biomassState, setBiomassState] = useState<string | null>(null);
  const [biomassDistrict, setBiomassDistrict] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlantForDetails, setSelectedPlantForDetails] = useState<Plant | null>(null);

  const filteredPlants = useMemo(() => {
    let filtered = samplePlants;

    if (selectedState) {
      filtered = filtered.filter(p => p.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(p => p.district === selectedDistrict);
    }
    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    return filtered;
  }, [selectedState, selectedDistrict, selectedType]);

  const handlePlantSelect = (plant: Plant | null) => {
    setSelectedPlant(plant);
    setSelectedPlantForDetails(plant);
    if (plant) {
      setSelectedState(plant.state);
      setSelectedDistrict(plant.district);
    }
  };

  const handleBackToIndia = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedPlant(null);
    setSelectedPlantForDetails(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="h-screen flex flex-col">
        <header className="bg-white shadow-md border-b border-gray-200 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-2">
                  <MapIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">India Industrial Map</h1>
                  <p className="text-sm text-gray-600">Steel, Sponge Iron, Pellets & Blast Furnace Plants</p>
                </div>
              </div>
              {selectedDistrict && (
                <button
                  onClick={handleBackToIndia}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to India Map
                </button>
              )}
            </div>
            <SearchBar
              plants={samplePlants}
              onPlantSelect={handlePlantSelect}
              selectedPlant={selectedPlant}
            />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-4 right-4 z-40 bg-white rounded-lg shadow-lg p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <aside className="hidden lg:block w-80 bg-slate-50 border-r border-gray-200 overflow-y-auto p-4 space-y-4">
            <StatsPanel plants={filteredPlants} />
            <FilterPanel
              plants={samplePlants}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              selectedType={selectedType}
              onStateChange={setSelectedState}
              onDistrictChange={setSelectedDistrict}
              onTypeChange={setSelectedType}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              showHeader={true}
            />
            <BiomassSelector
              onDistrictSelect={(state, district) => {
                setBiomassState(state);
                setBiomassDistrict(district);
              }}
            />
          </aside>

          {/* Mobile Sidebar */}
          <div className="lg:hidden">
            <div className={`
              fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              top-0 left-0 h-full w-80 bg-white shadow-xl lg:shadow-lg
              lg:rounded-xl lg:p-6 p-6 space-y-6 overflow-y-auto
            `}>
              <div className="flex items-center justify-between mb-4 pt-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">Filters & Data</h2>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <StatsPanel plants={filteredPlants} />
              
              <FilterPanel
                plants={samplePlants}
                selectedState={selectedState}
                selectedDistrict={selectedDistrict}
                selectedType={selectedType}
                onStateChange={setSelectedState}
                onDistrictChange={setSelectedDistrict}
                onTypeChange={setSelectedType}
                isOpen={true}
                onToggle={() => {}}
                showHeader={false}
              />
              
              <BiomassSelector
                onDistrictSelect={(state, district) => {
                  setBiomassState(state);
                  setBiomassDistrict(district);
                }}
              />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>

          <main className="flex-1 relative">
            {selectedDistrict && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg z-10 border border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Viewing</div>
                  <div className="font-semibold text-gray-900">{selectedDistrict}, {selectedState}</div>
                </div>
              </div>
            )}
            <MapView
              plants={filteredPlants}
              selectedDistrict={selectedDistrict}
              onMarkerClick={handlePlantSelect}
            />
          </main>
        </div>

        <BiomassPanel
          stateName={biomassState}
          districtName={biomassDistrict}
          onClose={() => {
            setBiomassState(null);
            setBiomassDistrict(null);
          }}
        />

        {/* Plant Details Capsule */}
        {selectedPlantForDetails && (
          <PlantDetailsCapsule
            plant={selectedPlantForDetails}
            onClose={() => setSelectedPlantForDetails(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
