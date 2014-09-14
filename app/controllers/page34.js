import Ember from 'ember';

export default Ember.Controller.extend({
  i: 34,
  title: function() {
    return 'Page '+this.get('model.id');
  }.property('model.id')
});
