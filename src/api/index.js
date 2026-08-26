import { mainWebsiteData, portfolioData } from './mockData';

// Simulating API calls with a slight delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMainData = async () => {
  await delay(500); // Simulate network latency
  return { data: mainWebsiteData };
};

export const fetchPortfolioData = async () => {
  await delay(500);
  return { data: portfolioData };
};
