/**
 * @module ol/TileQueue
 */
import TileState from './TileState.js';
import {listen, unlisten} from './events.js';
import EventType from './events/EventType.js';
import PriorityQueue from './structs/PriorityQueue.js';


/**
 * @typedef {function(import("./Tile.js").default, string, import("./coordinate.js").Coordinate, number): number} PriorityFunction
 */


var TileQueue = /*@__PURE__*/(function (PriorityQueue) {
  function TileQueue(tilePriorityFunction, tileChangeCallback) {

    PriorityQueue.call(
      /**
       * @param {Array} element Element.
       * @return {number} Priority.
       */
      this, function(element) {
        return tilePriorityFunction.apply(null, element);
      },
      /**
       * @param {Array} element Element.
       * @return {string} Key.
       */
      function(element) {
        return (/** @type {import("./Tile.js").default} */ (element[0]).getKey());
      });

    /**
     * @private
     * @type {function(): ?}
     */
    this.tileChangeCallback_ = tileChangeCallback;

    /**
     * @private
     * @type {number}
     */
    this.tilesLoading_ = 0;

    /**
     * @private
     * @type {!Object<string,boolean>}
     */
    this.tilesLoadingKeys_ = {};

  }

  if ( PriorityQueue ) TileQueue.__proto__ = PriorityQueue;
  TileQueue.prototype = Object.create( PriorityQueue && PriorityQueue.prototype );
  TileQueue.prototype.constructor = TileQueue;

  /**
   * @inheritDoc
   */
  TileQueue.prototype.enqueue = function enqueue (element) {
    var added = PriorityQueue.prototype.enqueue.call(this, element);
    if (added) {
      var tile = element[0];
      listen(tile, EventType.CHANGE, this.handleTileChange, this);
    }
    return added;
  };

  /**
   * @return {number} Number of tiles loading.
   */
  TileQueue.prototype.getTilesLoading = function getTilesLoading () {
    return this.tilesLoading_;
  };

  /**
   * @param {import("./events/Event.js").default} event Event.
   * @protected
   */
  TileQueue.prototype.handleTileChange = function handleTileChange (event) {
    var tile = /** @type {import("./Tile.js").default} */ (event.target);
    var state = tile.getState();
    if (state === TileState.LOADED || state === TileState.ERROR ||
        state === TileState.EMPTY || state === TileState.ABORT) {
      unlisten(tile, EventType.CHANGE, this.handleTileChange, this);
      var tileKey = tile.getKey();
      if (tileKey in this.tilesLoadingKeys_) {
        delete this.tilesLoadingKeys_[tileKey];
        --this.tilesLoading_;
      }
      this.tileChangeCallback_();
    }
  };

  /**
   * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
   * @param {number} maxNewLoads Maximum number of new tiles to load.
   */
  TileQueue.prototype.loadMoreTiles = function loadMoreTiles (maxTotalLoading, maxNewLoads) {
    var newLoads = 0;
    var abortedTiles = false;
    var state, tile, tileKey;
    while (this.tilesLoading_ < maxTotalLoading && newLoads < maxNewLoads &&
           this.getCount() > 0) {
      tile = /** @type {import("./Tile.js").default} */ (this.dequeue()[0]);
      tileKey = tile.getKey();
      state = tile.getState();
      if (state === TileState.ABORT) {
        abortedTiles = true;
      } else if (state === TileState.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
        this.tilesLoadingKeys_[tileKey] = true;
        ++this.tilesLoading_;
        ++newLoads;
        tile.load();
      }
    }
    if (newLoads === 0 && abortedTiles) {
      // Do not stop the render loop when all wanted tiles were aborted due to
      // a small, saturated tile cache.
      this.tileChangeCallback_();
    }
  };

  return TileQueue;
}(PriorityQueue));


export default TileQueue;

//# sourceMappingURL=TileQueue.js.map