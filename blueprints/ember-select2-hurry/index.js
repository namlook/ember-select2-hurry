module.exports = {
  description: '',

  normalizeEntityName: function() {
    // allows us to run ember -g ember-select2-hurry and not blow up
    // because ember cli normally expects the format
    // ember generate <entitiyName> <blueprint>
  },

  afterInstall: function() {
    return this.addBowerPackageToProject('select2#4.0.0');
  }
};
