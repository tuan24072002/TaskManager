import { TaskModel } from "./Task.model";
import { UserModel } from "./User.model";

class NotificationModel {
  id: string;
  team: UserModel[];
  text: string;
  task: TaskModel;
  notiType: notiTypeProps;
  isRead: UserModel[];
  createdAt: string;
  constructor(
    id: string,
    team: UserModel[],
    text: string,
    task: TaskModel,
    notiType: notiTypeProps,
    isRead: UserModel[],
    createdAt: string
  ) {
    this.id = id;
    this.team = team;
    this.text = text;
    this.task = task;
    this.notiType = notiType;
    this.isRead = isRead;
    this.createdAt = createdAt;
  }
  static initial() {
    return {
      id: "",
      team: [UserModel.initial()],
      text: "",
      task: TaskModel.initial(),
      notiType: "alert" as notiTypeProps,
      isRead: [UserModel.initial()],
      createdAt: "",
    };
  }
}
export { NotificationModel };
