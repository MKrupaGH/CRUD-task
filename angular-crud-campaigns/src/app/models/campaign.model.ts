export interface Campaign {
  id: number;
  name: string;
  status: string;
  keyword: string[];
  bidAmount: number;
  campaignFound: number;
  town: string;
  radius: string;
}
