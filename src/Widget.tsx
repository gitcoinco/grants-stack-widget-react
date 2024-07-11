import * as React from "react";
import { useEffect, useState } from "react";
import "./Widget.css";
import { Application, fetchActiveApplications } from "./query";
import { allNetworks, mainnetNetworks, validateBytes32 } from "./utils";
import Logo from "./Logo";

interface WidgetProps {
  projectId: `0x${string}`;
  scale?: number;
  testnet?: boolean;
  explorerUrl?: string;
  indexerEndpoint?: string;
  chainsOverride?: number[];
}

const Widget: React.FC<WidgetProps> = ({
  projectId,
  scale = 1,
  testnet = false,
  explorerUrl,
  indexerEndpoint,
  chainsOverride,
}) => {
  const lowercasedProjectId = projectId.toLowerCase() as `0x${string}`;

  if (!validateBytes32(lowercasedProjectId)) {
    throw new Error("Invalid projectId: must be a valid bytes32 string.");
  }

  const [options, setOptions] = useState<Application[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("0");

  const chains = chainsOverride ?? testnet ? allNetworks : mainnetNetworks;

  useEffect(() => {
    fetchActiveApplications(lowercasedProjectId, chains, indexerEndpoint)
      .then((data) => setOptions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [lowercasedProjectId, indexerEndpoint]);

  const scaleStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top left",
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.value;
    setSelectedOption(selectedIndex);

    const explorer = explorerUrl ?? "https://explorer.gitcoin.co";

    if (selectedIndex === "0") {
      // Do nothing for the "Select an option" entry
      return;
    } else if (selectedIndex === "1") {
      // Open specific link for the hardcoded option
      window.open(`${explorer}/#/projects/${lowercasedProjectId}`, "_blank");
    } else {
      // Open link for the selected application
      const appIndex = parseInt(selectedIndex, 10) - 2;
      const selectedApplication = options[appIndex];
      const url = `${explorer}/#/round/${selectedApplication.round.chainId}/${selectedApplication.round.id}/${selectedApplication.id}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="widget-container" style={scaleStyle}>
      <div className="widget-logo-container">
        <Logo />
      </div>
      <div className="widget-select-container">
        <select
          className="widget-select"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="0" disabled>
            Donate on Gitcoin.co
          </option>
          <option value="1">Direct Donation</option>
          {options?.length > 0 &&
            options.map((application, index) => (
              <option key={index + 2} value={(index + 2).toString()}>
                {application.project.name.slice(0, 26) + "..."}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Widget;
