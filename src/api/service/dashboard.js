import {HttpRequest} from '../rest/rest.service';

export class DashboardApi extends HttpRequest {
  // 获客地图
  getArea(params) {
    return this.Post('/release/login', params);

  }
 getTableList(params) {
    return this.Get('/release/list', params);
  }
  getStatus(params) {
    return this.Put('/release/unsubscribe', params);
  }
}


















