import { Campaign } from '../models/campaign.model';

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: 'Campaign 1',
    keyword: ['Algae', 'Icelandic'],
    bidAmount: 1000,
    campaignFund: 10000,
    status: 'on',
    town: 'New York',
    radius: 40,
  },
  {
    id: 2,
    name: 'Campaign 2',
    keyword: ['Radicals', 'Tagalog'],
    bidAmount: 2000,
    campaignFund: 10000,
    status: 'off',
    town: 'New York',
    radius: 100,
  },
  {
    id: 3,
    name: 'Campaign 4',
    keyword: ['Algae', 'Dances'],
    bidAmount: 3000,
    campaignFund: 10000,
    status: 'on',
    town: 'New York',
    radius: 300,
  },
  {
    id: 4,
    name: 'Campaign 5',
    keyword: ['Algae', 'Dances'],
    bidAmount: 3000,
    campaignFund: 20000,
    status: 'off',
    town: 'New York',
    radius: 300,
  },
  {
    id: 5,
    name: 'Campaign 3',
    keyword: ['Algae', 'Dances'],
    bidAmount: 3000,
    campaignFund: 30000,
    status: 'on',
    town: 'New York',
    radius: 300,
  },
];
