"use strict";

const RolesEnum = {
    ADMIN: 50,
    EMPLOYEES: 5,
    READ_ONLY: 0,
    TICKETING_AGENT: 4,
    TOUR_OPERATOR: 3,
    USER: 1,
    VENDOR: 2
};
const RolesEnumNumber = {
    0: "READ_ONLY",
    1: "USER",
    2: "VENDOR",
    3: "TOUR_OPERATOR",
    4: "TICKETING_AGENT",
    5: "EMPLOYEES",
    50: "ADMIN"
};

module.exports = {
    RolesEnum,
    RolesEnumNumber
};