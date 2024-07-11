import { formatDateToISOString } from "./utils";

export type Application = {
  id: string;
  project: {
    id: string;
    name: string;
    anchorAddress: string;
  };
  round: {
    chainId: string;
    id: string;
    roundMetadata: {
      name: string;
    };
  };
};

type GraphQLResponse<T> = {
  data: T;
  errors?: any[];
};

const applicationQuery = (
  projectId: `0x${string}`,
  chainIds: number[],
  now: string,
): string => `
  query ApplicationQuery {
    applications(filter: {
      projectId: { equalTo: "${projectId}" },
      chainId: { in: [${chainIds}] }
      round: {
        donationsStartTime: { lessThan: "${now}" }
        donationsEndTime: { greaterThan: "${now}" }
      }
    }) {
      id
      project {
        id
        name
        anchorAddress
      }
      round {
        chainId
        id
        roundMetadata
      }
    }
  }
`;

const fetchGraphQL = async <T>(
  query: string,
  endpoint: string = "https://grants-stack-indexer-v2.gitcoin.co/graphql",
  variables?: Record<string, unknown>,
): Promise<GraphQLResponse<T>> => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export const fetchActiveApplications = async (
  projectId: `0x${string}`,
  chainIds: number[],
  endpoint?: string,
): Promise<Application[]> => {
  const now = formatDateToISOString(new Date());

  try {
    const query = applicationQuery(projectId, chainIds, now);
    const data = await fetchGraphQL<{ applications: Application[] }>(
      query,
      endpoint,
    );

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error("Error fetching data from GraphQL API.");
    }

    return data.data.applications ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
