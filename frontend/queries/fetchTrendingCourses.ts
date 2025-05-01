import { ICourse } from "@/interfaces/ICourse";

export const fetchTrendingCourses = async (limit?: number) => {
  const trendingCourses = await fetch(limit ? `/api/v1/courses/trending?limit=${limit}` : `/api/v1/courses/trending`);

  if (!trendingCourses.ok) {
    throw {
      errorText: `Some error occurred while fetching trending courses. ${trendingCourses.statusText} - ${trendingCourses.status}`,
    };
  }

  const trendingCoursesData: ICourse[] = await trendingCourses.json();

  return trendingCoursesData;
};
