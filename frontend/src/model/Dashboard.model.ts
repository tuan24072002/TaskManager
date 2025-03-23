class DashboardModel {
  totalTasks: number;
  last10Task: taskProps[];
  users: userProps[];
  tasks: typeTaskProps;
  graphData: graphDataProps[];
  constructor(
    totalTasks: number,
    last10Task: taskProps[],
    users: userProps[],
    tasks: typeTaskProps,
    graphData: graphDataProps[]
  ) {
    this.totalTasks = totalTasks;
    this.last10Task = last10Task;
    this.users = users;
    this.tasks = tasks;
    this.graphData = graphData;
  }
  static initial() {
    return {
      totalTasks: 0,
      last10Task: [],
      users: [],
      tasks: {
        todo: 0,
        "in progress": 0,
        completed: 0,
      },
      graphData: [],
    };
  }
}
export { DashboardModel };
