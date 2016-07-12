const angular = require('angular');

module.exports = () => {
    return {
        require: '^form',
        restrict: 'E',
        templateUrl: 'views/partials/emailFieldDirective.html',
        scope: {
            emailField: '=',
            formName: '=',
            tabIndex: '='
        }
    };
};
