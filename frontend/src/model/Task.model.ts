class TaskModel {
  id: string;
  title: string;
  date: string;
  priority: string;
  stage: stageProps;
  assets: string[];
  team: userProps[];
  isTrashed: boolean;
  activities: activitiesProps[];
  subTasks: subTasksProps[];
  description: string;
  createdAt: string;
  updatedAt: string;
  constructor(
    id: string,
    title: string,
    date: string,
    priority: string,
    stage: stageProps,
    assets: string[],
    team: userProps[],
    isTrashed: boolean,
    activities: activitiesProps[],
    subTasks: subTasksProps[],
    description: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.stage = stage;
    this.assets = assets;
    this.team = team;
    this.isTrashed = isTrashed;
    this.activities = activities;
    this.subTasks = subTasks;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static initial() {
    return {
      id: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      priority: "",
      stage: "todo" as stageProps,
      assets: [],
      team: [],
      isTrashed: false,
      activities: [],
      subTasks: [],
      description: "",
      createdAt: "",
      updatedAt: "",
    };
  }
}
export { TaskModel };
