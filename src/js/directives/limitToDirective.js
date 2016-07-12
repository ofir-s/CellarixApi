const angular = require('angular');

module.exports = () => {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            attrs.$set('ngTrim', 'false');
            var limitLength = 10;
            if (attrs.limitTo || attrs.limitTo === '0') {
                limitLength = parseInt(attrs.limitTo);
            } else if (attrs.ngMaxlength || attrs.ngMaxlength === '0') {
                limitLength = parseInt(attrs.ngMaxlength);
            }
            angular.element(element).on('keyup', function(e) {
                if (ngModel.$viewValue && ngModel.$viewValue.length >= limitLength) {
                    ngModel.$setViewValue(ngModel.$viewValue.substring(0, limitLength));
                    ngModel.$render();
                }
            });
        }
    };
};
