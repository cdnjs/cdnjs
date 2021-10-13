// Type definitions for spotify-web-api-js v1.3.0
// Project: https://github.com/JMPerez/spotify-web-api-js
// Definitions by: Niels Kristian Hansen Skovmand <https://github.com/skovmand>

/// <reference path="./spotify-api.d.ts" />

// export as namespace SpotifyWebApiJs;

export default SpotifyWebApi;

declare namespace SpotifyWebApi {
  interface VoidResultsCallback {
    (error: ErrorObject): any;
  }

  /**
   * An optional callback that receives 2 parameters. The first
   * one is the error object (null if no error), and the second is the value if the request succeeded.
   */
  interface ResultsCallback<T> {
    (error: ErrorObject, value: T): any;
  }

  /**
   * Describes the regular error object: https://developer.spotify.com/web-api/user-guide/#error-details
   */
  interface ErrorObject {
    status: number;
    response: string;
    statusText: string;
  }

  /**
   * Describes the static side of SpotifyApi.
   * Only possibility is to get a new instance of the SpotifyApi.
   */
  interface SpotifyWebApiJsStatic {
    new (): SpotifyWebApiJs;
  }

  /**
   * Describes an instance of SpotifyApi
   * Methods are in the order of appearance in spotify-web-api.js
   */
  interface SpotifyWebApiJs {
    /**
     * Fetches a resource through a generic GET request.
     *
     * @param {string} url The URL to be fetched
     * @param {function(Object,Object)} callback An optional callback
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getGeneric(
      url: string,
      callback?: ResultsCallback<Object>
    ): Promise<Object>;

    /**
     * Fetches information about the current user.
     * See [Get Current User's Profile](https://developer.spotify.com/web-api/get-current-users-profile/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMe(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.CurrentUsersProfileResponse>
    ): Promise<SpotifyApi.CurrentUsersProfileResponse>;

    /**
     * Fetches current user's saved tracks.
     * See [Get Current User's Saved Tracks](https://developer.spotify.com/web-api/get-users-saved-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMySavedTracks(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.UsersSavedTracksResponse>
    ): Promise<SpotifyApi.UsersSavedTracksResponse>;

    /**
     * Adds a list of tracks to the current user's saved tracks.
     * See [Save Tracks for Current User](https://developer.spotify.com/web-api/save-tracks-user/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
     * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    addToMySavedTracks(
      trackIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SaveTracksForUserResponse>
    ): Promise<SpotifyApi.SaveTracksForUserResponse>;

    /**
     * Remove a list of tracks from the current user's saved tracks.
     * See [Remove Tracks for Current User](https://developer.spotify.com/web-api/remove-tracks-user/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
     * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    removeFromMySavedTracks(
      trackIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.RemoveUsersSavedTracksResponse>
    ): Promise<SpotifyApi.RemoveUsersSavedTracksResponse>;

    /**
     * Checks if the current user's saved tracks contains a certain list of tracks.
     * See [Check Current User's Saved Tracks](https://developer.spotify.com/web-api/check-users-saved-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
     * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    containsMySavedTracks(
      trackIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.CheckUsersSavedTracksResponse>
    ): Promise<SpotifyApi.CheckUsersSavedTracksResponse>;

    /**
     * Get a list of the albums saved in the current Spotify user's "Your Music" library.
     * See [Get Current User's Saved Albums](https://developer.spotify.com/web-api/get-users-saved-albums/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMySavedAlbums(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.UsersSavedAlbumsResponse>
    ): Promise<SpotifyApi.UsersSavedAlbumsResponse>;

    /**
     * Save one or more albums to the current user's "Your Music" library.
     * See [Save Albums for Current User](https://developer.spotify.com/web-api/save-albums-user/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
     * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    addToMySavedAlbums(
      albumIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SaveAlbumsForUserResponse>
    ): Promise<SpotifyApi.SaveAlbumsForUserResponse>;

    /**
     * Remove one or more albums from the current user's "Your Music" library.
     * See [Remove Albums for Current User](https://developer.spotify.com/web-api/remove-albums-user/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
     * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    removeFromMySavedAlbums(
      albumIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.RemoveAlbumsForUserResponse>
    ): Promise<SpotifyApi.RemoveAlbumsForUserResponse>;

    /**
     * Check if one or more albums is already saved in the current Spotify user's "Your Music" library.
     * See [Check User's Saved Albums](https://developer.spotify.com/web-api/check-users-saved-albums/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
     * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    containsMySavedAlbums(
      albumIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.CheckUserSavedAlbumsResponse>
    ): Promise<SpotifyApi.CheckUserSavedAlbumsResponse>;

    /**
     * Get the current user’s top artists based on calculated affinity.
     * See [Get a User’s Top Artists](https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMyTopArtists(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.UsersTopArtistsResponse>
    ): Promise<SpotifyApi.UsersTopArtistsResponse>;

    /**
     * Get the current user’s top tracks based on calculated affinity.
     * See [Get a User’s Top Tracks](https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMyTopTracks(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.UsersTopTracksResponse>
    ): Promise<SpotifyApi.UsersTopTracksResponse>;

    /**
     * Get tracks from the current user’s recently played tracks.
     * See [Get Current User’s Recently Played Tracks](https://developer.spotify.com/web-api/web-api-personalization-endpoints/get-recently-played/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMyRecentlyPlayedTracks(
      options?: SpotifyApi.RecentlyPlayedParameterObject
    ): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse>;
    getMyRecentlyPlayedTracks(
      options: SpotifyApi.RecentlyPlayedParameterObject,
      callback: ResultsCallback<SpotifyApi.UsersRecentlyPlayedTracksResponse>
    ): void;
    getMyRecentlyPlayedTracks(
      callback: ResultsCallback<SpotifyApi.UsersRecentlyPlayedTracksResponse>
    ): void;

    /**
     * Adds the current user as a follower of one or more other Spotify users.
     * See [Follow Artists or Users](https://developer.spotify.com/web-api/follow-artists-users/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
     * to find their user id (e.g. spotify:user:<here_is_the_user_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an empty value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    followUsers(
      userIds: string[],
      callback?: ResultsCallback<SpotifyApi.FollowArtistsOrUsersResponse>
    ): Promise<SpotifyApi.FollowArtistsOrUsersResponse>;

    /**
     * Adds the current user as a follower of one or more artists.
     * See [Follow Artists or Users](https://developer.spotify.com/web-api/follow-artists-users/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
     * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an empty value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    followArtists(
      artistIds: string[],
      callback?: ResultsCallback<SpotifyApi.FollowArtistsOrUsersResponse>
    ): Promise<SpotifyApi.FollowArtistsOrUsersResponse>;

    /**
     * Add the current user as a follower of one playlist.
     * See [Follow a Playlist](https://developer.spotify.com/web-api/follow-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Object} options A JSON object with options that can be passed. For instance,
     * whether you want the playlist to be followed privately ({public: false})
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an empty value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    followPlaylist(
      playlistId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.FollowPlaylistResponse>
    ): Promise<SpotifyApi.FollowPlaylistResponse>;

    /**
     * Removes the current user as a follower of one or more other Spotify users.
     * See [Unfollow Artists or Users](https://developer.spotify.com/web-api/unfollow-artists-users/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
     * to find their user id (e.g. spotify:user:<here_is_the_user_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an empty value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    unfollowUsers(
      userIds: string[],
      callback?: ResultsCallback<SpotifyApi.UnfollowArtistsOrUsersResponse>
    ): Promise<SpotifyApi.UnfollowArtistsOrUsersResponse>;

    /**
     * Removes the current user as a follower of one or more artists.
     * See [Unfollow Artists or Users](https://developer.spotify.com/web-api/unfollow-artists-users/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
     * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an empty value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    unfollowArtists(
      artistIds: string[],
      callback?: ResultsCallback<SpotifyApi.UnfollowArtistsOrUsersResponse>
    ): Promise<SpotifyApi.UnfollowArtistsOrUsersResponse>;

    /**
     * Remove the current user as a follower of one playlist.
     * See [Unfollow a Playlist](https://developer.spotify.com/web-api/unfollow-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an empty value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    unfollowPlaylist(
      playlistId: string,
      callback?: ResultsCallback<SpotifyApi.UnfollowPlaylistResponse>
    ): Promise<SpotifyApi.UnfollowPlaylistResponse>;

    /**
     * Checks to see if the current user is following one or more other Spotify users.
     * See [Check if Current User Follows Users or Artists](https://developer.spotify.com/web-api/check-current-user-follows/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
     * to find their user id (e.g. spotify:user:<here_is_the_user_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an array of boolean values that indicate
     * whether the user is following the users sent in the request.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    isFollowingUsers(
      userIds: string[],
      callback?: ResultsCallback<SpotifyApi.UserFollowsUsersOrArtistsResponse>
    ): Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse>;

    /**
     * Checks to see if the current user is following one or more artists.
     * See [Check if Current User Follows](https://developer.spotify.com/web-api/check-current-user-follows/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
     * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an array of boolean values that indicate
     * whether the user is following the artists sent in the request.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    isFollowingArtists(
      artistIds: string[],
      callback?: ResultsCallback<SpotifyApi.UserFollowsUsersOrArtistsResponse>
    ): Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse>;

    /**
     * Check to see if one or more Spotify users are following a specified playlist.
     * See [Check if Users Follow a Playlist](https://developer.spotify.com/web-api/check-user-following-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
     * to find their user id (e.g. spotify:user:<here_is_the_user_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an array of boolean values that indicate
     * whether the users are following the playlist sent in the request.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    areFollowingPlaylist(
      playlistId: string,
      userIds: string[],
      callback?: ResultsCallback<SpotifyApi.UsersFollowPlaylistResponse>
    ): Promise<SpotifyApi.UsersFollowPlaylistResponse>;

    /**
     * Get the current user's followed artists.
     * See [Get User's Followed Artists](https://developer.spotify.com/web-api/get-followed-artists/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} [options] Options, being after and limit.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is an object with a paged object containing
     * artists.
     * @returns {Promise|undefined} A promise that if successful, resolves to an object containing a paging object which contains
     * artists objects. Not returned if a callback is given.
     */
    getFollowedArtists(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.UsersFollowedArtistsResponse>
    ): Promise<SpotifyApi.UsersFollowedArtistsResponse>;

