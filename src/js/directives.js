'use strict';

/**
 * All frontend directives
 * @type {{}}
 */
module.exports = {
    peekToPassword: [require('./directives/PeekToPasswordDirective')],
    numbersOnly: [require('./directives/NumbersOnly')],
    cellarixCcDirective: [require('./directives/cellarixCcDirective')],
    cellarixErrorsDirective: [require('./directives/cellarixErrorsDirective')],
    tzValidation: [require('./directives/tzValidationDirective')],
    limitTo: [require('./directives/limitToDirective')],
    tzFieldDirective: [require('./directives/tzFieldDirective')],
    classControllerDirective: [require('./directives/classControllerDirective')],
    emailFieldDirective: [require('./directives/emailFieldDirective')],
    ccNameFieldDirective: [require('./directives/ccNameFieldDirective')],
    cellphoneFieldDirective: [require('./directives/cellphoneFieldDirective')],
    firstNameFieldDirective: [require('./directives/firstNameFieldDirective')],
    lastNameFieldDirective: [require('./directives/lastNameFieldDirective')],
    enableKbClick: [require('./directives/enableKbClick')]
};
