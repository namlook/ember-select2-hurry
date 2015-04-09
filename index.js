/* jshint node: true */
'use strict';

module.exports = {
    name: 'ember-select2-hurry',

    included: function(app) {
        this._super.included(app);

        app.import(app.bowerDirectory + '/select2/dist/js/select2.js');
        app.import(app.bowerDirectory + '/select2/dist/css/select2.css');
    }
};
