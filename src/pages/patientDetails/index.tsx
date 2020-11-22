import React, { useEffect, useState } from 'react';
import {
    Breadcrumb,
    Row,
    Col,
    Steps,
    Card,
    Drawer
} from 'antd';
import {
    BarsOutlined,
    DownloadOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { requestPatientList } from '@/services/patient'
import { Link, useLocation, connect } from 'umi';
import styles from './index.less';
import CirclePlay from '../components/circlePlay';

const itemslist = [
    [
        { name: '白石膏牙模', status: 'process' },
        { name: '头颅正侧位片', status: 'process' },
        { name: '全景片', status: 'process' }
    ],
    [
        { name: '上下颌牙模', status: 'process' },
        { name: '蜡片', status: 'process' },
        { name: 'CT', status: 'process' },
        { name: 'MRI', status: 'no' },
        { name: 'X-ray', status: 'process' },
        { name: '照片', status: 'process' },
        { name: '3dMD', status: 'process' },
        { name: '预约单', status: 'no' },
    ],
    [
        { name: '方案审核', status: 'process' }
    ],
    [
        { name: '调合', status: 'process' },
        { name: '试合板', status: 'no' },
    ]
]

const { Step } = Steps;

const PatientDetailsPage: React.FC = ({ dispatch, patientList }) => {
    // const [patientId, setPatientId] = useState(useLocation().query.id);
    async function requestData() {
        const nameList = await requestPatientList({});
        const Patients = Object.keys(nameList.NameList);
        Patients.unshift('');
        const ress = Patients.map((item) => {
            return { ...nameList.NameList[item], name: item }
        });

        if (dispatch) {
            dispatch({
                type: 'patient/setPatientList',
                payload: {
                    patientList: ress
                }
            });
        }
    };
    if (patientList.length == 0) {
        requestData();
    }
    const patientIndex = useLocation().query.index;
    const patientDetails = patientList[patientIndex];
    const [currentStep, setCurrentStep] = useState(0);
    const [drawerVisiable, setDrawerVisiable] = useState(false);

    const changeSteps = (current) => {
        setCurrentStep(current);
    };
    useEffect(() => {
        console.log(patientIndex);
        if (patientIndex == 1) {
            console.log("set")
            setCurrentStep(2);
        }
    }, [])
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to='/patientList'>患者名单</Link></Breadcrumb.Item>
                <Breadcrumb.Item>患者详情</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.detailBox}>
                <div className={styles.leftBox}>
                    <div style={{ margin: '20px 0' }}>
                        <h4 style={{ fontWeight: 'bold' }}>患者基本信息</h4>
                        <Row align='middle'>
                            <Col span={8}>
                                <img width='90px' height='120px' src={`http://202.120.37.220:23333/download/${patientDetails?.name}/pic.JPG`} alt="" />
                            </Col>
                            <Col span={16}>
                                <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={false} justify='start'>
                                    <Col span={12}>
                                        <div className={styles.sameLine}>姓名: <span className={styles.prefix}>{patientDetails?.PatientName}</span></div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.sameLine}>ID: <span className={styles.prefix}>{patientDetails?.PatientID}</span></div>

                                    </Col>
                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={false} justify='start'>
                                    <Col span={10}>
                                        <div className={styles.sameLine}>性别: <span className={styles.prefix}>{patientDetails?.PatientSex == 'M' ? '男' : '女'}</span></div>
                                    </Col>
                                    <Col span={10}>
                                        <div className={styles.sameLine}>年龄: <span className={styles.prefix}>{patientDetails?.PatientAge}</span></div>
                                    </Col>
                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24 }} wrap={false} justify='start'>
                                    <Col>
                                        <div className={styles.oneLine}>设计医师: <span className={styles.prefix}>{patientDetails?.DesignDoctor}</span></div>
                                    </Col>
                                    <Col>
                                        <div className={styles.oneLine}>手术医师: <span className={styles.prefix}>{patientDetails?.SurgeryDoctor}</span></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className={styles.oneLine}>手术类型: <span className={styles.prefix}>{patientDetails?.SurgeryType}</span></div>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <h4 style={{ fontWeight: 'bold' }}>患者详细信息</h4>
                        <Row align='top'>
                            <Col span={24}>

                                <Row>
                                    <Col style={{ lineHeight: '40px', marginRight: "30px" }}>联系电话: <span className={styles.prefix}>{patientDetails?.PatientTel}</span></Col>
                                    <Col style={{ lineHeight: '40px', marginRight: "0px" }}>身份证号: <span className={styles.prefix}>{patientDetails?.PatientIdNumber}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={{ lineHeight: '40px' }}>邮箱: <span className={styles.prefix}>{patientDetails?.PatientMail}</span></Col>
                                </Row>
                                <Row>
                                    <div className={styles.oneLine}>家庭住址: <span className={styles.prefix}>上海市闵行区东川路800号</span></div>
                                </Row>
                                <Row>
                                    <div className={styles.oneLine}>就诊医院: <span className={styles.prefix}>上海交通大学医学院附属第九人民医院</span></div>
                                </Row>
                                <Row>
                                    <div className={styles.oneLine}>就诊时间: <span className={styles.prefix}>{patientDetails?.AcquisitionDate}</span></div>
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
                            <Step
                                title="首次就诊"
                                status="finish"
                            />
                            <Step
                                title="二次就诊"
                                status={patientIndex == 1 ? "process" : "finish"}
                            />
                            <Step
                                title="术前就诊"
                                status={patientIndex == 1 ? "process" : "wait"}
                                disabled={patientIndex != 1}
                            />
                            <Step
                                title="手术"
                                status="wait"
                                disabled
                            />
                        </Steps>
                        <div className={styles.items}>
                            {
                                itemslist[currentStep].map((item, index) => {
                                    return (
                                        <Card
                                            style={{ width: 200, margin: 16 }}
                                            actions={[
                                                <><BarsOutlined key="upload" onClick={() => { setDrawerVisiable(true) }} /><span>详情</span></>,
                                                <><DownloadOutlined key="download" /><span>上传</span></>
                                            ]}
                                            key={index}
                                        >
                                            <div>
                                                {
                                                    (item.status == 'process' || patientIndex == 1) ? <CheckOutlined style={{ fontSize: '36px', color: 'green' }} /> :
                                                        <CloseOutlined style={{ fontSize: '36px', color: 'red' }} />
                                                }
                                            </div>
                                            <p style={{ textAlign: 'center' }}>{item.name}</p>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Drawer
                        title={patientDetails?.name}
                        placement="right"
                        closable
                        onClose={() => { setDrawerVisiable(false) }}
                        visible={drawerVisiable}
                        mask={false}
                        width={600}
                    >
                        <CirclePlay imgList={patientDetails?.Ct?.ImgUrlList} dicmList={patientDetails?.Ct?.CtUrlList} />
                    </Drawer>
                </div>
            </div>
        </>
    )
}

export default connect(({ patient }: { patient: any }) => {
    return { patientList: patient.patientList }
})(PatientDetailsPage);