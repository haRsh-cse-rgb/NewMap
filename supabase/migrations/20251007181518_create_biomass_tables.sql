/*
  # Create Biomass Data Tables

  1. New Tables
    - `biomass_data`
      - `id` (uuid, primary key)
      - `district` (text, district name)
      - `state` (text, state name)
      - `bioenergy_potential_kharif_rice` (numeric)
      - `bioenergy_potential_rabi_rice` (numeric)
      - `bioenergy_potential_wheat` (numeric)
      - `bioenergy_potential_cotton` (numeric)
      - `bioenergy_potential_sugarcane` (numeric)
      - `gross_biomass_kharif_rice` (numeric)
      - `gross_biomass_rabi_rice` (numeric)
      - `gross_biomass_wheat` (numeric)
      - `gross_biomass_cotton` (numeric)
      - `gross_biomass_sugarcane` (numeric)
      - `surplus_biomass_kharif_rice` (numeric)
      - `surplus_biomass_rabi_rice` (numeric)
      - `surplus_biomass_wheat` (numeric)
      - `surplus_biomass_cotton` (numeric)
      - `surplus_biomass_sugarcane` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `biomass_data` table
    - Add policy for public read access (data is publicly available)
    - Add policies for authenticated users to insert/update data

  3. Indexes
    - Create index on district for fast lookups
    - Create index on state for state-level aggregations
    - Create composite index on state and district
*/

CREATE TABLE IF NOT EXISTS biomass_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  district text NOT NULL,
  state text NOT NULL,
  bioenergy_potential_kharif_rice numeric DEFAULT 0,
  bioenergy_potential_rabi_rice numeric DEFAULT 0,
  bioenergy_potential_wheat numeric DEFAULT 0,
  bioenergy_potential_cotton numeric DEFAULT 0,
  bioenergy_potential_sugarcane numeric DEFAULT 0,
  gross_biomass_kharif_rice numeric DEFAULT 0,
  gross_biomass_rabi_rice numeric DEFAULT 0,
  gross_biomass_wheat numeric DEFAULT 0,
  gross_biomass_cotton numeric DEFAULT 0,
  gross_biomass_sugarcane numeric DEFAULT 0,
  surplus_biomass_kharif_rice numeric DEFAULT 0,
  surplus_biomass_rabi_rice numeric DEFAULT 0,
  surplus_biomass_wheat numeric DEFAULT 0,
  surplus_biomass_cotton numeric DEFAULT 0,
  surplus_biomass_sugarcane numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE biomass_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read biomass data"
  ON biomass_data FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert biomass data"
  ON biomass_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update biomass data"
  ON biomass_data FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_biomass_district ON biomass_data(district);
CREATE INDEX IF NOT EXISTS idx_biomass_state ON biomass_data(state);
CREATE INDEX IF NOT EXISTS idx_biomass_state_district ON biomass_data(state, district);
CREATE UNIQUE INDEX IF NOT EXISTS idx_biomass_unique_state_district ON biomass_data(state, district);