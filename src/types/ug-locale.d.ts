declare module 'ug-locale' {
  export interface UgDistrict {
    id: string;
    name: string;
  }
  export interface UgCounty {
    id: string;
    name: string;
    district: string;
  }
  export default function createUgLocale(): {
    districts(id?: string): UgDistrict[];
    counties(districtId: string): UgCounty[];
    subCounties(countyId: string): { id: string; name: string; county: string }[];
    parishes(subCountyId: string): { id: string; name: string; subcounty: string }[];
    villages(parishId: string): { id: string; name: string; parish: string }[];
  };
}
