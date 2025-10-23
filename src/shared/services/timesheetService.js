import React from "react";
import { baseUrl } from "../global";

const url = baseUrl + 'timeSheet/'
const timesheetService = {

    get: {
    },

    delete: {
    },

    params: {
        "getDayPlayByDate": url + 'getDayPlayByDate?'
    },

    post: {
        "saveDayPlan": url + 'saveDayPlan',
        "saveTask": url + 'saveTask',
    },

}

export default timesheetService;