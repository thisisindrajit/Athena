import { ICourse } from "./ICourse";

export interface ISnippet {
    courseId: ICourse["courseId"],
    courseTopic: ICourse["topic"],
    moduleTitle: ICourse["modules"][0]["title"],
    moduleDescription: ICourse["modules"][0]["description"],
    preferences: ICourse["preferences"]
}