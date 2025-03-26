import { NotificationModel } from "@/model/Notification.model";
import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonHttpResult";

export const NotificationService = {
  listFromJson(data: any) {
    const list: NotificationModel[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      list.push({
        id: element._id,
        team: element.team,
        text: element.text,
        task: element.task,
        notiType: element.notiType,
        isRead: element.isRead,
        createdAt: element.createdAt,
      });
    }
    return list;
  },
  itemFromJson(data: any) {
    const item = {
      id: data._id,
      team: data.team,
      text: data.text,
      task: data.task,
      notiType: data.notiType,
      isRead: data.isRead,
      createdAt: data.createdAt,
    };
    return item;
  },
  async getNotificationList(data: any) {
    const res = await HttpService.doGetRequest(
      `/notification/notifications`,
      data
    );
    return parseCommonHttpResult(res);
  },
  async markNotificationRead(data: any) {
    const res = await HttpService.doPutRequest(`/notification/read-noti`, data);
    return parseCommonHttpResult(res);
  },
};
