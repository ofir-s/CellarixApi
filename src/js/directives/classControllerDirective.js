const angular = require('angular');

module.exports = () => {
    return {
        restrict: 'E',
        scope: {
            element: '=',
            classes: '@'
        },
        controller: ['$scope', ($scope) => {
            if ($scope.element) {
                $scope.element.classes = $scope.classes;
                return;
            }
            console.warn($scope.element + ' is not expected!');
        }]
    };
};
