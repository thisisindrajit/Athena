export interface ICourse {
    courseId: number;
    topic: string;
    description: string;
    preferences: {
        level: string;
        duration: string;
        focus: string;
    };
    metadata: {
        count: {
            lessons: number;
            modules: number;
            activities: number;
        }
    };
    modules: {
        moduleId: number;
        title: string;
        description: string;
        moduleOrder: number;
        content: {
            lessonId?: number;
            activityId?: number;
            title: string;
            displayOrder: number;
            content: any;
            activityType?: string;
        }[]
    }[];
}