    /**
     * Fetches information about a specific user.
     * See [Get a User's Profile](https://developer.spotify.com/web-api/get-users-profile/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} userId The id of the user. If you know the Spotify URI it is easy
     * to find the id (e.g. spotify:user:<here_is_the_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getUser(
      userId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.UserProfileResponse>
    ): Promise<SpotifyApi.UserProfileResponse>;

    /**
     * Fetches a list of the current user's playlists.
     * See [Get a List of a User's Playlists](https://developer.spotify.com/web-api/get-list-users-playlists/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} userId An optional id of the user. If you know the Spotify URI it is easy
     * to find the id (e.g. spotify:user:<here_is_the_id>). If not provided, the id of the user that granted
     * the permissions will be used.
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getUserPlaylists(
      userId?: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ListOfUsersPlaylistsResponse>
    ): Promise<SpotifyApi.ListOfUsersPlaylistsResponse>;

    /**
     * Fetches a specific playlist.
     * See [Get a Playlist](https://developer.spotify.com/web-api/get-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getPlaylist(
      playlistId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SinglePlaylistResponse>
    ): Promise<SpotifyApi.SinglePlaylistResponse>;

    /**
     * Fetches the tracks from a specific playlist.
     * See [Get a Playlist's Tracks](https://developer.spotify.com/web-api/get-playlists-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getPlaylistTracks(
      playlistId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.PlaylistTrackResponse>
    ): Promise<SpotifyApi.PlaylistTrackResponse>;

    /**
     * Gets the current image associated with a specific playlist.
     * See [Get a Playlist Cover Image](https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist-cover/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:playlist:<here_is_the_playlist_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getPlaylistCoverImage(
      playlistId: string,
      callback?: ResultsCallback<SpotifyApi.PlaylistCoverImageResponse>
    ): Promise<SpotifyApi.PlaylistCoverImageResponse>;

    /**
     * Creates a playlist and stores it in the current user's library.
     * See [Create a Playlist](https://developer.spotify.com/web-api/create-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} userId The id of the user. If you know the Spotify URI it is easy
     * to find the id (e.g. spotify:user:<here_is_the_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    createPlaylist(
      userId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.CreatePlaylistResponse>
    ): Promise<SpotifyApi.CreatePlaylistResponse>;

    /**
     * Change a playlist's name and public/private state
     * See [Change a Playlist's Details](https://developer.spotify.com/web-api/change-playlist-details/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Object} data A JSON object with the data to update. E.g. {name: 'A new name', public: true}
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    changePlaylistDetails(
      playlistId: string,
      data: Object,
      callback?: ResultsCallback<SpotifyApi.ChangePlaylistDetailsResponse>
    ): Promise<SpotifyApi.ChangePlaylistDetailsResponse>;

    /**
     * Add tracks to a playlist.
     * See [Add Tracks to a Playlist](https://developer.spotify.com/web-api/add-tracks-to-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Array<string>} uris An array of Spotify URIs for the tracks
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    addTracksToPlaylist(
      playlistId: string,
      uris: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.AddTracksToPlaylistResponse>
    ): Promise<SpotifyApi.AddTracksToPlaylistResponse>;

    /**
     * Replace the tracks of a playlist
     * See [Replace a Playlist's Tracks](https://developer.spotify.com/web-api/replace-playlists-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Array<string>} uris An array of Spotify URIs for the tracks
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    replaceTracksInPlaylist(
      playlistId: string,
      uris: string[],
      callback?: ResultsCallback<SpotifyApi.ReplacePlaylistTracksResponse>
    ): Promise<SpotifyApi.ReplacePlaylistTracksResponse>;

    /**
     * Reorder tracks in a playlist
     * See [Reorder a Playlist’s Tracks](https://developer.spotify.com/web-api/reorder-playlists-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {number} rangeStart The position of the first track to be reordered.
     * @param {number} insertBefore The position where the tracks should be inserted. To reorder the tracks to
     * the end of the playlist, simply set insert_before to the position after the last track.
     * @param {Object} options An object with optional parameters (range_length, snapshot_id)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    reorderTracksInPlaylist(
      playlistId: string,
      rangeStart: number,
      insertBefore: number,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ReorderPlaylistTracksResponse>
    ): Promise<SpotifyApi.ReorderPlaylistTracksResponse>;

    /**
     * Remove tracks from a playlist
     * See [Remove Tracks from a Playlist](https://developer.spotify.com/web-api/remove-tracks-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Array<Object>} uris An array of tracks to be removed. Each element of the array can be either a
     * string, in which case it is treated as a URI, or an object containing the properties `uri` (which is a
     * string) and `positions` (which is an array of integers).
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    removeTracksFromPlaylist(
      playlistId: string,
      uris: Object[],
      callback?: ResultsCallback<SpotifyApi.RemoveTracksFromPlaylistResponse>
    ): Promise<SpotifyApi.RemoveTracksFromPlaylistResponse>;

    /**
     * Remove tracks from a playlist, specifying a snapshot id.
     * See [Remove Tracks from a Playlist](https://developer.spotify.com/web-api/remove-tracks-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Array<Object>} uris An array of tracks to be removed. Each element of the array can be either a
     * string, in which case it is treated as a URI, or an object containing the properties `uri` (which is a
     * string) and `positions` (which is an array of integers).
     * @param {string} snapshotId The playlist's snapshot ID against which you want to make the changes
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    removeTracksFromPlaylistWithSnapshotId(
      playlistId: string,
      uris: Object[],
      snapshotId: string,
      callback?: ResultsCallback<SpotifyApi.PlaylistSnapshotResponse>
    ): Promise<SpotifyApi.PlaylistSnapshotResponse>;

    /**
     * Remove tracks from a playlist, specifying the positions of the tracks to be removed.
     * See [Remove Tracks from a Playlist](https://developer.spotify.com/web-api/remove-tracks-playlist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {Array<number>} positions array of integers containing the positions of the tracks to remove
     * from the playlist.
     * @param {string} snapshotId The playlist's snapshot ID against which you want to make the changes
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    removeTracksFromPlaylistInPositions(
      playlistId: string,
      positions: number[],
      snapshotId: string,
      callback?: ResultsCallback<SpotifyApi.PlaylistSnapshotResponse>
    ): Promise<SpotifyApi.PlaylistSnapshotResponse>;

    /**
     * Upload a custom playlist cover image.
     * See [Upload A Custom Playlist Cover Image](https://developer.spotify.com/web-api/upload-a-custom-playlist-cover-image/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
     * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
     * @param {string} imageData Base64 encoded JPEG image data, maximum payload size is 256 KB.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    uploadCustomPlaylistCoverImage(
      playlistId: string,
      imageData: string,
      callback?: ResultsCallback<SpotifyApi.UploadCustomPlaylistCoverImageResponse>
    ): Promise<SpotifyApi.UploadCustomPlaylistCoverImageResponse>;

    /**
     * Fetches an album from the Spotify catalog.
     * See [Get an Album](https://developer.spotify.com/web-api/get-album/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} albumId The id of the album. If you know the Spotify URI it is easy
     * to find the album id (e.g. spotify:album:<here_is_the_album_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getAlbum(
      albumId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SingleAlbumResponse>
    ): Promise<SpotifyApi.SingleAlbumResponse>;

    /**
     * Fetches the tracks of an album from the Spotify catalog.
     * See [Get an Album's Tracks](https://developer.spotify.com/web-api/get-albums-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} albumId The id of the album. If you know the Spotify URI it is easy
     * to find the album id (e.g. spotify:album:<here_is_the_album_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getAlbumTracks(
      albumId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.AlbumTracksResponse>
    ): Promise<SpotifyApi.AlbumTracksResponse>;

    /**
     * Fetches multiple albums from the Spotify catalog.
     * See [Get Several Albums](https://developer.spotify.com/web-api/get-several-albums/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI it is easy
     * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getAlbums(
      albumIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.MultipleAlbumsResponse>
    ): Promise<SpotifyApi.MultipleAlbumsResponse>;

    /**
     * Fetches a track from the Spotify catalog.
     * See [Get a Track](https://developer.spotify.com/web-api/get-track/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
     * to find the track id (e.g. spotify:track:<here_is_the_track_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getTrack(
      trackId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SingleTrackResponse>
    ): Promise<SpotifyApi.SingleTrackResponse>;

    /**
     * Fetches multiple tracks from the Spotify catalog.
     * See [Get Several Tracks](https://developer.spotify.com/web-api/get-several-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
     * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getTracks(
      trackIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.MultipleTracksResponse>
    ): Promise<SpotifyApi.MultipleTracksResponse>;

    /**
     * Fetches an artist from the Spotify catalog.
     * See [Get an Artist](https://developer.spotify.com/web-api/get-artist/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
     * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getArtist(
      artistId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SingleArtistResponse>
    ): Promise<SpotifyApi.SingleArtistResponse>;

    /**
     * Fetches multiple artists from the Spotify catalog.
     * See [Get Several Artists](https://developer.spotify.com/web-api/get-several-artists/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
     * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getArtists(
      artistIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.MultipleArtistsResponse>
    ): Promise<SpotifyApi.MultipleArtistsResponse>;

    /**
     * Fetches the albums of an artist from the Spotify catalog.
     * See [Get an Artist's Albums](https://developer.spotify.com/web-api/get-artists-albums/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
     * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getArtistAlbums(
      artistId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ArtistsAlbumsResponse>
    ): Promise<SpotifyApi.ArtistsAlbumsResponse>;

    /**
     * Fetches a list of top tracks of an artist from the Spotify catalog, for a specific country.
     * See [Get an Artist's Top Tracks](https://developer.spotify.com/web-api/get-artists-top-tracks/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
     * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {string} countryId The id of the country (e.g. ES for Spain or US for United States)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getArtistTopTracks(
      artistId: string,
      countryId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ArtistsTopTracksResponse>
    ): Promise<SpotifyApi.ArtistsTopTracksResponse>;

    /**
     * Fetches a list of artists related with a given one from the Spotify catalog.
     * See [Get an Artist's Related Artists](https://developer.spotify.com/web-api/get-related-artists/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
     * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getArtistRelatedArtists(
      artistId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ArtistsRelatedArtistsResponse>
    ): Promise<SpotifyApi.ArtistsRelatedArtistsResponse>;

    /**
     * Fetches a list of Spotify featured playlists (shown, for example, on a Spotify player's "Browse" tab).
     * See [Get a List of Featured Playlists](https://developer.spotify.com/web-api/get-list-featured-playlists/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getFeaturedPlaylists(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ListOfFeaturedPlaylistsResponse>
    ): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>;

    /**
     * Fetches a list of new album releases featured in Spotify (shown, for example, on a Spotify player's "Browse" tab).
     * See [Get a List of New Releases](https://developer.spotify.com/web-api/get-list-new-releases/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getNewReleases(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ListOfNewReleasesResponse>
    ): Promise<SpotifyApi.ListOfNewReleasesResponse>;

    /**
     * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
     * See [Get a List of Categories](https://developer.spotify.com/web-api/get-list-categories/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getCategories(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.MultipleCategoriesResponse>
    ): Promise<SpotifyApi.MultipleCategoriesResponse>;

    /**
     * Get a single category used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
     * See [Get a Category](https://developer.spotify.com/web-api/get-category/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} categoryId The id of the category. These can be found with the getCategories function
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getCategory(
      categoryId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SingleCategoryResponse>
    ): Promise<SpotifyApi.SingleCategoryResponse>;

    /**
     * Get a list of Spotify playlists tagged with a particular category.
     * See [Get a Category's Playlists](https://developer.spotify.com/web-api/get-categorys-playlists/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} categoryId The id of the category. These can be found with the getCategories function
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getCategoryPlaylists(
      categoryId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.CategoryPlaylistsResponse>
    ): Promise<SpotifyApi.CategoryPlaylistsResponse>;

    /**
     * Fetches a show from the Spotify catalog.
     * See [Get a Show](https://developer.spotify.com/documentation/web-api/reference/shows/get-a-show/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} showId The id of the show. If you know the Spotify URI it is easy
     * to find the show id (e.g. spotify:show:<here_is_the_show_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getShow(
      showId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SingleShowResponse>
    ): Promise<SpotifyApi.SingleShowResponse>;

    /**
     * Fetches multiple shows from the Spotify catalog.
     * See [Get Several Shows](https://developer.spotify.com/documentation/web-api/reference/shows/get-several-shows/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} showIds The ids of the shows. If you know their Spotify URI it is easy
     * to find their show id (e.g. spotify:show:<here_is_the_show_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getShows(
      showIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.MultipleShowsResponse>
    ): Promise<SpotifyApi.MultipleShowsResponse>;

    /**
     * Fetches current user's saved shows.
     * See [Get Current User's Saved Shows](https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-shows/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMySavedShows(
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ListOfUsersShowsResponse>
    ): Promise<SpotifyApi.ListOfUsersShowsResponse>;

    /**
     * Adds a list of shows to the current user's saved shows.
     * See [Save Shows for Current User](https://developer.spotify.com/documentation/web-api/reference/library/save-shows-user/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} showIds The ids of the shows. If you know their Spotify URI it is easy
     * to find their show id (e.g. spotify:show:<here_is_the_show_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    addToMySavedShows(
      showIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SaveShowsForUserResponse>
    ): Promise<SpotifyApi.SaveShowsForUserResponse>;

    /**
     * Remove a list of shows from the current user's saved shows.
     * See [Remove Shows for Current User](https://developer.spotify.com/documentation/web-api/reference/library/remove-shows-user/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} showIds The ids of the shows. If you know their Spotify URI it is easy
     * to find their show id (e.g. spotify:show:<here_is_the_show_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    removeFromMySavedShows(
      showIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.RemoveUsersSavedShowsResponse>
    ): Promise<SpotifyApi.RemoveUsersSavedShowsResponse>;

    /**
     * Checks if the current user's saved shows contains a certain list of shows.
     * See [Check Current User's Saved Shows](https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-shows/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} showIds The ids of the shows. If you know their Spotify URI it is easy
     * to find their show id (e.g. spotify:show:<here_is_the_show_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    containsMySavedShows(
      showIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.CheckUsersSavedShowsResponse>
    ): Promise<SpotifyApi.CheckUsersSavedShowsResponse>;

    /**
     * Fetches the episodes of a show from the Spotify catalog.
     * See [Get a Show's Episodes](https://developer.spotify.com/documentation/web-api/reference/shows/get-shows-episodes/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} showId The id of the show. If you know the Spotify URI it is easy
     * to find the show id (e.g. spotify:show:<here_is_the_show_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getShowEpisodes(
      showId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.ShowEpisodesResponse>
    ): Promise<SpotifyApi.ShowEpisodesResponse>;

    /**
     * Fetches an episode from the Spotify catalog.
     * See [Get an Episode](https://developer.spotify.com/documentation/web-api/reference/episodes/get-an-episode/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} episodeId The id of the episode. If you know the Spotify URI it is easy
     * to find the episode id (e.g. spotify:episode:<here_is_the_episode_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getEpisode(
      episodeId: string,
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.SingleEpisodeResponse>
    ): Promise<SpotifyApi.SingleEpisodeResponse>;

    /**
     * Fetches multiple episodes from the Spotify catalog.
     * See [Get Several Episodes](https://developer.spotify.com/documentation/web-api/reference/episodes/get-several-episodes/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} episodeIds The ids of the episodes. If you know their Spotify URI it is easy
     * to find their episode id (e.g. spotify:episode:<here_is_the_episode_id>)
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getEpisodes(
      episodeIds: string[],
      options?: Object,
      callback?: ResultsCallback<SpotifyApi.MultipleEpisodesResponse>
    ): Promise<SpotifyApi.MultipleEpisodesResponse>;

    // the search method added to allow access to it in typescript

    /**
     * Get Spotify catalog information about artists, albums, tracks or playlists that match a keyword string.
     * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} query The search query
     * @param {Array<>} types An array of item types to search across.
     * Valid types are: 'album', 'artist', 'playlist', and 'track'.
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */

