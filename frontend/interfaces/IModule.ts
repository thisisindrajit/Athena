import { ICourse } from "./ICourse";

export interface IModule {
    courseId: ICourse["courseId"],
    courseTopic: ICourse["topic"],
    moduleId: ICourse["modules"][0]["moduleId"],
    moduleTitle: ICourse["modules"][0]["title"],
    moduleDescription: ICourse["modules"][0]["description"],
    preferences: ICourse["preferences"]
}