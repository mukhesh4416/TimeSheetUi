import React from "react";
import { baseUrl } from "../global";

const url = baseUrl + 'user/'
const userService = {

    get: {
        "getAllDepartments": url + 'getAllDepartments',
        "getAllDesignations": url + 'getAllDesignations',
        "getAllProjects": url + 'getAllProjects',
        "getAllUsersList": url + 'getAllUsersList',
        "getUserList": url + 'getUserList',
        "getDownTeamList": url + 'getDownTeamList?uid='
    },

    delete: {
        "globalDelete": url + 'globalDelete?'
    },

    params: {
    },

    post: {
        "saveDepartment": url + 'saveDepartment',
        "saveDesignation": url + 'saveDesignation',
        "saveProject": url + 'saveProject',
        "userRegistration": url + 'userRegistration'
    },

}

export default userService