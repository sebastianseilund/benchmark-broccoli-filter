import Ember from 'ember';

export default Ember.Controller.extend({
  i: 45,
  title: function() {
    return 'Page '+this.get('model.id');
  }.property('model.id')
});
