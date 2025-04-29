
export type GenerateCourseRequest = {
    topic: String;
    level: "beginner" | "intermediate" | "advanced";
    duration: "short" | "medium" | "long";
    focus: "broad" | "in-depth";
}
 