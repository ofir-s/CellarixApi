const angular = require('angular');

module.exports = () => {
    return {
        require: '^form',
        restrict: 'E',
        templateUrl: 'views/partials/ccNameFieldDirective.html',
        scope: {
            ccNameField: '=',
            formName: '=',
            tabIndex: '='
        }
    };
};
