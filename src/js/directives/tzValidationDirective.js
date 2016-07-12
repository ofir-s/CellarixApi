'use strict';

const angular = require('angular');

module.exports = () => {
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModel) {

            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModel.$setViewValue(transformedInput);
                        ngModel.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }

            var isTzValid = (str) => {
                // Just in case -> convert to string
                var IDnum = String(str);

                // Validate correct input
                if ((IDnum.length > 9) || (IDnum.length < 5)) {
                    return false;
                }
                if (isNaN(IDnum)) {
                    return false;
                }

                // The number is too short - add leading 0000
                if (IDnum.length < 9) {
                    while (IDnum.length < 9) {
                        IDnum = '0' + IDnum;
                    }
                }

                // CHECK THE ID NUMBER
                var mone = 0;
                var incNum;
                for (var i = 0; i < 9; i++) {
                    incNum = Number(IDnum.charAt(i));
                    incNum *= (i % 2) + 1;
                    if (incNum > 9) {
                        incNum -= 9;
                    }
                    mone += incNum;
                }
                if (mone % 10 === 0) {
                    return true;
                }
                return false;
            };

            //For DOM -> model validation
            ngModel.$parsers.unshift(function(value) {
                var valid = isTzValid(fromUser(value));
                ngModel.$setValidity('tz', valid);
                return valid ? value : undefined;
            });

            //For model -> DOM validation
            ngModel.$formatters.unshift(function(value) {
                ngModel.$setValidity('tz', isTzValid(fromUser(value)));
                return fromUser(value);
            });
        }
    };
};
