/* eslint-disable func-names */
import { request } from 'umi';

// const BASE_URL = 'http://202.120.37.220:23333';
export const BASE_URL = 'http://localhost:8233';

function get(path: string, params?: object) {
    return request(path, { ...params, method: 'get' })
}

function post(path: string, body: any, params?: object) {
    return request(path, { ...params, method: 'post', body })
}

// 登录请求
export const login = function (username: string, password: string, params?: object) {
    return get(`${BASE_URL}/users/login?username=${username}&&password=${password}`, params).then((res: any) => {
        return res;
    })
}
// 请求单个病人数据信息

// 请求日程实践列表

// 请求病人数据列表
export const requestPatientList = function (params?: object) {
    return get(`${BASE_URL}/patients/patient_list/`, { ...params, method: 'get' }).then((res: any) => {
        return res;
    })
}

// 注册账号

// 修改指定病人的数据
export const editPatient = function (patientId, patientInfo, params?: object) {
    return post(`${BASE_URL}/patients/edit_patient/?patientId=${patientId}`, patientInfo).then((res: any) => {
        return res;
    })
}
// 添加病人基本信息
export const addPatient = function (patientInfo, params?: object) {
    return post(`${BASE_URL}/patients/add_patient/`, patientInfo).then((res: any) => {
        return res;
    })
}
// 上传病人相关文件信息