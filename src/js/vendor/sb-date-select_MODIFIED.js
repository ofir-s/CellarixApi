/* global moment */
/* jshint ignore:start */
/* MODIFIED BY ALEXB :
    'Localized',
    Default MAX date - today - 14 years,
    Default MIN date today - 100 years,
    inline-selects, custom-select styles added,
    TabIndex added
 */
angular.module('sbDateSelect', [])

  .directive('sbDateSelect', [function () {

    var template = [
      '<div class="sb-date-select inline-form-items">',
        '<select tabIndex="{{tabIndex}}" class="inline-form-item sb-date-select-day sb-date-select-select custom-select" ng-class="selectClass" ng-model="val.date" ng-options="d for d in dates track by d">',
          '<option value disabled selected>יום</option>',
        '</select>',
        '<select tabIndex="{{tabIndex}}" class="inline-form-item sb-date-select-month sb-date-select-select custom-select" ng-class="selectClass" ng-model="val.month" ng-options="m.value as m.name for m in months">',
          '<option value disabled>חודש</option>',
        '</select>',
        '<select tabIndex="{{tabIndex}}" class="inline-form-item sb-date-select-year sb-date-select-select custom-select" ng-class="selectClass" ng-model="val.year" ng-options="y for y in years">',
          '<option value disabled selected>שנה</option>',
        '</select>',
      '</div>'
    ];

    return {
      restrict: 'A',
      replace: true,
      template: template.join(''),
      require: 'ngModel',
      scope: {
        selectClass: '@sbSelectClass',
        tabIndex: '@'
      },

      link: function(scope, elem, attrs, model) {
        scope.val = {};

        var min = scope.min = moment(attrs.min || moment().subtract(100, 'years').format('YYYY-MM-DD'));
        var max = scope.max = moment(attrs.max || moment().subtract(14, 'years').format('YYYY-MM-DD'));

        scope.years = [];

        for (var i=max.year(); i>=min.year(); i--) {
          scope.years.push(i);
        }

        scope.$watch('val.year', function () {
          updateMonthOptions();
        });

        scope.$watchCollection('[val.month, val.year]', function () {
          updateDateOptions();
        });

        scope.$watchCollection('[val.date, val.month, val.year]', function () {
          if (scope.val.year && scope.val.month && scope.val.date) {
            var m = moment([scope.val.year, scope.val.month-1, scope.val.date]);
            model.$setViewValue(m.format('YYYY-MM-DD'));
          }
          else {
            model.$setViewValue();
          }
        });

        function updateMonthOptions () {
          // Values begin at 1 to permit easier boolean testing
          scope.months = [];

          var minMonth = scope.val.year && min.isSame([scope.val.year], 'year') ? min.month() : 0;
          var maxMonth = scope.val.year && max.isSame([scope.val.year], 'year') ? max.month() : 11;

          var monthNames = moment.months();

          for (var j=minMonth; j<=maxMonth; j++) {
            scope.months.push({
              name: monthNames[j],
              value: j+1
            });
          }

          if (scope.val.month-1 > maxMonth || scope.val.month-1 < minMonth) delete scope.val.month;
        }

        function updateDateOptions (year, month) {
          var minDate, maxDate;

          if (scope.val.year && scope.val.month && min.isSame([scope.val.year, scope.val.month-1], 'month')) {
            minDate = min.date();
          } else {
            minDate = 1;
          }

          if (scope.val.year && scope.val.month && max.isSame([scope.val.year, scope.val.month-1], 'month')) {
            maxDate = max.date();
          } else if (scope.val.year && scope.val.month) {
            maxDate = moment([scope.val.year, scope.val.month-1]).daysInMonth();
          } else {
            maxDate = 31;
          }

          scope.dates = [];

          for (var i=minDate; i<=maxDate; i++) {
            scope.dates.push(i);
          }
          if (scope.val.date < minDate || scope.val.date > maxDate) delete scope.val.date;
        }

        // model -> view
        model.$render = function() {
          if (!model.$viewValue) return;

          var m = moment(model.$viewValue);

          // Always use a dot in ng-model attrs...
          scope.val = {
            year: m.year(),
            month: m.month()+1,
            date: m.date()
          };
        };
      }
    };
  }]);

/* jshint ignore:end */
