import { http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "VenturePicks",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  ssr: true,
});
