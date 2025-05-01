import { ICourse } from "./ICourse";

export interface INotification {
  courseId: ICourse["courseId"];
  courseTopic: ICourse["topic"];
  metadata: ICourse["metadata"];
  createdAt: Date;
}
