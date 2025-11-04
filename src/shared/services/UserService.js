import React from "react";
import { baseUrl } from "../global";

const userService = {

    get: {
        "getAllDepartments": baseUrl + 'getAllDept',
        "getAllDesignations": baseUrl + 'getAllDesig',
        "getAllProjects": baseUrl + 'allProj',
        "getAllUsersList": baseUrl + 'getAllUsers',
        "getUserList": baseUrl + 'getUserList',
        "getDownTeamList": baseUrl + 'getDownTeamList?uid=',

    },

    delete: {
        "globalDelete": baseUrl + 'deleteAny',
        "deleteProject":baseUrl+'deleteProject',
    },

    params: {
    },

    post: {
        "saveDepartment": baseUrl + 'saveDept',
        "saveDesignation": baseUrl + 'saveDesig',
        "saveProject": baseUrl + 'saveProject',
        "userRegistration": baseUrl + 'registerUser',
        
    },

}

export default userService