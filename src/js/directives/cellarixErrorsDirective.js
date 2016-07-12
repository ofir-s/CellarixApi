const angular = require('angular');

module.exports = () => {
    return {
        restrict: 'E',
        template: '<div class="card-error-message" role="alert" ng-show="errors.visible && errors.message && errors.message !== \'\' "> {{ errors.message }} </div>',
        link: (scope) => {
            scope.errors = {};
            scope.$on('errorAlert', (event, data) => {
                scope.errors = data;
            });
        }
    };
};
