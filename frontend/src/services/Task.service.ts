import { TaskModel } from "@/model/Task.model";
import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonHttpResult";
export const TaskService = {
  listFromJson(data: any) {
    const list: TaskModel[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      list.push({
        id: element._id,
        title: element.title,
        date: element.date,
        priority: element.priority,
        stage: element.stage,
        assets: element.assets,
        team: element.team,
        isTrashed: element.isTrashed,
        activities: element.activities,
        subTasks: element.subTasks,
        description: element.description,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
      });
    }
    return list;
  },
  itemFromJson(data: any) {
    const item = {
      id: data._id,
      title: data.title,
      date: data.date,
      priority: data.priority,
      stage: data.stage,
      assets: data.assets,
      team: data.team,
      isTrashed: data.isTrashed,
      activities: data.activities,
      subTasks: data.subTasks,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    return item;
  },
  async getAll(data: any) {
    const res = await HttpService.doGetRequest(`/task`, data);
    return parseCommonHttpResult(res);
  },
  async getItem(data: any) {
    const res = await HttpService.doGetRequest(`/task/${data?.id}`, data);
    return parseCommonHttpResult(res);
  },
  async addItem(data: any) {
    const res = await HttpService.doPostRequest(`/task/create`, data?.data);
    return parseCommonHttpResult(res);
  },
  async editItem(data: any) {
    const res = await HttpService.doPutRequest(
      `/task/update/${data?.id}`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async softDeleteItem(data: any) {
    const res = await HttpService.doDeleteRequest(
      `/task/delete-restore/${data?.id}?actionType=softDelete`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async deleteItem(data: any) {
    const res = await HttpService.doDeleteRequest(
      `/task/delete-restore/${data?.id}?actionType=delete`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async deleteAllItem(data: any) {
    const res = await HttpService.doDeleteRequest(
      `/task/delete-restore?actionType=deleteAll`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async restoreItem(data: any) {
    const res = await HttpService.doDeleteRequest(
      `/task/delete-restore/${data?.id}?actionType=restore`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async restoreAllItem(data: any) {
    const res = await HttpService.doDeleteRequest(
      `/task/delete-restore?actionType=restoreAll`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
};
