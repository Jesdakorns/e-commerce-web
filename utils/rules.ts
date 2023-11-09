import { PATTERN } from ".";

export const RULES = {
    PATTERN: {
        EMAIL: {
            value: PATTERN.EMAIL,
            message: 'The email format is incorrect. Ex "user@gmail.com"'
        },
        PASSWORD: {
            value: PATTERN.PASSWORD,
            message: 'A lowercase letter, A capital (uppercase) letter, A number and Minimum 8 characters'
        },
        PHONE: {
            value: PATTERN.PHONE,
            message: 'The phone number format is incorrect. Ex "099-999-9999"'
        }
    }

}