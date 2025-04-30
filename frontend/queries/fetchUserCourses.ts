import { ICourse } from "@/interfaces/ICourse";

export const fetchUserCourses = async (userId: string) => {
  const userCourses = await fetch(`/api/v1/${userId}/courses`);

  if (!userCourses.ok) {
    throw {
      errorText: `Some error occurred while fetching user courses. ${userCourses.statusText} - ${userCourses.status}`,
    };
  }

  const userCoursesData: ICourse[] = await userCourses.json();

  return userCoursesData;
};
