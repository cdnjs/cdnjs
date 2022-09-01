import Player from '../player';
/**
 * Player instance list
 *
 * @description A collection of all the OpenPlayer instances, identified by a unique key.
 * @interface PlayerInstanceList
 * @export
 */
export default interface PlayerInstanceList {
    [id: string]: Player;
}
