import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Row,
  Col,
  Steps,
  Card,
  Drawer,
  Upload,
  message,
  Input,
  Button,
  Modal,
} from 'antd';
import {
  BarsOutlined,
  DownloadOutlined,
  CheckOutlined,
  CloseOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { patientDetailsProps, patientScheduleProps } from '@/interface/patient';
import {
  requestPatientDetails,
  BASE_URL,
  requestPatientSchedule,
  requestCtList,
  changeItem,
} from '@/services/patient';
import { Link, useLocation } from 'umi';
import moment from 'moment';
import CirclePlay from '../components/circlePlay';
import styles from './index.less';
import Model3D from './Model3D';

const { Step } = Steps;
const PatientDetailsPage: React.FC = () => {
  const id: number = useLocation().query?.id;

  const [patientDetails, setPatientDetails] = useState<patientDetailsProps>();
  const [currentStep, setCurrentStep] = useState(0);
  const [drawerVisiable, setDrawerVisiable] = useState(false);
  const [patientSchedule, setPatientSchedule] = useState([] as patientScheduleProps[]);
  const [ctList, setCtList] = useState([]);

  const [currentItem, setCurrentItem] = useState<any>();

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: `${BASE_URL}/patients/?id=${id}`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const defaultUpload = (
    <>
      <div>
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or
            other band files
          </p>
        </Upload.Dragger>{' '}
        <br />
        <p>文件名: </p>
        <Input placeholder="请输入文件名" />
        <br />
        <p style={{ marginTop: '10px' }}>备注: </p>
        <Input.TextArea
          autoSize={{
            minRows: 4,
            maxRows: 8,
          }}
          placeholder="请输入该文件的描述内容"
        />
        <br />
        <Button type="primary" style={{ float: 'right', marginTop: '20px' }}>
          上传
        </Button>
      </div>
    </>
  );

  const displayElement = {
    maxillofacial_panorama: '颌面部全景图',
    maxillofacial_CT: (
      <>
        <CirclePlay dicmList={ctList} />
      </>
    ),
    joint_MRI: '颞下关节MRI',
    dental_model: '白石膏牙模',
    clinical_examination: '临床检查',
    CT_reconstruction: 'CT重建',
    model_scanning: '牙模激光扫描',
    threedimensional_design: (
      <>
        <Model3D />
      </>
    ),
    design_review: '设计方案确定',
    guide_printing: '合金导板打印',
    operation: '手术',
    occlusion_check: '咬合关系检查',
    faceshape_evaluation: '面形评估',
    imaging_panorama: '影像学全景片',
    positioning_film: '头颅定位片',
    CT_examination: 'CT检查',
  };

  const uploadElement = {
    maxillofacial_panorama: defaultUpload,
    maxillofacial_CT: defaultUpload,
    joint_MRI: defaultUpload,
    dental_model: defaultUpload,
    clinical_examination: defaultUpload,
    CT_reconstruction: defaultUpload,
    model_scanning: defaultUpload,
    threedimensional_design: defaultUpload,
    design_review: defaultUpload,
    guide_printing: defaultUpload,
    operation: defaultUpload,
    occlusion_check: defaultUpload,
    faceshape_evaluation: defaultUpload,
    imaging_panorama: defaultUpload,
    positioning_film: defaultUpload,
    CT_examination: defaultUpload,
  };

  async function requestData() {
    setPatientDetails(await requestPatientDetails(id));
    setPatientSchedule(await requestPatientSchedule(id));
    setCtList(await requestCtList(id));
  }

  useEffect(() => {
    requestData();
  }, []);

  const changeSteps = (current) => {
    setCurrentStep(current);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/patientList">患者名单</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>患者详情</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.detailBox}>
        <div className={styles.leftBox}>
          <div style={{ margin: '20px 0' }}>
            <h4 style={{ fontWeight: 'bold' }}>患者基本信息</h4>
            <Row align="middle">
              <Col span={8}>
                <img
                  width="90px"
                  height="120px"
                  src={`${BASE_URL}${patientDetails?.image}`}
                  alt=""
                />
              </Col>
              <Col span={16}>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={false} justify="start">
                  <Col span={12}>
                    <div className={styles.sameLine}>
                      姓名: <span className={styles.prefix}>{patientDetails?.name}</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.sameLine}>
                      ID: <span className={styles.prefix}>{patientDetails?.id}</span>
                    </div>
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={false} justify="start">
                  <Col span={10}>
                    <div className={styles.sameLine}>
                      性别:{' '}
                      <span className={styles.prefix}>
                        {patientDetails?.sex === 'M' ? '男' : '女'}
                      </span>
                    </div>
                  </Col>
                  <Col span={10}>
                    <div className={styles.sameLine}>
                      年龄: <span className={styles.prefix}>{patientDetails?.age}</span>
                    </div>
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={false} justify="start">
                  <Col>
                    <div className={styles.oneLine}>
                      设计医师:{' '}
                      <span className={styles.prefix}>{patientDetails?.design_doctor}</span>
                    </div>
                  </Col>
                  <Col>
                    <div className={styles.oneLine}>
                      手术医师:{' '}
                      <span className={styles.prefix}>{patientDetails?.surgery_doctor}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div className={styles.oneLine}>
                    手术类型: <span className={styles.prefix}>{patientDetails?.surgery_type}</span>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h4 style={{ fontWeight: 'bold' }}>患者详细信息</h4>
            <Row align="top">
              <Col span={24}>
                <Row>
                  <Col style={{ lineHeight: '40px', marginRight: '30px' }}>
                    联系电话: <span className={styles.prefix}>{patientDetails?.tel}</span>
                  </Col>
                  <Col style={{ lineHeight: '40px', marginRight: '0px' }}>
                    身份证号: <span className={styles.prefix}>{patientDetails?.id_number}</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ lineHeight: '40px' }}>
                    邮箱: <span className={styles.prefix}>{patientDetails?.mail}</span>
                  </Col>
                </Row>
                <Row>
                  <div className={styles.oneLine}>
                    家庭住址: <span className={styles.prefix}>上海市闵行区东川路800号</span>
                  </div>
                </Row>
                <Row>
                  <div className={styles.oneLine}>
                    就诊医院:{' '}
                    <span className={styles.prefix}>上海交通大学医学院附属第九人民医院</span>
                  </div>
                </Row>
                <Row>
                  <div className={styles.oneLine}>
                    就诊时间: <span className={styles.prefix}>就诊时间</span>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.imgDisplay}>
            <Steps
              type="navigation"
              size="small"
              onChange={changeSteps}
              className={styles.stepBar}
              current={currentStep}
            >
              {patientSchedule.map((item) => {
                return (
                  <Step
                    title={
                      <>
                        <p style={{ fontSize: '12px', textAlign: 'center' }}>{item.label}</p>
                        <div style={{ fontSize: '12px', textAlign: 'center' }}>
                          {item.status === 'completed'
                            ? '已完成'
                            : `请于${moment(item.time).format('MoDo HH:MM')}前完成`}
                        </div>
                      </>
                    }
                    status={item.status && item.status}
                  />
                );
              })}
            </Steps>
            <div className={styles.items}>
              {patientSchedule[currentStep]?.children.map((item, index) => {
                return (
                  <Card
                    style={{ width: 200, margin: 16 }}
                    actions={[
                      <div
                        onClick={() => {
                          setCurrentItem(displayElement[item.name]);
                          setDrawerVisiable(true);
                        }}
                      >
                        <BarsOutlined key="upload" />
                        <p>详情</p>
                      </div>,
                      <div
                        onClick={() => {
                          setCurrentItem(uploadElement[item.name]);
                          setDrawerVisiable(true);
                        }}
                      >
                        <DownloadOutlined key="download" />
                        <p>上传</p>
                      </div>,
                    ]}
                    key={index}
                  >
                    <div>
                      {item.status === 'completed' ? (
                        <CheckOutlined style={{ fontSize: '36px', color: 'green' }} />
                      ) : (
                        <CloseOutlined
                          onClick={() => {
                            Modal.confirm({
                              title: '是否确认该项已完成',
                              onOk: async () => {
                                const res = await changeItem(id, item.name);
                                if (res) {
                                  message.success('修改成功');
                                  requestData();
                                }
                              },
                            });
                          }}
                          style={{ fontSize: '36px', color: 'red' }}
                        />
                      )}
                    </div>
                    <p style={{ textAlign: 'center' }}>{item.label}</p>

                    <div style={{ fontSize: '12px', color: '#999999', textAlign: 'center' }}>
                      {item.status === 'completed'
                        ? '已完成'
                        : `请于${moment(item.time).format('YYYY-MM-DD HH:MM')}前完成`}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          <Drawer
            title={patientDetails?.name}
            placement="right"
            closable
            onClose={() => {
              setDrawerVisiable(false);
            }}
            visible={drawerVisiable}
            mask={false}
            width={600}
          >
            {currentItem && currentItem}
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default PatientDetailsPage;