    search(
      query: string,
      types: ('album' | 'artist' | 'playlist' | 'track')[],
      options?: SpotifyApi.SearchForItemParameterObject,
      callback?: ResultsCallback<SpotifyApi.AlbumSearchResponse>
    ): Promise<SpotifyApi.SearchResponse>;
    /**
     * Fetches albums from the Spotify catalog according to a query.
     * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} query The search query
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    searchAlbums(
      query: string,
      options?: SpotifyApi.SearchForItemParameterObject,
      callback?: ResultsCallback<SpotifyApi.AlbumSearchResponse>
    ): Promise<SpotifyApi.AlbumSearchResponse>;

    /**
     * Fetches artists from the Spotify catalog according to a query.
     * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} query The search query
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    searchArtists(
      query: string,
      options?: SpotifyApi.SearchForItemParameterObject,
      callback?: ResultsCallback<SpotifyApi.ArtistSearchResponse>
    ): Promise<SpotifyApi.ArtistSearchResponse>;

    /**
     * Fetches tracks from the Spotify catalog according to a query.
     * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} query The search query
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    searchTracks(
      query: string,
      options?: SpotifyApi.SearchForItemParameterObject,
      callback?: ResultsCallback<SpotifyApi.TrackSearchResponse>
    ): Promise<SpotifyApi.TrackSearchResponse>;

    /**
     * Fetches playlists from the Spotify catalog according to a query.
     * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} query The search query
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    searchPlaylists(
      query: string,
      options?: SpotifyApi.SearchForItemParameterObject,
      callback?: ResultsCallback<SpotifyApi.PlaylistSearchResponse>
    ): Promise<SpotifyApi.PlaylistSearchResponse>;

    /**
     * Fetches shows from the Spotify catalog according to a query.
     * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} query The search query
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    searchShows(
      query: string,
      options?: SpotifyApi.SearchForItemParameterObject,
      callback?: ResultsCallback<SpotifyApi.ShowSearchResponse>
    ): Promise<SpotifyApi.ShowSearchResponse>;

    /**
     * Fetches episodes from the Spotify catalog according to a query.
     * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} query The search query
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    searchEpisodes(
      query: string,
      options?: SpotifyApi.SearchForItemParameterObject,
      callback?: ResultsCallback<SpotifyApi.EpisodeSearchResponse>
    ): Promise<SpotifyApi.EpisodeSearchResponse>;

    /**
     * Get audio feature information for a single track identified by its unique Spotify ID.
     * See [Get Audio Analysis for a Track](https://developer.spotify.com/documentation/web-api/https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/) on
     * the Spotify Developer site for more information about the endpoint.
     * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     */
    getAudioAnalysisForTrack(
      trackId: string,
      callback?: ResultsCallback<any>
    ): Promise<any>;
    /**
     * Get audio features for a single track identified by its unique Spotify ID.
     * See [Get Audio Features for a Track](https://developer.spotify.com/web-api/get-audio-features/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
     * to find the track id (e.g. spotify:track:<here_is_the_track_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getAudioFeaturesForTrack(
      trackId: string,
      callback?: ResultsCallback<SpotifyApi.AudioFeaturesResponse>
    ): Promise<SpotifyApi.AudioFeaturesResponse>;

    /**
     * Get audio features for multiple tracks based on their Spotify IDs.
     * See [Get Audio Features for Several Tracks](https://developer.spotify.com/web-api/get-several-audio-features/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
     * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getAudioFeaturesForTracks(
      trackIds: string[],
      callback?: ResultsCallback<SpotifyApi.MultipleAudioFeaturesResponse>
    ): Promise<SpotifyApi.MultipleAudioFeaturesResponse>;

    /**
     * Create a playlist-style listening experience based on seed artists, tracks and genres.
     * See [Get Recommendations Based on Seeds](https://developer.spotify.com/web-api/get-recommendations/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getRecommendations(
      options?: SpotifyApi.RecommendationsOptionsObject,
      callback?: ResultsCallback<SpotifyApi.RecommendationsFromSeedsResponse>
    ): Promise<SpotifyApi.RecommendationsFromSeedsResponse>;

    /**
     * Retrieve a list of available genres seed parameter values for recommendations.
     * See [Available Genre Seeds](https://developer.spotify.com/web-api/get-recommendations/#available-genre-seeds) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getAvailableGenreSeeds(
      callback?: ResultsCallback<SpotifyApi.AvailableGenreSeedsResponse>
    ): Promise<SpotifyApi.AvailableGenreSeedsResponse>;

    /**
     * Get information about a user’s available devices.
     * See [Get a User’s Available Devices](https://developer.spotify.com/web-api/get-a-users-available-devices/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMyDevices(): Promise<SpotifyApi.UserDevicesResponse>;
    getMyDevices(
      callback: ResultsCallback<SpotifyApi.UserDevicesResponse>
    ): void;

    /**
     * Get information about the user’s current playback state, including track, track progress, and active device.
     * See [Get Information About The User’s Current Playback](https://developer.spotify.com/web-api/get-information-about-the-users-current-playback/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMyCurrentPlaybackState(
      options?: SpotifyApi.TrackRelinkingParameterObject
    ): Promise<SpotifyApi.CurrentPlaybackResponse>;
    getMyCurrentPlaybackState(
      options: SpotifyApi.TrackRelinkingParameterObject,
      callback: ResultsCallback<SpotifyApi.CurrentPlaybackResponse>
    ): void;
    getMyCurrentPlaybackState(
      callback: ResultsCallback<SpotifyApi.CurrentPlaybackResponse>
    ): void;

    /**
     * Get the object currently being played on the user’s Spotify account.
     * See [Get the User’s Currently Playing Track](https://developer.spotify.com/web-api/get-the-users-currently-playing-track/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    getMyCurrentPlayingTrack(
      options?: SpotifyApi.TrackRelinkingParameterObject
    ): Promise<SpotifyApi.CurrentlyPlayingResponse>;
    getMyCurrentPlayingTrack(
      options: SpotifyApi.TrackRelinkingParameterObject,
      callback: ResultsCallback<SpotifyApi.CurrentlyPlayingResponse>
    ): void;
    getMyCurrentPlayingTrack(
      callback: ResultsCallback<SpotifyApi.CurrentlyPlayingResponse>
    ): void;

    /**
     * Transfer playback to a new device and determine if it should start playing.
     * See [Transfer a User’s Playback](https://developer.spotify.com/web-api/transfer-a-users-playback/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Array<string>} deviceIds A JSON array containing the ID of the device on which playback should be started/transferred.
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    transferMyPlayback(
      deviceIds: string[],
      options?: SpotifyApi.TransferPlaybackParameterObject
    ): Promise<void>;
    transferMyPlayback(
      deviceIds: string[],
      options: SpotifyApi.TransferPlaybackParameterObject,
      callback: VoidResultsCallback
    ): void;
    transferMyPlayback(
      deviceIds: string[],
      callback: VoidResultsCallback
    ): void;

    /**
     * Add an item to the end of the user’s current playback queue.
     * See [Add an Item to the User's Playback Queue](https://developer.spotify.com/documentation/web-api/reference/player/add-to-queue/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {string} uri The uri of the item to add to the queue. Must be a track or an episode uri.
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    queue(
      uri: string,
      options?: SpotifyApi.QueueParameterObject
    ): Promise<void>;
    getMyCurrentPlayingTrack(
      uri: string,
      options: SpotifyApi.QueueParameterObject,
      callback: VoidResultsCallback
    ): void;
    queue(uri: string, callback: VoidResultsCallback): void;

    /**
     * Start a new context or resume current playback on the user’s active device.
     * See [Start/Resume a User’s Playback](https://developer.spotify.com/web-api/start-a-users-playback/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    play(options?: SpotifyApi.PlayParameterObject): Promise<void>;
    play(
      options: SpotifyApi.PlayParameterObject,
      callback: VoidResultsCallback
    ): void;
    play(callback: VoidResultsCallback): void;

    /**
     * Pause playback on the user’s account.
     * See [Pause a User’s Playback](https://developer.spotify.com/web-api/pause-a-users-playback/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    pause(options?: SpotifyApi.DeviceSpecificParameterObject): Promise<void>;
    pause(
      options: SpotifyApi.DeviceSpecificParameterObject,
      callback: VoidResultsCallback
    ): void;
    pause(callback: VoidResultsCallback): void;

    /**
     * Skips to next track in the user’s queue.
     * See [Skip User’s Playback To Next Track](https://developer.spotify.com/web-api/skip-users-playback-to-next-track/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    skipToNext(
      options?: SpotifyApi.DeviceSpecificParameterObject
    ): Promise<void>;
    skipToNext(
      options: SpotifyApi.DeviceSpecificParameterObject,
      callback: VoidResultsCallback
    ): void;
    skipToNext(callback: VoidResultsCallback): void;

    /**
     * Skips to previous track in the user’s queue.
     * Note that this will ALWAYS skip to the previous track, regardless of the current track’s progress.
     * Returning to the start of the current track should be performed using `.seek()`
     * See [Skip User’s Playback To Previous Track](https://developer.spotify.com/web-api/skip-users-playback-to-next-track/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    skipToPrevious(
      options?: SpotifyApi.DeviceSpecificParameterObject
    ): Promise<void>;
    skipToPrevious(
      options: SpotifyApi.DeviceSpecificParameterObject,
      callback: VoidResultsCallback
    ): void;
    skipToPrevious(callback: VoidResultsCallback): void;

    /**
     * Seeks to the given position in the user’s currently playing track.
     * See [Seek To Position In Currently Playing Track](https://developer.spotify.com/web-api/seek-to-position-in-currently-playing-track/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {number} position_ms The position in milliseconds to seek to. Must be a positive number.
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    seek(
      position: number,
      options?: SpotifyApi.DeviceSpecificParameterObject
    ): Promise<void>;
    seek(
      position: number,
      options: SpotifyApi.DeviceSpecificParameterObject,
      callback: VoidResultsCallback
    ): void;
    seek(position: number, callback: VoidResultsCallback): void;

    /**
     * Set the repeat mode for the user’s playback. Options are repeat-track, repeat-context, and off.
     * See [Set Repeat Mode On User’s Playback](https://developer.spotify.com/web-api/set-repeat-mode-on-users-playback/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {String} state A string set to 'track', 'context' or 'off'.
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    setRepeat(
      state: SpotifyApi.PlaybackRepeatState,
      options?: SpotifyApi.DeviceSpecificParameterObject
    ): Promise<void>;
    setRepeat(
      state: SpotifyApi.PlaybackRepeatState,
      options: SpotifyApi.DeviceSpecificParameterObject,
      callback: VoidResultsCallback
    ): void;
    setRepeat(
      state: SpotifyApi.PlaybackRepeatState,
      callback: VoidResultsCallback
    ): void;

    /**
     * Set the volume for the user’s current playback device.
     * See [Set Volume For User’s Playback](https://developer.spotify.com/web-api/set-volume-for-users-playback/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {number} volume_percent The volume to set. Must be a value from 0 to 100 inclusive.
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    setVolume(
      volumePercent: number,
      options?: SpotifyApi.DeviceSpecificParameterObject
    ): Promise<void>;
    setVolume(
      volumePercent: number,
      options: SpotifyApi.DeviceSpecificParameterObject,
      callback: VoidResultsCallback
    ): void;
    setVolume(volumePercent: number, callback: VoidResultsCallback): void;

    /**
     * Toggle shuffle on or off for user’s playback.
     * See [Toggle Shuffle For User’s Playback](https://developer.spotify.com/web-api/toggle-shuffle-for-users-playback/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {bool} state Whether or not to shuffle user's playback.
     * @param {Object} options A JSON object with options that can be passed.
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    setShuffle(
      state: boolean,
      options?: SpotifyApi.DeviceSpecificParameterObject
    ): Promise<void>;
    setShuffle(
      state: boolean,
      options: SpotifyApi.DeviceSpecificParameterObject,
      callback: VoidResultsCallback
    ): void;
    setShuffle(state: boolean, callback: VoidResultsCallback): void;

    /**
     * Gets the access token in use.
     *
     * @return {string} accessToken The access token
     */
    getAccessToken(): string | null;

    /**
     * Sets the access token to be used.
     * See [the Authorization Guide](https://developer.spotify.com/web-api/authorization-guide/) on
     * the Spotify Developer site for more information about obtaining an access token.
     *
     * @param {string} accessToken The access token
     * @return {void}
     */
    setAccessToken(accessToken: string | null): void;

    /**
     * Sets an implementation of Promises/A+ to be used. E.g. Q, when.
     * See [Conformant Implementations](https://github.com/promises-aplus/promises-spec/blob/master/implementations.md)
     * for a list of some available options
     *
     * @param {Object} PromiseImplementation A Promises/A+ valid implementation
     * @throws {Error} If the implementation being set doesn't conform with Promises/A+
     * @return {void}
     */
    setPromiseImplementation(promiseImplementation: Object): void;
  }
}

/**
 * Declare SpotifyWebApi variable, since that is the name of the function in spotify-web-api-js.
 */
declare var SpotifyWebApi: SpotifyWebApi.SpotifyWebApiJsStatic;
