import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Input,
    Button,
    Upload,
    Form,
    Select,
    message
} from 'antd';
import { post } from 'axios';
import {
    // UploadOutlined,
    // DownloadOutlined,
    // CheckOutlined,
    // CloseOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import qs from 'qs';
import { connect, request } from 'umi';
import styles from './index.less';

const { Option } = Select;

interface PatientProps {
    PatientName: string,
    PatientID: number,
    PatientSex: string,
    PatientAge: string,
    DesignDoctor: string,
    SurgeryDoctor: string,
    SurgeryType: string,
    PatientTel: string,
    PatientIdNumber: string,
    Address: string,
    Hospital: string,
    AcquisitionDate: string,
}

const { useForm, Item: FormItem } = Form;


const PatientEdit: React.FC = ({ dispatch, patientDetails, patientIndex, imageUrl }) => {


    const [infoForm] = useForm();
    const saveInfo = (patientIndex) => {
        console.log(infoForm?.getFieldsValue());
        request(`http://202.120.37.220:23333/edit_task/?name=${patientDetails.name}`, {
            method: 'post',
            data: JSON.stringify(infoForm?.getFieldsValue()),
            charset: 'utf8',
            requestType: 'json',
        }).then((res) => {
            if (res.result === 'success') {
                message.success('保存成功');
            }
        });

        return false;
    }

    useEffect(() => {
        // console.log(infoForm?.getFieldsValue());
        const keys_array = [];
        if (patientDetails) {
            Object.keys(patientDetails).forEach((item) => {
                keys_array.push({ name: item, value: patientDetails[item] })
            })
            keys_array.push({ name: "PatientNameEn", value: patientDetails?.name })
            infoForm.setFields(keys_array);
        }
    }, [patientDetails])

    const uploadButton = (
        <div id='' style={{ textAlign: 'center' }}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    );
    return (
        <>
            <div className={styles.detailBox}>
                <div className={styles.leftBox}>
                    <Form form={infoForm} size="small">
                        <div style={{ margin: '20px 0' }}>
                            <h4 style={{ fontWeight: 'bold' }}>患者基本信息</h4>
                            <Row align='middle'>
                                <Col span={8}>
                                    <FormItem name="avator">
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="http://202.120.37.220:23333/download/"
                                        // beforeUpload={beforeUpload}
                                        // onChange={handleChange}
                                        >
                                            {imageUrl ? <img width='100%' src={`http://202.120.37.220:23333/download/${patientDetails?.name}/pic.JPG`} alt="头像" /> : uploadButton}
                                        </Upload>
                                    </FormItem>
                                </Col>
                                <Col span={16}>
                                    <Row gutter={[4, { xs: 8, sm: 16, md: 24, lg: 32 }]} wrap={false} justify='start'>
                                        <Col span={12}>
                                            <FormItem name="PatientName" label="姓名">
                                                <Input size='small' />
                                            </FormItem>
                                        </Col>
                                        <div style={{ display: 'none', }}>
                                            <FormItem name="PatientNameEn">
                                                <Input size='small' />
                                            </FormItem>
                                        </div>
                                        <Col span={12}>
                                            <FormItem name="PatientID" label="ID">
                                                <Input size='small' defaultValue={patientDetails?.PatientID} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={[4, { xs: 8, sm: 16, md: 24, lg: 32 }]} wrap={false} justify='start'>
                                        <Col span={12}>
                                            <FormItem name="PatientSex" label="性别">
                                                <Select>
                                                    <Option value="F">女</Option>
                                                    <Option value="M">男</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem name="PatientAge" label="年龄">
                                                <Input size='small' defaultValue={patientDetails?.PatientAge} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={[4, { xs: 8, sm: 16, md: 24, lg: 32 }]} wrap={false} justify='start'>
                                        <Col span={12}>
                                            <FormItem name="DesignDoctor" label="设计医师">
                                                <Input size='small' defaultValue={patientDetails?.DesignDoctor} />
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem name="SurgeryDoctor" label="手术医师">
                                                <Input size='small' defaultValue={patientDetails?.SurgeryDoctor} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={[4, { xs: 8, sm: 16, md: 24, lg: 32 }]} wrap={false} justify='start'>
                                        <Col span={24}>
                                            <FormItem name="SurgeryType" label="手术类型">
                                                <Input size='small' defaultValue={patientDetails?.SurgeryType} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div style={{ margin: '20px 0' }}>
                            <h4 style={{ fontWeight: 'bold' }}>患者详细信息</h4>
                            <Row align='top'>
                                <Col span={24}>
                                    <Row gutter={[4, { xs: 4, sm: 8, md: 12, lg: 16 }]}>
                                        <Col span={10}>
                                            <FormItem name="PatientTel" label="联系电话">
                                                <Input size='small' defaultValue={patientDetails?.PatientTel} />
                                            </FormItem>
                                        </Col>
                                        <Col span={12} style={{ marginLeft: '8px' }}>
                                            <FormItem name="PatientIdNumber" label="身份证号">
                                                <Input size='small' defaultValue={patientDetails?.PatientIdNumber} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={[4, { xs: 4, sm: 8, md: 12, lg: 16 }]}>
                                        <Col span={16}>
                                            <FormItem name="PatientMail" label="邮箱">
                                                <Input size='small' defaultValue={patientDetails?.PatientMail} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={[4, { xs: 4, sm: 8, md: 12, lg: 16 }]}>
                                        <Col span={16}>
                                            <FormItem name="Address" label="家庭住址">
                                                <Input size='small' defaultValue="上海市闵行区东川路800号" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={[4, { xs: 4, sm: 8, md: 12, lg: 16 }]}>
                                        <Col span={16}>
                                            <FormItem name="Hospital" label="就诊医院">
                                                <Input size='small' defaultValue="上海交通大学医学院附属第九人民医院" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={[4, { xs: 4, sm: 8, md: 12, lg: 16 }]}>
                                        <Col span={16}>
                                            <FormItem name="AcquisitionDate" label="就诊时间">
                                                <Input size='small' defaultValue={patientDetails?.AcquisitionDate} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col> <Button size="small" type="primary" onClick={saveInfo}>保存</Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
            </div>

        </>
    )
}

export default connect(({ patient }: { patient: any }) => {
    return { patientList: patient.patientList }
})(PatientEdit);