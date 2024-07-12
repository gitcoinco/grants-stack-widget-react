declare module "@gitcoin/grants-stack-widget-react" {
  import { FC } from "react";

  export interface WidgetProps {
    projectId: `0x${string}`;
    scale?: number;
    testnet?: boolean;
    explorerUrl?: string;
    indexerEndpoint?: string;
    chainsOverride?: number[];
  }

  const Widget: FC<WidgetProps>;
  export default Widget;
}
