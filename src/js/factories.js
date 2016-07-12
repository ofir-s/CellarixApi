'use strict';

/**
 * All frontend factories
 * @type {{errorHandler: *[]}}
 */
module.exports = {
    errorHandler: ['$injector', '$q', 'AlertService', '$location', require('./factories/ErrorHandlerFactory')],
    apiFactory: ['$rootScope', 'Restangular', 'User', 'Deal', require('./factories/ApiFactory')]
};
