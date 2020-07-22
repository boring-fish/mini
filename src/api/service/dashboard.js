import {HttpRequest} from '../rest/rest.service';

export class DashboardApi extends HttpRequest {
  // 登录
  getArea(params) {
    return this.Post('/release/login', params);

  }
  //用户信息
 getTableList(params) {
    return this.Get('/release/list', params);
  }
  //状态修改
  getStatus(params) {
    return this.Put('/release/unsubscribe', params);
  }
}


















