export interface IGenerateCourseRequest {
    userId: string;
    topic: string;
    preferences:  {
        level: "beginner" | "intermediate" | "advanced";
        duration: "short" | "medium" | "long";
        focus: "broad" | "in-depth";
    };
}
 