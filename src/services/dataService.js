// import users from "../data/user.json"
// import works from "../data/job.json"
// import axios from 'axios';
//
// class DataService {
//     constructor() {
//         this.baseURL = 'http://localhost:8000';
//     }
//
//     setAuthHeader(token) {
//         axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//     }
//
//     login(data) {
//         return axios.post(`${this.baseURL}/auth/login/`, data);
//     }
//
//     register(data) {
//         return axios.post(`${this.baseURL}/auth/registration/`, data);
//     }
//
//     async getWorks() {
//         try {
//             const token = localStorage.getItem('accessToken'); // Get token inside the function
//             if (!token) {
//                 throw new Error("No token found in local storage"); // Handle missing token
//             }
//             const response = await axios.get(`${this.baseURL}/works/`, {
//                 headers: {
//                     Authorization: `Bearer ${token}` // Set header directly in request
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching works:', error);
//             throw error; // Re-throw for component to handle
//         }
//     }
// }
//
// export default new DataService();

import axios from 'axios';

class DataService {
    constructor() {
        this.baseURL = 'http://127.0.0.1:8000';
        this.worksURL = `${this.baseURL}/works/`;
        this.workItemsURL = `${this.baseURL}/work-items/`;
        this.facilitiesURL = `${this.baseURL}/facilities/`;
        this.contractorRatingsURL = `${this.baseURL}/contractor-ratings/`;
        this.rolesURL = `${this.baseURL}/user-roles/`;
    }

    // async getWorks() {
    //     return this.get(this.worksURL);
    // }
    async getWorks(filters = {}) {
        const params = new URLSearchParams();
        if (filters.workStatus) params.append('work_status', filters.workStatus);
        if (filters.itemStatus) params.append('item_status', filters.itemStatus);
        return this.get(`${this.worksURL}?${params.toString()}`);
    }

    async getWork(id) {
        return this.get(`${this.worksURL}${id}/`);
    }

    async createWork(data) {
        return this.post(this.worksURL, data);
    }

    // async updateWork(id, data) {
    //     return this.put(`${this.worksURL}${id}/`, data);
    // }

    async updateWork(id, data, isPartialUpdate = false) {
        if (isPartialUpdate) {
            return this.patch(`${this.worksURL}${id}/`, data);
        } else {
            return this.put(`${this.worksURL}${id}/`, data);
        }
    }

    async deleteWork(id) {
        return this.delete(`${this.worksURL}${id}/`);
    }

    async getWorkItems(workId) {
        return this.get(`${this.worksURL}${workId}/items/`); // Assuming nested items
    }

    async createWorkItem(workId, data) {
        return this.post(`${this.worksURL}${workId}/items/`, data);
    }

    async updateWorkItem(workId, itemId, data, isPartialUpdate = false) {
        if (isPartialUpdate) {
            return this.patch(`${this.worksURL}${workId}/items/${itemId}/`, data);
        } else {
            return this.put(`${this.worksURL}${workId}/items/${itemId}/`, data);
        }
    }

    // async updateWorkItem(workId, itemId, data) {
    //     return this.put(`${this.worksURL}${workId}/items/${itemId}/`, data);
    // }

    async deleteWorkItem(workId, itemId) {
        return this.delete(`${this.worksURL}${workId}/items/${itemId}/`);
    }

    async getFacilities() {
        return this.get(this.facilitiesURL);
    }

    async getClassifications() {
        return this.get(`${this.baseURL}/works/classifications/`)
    }

    async createFacility(data) {
        return this.post(this.facilitiesURL, data);
    }

    async updateFacility(id, data) {
        return this.put(`${this.facilitiesURL}${id}/`, data);
    }

    async deleteFacility(id) {
        return this.delete(`${this.facilitiesURL}${id}/`);
    }

    async getContractorRatings() {
        return this.get(this.contractorRatingsURL);
    }

    async createContractorRating(data) {
        return this.post(this.contractorRatingsURL, data);
    }

    async updateContractorRating(id, data) {
        return this.put(`${this.contractorRatingsURL}${id}/`, data);
    }

    async deleteContractorRating(id) {
        return this.delete(`${this.contractorRatingsURL}${id}/`);
    }

