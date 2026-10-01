import { mainWebsiteData, portfolioData } from './mockData';

/* The data is bundled locally, so the "network" call is instant in practice.
   A tiny delay is kept only to preserve the loading-state UI, and it is
   short enough not to feel like a stall. */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchMainData = async () => {
  await delay(0);
  return { data: mainWebsiteData };
};

export const fetchPortfolioData = async () => {
  await delay(0);
  return { data: portfolioData };
};
