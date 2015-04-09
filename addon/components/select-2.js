import Ember from 'ember';
// import layout from '../templates/components/select-2';

/**
*    # USAGE:
*
*    ## local suggestion
*
*        {{select-2
*            content=suggestedItemsList // [{id: 1, label: 'foo'}, ...]
*            value=selectedValue // filled when an item is selected
*            optionValuePath="content.id" // see Ember.Select documentation
*            optionLabelPath="content.label" // see Ember.Select documentation
*            placeholder="choose a property"}} // placeholder
*
*    ## remote loading suggestion (ajax)
*
*        {{select-2
*            url=url // the url to fetch the data
*            content=defaultValue // if we need to load some default value
*            dataFn=relationSelect2QueryParametersFn // see select2's ajax.data documentation
*            processResultsFn=relationSelect2ProcessResultsFn // see select2's ajax.processResults documentation
*            optionValuePath="content.id" // see Ember.Select documentation
*            optionLabelPath="content.label" // see Ember.Select documentation
*            value=selectedValue}} // fill when an item is selected
*/
export default Ember.Select.extend({

    /** setted from the selected item **/
    value: null,

    /** if not null, select2 will make an ajax call to fetch the data **/
    url: null,

    /** overload this to customize select2 behavior **/
    dataFn: function(params) {
        return {q: params.term};
    },

    /** overload this to customize select2 behavior **/
    processResultsFn: function(data, page) {
        return {results: data};
    },

    /** the select2 ajax configuration **/
    ajaxConfig: function() {
        var url = this.get('url');
        var that = this;
        if (url) {
            return  {
                url: url,
                dataType: 'json',
                delay: 250,
                data: that.dataFn,
                processResults: that.processResultsFn,
                cache: true
            };
        }
    }.property('url'),

    /** the whole select2 configuration **/
    select2Config: function() {
        return {
            placeholder: this.get('placeholder'),
            width: '100%',
            ajax: this.get('ajaxConfig')
        };
    }.property('placeholder', 'ajax'),

    /** reload select2 **/
    reload: function() {
        this._destroySelect2();
        this._initializeSelect2();
    },

    /** reload select2 if the url has changed **/
    _onUrlChanged: function() {
        this.reload();
    }.observes('url'),


    /** if the selected value has changed,
     * update select2 to reflect those chanegs
     */
    _onValueChanged: function() {
        this.get('$elem').val(this.get('value')).trigger('change');
    }.observes('value'),


    _initializeSelect2: function() {
        var $elem = this.$();

        var config = this.get('select2Config');

        $elem.select2(config).on('select2:select', (e) => {
            this.set('value', e.params.data.id);
        });

        this.set('$elem', $elem);
    }.on('didInsertElement'),


    _destroySelect2: function() {
        this.get('$elem').select2("destroy");
    }.on('willDestroyElement')
});
