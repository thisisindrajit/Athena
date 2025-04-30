import { ISnippet } from "@/interfaces/ISnippet";

export const fetchUserSnippets = async (userId: string) => {
  const userSnippets = await fetch(`/api/v1/${userId}/snippets`);

  if (!userSnippets.ok) {
    throw {
      errorText: `Some error occurred while fetching user snippets. ${userSnippets.statusText} - ${userSnippets.status}`,
    };
  }

  const userSnippetsData: ISnippet[] = await userSnippets.json();

  return userSnippetsData;
};
