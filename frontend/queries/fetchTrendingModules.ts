import { IModule } from "@/interfaces/IModule";

export const fetchTrendingModules = async () => {
  const trendingModules = await fetch(`/api/v1/modules/trending`);

  if (!trendingModules.ok) {
    throw {
      errorText: `Some error occurred while fetching trending modules. ${trendingModules.statusText} - ${trendingModules.status}`,
    };
  }

  const trendingModulesData: IModule[] = await trendingModules.json();

  return trendingModulesData;
};
