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
  },  {
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
      component:'./patientDetails',
      hideInMenu: true
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
    hideInMenu: true

  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
