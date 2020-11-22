import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Input, Modal, DatePicker, TimePicker, Form, Col, Row, Select } from 'antd';
import { request } from 'umi';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const { Option } = Select;
const { useForm } = Form;
interface EventIProps{
    title: string,
    startDate: string,

}

const DateManager = () => {

    const [modalVis, setmodalVis] = useState(false)
    const [selector, setSelector] = useState<any>()
    const [events, setEvents] = useState<EventIProps[]>([]);

    useEffect(() => {
        request('http://202.120.37.220:23333/get_schedule/', {
            method: 'get'
        }).then((res) => {
            let eventTemp = [];
            // console.log(res);
            Object.keys(res).forEach((item,index)=>{
                let temp = { id: index, title: res[item].Patient + " " + res[item].Type, start: moment(res[item].Date,'YYYY年MM月DD日').format("YYYY-MM-DD"), resourceId: 'a' }
                eventTemp.push(temp);
                // console.log(temp);
            });
            setEvents(eventTemp);
        });
    }, [])

    const [form] = useForm();

    const renderEventContent = () => {

    };
    const handleEventClick = () => {

    };
    const handleEvents = () => {

    };

    const handleOk = () => {
        setmodalVis(false);
        const fields = form.getFieldsValue();
        console.log(fields);
        const calendarApi = selector.view.calendar;
        calendarApi.unselect(); // clear date selection

        calendarApi.addEvent({
            id: 1,
            title: fields.patientName,
            start: selector.startStr,
            end: selector.endStr,
            allDay: selector.allDay
        })
    };

    const handleCancle = () => {
        setmodalVis(false);
    };

    const handleDateSelect = (selectInfo) => {
        setSelector(selectInfo);
        setmodalVis(true);
        form.setFieldsValue({ date: moment(selectInfo.start) });
    }

    return (
        <div style={{ padding: '40px', margin: 'auto' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                initialView='dayGridMonth'
                editable
                selectable
                selectMirror
                dayMaxEvents
                weekends
                locale='zh-cn'
                select={handleDateSelect}
                events={events}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
            <Modal
                forceRender
                title='手术排期'
                okText='确认'
                cancelText='取消'
                onOk={handleOk}
                onCancel={handleCancle}
                visible={modalVis}
                width={400}

            >
                <div style={{ marginTop: '30px' }}>
                    <Form form={form} >
                        <Form.Item label="病人名称" name="patientName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="病人编号" name="id">
                            <Input />
                        </Form.Item>
                        <Row>
                            <Col span={14}>
                                <Form.Item label="手术时间" name="date">
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item name="time">
                                    <TimePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="手术类型" name="type">
                            <Select style={{ width: 120 }}>
                                <Option value="zhenghe">正颌</Option>
                                <Option value="guangongsuozhai">颧弓缩窄</Option>
                                <Option value="hesuozhai" disabled>颏缩窄</Option>
                                <Option value="lunkuoxiuzheng">轮廓修整</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div >
    )
}

export default DateManager;