const angular = require('angular');

module.exports = () => {
    return {
        require: '^form',
        restrict: 'E',
        templateUrl: 'views/partials/lastNameFieldDirective.html',
        scope: {
            lastNameField: '=',
            formName: '=',
            tabIndex: '='
        }
    };
};
