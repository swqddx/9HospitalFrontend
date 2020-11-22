import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 上海交通大学联合定制"
    links={[
      {
        key: 'Ant Design Pro',
        title: '上海交通大学',
        href: 'https://www.sjtu.edu.cn/',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: '9hospital',
        title: '上海市第九人民医院',
        href: 'http://www.9hospital.com.cn/',
        blankTarget: true,
      },
    ]}
  />
);
