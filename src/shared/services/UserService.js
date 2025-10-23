import React from "react";
import { baseUrl } from "../global";

const url = baseUrl + 'user/'
const userService = {

    get: {
        "getAllDepartments": url + 'getAllDept',
        "getAllDesignations": url + 'getAllDesig',
        "getAllProjects": url + 'getAllProj',
        "getAllUsersList": url + 'getAllUsersList',
        "getUserList": url + 'getUserList',
        "getDownTeamList": url + 'getDownTeamList?uid=',

    },

    delete: {
        "globalDelete": url + 'deleteAny'
    },

    params: {
    },

    post: {
        "saveDepartment": url + 'saveDept',
        "saveDesignation": url + 'saveDesig',
        "saveProject": url + 'saveProject',
        "userRegistration": url + 'registerUser',
        
    },

}

export default userService