import { ICourse } from "@/interfaces/ICourse";

export const fetchTrendingCourses = async () => {
  const trendingCourses = await fetch(`/api/v1/courses/trending`);

  if (!trendingCourses.ok) {
    throw {
      errorText: `Some error occurred while fetching trending courses. ${trendingCourses.statusText} - ${trendingCourses.status}`,
    };
  }

  const trendingCoursesData: ICourse[] = await trendingCourses.json();

  return trendingCoursesData;
};
