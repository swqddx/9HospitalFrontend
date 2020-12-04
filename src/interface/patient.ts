/*
 * @Author: your name
 * @Date: 2020-11-30 20:52:25
 * @LastEditTime: 2020-12-03 21:57:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \9HospitalFrontend\src\interface\patient.ts
 */
export interface patientInfoProps {
  id: number;
  name: string;
  age: number;
  surgery_doctor: string;
  image: string;
}

export interface patientDetailsProps {
  id: string;
  age: string;
  address: string;
  tel: string;
  mail: string;
  design_doctor: string;
  surgery_doctor: string;
  surgery_type: string;
  birth_date: string;
  image: string;
  name: string;
  sex: string;
  treatment_time: string;
  body_part: string;
  institution: string;
  institutional_address: string;
  id_number: string;
  entry_time: string;
}

export interface childProps {
  name: string;
  label: string;
  status: string;
  time: string;
}
export interface patientScheduleProps {
  name: string;
  label: string;
  status: string;
  time: string;
  children: childProps[];
}

// 'stage_1_status',
// 'stage_1_time',
// 'maxillofacial_panorama_status', 颌面部全景图
// 'maxillofacial_panorama_time',
// 'maxillofacial_CT_status', 颌面部CT图
// 'maxillofacial_CT_time',
// 'joint_MRI_status', 颞下关节MRI
// 'joint_MRI_time',
// 'dental_model_status', 白石膏牙模
// 'dental_model_time',
// 'clinical_examination_status', 临床检查
// 'clinical_examination_time',
// 'stage_2_status',
// 'stage_2_time',
// 'CT_reconstruction_status', CT重建
// 'CT_reconstruction_time',
// 'model_scanning_status', 牙模激光扫描
// 'model_scanning_time',
// 'threedimensional_design_status', 三维设计
// 'threedimensional_design_time',
// 'stage_3_status',
// 'stage_3_time',
// 'design_review_status', 设计方案确定
// 'design_review_time',
// 'guide_printing_status', 合金导板打印
// 'guide_printing_time',
// 'operation_status', 手术
// 'operation_time',
// 'stage_4_status',
// 'stage_4_time',
// 'occlusion_check_status', 咬合关系检查
// 'occlusion_check_time',
// 'faceshape_evaluation_status', 面形评估
// 'faceshape_evaluation_time',
// 'imaging_panorama_status', 影像学全景片
// 'imaging_panorama_time',
// 'positioning_film_status', 头颅定位片
// 'positioning_film_time',
// 'CT_examination_status', CT检查
// 'CT_examination_time'

export interface patientCTProps {}
