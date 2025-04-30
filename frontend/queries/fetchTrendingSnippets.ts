import { ISnippet } from "@/interfaces/ISnippet";

export const fetchTrendingSnippets = async () => {
  const trendingSnippets = await fetch(`/api/v1/snippets/trending`);

  if (!trendingSnippets.ok) {
    throw {
      errorText: `Some error occurred while fetching trending snippets. ${trendingSnippets.statusText} - ${trendingSnippets.status}`,
    };
  }

  const trendingSnippetsData: ISnippet[] = await trendingSnippets.json();

  return trendingSnippetsData;
};
