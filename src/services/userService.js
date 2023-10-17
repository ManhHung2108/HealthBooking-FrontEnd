import axios from "../utils/axios";

const handleLoginApi = (email, passWord) => {
    return axios.post("/api/login", { email, passWord });
};

const getAllUsersService = (inputId) => {
    //axios trả về promise
    return axios.get(`/api/get-all-users`, {
        params: {
            id: inputId,
        },
    }); //phải cùng method vs server
};

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, {
        ...data,
    });
};

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user/${userId}`);
};

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user/${inputData.id}`, inputData);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`);
};

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
};

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctorService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDateServicde = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraInforDoctorByIdServicde = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(
        `http://localhost:8080/api/get-profile-doctor-by-id?doctorId=${doctorId}`
    );
};

export {
    handleLoginApi,
    getAllUsersService,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctorService,
    getDetailDoctor,
    saveBulkScheduleDoctorService,
    getScheduleDoctorByDateServicde,
    getExtraInforDoctorByIdServicde,
    getProfileDoctorByIdService,
};
