import Ember from 'ember';

export default Ember.Controller.extend({
  i: 83,
  title: function() {
    return 'Page '+this.get('model.id');
  }.property('model.id')
});
