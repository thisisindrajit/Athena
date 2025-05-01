import { IModule } from "@/interfaces/IModule";

export const fetchTrendingModules = async (limit?: number) => {
  const trendingModules = await fetch(limit ? `/api/v1/modules/trending?limit=${limit}` : `/api/v1/modules/trending`);

  if (!trendingModules.ok) {
    throw {
      errorText: `Some error occurred while fetching trending modules. ${trendingModules.statusText} - ${trendingModules.status}`,
    };
  }

  const trendingModulesData: IModule[] = await trendingModules.json();

  return trendingModulesData;
};
