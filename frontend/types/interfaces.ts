 // Aggregate the results into a nested format
export interface Course {
    courseId: number;
    topic: string;
    description: string;
    preferences: {
        level: string;
        duration: string;
        focus: string;
    };
    metadata: any;
    modules: any[];
}