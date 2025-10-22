import { Plant } from '../types';

export const samplePlants: Plant[] = [
  // Steel Plants with Categories
  {
    id: '1',
    name: 'Tata Steel Jamshedpur',
    type: 'steel',
    latitude: 22.8046,
    longitude: 86.2029,
    state: 'Jharkhand',
    district: 'East Singhbhum',
    capacity: '10 MTPA',
    category: 'BOF, EOF, Induction Furnace',
    categoryCapacity: '6.5, 2.0, 1.5',
    status: 'operational'
  },
  {
    id: '2',
    name: 'JSW Steel Vijayanagar',
    type: 'steel',
    latitude: 15.1594,
    longitude: 76.7674,
    state: 'Karnataka',
    district: 'Ballari',
    capacity: '12 MTPA',
    category: 'BOF, rerolling',
    categoryCapacity: '8.0, 4.0',
    status: 'operational'
  },
  {
    id: '3',
    name: 'SAIL Bhilai Steel Plant',
    type: 'steel',
    latitude: 21.2167,
    longitude: 81.3667,
    state: 'Chhattisgarh',
    district: 'Durg',
    capacity: '4.7 MTPA',
    category: 'BOF, EOF',
    categoryCapacity: '3.2, 1.5',
    status: 'operational'
  },
  {
    id: '4',
    name: 'SAIL Rourkela Steel Plant',
    type: 'steel',
    latitude: 22.2604,
    longitude: 84.8536,
    state: 'Odisha',
    district: 'Sundargarh',
    capacity: '4.5 MTPA',
    category: 'BOF, Induction Furnace, rerolling',
    categoryCapacity: '2.8, 1.0, 0.7',
    status: 'operational'
  },
  {
    id: '5',
    name: 'SAIL Bokaro Steel Plant',
    type: 'steel',
    latitude: 23.6693,
    longitude: 86.1511,
    state: 'Jharkhand',
    district: 'Bokaro',
    capacity: '4.7 MTPA',
    category: 'BOF, EOF',
    categoryCapacity: '3.5, 1.2',
    status: 'operational'
  },
  {
    id: '6',
    name: 'Rashtriya Ispat Nigam (RINL)',
    type: 'steel',
    latitude: 17.6868,
    longitude: 83.2185,
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    capacity: '7.3 MTPA',
    category: 'BOF, rerolling',
    categoryCapacity: '5.0, 2.3',
    status: 'operational'
  },
  {
    id: '7',
    name: 'JSW Steel Salem',
    type: 'steel',
    latitude: 11.6643,
    longitude: 78.1460,
    state: 'Tamil Nadu',
    district: 'Salem',
    capacity: '3.6 MTPA',
    category: 'Induction Furnace, rerolling',
    categoryCapacity: '2.1, 1.5',
    status: 'operational'
  },
  {
    id: '8',
    name: 'JSPL Angul',
    type: 'steel',
    latitude: 20.8395,
    longitude: 85.0939,
    state: 'Odisha',
    district: 'Angul',
    capacity: '6 MTPA',
    category: 'BOF, EOF, Induction Furnace',
    categoryCapacity: '4.0, 1.5, 0.5',
    status: 'operational'
  },
  {
    id: '9',
    name: 'Essar Steel Hazira',
    type: 'steel',
    latitude: 21.1086,
    longitude: 72.6447,
    state: 'Gujarat',
    district: 'Surat',
    capacity: '10 MTPA',
    category: 'BOF, rerolling',
    categoryCapacity: '7.0, 3.0',
    status: 'operational'
  },
  {
    id: '10',
    name: 'Bhushan Steel Jharsuguda',
    type: 'steel',
    latitude: 21.8620,
    longitude: 84.0100,
    state: 'Odisha',
    district: 'Jharsuguda',
    capacity: '2.8 MTPA',
    category: 'EOF, Induction Furnace',
    categoryCapacity: '1.8, 1.0',
    status: 'operational'
  },
  {
    id: '20',
    name: 'Bhushan Steel Raipur',
    type: 'steel',
    latitude: 21.2514,
    longitude: 81.6296,
    state: 'Chhattisgarh',
    district: 'Raipur',
    capacity: '3.5 MTPA',
    category: 'BOF, rerolling',
    categoryCapacity: '2.5, 1.0',
    status: 'under_construction'
  },

  // Sponge Iron Plants
  {
    id: '11',
    name: 'Sree Metaliks Sponge Iron',
    type: 'sponge_iron',
    latitude: 22.5726,
    longitude: 88.3639,
    state: 'West Bengal',
    district: 'Kolkata',
    capacity: '0.5 MTPA',
    status: 'operational'
  },
  {
    id: '12',
    name: 'Vandana Global Sponge Iron',
    type: 'sponge_iron',
    latitude: 21.8974,
    longitude: 82.6927,
    state: 'Chhattisgarh',
    district: 'Raigarh',
    capacity: '0.4 MTPA',
    status: 'operational'
  },
  {
    id: '13',
    name: 'Raipur Sponge Iron Plant',
    type: 'sponge_iron',
    latitude: 21.2514,
    longitude: 81.6296,
    state: 'Chhattisgarh',
    district: 'Raipur',
    capacity: '0.3 MTPA',
    status: 'operational'
  },
  {
    id: '14',
    name: 'Adhunik Metaliks',
    type: 'sponge_iron',
    latitude: 23.5204,
    longitude: 87.3119,
    state: 'West Bengal',
    district: 'Purba Bardhaman',
    capacity: '0.6 MTPA',
    status: 'operational'
  },
  {
    id: '18',
    name: 'Kamdhenu Sponge Iron',
    type: 'sponge_iron',
    latitude: 28.7041,
    longitude: 77.1025,
    state: 'Delhi',
    district: 'New Delhi',
    capacity: '0.2 MTPA',
    status: 'operational'
  },

  // Pellets Plants
  {
    id: '21',
    name: 'KIOCL Limited Mangalore',
    type: 'pellets',
    latitude: 12.9141,
    longitude: 74.8560,
    state: 'Karnataka',
    district: 'Dakshina Kannada',
    capacity: '3.5 MTPA',
    status: 'operational'
  },
  {
    id: '22',
    name: 'Essar Steel Pellet Plant',
    type: 'pellets',
    latitude: 21.1086,
    longitude: 72.6447,
    state: 'Gujarat',
    district: 'Surat',
    capacity: '6.0 MTPA',
    status: 'operational'
  },
  {
    id: '23',
    name: 'JSW Steel Pellet Plant',
    type: 'pellets',
    latitude: 15.1594,
    longitude: 76.7674,
    state: 'Karnataka',
    district: 'Ballari',
    capacity: '4.0 MTPA',
    status: 'operational'
  },
  {
    id: '24',
    name: 'Tata Steel Pellet Plant',
    type: 'pellets',
    latitude: 22.8046,
    longitude: 86.2029,
    state: 'Jharkhand',
    district: 'East Singhbhum',
    capacity: '2.5 MTPA',
    status: 'operational'
  },

  // Blast Furnace Plants
  {
    id: '25',
    name: 'SAIL Bhilai Blast Furnace',
    type: 'blast_furnace',
    latitude: 21.2167,
    longitude: 81.3667,
    state: 'Chhattisgarh',
    district: 'Durg',
    capacity: '4.0 MTPA',
    status: 'operational'
  },
  {
    id: '26',
    name: 'Tata Steel Blast Furnace',
    type: 'blast_furnace',
    latitude: 22.8046,
    longitude: 86.2029,
    state: 'Jharkhand',
    district: 'East Singhbhum',
    capacity: '3.2 MTPA',
    status: 'operational'
  },
  {
    id: '27',
    name: 'JSW Steel Blast Furnace',
    type: 'blast_furnace',
    latitude: 15.1594,
    longitude: 76.7674,
    state: 'Karnataka',
    district: 'Ballari',
    capacity: '2.8 MTPA',
    status: 'operational'
  },
  {
    id: '28',
    name: 'RINL Blast Furnace',
    type: 'blast_furnace',
    latitude: 17.6868,
    longitude: 83.2185,
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    capacity: '3.5 MTPA',
    status: 'operational'
  }
];

export const indiaStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];
