const angular = require('angular');

module.exports = () => {
    return {
        require: '^form',
        restrict: 'E',
        templateUrl: 'views/partials/firstNameFieldDirective.html',
        scope: {
            firstNameField: '=',
            formName: '=',
            tabIndex: '='
        }
    };
};
