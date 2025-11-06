import React from "react";
import { baseUrl } from "../global";


const timesheetService = {

    get: {
        "getTaskList": baseUrl + 'getAllTasksList',
        "getAllTimeSheets" : baseUrl + 'getAllTimeSheetList',
         "RLtasks" :baseUrl + 'getAllTasksToRL',
         "ManagerTasks":baseUrl + 'getAllTasksToManager',
         "getAllApprovedTasksList" : baseUrl + 'getAllApprovedTasksList',
         "getAllSubmittedTimesheets" : baseUrl + 'getAllSubmittedTimeSheetList',
         "UserTasks": baseUrl + 'getAllTasksList',
         "ManagerTimesheet": baseUrl + 'getTimeSheetListForManager',
         "RLTimesheet" : baseUrl + 'getTimeSheetListForRL',
         "UserTimesheet" : baseUrl + 'getTimeSheetListById',
         "getAllTaskUser" : baseUrl + 'getAllTasksToUser',
         "getDownTeam" : baseUrl + 'getDownTeam',
         "getRLList": baseUrl + 'getAllRLList',

    },

    delete: {

        "deleteTask" : baseUrl + 'deleteTask',
        "deleteTimeSheet" : baseUrl + 'deleteTimeSheet'
    },

    params: {
        "getDayPlayByDate": baseUrl + 'getDayPlayByDate?',
        "submitTask": baseUrl + 'submitTask',
        "deleteTask" : baseUrl + 'deleteTask',
        "RLtasks" :baseUrl + 'getAllTasksToRL',
        "verifyTask":baseUrl + 'verifyTask',
        "approveTask":baseUrl + 'approveTask',
        "getAllApprovedTasksList" : baseUrl + 'getAllApprovedTasksList',
        "submitTimeSheet" : baseUrl + 'submitTimeSheet',
         "verifyTimesheet":baseUrl + 'verifyTimeSheet',
         "approveTimesheet" : baseUrl + 'approveTimeSheet',
          "rejectTaskRL" : baseUrl + 'reVerifyTaskByRL',
           "rejectTaskManager" : baseUrl + 'reVerifyTaskByManager',
              "rejectTimesheetRL" : baseUrl + 'reVerifyTimeSheetByRL',
           "rejectTimesheetManager" : baseUrl + 'reVerifyTimeSheetByManager',
            "getDownTeam" : baseUrl + 'getDownTeam',
            "getRLList": baseUrl + 'getAllRLList',

           
         
        
    },

    post: {
        "saveDayPlan": baseUrl + 'saveDayPlan',
        "saveTask": baseUrl + 'saveTask',
        "saveTimeSheet" : baseUrl + 'saveTimeSheet',
        "submitTask" : baseUrl + 'submitTask',
        "submitTimeSheet" : baseUrl + 'submitTimeSheet',
        "submitAllTimeSheets" : baseUrl + 'submitTimeSheetsMonthly'
    },

}

export default timesheetService;