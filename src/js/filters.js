'use strict';

module.exports = {
    DateFilter: ['$filter', require('./filters/DateFilter')],
    MomentFilter: ['$filter', require('./filters/MomentFilter')]    
};