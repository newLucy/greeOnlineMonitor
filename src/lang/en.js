export const m = {
  login: {
    h1: 'GREE ONLINE MONITORING',
    groupSelect: 'Group Select',
    account: 'Account',
    accountWarning: 'Account is required!',
    password: 'Password',
    passwordWarning: 'Password is required!',
    remember: 'Remember Password',
    login: 'Login'
  },
  // id是数据库中的id
  menu: {
    1: 'Home',
    3: 'Account Settings',
    4: 'User Management',
    5: 'Online Feedback',
    6: 'Group Management',
    7: 'User Management',
    8: 'User Logs',
    9: 'Feedback'
  },
  home: {
    mac: 'MAC Address',
    macWarning: 'MAC Address must be a 12-digit combination of letters or numbers.',
    serial: 'Serial Number',
    serialWarning: 'Serial Number must be a 13-digit numbers.',
    conditionMsg: 'MAC Address or Serial Number is required!'
  },
  personal: {
    requiredWarning: '{inputName} is required!',
    lengthError: 'Characters limitation exceeded. {inputName} should be at most 30 characters in length.',
    passwordLengthError: 'Password should be 6-30 characters in length.'
  },
  manage: {
    group: {
      addBtn: 'New Group',
      deleteConfirmMsg: 'Delete Group: {groupName}?',
      dialog: {
        title: 'New Group',
        group: 'Group',
        groupWarning: 'Group is required!',
        lengthError: 'Characters limitation exceeded. Group should be at most 30 characters in length.'
      },
      tableHeader: [
        {
          key: 'organizeName',
          label: 'Group',
          width: '150px'
        }, {
          key: 'administrator',
          label: 'Administrator',
          width: '150px',
          editFlag: true
        }, {
          key: 'mailBox',
          label: 'Service Mailbox',
          width: '150px',
          editFlag: true
        }, {
          key: 'totalMember',
          label: 'Total Members',
          width: '150px'
        }, {
          key: 'searchTime',
          label: 'Search Times',
          width: '150px'
        }
      ]
    },
    user: {
      addBtn: 'Add User',
      uploadBtn: 'Batch Uploading',
      templateBtn: '*Template Downloading',
      unsavedWarning: 'You have unsaved item!',
      deleteConfirmMsg: 'Delete User: {userName}?',
      uploadDialog: {
        title: 'Batch Uploading',
        totalInfo: 'Read {total} new users!',
        errorInfo: 'Read failed: {errorInfo}'
      },
      addDialog: {
        title: 'Add User',
        phone: 'Phone Number',
        name: 'User Name',
        account: 'Account',
        password: 'Password',
        phoneWarning: 'Phone Number is required!',
        nameWarning: 'User Name is required!',
        accountWarning: 'Account is required!',
        lengthError: 'Characters limitation exceeded. {inputName} should be at most 30 characters in length.',
      },
      tableHeader: [
        {
          key: 'account',
          label: 'Account',
          width: '140px'
        }, {
          key: 'userName',
          label: 'User Name',
          editFlag: true,
          width: '140px'
        }, {
          key: 'phone',
          label: 'Phone Number',
          editFlag: true,
          width: '140px'
        }, {
          key: 'status',
          label: 'Status',
          editFlag: true,
          width: '140px'
        }, {
          key: 'password',
          label: 'Password',
          editFlag: true,
          width: '140px'
        }, {
          key: 'searchCount',
          label: 'Search Times',
          width: '140px'
        }
      ],
      uploadTableHeader: [
        {
          key: 'userName',
          label: 'User Name'
        }, {
          key: 'phone',
          label: 'Phone Number'
        }
      ]
    },
    logs: {
      tableHeader: [
        {
          key: 'account',
          label: 'Account',
          width: '140px'
        }, {
          key: 'userName',
          label: 'User Name',
          width: '140px'
        }, {
          key: 'date',
          label: 'Search Time',
          width: '140px'
        }, {
          key: 'params',
          label: 'Search Content',
          width: '140px'
        }
      ]
    },
    feedback: {
      tableHeader: [
        {
          key: 'account',
          label: 'Account',
          width: '140px'
        }, {
          key: 'userName',
          label: 'User Name',
          width: '140px'
        }, {
          key: 'feedbackTime',
          label: 'Time',
          width: '140px'
        }, {
          key: 'feedbackContext',
          label: 'Content',
          width: '140px'
        }
      ]
    }
  },
  onlineFeedback: {
    title: 'Feedback',
    placeholder: 'Please describe your problem'
  },
  search: {
    downloadBtn: 'Service Manual Download'
    // detailParam1: [
    //   {
    //     key: 'on_off',
    //     label: 'on_off',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'run_mode',
    //     label: 'run_mode',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'set_temp',
    //     label: 'set_temp',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'indoor_temp',
    //     label: 'indoor_temp',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'indoor_fan',
    //     label: 'indoor_fan',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'in_tub_temp',
    //     label: 'in_tub_temp',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'comm_fault',
    //     label: 'comm_fault',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'outdoor_temp',
    //     label: 'outdoor_temp',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'outdoor_fan1',
    //     label: 'outdoor_fan1',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'outdoor_fan2',
    //     label: 'outdoor_fan2',
    //     width: '120px',
    //     sortable: false
    //   }
    // ],
    // detailParam2: [
    //   {
    //     key: 'ev_step',
    //     label: 'ev_step',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'exhaust_temp',
    //     label: 'exhaust_temp',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'ipm_temp',
    //     label: 'ipm_temp',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'bus_voltage',
    //     label: 'bus_voltage',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'out_ac_cur',
    //     label: 'out_ac_cur',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'comp_on_off',
    //     label: 'comp_on_off',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'comp_freq',
    //     label: 'comp_freq',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'frost_mode',
    //     label: 'frost_mode',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'return_oil',
    //     label: 'return_oil',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'over_load_protect',
    //     label: 'over_load_protect',
    //     width: '120px',
    //     sortable: false
    //   }
    // ],
    // detailParam3: [
    //   {
    //     key: 'over_ac_cur_protect',
    //     label: 'over_ac_cur_protect',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'phase_cur_protect',
    //     label: 'phase_cur_protect',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'pfc_cur_protect',
    //     label: 'pfc_cur_protect',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'over_voltage_protect',
    //     label: 'over_voltage_protect',
    //     width: '120px',
    //     sortable: false
    //   }, {
    //     key: 'ipm_temp_protect',
    //     label: 'ipm_temp_protect',
    //     width: '120px',
    //     sortable: false
    //   }
    // ]
  },
  code: {
    5000: 'System Error!',
    4000: 'Failed!',
    2000: 'Success!',
    2001: 'Session expired!',
    2002: 'Query denied!',
    2003: 'Access denied!',
    2004: 'Invalid role!',
    2005: 'Files not found!',
    2006: 'Feedback not found!',
    2007: 'Access denied!',
    2008: 'Parameter required!',
    2009: 'Invalid Account or Password!',
    2010: 'No Record!',
    2011: 'Invalid Users!',
    2012: 'Account Name required!',
    2013: 'Account Name exists!',
    2014: 'Group exists!',
    2015: 'Group mismatch',
    2016: 'Email Address is required!',
    2017: 'Please input new group and role!',
    2018: 'Password mismatch!',
    2019: 'Password is required!',
    2020: 'Please choose a file!',
    2021: 'Could not find excel file!',
    2022: 'System is busy, try again later!',
    2023: 'Limited operation!',
    3001: 'Feedback content is required!',
    3002: 'Characters  limitation exceeded!',
    3003: 'Account is required!',
    3004: 'Password is required!',
    3005: 'Group is required!',
    3006: 'Characters  limitation exceeded!',
    3007: 'ID is required!',
    3008: 'Status is required!',
    3009: 'Email Address is required!',
    3010: 'Characters  limitation exceeded!',
    3011: 'Characters  limitation exceeded!',
    3012: 'User name is required!',
    3013: 'Characters  limitation exceeded!',
    3014: 'Characters  limitation exceeded!',
    3015: 'Confirm password is required!',
    3016: 'Password is required!'
  },
  logout: 'Log out',
  commonMsg: {
    chooseOne: 'Choose One',
    noRecord: 'No Record',
    dataInvalid: 'Data Invalid',
    deleteDialog: {
      title: 'Warning',
      content: 'Confirm delete ?'
    },
    addSuccess: 'Add Successfully!',
    updateSuccess: 'Update Successfully!',
    resetSuccess: 'Reset Successfully!',
    deleteSuccess: 'Delete Successfully!',
    uploadSuccess: 'Upload Successfully!',
    resetPwdSuccess: 'Reset Password Successfully!',
    loginAgain: 'Update successfully, Please login again.',
    length30: 'Characters  limitation exceeded!'
  },
  commonBtn: {
    search: 'Search',
    export: 'Export',
    save: 'Save',
    edit: 'Edit',
    cancel: 'Cancel',
    reset: 'Reset',
    delete: 'Delete',
    confirm: 'Confirm',
    file: 'Choose File',
    ok: 'OK',
    yes: 'YES',
    no: 'NO',
    submit: 'Submit'
  },
  error404: {
    h1: 'OOPS!',
    h3: 'The webmaster said that you can not enter this page...',
    p: 'Please check that the URL you entered is correct, or click the button below to return to the homepage.',
    backBtn: 'Back to home'
  },
  error401: {
    h1: 'OOPS!',
    h3: 'You are not authorized to enter this page...',
    p: 'Please contact the administrator for permission to enter this page',
    toHome: 'back to home'
  }
}
