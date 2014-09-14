import Ember from 'ember';

export default Ember.Controller.extend({
  i: 57,
  title: function() {
    return 'Page '+this.get('model.id');
  }.property('model.id')
});
