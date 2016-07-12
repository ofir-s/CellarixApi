'use strict';
const angular = require('angular');
const swal = require('sweetalert');
const $ = require('jquery');

module.exports = ($scope, User, $window, dealData) => {

    $scope.logout = () => {
        User.logout();
    };

    $scope.back = () => {
        $window.history.back();
    };

    $scope.dealData = {
        data: dealData
    };

    $scope.header = {
        classes: ''
    };

    $scope.footer = {
        classes: ''
    };

    $scope.body = {
        classes: ''
    };


    // Catch F5 click
    $scope.onKeydown = () => {
        $($window).on('keydown', function(e) {
            if (e && e.keyCode === 27) {
                $scope.toggleCart();
            }

            if (e && e.keyCode === 116) {
                e.preventDefault();
                swal({
                    title: 'האם אתה בטוח?',
                    text: 'אתה אומד לרענן את הדף. ונתונים שלך לא ישמרו. האם להמשיך?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'לרענן',
                    cancelButtonText: 'לא לרענן'
                }, (isConfirm) => {
                    if (isConfirm) {
                        $window.location.reload();
                    }
                });
            }
        });
    };

    $scope.toggleCart = () => {
        $('.cart').toggleClass('open');
        $('body').toggleClass('cart-open');
    };

    $scope.onKeydown();

    $scope.tryGoBack = () => {
        swal({
            title: 'האם אתה בטוח?',
            text: 'אתה הולך לחזור לאתר החנות ונתונים שלך לא ישמרו. האם להמשיך?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'כן, לחזור לחנות',
            cancelButtonText: 'לא, להישאר פה'
        }, () => {
            var url = 'http://cellarix.co.il';
            if ($scope.dealData.data && $scope.dealData.data.supplierConfiguration && $scope.dealData.data.supplierConfiguration.aPIDisplay && $scope.dealData.data.supplierConfiguration.aPIDisplay.redirectURL) {
                url = $scope.dealData.data.supplierConfiguration.aPIDisplay.redirectURL;
            }
            $window.location.href = url;
        });
    };

    // Watchers
    $scope.$watch(() => {
        return $scope.body.classes;
    }, () => {
        $('body').attr('class', '');
        $('body').addClass('ng-scope');
        $('body').addClass($scope.body.classes);
    });

};
