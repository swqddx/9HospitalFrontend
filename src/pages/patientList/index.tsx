import {
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  PicLeftOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import {
  Card,
  Input,
  Breadcrumb,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Tooltip,
  Dropdown,
  Menu,
  Image,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';

import { BASE_URL, requestPatientList } from '@/services/patient';

import { patientInfoProps } from '../../interface/patient';

import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const PatientList: React.FC<any> = () => {
  // const [loading, setLoading] = useState(true);
  const [patientList, setPatientList] = useState<patientInfoProps[]>([]);

  useEffect(() => {
    async function requestData() {
      setPatientList(await requestPatientList());
    }
    requestData();
    // setLoading(false);
  }, []);

  // 事件函数
  const handleFormSubmit = () => {
    return false;
  };

  const handleFormChange = () => {
    return false;
  };

  const onDateChange = () => {
    return false;
  };

  const editPatient = () => {
    return false;
  };

  const addPatient = () => {
    return false;
  };

  const deleteItem = function () {};

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/patientList">患者名单</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>

      <div className={styles.patientBox}>
        <Card bordered={false} bodyStyle={{ marginBottom: 20 }}>
          <Form onValuesChange={handleFormChange}>
            <StandardFormRow title="就诊科目" block style={{ paddingBottom: 11 }}>
              <Form.Item name="category">
                <TagSelect expandable>
                  <TagSelect.Option value="cat1">头部</TagSelect.Option>
                  <TagSelect.Option value="cat2">四肢</TagSelect.Option>
                  <TagSelect.Option value="cat3">关节</TagSelect.Option>
                </TagSelect>
              </Form.Item>
            </StandardFormRow>
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <Form.Item {...formItemLayout} name="rate" label="就诊日期">
                    <DatePicker.RangePicker onChange={onDateChange} />
                  </Form.Item>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <Form.Item {...formItemLayout} name="author" label="就诊医生">
                    <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                      <Option value="lisa">杨凡</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>

        <div className={styles.cardList}>
          <div className={styles.listItem}>
            <Card hoverable bodyStyle={{ width: '100%' }} onClick={addPatient}>
              <div
                style={{
                  height: '164px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  history.push(`/patientEdit?add=${true}`);
                }}
              >
                <PlusOutlined
                  style={{ fontSize: '56px', height: '48px', color: '#585858' }}
                  onClick={editPatient}
                />
              </div>
            </Card>
          </div>

          {patientList?.map((item, index) => {
            return (
              <div className={styles.listItem} key={index}>
                <Card
                  bodyStyle={{ paddingBottom: 20 }}
                  actions={[
                    <Tooltip key="edit" title="信息编辑">
                      <EditOutlined
                        onClick={() => {
                          history.push(`/patientEdit?id=${Number(item.id)}`);
                        }}
                      />
                    </Tooltip>,
                    <Tooltip key="edit" title="查看病历">
                      <PicLeftOutlined
                        onClick={() => {
                          history.push(`/patientDetails?id=${Number(item.id)}`);
                        }}
                      />
                    </Tooltip>,

                    <Tooltip key="download" title="下载病历">
                      <DownloadOutlined />
                    </Tooltip>,

                    <Dropdown
                      key="ellipsis"
                      overlay={
                        <Menu>
                          <Menu.Item>
                            <div
                              onClick={() => {
                                deleteItem(item.id);
                              }}
                            >
                              删除病历
                            </div>
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <EllipsisOutlined />
                    </Dropdown>,
                  ]}
                >
                  <div className={styles.cardBox}>
                    <div className={styles.cardAvatar}>
                      <Image width="80px" height="120px" src={`${BASE_URL}/${item.image}`} />
                    </div>
                    <div className={styles.cardInfo}>
                      <p>姓名: {item.name}</p>
                      <p>年龄: {item.age}</p>
                      <p>医生: {item.surgery_doctor}</p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
