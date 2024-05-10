import { Listing } from "./Listing";

export interface AxiosProperties {
  data: Data;
  status: number;
  statusText: string;
  headers: UseUserHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Request;
  headers: ConfigHeaders;
  params: Request;
  method: string;
  url: string;
}

export interface Request {}

export interface ConfigHeaders {
  Accept: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Data {
  TotalCount: number;
  Page: number;
  PageSize: number;
  List: Listing[];
  FoundCategories: any[];
  SearchQueryId: string;
}

export interface AdditionalData {
  BulletPoints: any[];
  Tags: any[];
}

export interface Agency {
  Id: number;
  Name: Name;
  PhoneNumber: PhoneNumber;
  Branding: Branding;
  Agents: Agent[];
  IsRealEstateAgency: boolean;
  IsLicensedPropertyAgency?: boolean;
  Website?: string;
  Logo?: string;
}

export interface Agent {
  __type: Type;
  FullName: string;
  OfficePhoneNumber?: string;
  MembershipType: number;
  MobilePhoneNumber?: string;
}

export enum Type {
  PropertyAgentHTTPAPITrademeCoNzV1 = "PropertyAgent:http://api.trademe.co.nz/v1",
}

export interface Branding {
  BackgroundColor: BackgroundColor;
  TextColor: string;
  StrokeColor: StrokeColor;
  OfficeLocation: string;
  LargeBannerURL: string;
}

export enum BackgroundColor {
  Empty = "",
  The2174Ff = "#2174ff",
}

export enum StrokeColor {
  Empty = "",
  The000000 = "#000000",
}

export enum Name {
  Harcourts = "Harcourts",
  Palace = "Palace",
  Quinovic = "Quinovic",
  RealEstateAgentTestLicensedREAA2008 = "real estate agent test, (Licensed: REAA 2008)",
}

export enum PhoneNumber {
  The6411234567 = "+64-1-1234567",
  The6433385924 = "+64-3-3385924",
  The6493613665 = "+64-9-3613665",
}

export enum AsAt {
  Date1715316124693 = "/Date(1715316124693)/",
  Date1715316124709 = "/Date(1715316124709)/",
  Date1715316124724 = "/Date(1715316124724)/",
  Date1715316124740 = "/Date(1715316124740)/",
}

export enum Category {
  The035057484233 = "0350-5748-4233-",
}

export enum CategoryPath {
  TradeMePropertyResidentialToRent = "/Trade-Me-Property/Residential/To-Rent",
}

export enum District {
  ChristchurchCity = "Christchurch City",
}

export interface GeographicLocation {
  Latitude: number;
  Longitude: number;
  Northing: number;
  Easting: number;
  Accuracy: number;
}

export enum ListingGroup {
  Flat = "FLAT",
}

export enum NoteDate {
  Date0 = "/Date(0)/",
}

export enum PropertyType {
  Apartment = "Apartment",
  House = "House",
  Townhouse = "Townhouse",
  Unit = "Unit",
}

export enum Region {
  Canterbury = "Canterbury",
}

export interface UseUserHeaders {
  connection: string;
  "content-type": string;
  date: string;
  "keep-alive": string;
  "transfer-encoding": string;
  vary: string;
}
