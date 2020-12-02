/*
 * @Author: your name
 * @Date: 2020-11-30 20:52:25
 * @LastEditTime: 2020-12-01 19:27:03
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
