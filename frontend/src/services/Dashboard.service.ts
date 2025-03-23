import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonHttpResult";
export const DashboardService = {
  async getAll(data: any) {
    const res = await HttpService.doGetRequest(`/task/dashboard`, data);
    return parseCommonHttpResult(res);
  },
};
