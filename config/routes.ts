/*
 * @Author: your name
 * @Date: 2020-11-22 11:42:13
 * @LastEditTime: 2020-12-01 09:54:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \9HospitalFrontend\config\routes.ts
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/dateManager',
    name: 'dateManager',
    icon: 'calendar',
    component: './DateManager',
  },
  {
    path: '/patientList',
    name: 'list.patient-list',
    icon: 'table',
    component: './patientList',
  },
  {
    path: '/patientDetails',
    component: './patientDetails',
    hideInMenu: true,
  },
  {
    path: '/patientEdit',
    component: './patientEdit',
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
