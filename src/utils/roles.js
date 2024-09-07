"use strict";

const RolesEnum = {
    ADMIN: 50,
    MENTEE: 1,
    MENTOR: 2,
    READ_ONLY: 0
};
const RolesEnumNumber = {
    0: "READ_ONLY",
    1: "MENTEE",
    2: "MENTOR",
    50: "ADMIN"
};

module.exports = {
    RolesEnum,
    RolesEnumNumber
};