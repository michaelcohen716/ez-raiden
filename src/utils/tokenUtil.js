import { ethers } from "ethers";
import ERC20ABI from "../contracts/ERC20abi.json";

export const tokenMapping = {
  "0xd3BA0A3Aafca48489722f17E5ab29E67f9913BAc": "TTT"
};

const infuraUrl = `https://mainnet.infura.io/v3/${
  process.env.REACT_APP_INFURA_KEY
}`;
const infuraRinkebyUrl = `https://rinkeby.infura.io/v3/${
  process.env.REACT_APP_INFURA_KEY
}`;

const web3Provider = new ethers.providers.JsonRpcProvider(infuraUrl);
const web3RinkebyProvider = new ethers.providers.JsonRpcProvider(
  infuraRinkebyUrl
);

export const _getSymbol = async addr => {
  try {
    const mainContract = new ethers.Contract(addr, ERC20ABI, web3Provider);
    const mainName = await mainContract.name().catch();
    return mainName;
  } catch {
    const rinkContract = new ethers.Contract(
      addr,
      ERC20ABI,
      web3RinkebyProvider
    );
    const rinkName = await rinkContract.symbol().catch();
    return rinkName;
  }
};
