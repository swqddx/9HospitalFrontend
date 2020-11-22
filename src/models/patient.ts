interface ModelIProps {
    namespace: string;
    reducers: {
        setPatientList: any;
    };
    state: { patientList: any[] };
}
// 全局状态变量 病人列表
const Global: ModelIProps = {
    namespace: 'patient',
    state: {
        patientList: [],
    },
    reducers: {
        setPatientList(state = { patientList: [] }, action) {
            console.log(action.payload?.patientList);
            return {
                ...state,
                patientList: action.payload?.patientList,
            }
        }
    },
}

export default Global;