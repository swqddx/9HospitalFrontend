/*
 * @Author: your name
 * @Date: 2020-11-22 11:42:13
 * @LastEditTime: 2020-12-03 22:07:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \9HospitalFrontend\src\services\patient.ts
 */
/* eslint-disable func-names */
import { request } from 'umi';
import { patientDetailsProps, patientInfoProps } from '@/interface/patient';
// const BASE_URL = 'http://202.120.37.220:23333';
export const BASE_URL = 'http://localhost:8233';

function get(path: string, params?: object) {
  return request(path, { ...params, method: 'get' });
}

function post(path: string, body: any, params?: object) {
  return request(path, {
    ...params,
    method: 'post',
    data: body,
    charset: 'utf8',
    requestType: 'json',
  });
}

// 注册账号

// 登录请求
export const login = function (username: string, password: string, params?: object) {
  return get(`${BASE_URL}/users/login?username=${username}&&password=${password}`, params).then(
    (res: any) => {
      return res as patientInfoProps[];
    },
  );
};

// 请求日程实践列表
export const requestDocSchedule = function (params?: object) {
  return get(`${BASE_URL}/patients/schedule`, { ...params }).then((res) => {
    return res;
  });
};

// 请求单个病人的数据信息
export const requestPatientDetails = function (id: number, params?: object) {
  return get(`${BASE_URL}/patients/patient_details?id=${id}`, { ...params }).then((res) => {
    return res as patientDetailsProps;
  });
};

// 请求单个病人阶段时间信息
export const requestPatientSchedule = function (id: number, params?: object) {
  return get(`${BASE_URL}/patients/patient_schedule?id=${id}`, { ...params }).then((res) => {
    return res;
  });
};

// 请求病人CT列表信息
export const requestCtList = function (id: number, params?: object) {
  return get(`${BASE_URL}/patients/ct_list?id=${id}`, { ...params }).then((res) => {
    console.log(res);
    return res;
  });
};

// 请求病人数据列表
export const requestPatientList = function (params?: object) {
  return get(`${BASE_URL}/patients/patient_list/`, { ...params }).then((res: any) => {
    return res;
  });
};

// 修改指定病人的数据
export const editPatient = function (
  id: number,
  patientInfo: patientDetailsProps,
  params?: object,
) {
  return post(`${BASE_URL}/patients/edit_patient/?id=${id}`, patientInfo, params).then(
    (res: any) => {
      return res;
    },
  );
};

// 添加病人基本信息
export const addPatient = function (patientInfo: patientDetailsProps, params?: object) {
  return post(`${BASE_URL}/patients/add_patient/`, patientInfo, params).then((res: any) => {
    return res;
  });
};

// 上传病人相关文件信息
