(function(Ember) {

  /**
    A computed property which returns a reversed array without 
    recreating a new array on each replace action.

    Example

    ```javascript
    App.Timeline = Ember.Object.extend({
      reverseChronPosts: Ember.computed.reverse('posts')
    });

    var timeline = App.Timeline.create({posts: [
      'good morning',
      'grabbing lunch',
      'making dinner'
    ]});
    timeline.get('reverseChronPosts'); // ['making dinner', 'grabbing lunch', 'good morning']
    ```

    @method computed.reverse
    @for Ember
    @param {String} dependentKey
    @return {Ember.ComputedProperty} computes an array with the elements 
    from the dependent array reversed
  */

  var get = Ember.get,
      lengthProp = 'length';

  Ember.computed.reverse = function(dependentKey) {
    return Ember.arrayComputed(dependentKey, {
      addedItem: function(array, item, changeMeta) {
        array.insertAt(get(array, lengthProp) - changeMeta.index, item);
        return array;
      },

      removedItem: function(array, item, changeMeta) {
        array.removeAt(get(array, lengthProp) - changeMeta.index - 1);
        return array;
      }
    });
  };

})(Ember);
