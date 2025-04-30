import { IModule } from "@/interfaces/IModule";

export const fetchUserModules = async (userId: string) => {
  const userModules = await fetch(`/api/v1/${userId}/modules`);

  if (!userModules.ok) {
    throw {
      errorText: `Some error occurred while fetching user modules. ${userModules.statusText} - ${userModules.status}`,
    };
  }

  const userModulesData: IModule[] = await userModules.json();

  return userModulesData;
};
