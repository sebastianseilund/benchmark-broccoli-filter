import Ember from 'ember';

export default Ember.Controller.extend({
  i: 1,
  title: function() {
    return 'Page '+this.get('model.id');
  }.property('model.id')
});
