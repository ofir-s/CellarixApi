'use strict';

const angular = require('angular');

module.exports = () => {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {

            attr.$set('type', 'password');
            el.parent().addClass('has-feedback');

            var fbSpan = angular.element('<i style="pointer-events: auto;" class="form-control-feedback fa fa-eye"></i>');
            el.after(fbSpan);

            fbSpan.on('mouseover', function() {
                attr.$set('type', 'text');
            });

            fbSpan.on('mouseleave', function() {
                attr.$set('type', 'password');
            });
        }
    };
};
