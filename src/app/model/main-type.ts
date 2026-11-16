export interface CountryApiResponse {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
  cca3: string;
}
