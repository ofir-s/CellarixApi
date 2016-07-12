'use strict';

/**
 * All Frontend controllers
 */
module.exports = {
    LayoutController: ['$scope', 'User', '$window', 'dealData', require('./controllers/LayoutController')],
    LoginController: ['$scope', 'User', '$state', '$location', 'AuthenticationService', '$stateParams', '$localStorage', 'VerificationService', require('./controllers/LoginController')],
    ResetPasswordController: ['$scope', 'User', '$state', '$location', 'AuthenticationService', '$stateParams', '$localStorage', 'VerificationService', require('./controllers/ResetPasswordController')],

    RegistrationController: ['$scope', '$state', require('./controllers/registration/RegistrationController')],
    RegistrationStep1Controller: ['$scope', '$state', 'RegistrationService', 'VerificationService', '$stateParams', require('./controllers/registration/RegistrationStep1Controller')],
    RegistrationStep2Controller: ['$scope', '$state', require('./controllers/registration/RegistrationStep2Controller')],
    RegistrationStep3Controller: ['$scope', '$state', '$timeout', '$uibModal', 'VERIFICATION_CODE_RESEND_TIMEOUT_SECONDS', 'VerificationService', 'RegistrationService', require('./controllers/registration/RegistrationStep3Controller')],
    RegistrationStep4Controller: ['$scope', '$state', 'VerificationService', require('./controllers/registration/RegistrationStep4Controller')],
    RegistrationStepFinalController: ['$scope', '$state', require('./controllers/registration/RegistrationStepFinalController')],

    GuestPaymentController: ['$scope', '$state', require('./controllers/paymentsGuest/GuestPaymentController')],
    GuestPaymentStep1Controller: ['$scope', '$state', 'RegistrationService', 'VerificationService', 'RegistrationService', require('./controllers/paymentsGuest/GuestPaymentStep1Controller')],
    GuestPaymentStep2Controller: ['$scope', '$state', 'VerificationService', require('./controllers/paymentsGuest/GuestPaymentStep2Controller')],
    GuestPaymentStep3Controller: ['$scope', '$state', '$window', 'PaymentsService', require('./controllers/paymentsGuest/GuestPaymentStep3Controller')],
    FinalController: ['$scope', '$state', '$stateParams', '$window', '$timeout', require('./controllers/FinalController')],

    PaymentsController: ['$scope', '$state', 'paymentMethods', require('./controllers/payments/PaymentsController')],
    PaymentsStep1Controller: ['$scope', '$state', 'VerificationService', require('./controllers/payments/PaymentsStep1Controller')],
    PaymentsStep2Controller: ['$scope', '$state', '$window', 'PaymentsService', 'User', require('./controllers/payments/PaymentsStep2Controller')]
};
