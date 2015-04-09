# Ember-select2-hurry

A quick and dirty select2 component for EmberJS.

## Usage

### local suggestion

    {{select-2
        content=suggestedItemsList // [{id: 1, label: 'foo'}, ...]
        value=selectedValue // filled when an item is selected
        optionValuePath="content.id" // see Ember.Select documentation
        optionLabelPath="content.label" // see Ember.Select documentation
        placeholder="choose a property"}} // placeholder

### remote loading suggestion (ajax)

    {{select-2
        url=url // the url to fetch the data
        content=defaultValue // if we need to load some default value
        dataFn=relationSelect2QueryParametersFn // see select2's ajax.data documentation
        processResultsFn=relationSelect2ProcessResultsFn // see select2's ajax.processResults documentation
        optionValuePath="content.id" // see Ember.Select documentation
        optionLabelPath="content.label" // see Ember.Select documentation
        value=selectedValue}} // fill when an item is selected

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
