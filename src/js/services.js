'use strict';

/**
 * All frontend services
 */
module.exports = {
    AlertService: ['$rootScope', require('./services/AlertService')],
    ResponseProcessorService: ['AlertService', require('./services/ResponseProcessorService')],    
    AuthenticationService: ['apiFactory', 'User', 'ResponseProcessorService', require('./services/AuthenticationService')],
    InitializationService: ['apiFactory', 'Deal', require('./services/InitializationService')],
    RegistrationService: ['apiFactory', 'ResponseProcessorService', 'User', require('./services/RegistrationService')],
    VerificationService: ['apiFactory', 'ResponseProcessorService', require('./services/VerificationService')],
    PaymentsService: ['apiFactory', 'ResponseProcessorService', require('./services/PaymentsService')]
};
