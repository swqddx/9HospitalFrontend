import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Upload, Form, Select, message, Breadcrumb } from 'antd';
import {
  // UploadOutlined,
  // DownloadOutlined,
  // CheckOutlined,
  // CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useLocation, Link } from 'umi';
import { requestPatientDetails, addPatient, editPatient, BASE_URL } from '@/services/patient';
import { patientDetailsProps } from '@/interface/patient';
import produce from 'immer';
import moment from 'moment';
import styles from './index.less';

const { Option } = Select;
const { useForm, Item: FormItem } = Form;

const PatientEdit: React.FC = () => {
  const id: number = useLocation().query?.id;
  const add: boolean = useLocation().query?.add;
  const [infoForm] = useForm();
  const [patientDetails, setPatientDetails] = useState({} as patientDetailsProps);

  useEffect(() => {
    if (!add) {
      const requestDetails = async () => {
        const result = await requestPatientDetails(id);
        result.treatment_time = moment(result.treatment_time).format('YYYY-MM-DD');
        setPatientDetails(result);
        const fieldData = Object.keys(result).map((item) => {
          return { name: item, value: result[item] };
        });
        infoForm.setFields(fieldData);
      };
      requestDetails();
    }
  }, []);

  const saveInfo = () => {
    if (add) {
      const info = infoForm.getFieldsValue();
      info.image = patientDetails.image;
      addPatient(info).then((res) => {
        if (res.status === 'success') {
          message.success('添加成功');
        }
      });
    } else {
      const info = infoForm.getFieldsValue();
      info.image = patientDetails.image;

      editPatient(id, info).then((res) => {
        if (res.status === 'success') {
          message.success('修改成功');
        }
      });
    }
  };

  const clearInfo = () => {
    const info = infoForm.getFieldsValue();
    const fieldData = Object.keys(info).map((item) => {
      return { name: item, value: null };
    });
    infoForm.setFields(fieldData);
  };

  const uploadButton = (
    <div
      style={{
        textAlign: 'center',
        width: '100px',
        height: '140px',
        position: 'relative',
        border: 'dashed 1px #666666',
        marginLeft: '60px',
        cursor: 'pointer',
      }}
    >
      <div style={{ transform: 'translateY(-50%)', top: '50%', position: 'relative' }}>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传患者照片</div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.detailBox}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/patientList">患者名单</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>信息编辑</Breadcrumb.Item>
        </Breadcrumb>
        <Form form={infoForm} size="small" style={{ width: '800px' }}>
          <div style={{ margin: '20px 0' }}>
            <h4 style={{ fontWeight: 'bold' }}>患者基本信息</h4>
            <Row align="middle" gutter={[4, 4]}>
              <Col span={8} style={{ margin: 'auto' }}>
                <Upload
                  name="file"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={`${BASE_URL}/patients/save_file`}
                  onChange={(info) => {
                    if (info.file.status === 'done') {
                      const { path } = info.file.response;
                      const real_path = path.split('\\public')[1].replace(/\\/g, '/');
                      setPatientDetails(
                        produce(patientDetails, (draft) => {
                          // eslint-disable-next-line no-param-reassign
                          draft.image = real_path;
                        }),
                      );
                    }
                  }}
                >
                  {patientDetails.image ? (
                    <img
                      src={`${BASE_URL}/${patientDetails.image}`}
                      alt="avatar"
                      style={{ width: '150px', marginLeft: '40px', cursor: 'pointer' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
              <Col span={16}>
                <Row gutter={[16, { xs: 2, sm: 4, md: 8, lg: 12 }]} wrap={false} justify="start">
                  <Col span={12}>
                    <FormItem name="name" label="姓名">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                  <div style={{ display: 'none' }}>
                    <FormItem name="PatientNameEn">
                      <Input size="small" />
                    </FormItem>
                  </div>
                  <div style={{ display: 'none' }}>
                    <FormItem name="ImageData">
                      <Input size="small" />
                    </FormItem>
                  </div>
                  <Col span={12}>
                    <FormItem name="id" label="ID">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[16, { xs: 2, sm: 4, md: 8, lg: 12 }]} wrap={false} justify="start">
                  <Col span={12}>
                    <FormItem name="sex" label="性别">
                      <Select>
                        <Option value="F">女</Option>
                        <Option value="M">男</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem name="age" label="年龄">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[16, { xs: 2, sm: 4, md: 8, lg: 12 }]} wrap={false} justify="start">
                  <Col span={12}>
                    <FormItem name="design_doctor" label="设计医师">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem name="surgery_doctor" label="手术医师">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[16, { xs: 2, sm: 4, md: 8, lg: 12 }]} wrap={false} justify="start">
                  <Col span={24}>
                    <FormItem name="surgery_type" label="手术类型">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h4 style={{ fontWeight: 'bold' }}>患者详细信息</h4>
            <Row align="top" gutter={[4, 4]}>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <FormItem name="tel" label="联系电话">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem name="id_number" label="身份证号">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <FormItem name="mail" label="患者邮箱">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <FormItem
                      name="address"
                      label="家庭住址"
                      initialValue="上海市闵行区东川路800号"
                    >
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <FormItem
                      name="institution"
                      label="就诊医院"
                      initialValue="上海交通大学医学院附属第九人民医院"
                    >
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <FormItem name="treatment_time" label="就诊时间" initialValue="2012-11-01">
                      <Input size="small" />
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <FormItem name="description" label="备注">
                      <Input.TextArea
                        autoSize={{
                          minRows: 8,
                          maxRows: 10,
                        }}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <div style={{ float: 'right' }}>
                  <Button
                    size="middle"
                    type="primary"
                    onClick={clearInfo}
                    style={{ marginRight: '30px' }}
                  >
                    清空
                  </Button>
                  <Button size="middle" type="primary" onClick={saveInfo}>
                    保存
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PatientEdit;
