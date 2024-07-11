import { getChains, TChain } from "@gitcoin/gitcoin-chain-data";

export const validateBytes32 = (str: string): boolean => {
  const bytes32Regex = /^0x[a-fA-F0-9]{64}$/;
  return bytes32Regex.test(str);
};

export const formatDateToISOString = (date: Date): string => {
  return date.toISOString().replace(/\.\d+Z$/, "Z");
};

const chainData: TChain[] = getChains();

export const allNetworks = chainData.map((chain) => chain.id);

export const mainnetNetworks = chainData
  .filter((chain) => chain.type === "mainnet")
  .map((chain) => chain.id);
