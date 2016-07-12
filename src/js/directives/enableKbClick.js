const angular = require('angular');

module.exports = () => {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            element.bind('keypress keydown',
                (e) => {
                    if (e.which === 13) {
                        element.click();
                    }
                });
        }
    };
};
