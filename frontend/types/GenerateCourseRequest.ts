export type GenerateCourseRequest = {
    userId: string;
    topic: String;
    preferences:  {
        level: "beginner" | "intermediate" | "advanced";
        duration: "short" | "medium" | "long";
        focus: "broad" | "in-depth";
    };
}
 