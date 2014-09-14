import Ember from 'ember';

export default Ember.Controller.extend({
  i: 77,
  title: function() {
    return 'Page '+this.get('model.id');
  }.property('model.id')
});
