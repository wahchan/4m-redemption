export default {
    yup: {
        AFTER_CALCULATE: 'must be 5 minutes after calculation time',
        NETWORK_ERROR: 'server error',
        //password
        INVALID_PASSWORD: 'invalid password',
        NEW_PASSWORD_EQUAL: 'new password must not be equal to old password',
        CONFIRM_PASSWORD_EQUAL: 'invalid input',
        //staff
        STAFF_EXIST: 'staff already exists',
        STAFF_EXIST_DISABLED: 'staff already exists but disabled',
        STAFF_WRONG_ID: 'invalid staff id ',
        //parameter
        TIME_FORMAT_ERROR: 'not a valid time input (HH:mm)',
        TIME_BEFORE_12: 'drop time must be after 12:04',
        SECOND_DROP: 'drop time must be later than first drop time',
        DATE_FORMAT_ERROR: 'invalid time',
    },
    Date: {
        expired_time: '2022/1/1'
    }
}