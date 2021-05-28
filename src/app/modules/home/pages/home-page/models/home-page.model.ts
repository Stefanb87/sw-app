export interface SWItem {
  created: string;
  edited: string;
  url: string;
  birth_year?: string;
  category?: string;
  homeworld?: string;
  name?: string;
  eye_color?: string;
  gender?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  skin_color?: string;
  climate?: string;
  diameter?: string;
  gravity?: string;
  orbital_period?: string;
  population?: string;
  rotation_period?: string;
  surface_water?: string;
  terrain?: string;
  director?: string;
  opening_crawl?: string;
  producer?: string;
  release_date?: string;
  title?: string;
  average_height?: string;
  average_lifespan?: string;
  classification?: string;
  designation?: string;
  eye_colors?: string;
  hair_colors?: string;
  language?: string;
  skin_colors?: string;
  cargo_capacity?: string;
  consumables?: string;
  cost_in_credits?: string;
  crew?: string;
  length?: string;
  manufacturer?: string;
  max_atmosphering_speed?: string;
  model?: string;
  passengers?: string;
  vehicle_class?: string;
  MGLT?: string;
  hyperdrive_rating?: string;
  starship_class?: string;
  films?: string[];
  pilots?: string[];
  starships?: string[];
}

export interface MainApis {
  films: string;
  people: string;
  planets: string;
  species: string;
  vehicles: string;
  starships: string;
}

export interface ApiData {
  count: number;
  previous: string;
  next: string;
  results: SWItem[];
}

export interface ApiDataSaved {
  category: string;
  count?: number;
  items: any;
  numberOfPages?: number;
  url: string;
}

export interface DropDownItem {
  value: string;
  selected: boolean;
}
