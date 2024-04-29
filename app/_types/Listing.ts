export interface Listing {
  ListingId: number;
  Title: string;
  Category: string;
  StartPrice: number;
  StartDate: string;
  EndDate: string;
  ListingLength: null;
  IsFeatured?: boolean;
  HasGallery: boolean;
  IsBold?: boolean;
  IsHighlighted?: boolean;
  AsAt: string;
  CategoryPath: string;
  PictureHref: string;
  RegionId: number;
  Region: string;
  SuburbId: number;
  Suburb: string;
  NoteDate: string;
  ReserveState: number;
  IsClassified: boolean;
  OpenHomes: any[];
  GeographicLocation: GeographicLocation;
  PriceDisplay: string;
  PhotoUrls: string[];
  AdditionalData: AdditionalData;
  MemberId: number;
  ListingPlatform: number;
  Address: string;
  District: string;
  AgencyReference: string;
  AvailableFrom: string;
  Bathrooms: number;
  Bedrooms: number;
  ListingGroup: string;
  Parking: string;
  PetsOkay: number;
  PropertyType: string;
  RentPerWeek: number;
  SmokersOkay: number;
  Whiteware: string;
  AdjacentSuburbNames: string[];
  AdjacentSuburbIds: number[];
  DistrictId: number;
  Agency: Agency;
  TotalParking?: number;
  PropertyId?: string;
}

export interface AdditionalData {
  BulletPoints: any[];
  Tags: any[];
}

export interface Agency {
  Id: number;
  Name: string;
  PhoneNumber: string;
  Branding: Branding;
  Agents: Agent[];
  IsRealEstateAgency: boolean;
  Website?: string;
  Logo?: string;
}

export interface Agent {
  __type: string;
  FullName: string;
  OfficePhoneNumber: string;
  MembershipType: number;
}

export interface Branding {
  BackgroundColor: string;
  TextColor: string;
  StrokeColor: string;
  OfficeLocation: string;
  LargeBannerURL: string;
}

export interface GeographicLocation {
  Latitude: number;
  Longitude: number;
  Northing: number;
  Easting: number;
  Accuracy: number;
}
