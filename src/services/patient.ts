import { request } from 'umi';

const base_url = 'http://202.120.37.220:23333';
// 请求病人数据列表
export const requestPatientList = function (params:any) {
    return request(`${base_url}/get_task/`, { ...params, method: 'get' }).then((res:any) => {
        console.log(res);
        return res;
    })
}