    async get(url) {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No token found in local storage");
            }
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(`Error in GET request to ${url}:`, error);
            throw error;
        }
    }

    async post(url, data) {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No token found in local storage");
            }
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(`Error in POST request to ${url}:`, error);
            throw error;
        }
    }

    async put(url, data) {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No token found in local storage");
            }
            const response = await axios.put(url, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(`Error in PUT request to ${url}:`, error);
            throw error;
        }
    }

    async delete(url) {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No token found in local storage");
            }
            const response = await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(`Error in DELETE request to ${url}:`, error);
            throw error;
        }
    }
    async patch(url, data) { // Add patch method
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No token found in local storage");
            }
            const response = await axios.patch(url, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(`Error in PATCH request to ${url}:`, error);
            throw error;
        }
    }


    login(data) {
        return axios.post(`${this.baseURL}/auth/login/`, data);
    }

    register(data) {
        return axios.post(`${this.baseURL}/auth/registration/`, data);
    }

    async getManagers() {
        try {
            const managersAndSuperAdmins = await this.get(`${this.rolesURL}managers_and_superadmins_for_dropdown/`);
            return managersAndSuperAdmins;
        } catch (error) {
            console.error("Error fetching managers and super admins:", error);
            return []; // Return an empty array in case of error
        }
    }

    async getContractors() {
        try {
                const contractors = await this.get(`${this.rolesURL}contractors_for_dropdown/`);
            return contractors;
        } catch (error) {
            console.error("Error fetching contractors:", error);
            return []; // Return an empty array in case of error
        }
    }

    async getReports(reportType, startDate, endDate, contractorId, facilityName, classification ) {
        let url = `${this.worksURL}reports/?type=${reportType}`;
        if (startDate) {
            url += `&start_date=${startDate.toISOString().split('T')[0]}`;
        }
        if (endDate) {
            url += `&end_date=${endDate.toISOString().split('T')[0]}`;
        }
        if (contractorId) {
            url += `&contractor_id=${contractorId}`;
        }
        if (facilityName) {
            url += `&facility_name=${facilityName}`;
        }
        if (classification) {
            url += `&classification=${classification}`;
        }
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching reports:", error);
            throw error; // Re-throw the error to be handled by the component
        }
    }

    async getWorkStatuses() {
        return this.get(`${this.worksURL}work_statuses/`);
    }

    async getWorkItemStatuses() {
        return this.get(`${this.workItemsURL}work_item_statuses/`);
    }

    getWorkComments(workId) {
        return this.get(`${this.worksURL}${workId}/comments/`);
    }

    createWorkComment(workId, commentData) {
        return this.post(`${this.worksURL}${workId}/comments/`, commentData);
    }

}

export default new DataService();

export const getTableData = (user, isDone) => {
    if (!user || !users || !works) {
        return;
    }

    const allData = [];
    user.worksIds.map(workId => {
        const data = {};
        const currWork = works.find(w => w.id === workId);
        if (isDone && currWork.endDate !== 0 || !isDone && currWork.endDate == 0)

            if (currWork && (!isDone && currWork.endDate === 0 || isDone && currWork.endDate !== 0)) {
                const otherUserId = user.isManager ? currWork.contractorId : currWork.directorId;

                const otherUser = users.find(u => u.id === otherUserId)

                data.id = currWork.id;
                data.isManager = user.isManager;
                data.workNumber = currWork.workNumber;
                data.classification = currWork.classification;
                data.startDate = _getDate(currWork.startDate);
                data.dueEndDate = _getDate(currWork.dueEndDate);
                data.endDate = _getDate(currWork.endDate);
                data.status = currWork.status;
                data.name = otherUser.name;
                data.phoneNum = otherUser.phoneNum;
                data.contractorRank = otherUser.contractorRank;
                data.facilityNum = currWork.facilityNum
                data.locationName = currWork.locationName
                data.sections = currWork.sections;


                if (!allData.includes(d => d.id === data.id)) {
                    allData.push(data);

                }
            }

    });

    return allData;
}

export const getActiveWorkCount = (user) => {
    return works.reduce((count, currWork) => {
        if (user.worksIds.includes(currWork.id)) return count + 1
        return count
    }, 0)
}

const _getDate = (timeStamp) => {
    if (timeStamp === 0) return null
    const date = new Date(timeStamp);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}
