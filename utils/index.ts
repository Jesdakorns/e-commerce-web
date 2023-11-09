export const TEXT = {

};

export const PATTERN = {
    EMAIL: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    PASSWORD: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}/,
    PHONE: /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
    TEXT_ONLY: /^([a-zA-Z])+$/,
    FLOAT: /^[-]?[0-9]*\.?[0-9]*$/,
    INTEGER: /^[-]?([0-9]*)$/,
    POSITIVE_FLOAT: /^[0-9]*\.?[0-9]*$/,
    POSITIVE_INT_FLOAT: /^[0-9]+(\.[0-9]+)?$/,
    POSITIVE_INT: /^([0-9]*)$/,
};

