import { UserModel } from "@/model/User.model";
import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonHttpResult";
export const UserService = {
  listFromJson(data: any) {
    const list: UserModel[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      list.push({
        id: element._id,
        name: element.name,
        title: element.title,
        role: element.role,
        isActive: element.isActive,
        email: element.email,
        createdAt: element.createdAt,
      });
    }
    return list;
  },
  itemFromJson(data: any) {
    const item = {
      id: data._id,
      name: data.name,
      title: data.title,
      role: data.role,
      isActive: data.isActive,
      email: data.email,
      createdAt: data.createdAt,
    };
    return item;
  },
  async getTeam(data: any) {
    const res = await HttpService.doGetRequest(`/user/get-team`, data);
    return parseCommonHttpResult(res);
  },
  async updateUserProfile(data: any) {
    const res = await HttpService.doPutRequest(`/user/profile`, data);
    return parseCommonHttpResult(res);
  },
  async changeUserPassword(data: any) {
    const res = await HttpService.doPutRequest(`/user/change-password`, data);
    return parseCommonHttpResult(res);
  },
  async activateUserProfile(data: any) {
    const res = await HttpService.doPutRequest(`/user/${data?.id}`, data?.data);
    return parseCommonHttpResult(res);
  },
  async deleteUserProfile(data: any) {
    const res = await HttpService.doDeleteRequest(
      `/user/${data?.id}`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
};
