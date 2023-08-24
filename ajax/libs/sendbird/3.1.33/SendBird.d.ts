/**
 * Type Definitions for Sendbird SDK v3.1.33
 * homepage: https://sendbird.com/
 * git: https://github.com/sendbird/Sendbird-SDK-JavaScript
 */

export = SendBird;
export as namespace SendBird;

declare const SendBird: SendBirdStatic;

declare interface SendBirdParams {
  appId: string;
  localCacheEnabled?: boolean;
}

interface SendBirdStatic {
  version: number;
  new(sendBirdParams: SendBirdParams): SendBird.SendBirdInstance;
  getInstance(): SendBird.SendBirdInstance;

  LogLevel: SendBird.LogLevel;

  getLogLevel(): typeof SendBird.LogLevel[keyof typeof SendBird.LogLevel];
  setLogLevel(logLevel: typeof SendBird.LogLevel[keyof typeof SendBird.LogLevel]): void;
  getAppVersion(): string;
  setAppVersion(appVersion: string): void;
}

declare enum CollectionEventSource {
  // Real-time event types (0 <= code < 1000)
  EVENT_CHANNEL_CHANGED,
  EVENT_USER_RECEIVED_INVITATION,
  EVENT_USER_DECLINED_INVITATION,
  EVENT_USER_JOINED,
  EVENT_USER_LEFT,
  EVENT_CHANNEL_ENTER,
  EVENT_CHANNEL_EXIT,
  EVENT_CHANNEL_FROZEN,
  EVENT_CHANNEL_UNFROZEN,
  EVENT_CHANNEL_HIDDEN,
  EVENT_CHANNEL_UNHIDDEN,
  EVENT_TYPING_STATUS_UPDATED,
  EVENT_OPERATOR_UPDATED,
  EVENT_CHANNEL_METADATA_UPDATED,
  EVENT_CHANNEL_METADATA_DELETED,
  EVENT_CHANNEL_METACOUNTER_UPDATED,
  EVENT_CHANNEL_METACOUNTER_DELETED,
  EVENT_CHANNEL_DELETED,
  EVENT_USER_MUTED,
  EVENT_USER_UNMUTED,
  EVENT_USER_BANNED,
  EVENT_USER_UNBANNED,
  EVENT_MESSAGE_RECEIVED,
  EVENT_MESSAGE_SENT,
  EVENT_MESSAGE_UPDATED,
  EVENT_MESSAGE_DELETED,
  EVENT_READ_RECEIPT_UPDATED,
  EVENT_DELIVERY_RECEIPT_UPDATED,
  EVENT_MENTION,
  EVENT_REACTION_UPDATED,
  EVENT_THREAD_INFO_UPDATED,

  // Api request event types (code >= 1000)
  CHANNEL_BACKGROUND = 1000,
  CHANNEL_CHANGELOG,
  MESSAGE_BACKGROUND,
  MESSAGE_FILL,
  MESSAGE_CHANGELOG,

  LOCAL_MESSAGE_PENDING_CREATED = 2000,
  LOCAL_MESSAGE_FAILED,
  LOCAL_MESSAGE_CANCELED,
  LOCAL_MESSAGE_RESEND_STARTED,
  MESSAGE_COLLECTION_FILTER_MISMATCH,
}

declare enum GroupChannelOrder {
  LATEST_LAST_MESSAGE = 'latest_last_message',
  CHRONOLOGICAL = 'chronological',
  CHANNEL_NAME_ALPHABETICAL = 'channel_name_alphabetical',
}

declare enum MessageCollectionInitPolicy {
  CACHE_AND_REPLACE_BY_API = 'cache_and_replace_by_api',
}

declare enum QueryType {
  AND = 'AND',
  OR = 'OR',
}
declare enum SearchField {
  MEMBER_NICKNAME = 'member_nickname',
  CHANNEL_NAME = 'channel_name',
}
declare enum MemberStateFilter {
  ALL = 'all',
  JOINED = 'joined_only',
  INVITED = 'invited_only',
  INVITED_BY_FRIEND = 'invited_by_friend',
  INVITED_BY_NON_FRIEND = 'invited_by_non_friend',
}
declare enum SuperChannelFilter {
  ALL = 'all',
  SUPER = 'super',
  NON_SUPER = 'nonsuper',
}
declare enum PublicChannelFilter {
  ALL = 'all',
  PUBLIC = 'public',
  PRIVATE = 'private',
}
declare enum UnreadChannelFilter {
  ALL = 'all',
  UNREAD_MESSAGE = 'unread_message',
}
declare enum HiddenChannelFilter {
  ALL = 'all',
  UNHIDDEN = 'unhidden_only',
  HIDDEN = 'hidden_only',
  HIDDEN_ALLOW_AUTO_UNHIDE = 'hidden_allow_auto_unhide',
  HIDDEN_PREVENT_AUTO_UNHIDE = 'hidden_prevent_auto_unhide',
}

declare namespace SendBird {
  interface SendBirdError extends Error {
    code: number;
    message: string;
  }

  /**
   * @deprecated
   */
  type voidErrorLastCallback = (result: null, error: SendBirdError) => void;
  type voidErrorFirstCallback = (error: SendBirdError) => void;
  type voidCallback = voidErrorFirstCallback | voidErrorLastCallback;

  type ListenerCallback = () => void;
  type Unsubscribe = () => void;

  type userCallback = (user: User, error: SendBirdError) => void;
  type pushSettingCallback = (response: string, error: SendBirdError) => void;

  type getFriendChangeLogs = {
    updatedUsers: Array<User>;
    deletedUserIds: Array<string>;
    hasMore: boolean;
    token: string;
  };
  type getFriendChangeLogsByTokenHandler = (data: getFriendChangeLogs, error: SendBirdError) => void;

  type groupChannelChangeLogs = {
    updatedChannels: Array<GroupChannel>;
    deletedChannelUrls: Array<string>;
    hasMore: boolean;
    token: string;
  };
  type getGroupChannelChangeLogsHandler = (data: groupChannelChangeLogs, error: SendBirdError) => void;

  type getEmojiContainerHandler = (data: EmojiContainer, error: SendBirdError) => void;

  type getEmojiCategoryHandler = (data: EmojiCategory, error: SendBirdError) => void;

  type getEmojiHandler = (data: Emoji, error: SendBirdError) => void;

  type pushTokens = {
    deviceTokens: Array<string>;
    type: 'gcm' | 'apns' | 'apns_voip';
    hasMore: boolean;
    token: string;
  };
  type getMyPushTokensHandler = (data: pushTokens, error: SendBirdError) => void;

  type LogLevel = {
    VERBOSE: 'verbose',
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    NONE: 'none',
  };

  type MessageTypeFilter = {
    ALL: '',
    USER: 'MESG',
    FILE: 'FILE',
    ADMIN: 'ADMM'
  };

  type ReplyType = {
    ALL: 'all',
    NONE: 'none',
    ONLY_REPLY_TO_CHANNEL: 'only_reply_to_channel'
  }

  type RestrictionType = {
    MUTED: 'muted',
    BANNED: 'banned'
  };

  type MessageSendingStatus = {
    NONE: 'none',
    PENDING: 'pending',
    FAILED: 'failed',
    CANCELED: 'canceled',
    SUCCEEDED: 'succeeded'
  };

  interface DiscoveryObject {
    friendDiscoveryKey: string;
    friendName?: string;
  }
  interface SendBirdInstance {
    PUSH_TEMPLATE_DEFAULT: string;
    PUSH_TEMPLATE_ALTERNATIVE: string;

    User: UserStatic;
    Member: MemberStatic;
    RestrictedUser: RestrictedUserStatic;
    BaseChannel: {
      MessageTypeFilter: MessageTypeFilter;
    };
    OpenChannel: OpenChannelStatic;
    GroupChannel: GroupChannelStatic;

    GroupChannelCollection: GroupChannelCollectionStatic;
    GroupChannelFilter: GroupChannelFilterStatic;

    MessageCollection: MessageCollectionStatic;
    MessageFilter: MessageFilterStatic;

    BaseMessage: {
      ReplyType: ReplyType;
      getMessage(params: MessageRetrievalParams, callback?: messageCallback): Promise<UserMessage | FileMessage | AdminMessage>;
    };
    UserMessage: UserMessageStatic;
    FileMessage: FileMessageStatic;
    AdminMessage: AdminMessageStatic;

    MessageMetaArray: MessageMetaArray;
    Options: Options;

    SessionHandler: SessionHandlerStatic;
    UserEventHandler: UserEventHandlerStatic;
    ChannelHandler: ChannelHandlerStatic;
    ConnectionHandler: ConnectionHandlerStatic;

    GroupChannelParams: GroupChannelParams;
    OpenChannelParams: OpenChannelParams;
    GroupChannelListQuery: GroupChannelListQueryStatic;
    UserMessageParams: UserMessageParams;
    FileMessageParams: FileMessageParams;
    GroupChannelTotalUnreadMessageCountParams: GroupChannelTotalUnreadMessageCountParams;
    GroupChannelTotalUnreadChannelCountParams: GroupChannelTotalUnreadChannelCountParams;
    ScheduledUserMessageParams: ScheduledUserMessageParams;
    GroupChannelChangeLogsParams: GroupChannelChangeLogsParams;
    MessageRetrievalParams: MessageRetrievalParams;
    MessageListParams: MessageListParams;
    ThreadedMessageListParams: ThreadedMessageListParams;
    MessageChangeLogsParams: MessageChangeLogsParams;

    CollectionEventSource: typeof CollectionEventSource;

    currentUser: User;
    appInfo: AppInfo;
    ekey: string;
    isCacheEnabled: boolean;

    setErrorFirstCallback(errorFirstCallback: boolean): void;

    connect(userId: string, callback?: userCallback): Promise<User>;
    connect(userId: string, accessToken: string, callback?: userCallback): Promise<User>;
    connect(userId: string, apiHost: string, wsHost: string, callback?: userCallback): Promise<User>;
    connect(userId: string, accessToken: string, apiHost: string, wsHost: string, callback?: userCallback): Promise<User>;

    disconnect(callback?: commonCallback): Promise<null>;

    reconnect(): boolean; // You can initiate auto-reconnect manually.

    updateCurrentUserInfo(nickname: string, profileUrl: string, callback?: userCallback): Promise<User>;
    updateCurrentUserInfoWithProfileImage(nickname: string, profileImageFile: FileType, callback?: userCallback): Promise<User>;
    updateCurrentUserInfoWithPreferredLanguages(preferredLanguages: Array<string>, callback?: userCallback): Promise<User>;

    /**
     * @deprecated since version v3.0.109, please use {@link currentUser} instead
     */
    getCurrentUserId(): string;
    getApplicationId(): string;
    getConnectionState(): string;
    getLastConnectedAt(): number;

    setSessionHandler(handler: SessionHandler): void;

    addChannelHandler(id: string, handler: ChannelHandler): void;
    removeChannelHandler(id: string): void;
    removeAllChannelHandlers(): void;

    addConnectionHandler(id: string, handler: ConnectionHandler): void;
    removeConnectionHandler(id: string): void;
    removeAllConnectionHandlers(): void;

    addUserEventHandler(id: string, handler: UserEventHandler): void;
    removeUserEventHandler(id: string): void;
    removeAllUserEventHandler(): void;

    /**
     * @deprecated since version v3.0.86, please use {@link createApplicationUserListQuery()} instead
     */
    createUserListQuery(): UserListQuery;
    /**
     * @deprecated since version v3.0.86, please use {@link createApplicationUserListQuery()} instead
     */
    createUserListQuery(userIds: Array<string>): UserListQuery;
    createApplicationUserListQuery(): ApplicationUserListQuery;
    createBlockedUserListQuery(): BlockedUserListQuery;
    createMessageSearchQuery(keyword: String, options?: MessageSearchQueryOptions): MessageSearchQuery;

    blockUser(userToBlock: User, callback?: userCallback): Promise<User>;
    blockUserWithUserId(userToBlock: string, callback?: userCallback): Promise<User>;

    unblockUser(blockedUser: User, callback?: commonCallback): Promise<User>;
    unblockUserWithUserId(blockedUserId: string, callback?: commonCallback): Promise<User>;

    setChannelInvitationPreference(isAutoAccept: boolean, callback?: commonCallback): Promise<Object>;
    getChannelInvitationPreference(callback?: commonCallback): Promise<Object>;

    getPendingGCMToken(): string;
    getPendingAPNSToken(): string;

    registerGCMPushTokenForCurrentUser(gcmRegToken: string, callback?: pushSettingCallback): string;
    unregisterGCMPushTokenForCurrentUser(gcmRegToken: string, callback?: commonCallback): void;
    unregisterGCMPushTokenAllForCurrentUser(callback?: commonCallback): void;

    registerAPNSPushTokenForCurrentUser(apnsRegToken: string, callback?: pushSettingCallback): string;
    unregisterAPNSPushTokenForCurrentUser(apnsRegToken: string, callback?: commonCallback): void;
    unregisterAPNSPushTokenAllForCurrentUser(callback?: commonCallback): void;

    unregisterPushTokenAllForCurrentUser(callback?: commonCallback): void; // This removes all push tokens including APNS/GCM
    getMyPushTokensByToken(token: string, type: 'gcm' | 'apns' | 'apns_voip', callback?: getMyPushTokensHandler): Promise<Object>;

    setPushTemplate(templateName: string, callback?: pushSettingCallback): string | void;
    getPushTemplate(callback?: pushSettingCallback): string | void;

    setPushTriggerOption(pushTriggerOption: 'all' | 'mention_only' | 'off', callback?: commonCallback): Promise<string>;
    getPushTriggerOption(callback?: getPushTriggerOptionCallback): Promise<string>;

    setDoNotDisturb(
      doNotDisturbOn: boolean,
      startHour: number,
      startMin: number,
      endHour: number,
      endMin: number,
      timezone: string,
      callback?: commonCallback
    ): Promise<Object>;
    getDoNotDisturb(callback?: commonCallback): Promise<Object>;

    setSnoozePeriod(snoozeOn: boolean, startTs: number, endTs: number, callback?: commonCallback): Promise<Object>;
    getSnoozePeriod(callback?: commonCallback): Promise<Object>;

    // Background/Foreground Appstate for push notifications in React Native / Ionic
    setBackgroundState(): void;
    setForegroundState(): void;

    // State change should be disabled when image picker is loaded in Android.
    disableStateChange(): void;
    enableStateChange(): void;

    uploadFriendDiscoveries(discoveries: Array<DiscoveryObject>, callback?: commonCallback): Promise<Object>;
    deleteFriendDiscovery(discoveryKey: string, callback?: commonCallback): Promise<null>;
    deleteFriendDiscoveries(discoveryKeys: Array<string>, callback?: commonCallback): Promise<null>;

    getFriendChangeLogsByToken(callback?: getFriendChangeLogsByTokenHandler): Promise<Object>;
    getFriendChangeLogsByToken(token: string, callback?: getFriendChangeLogsByTokenHandler): Promise<Object>;

    addFriends(userIds: Array<string>, callback?: userListQueryCallback): Promise<Array<User>>;
    deleteFriend(userId: string, callback?: commonCallback): Promise<null>;
    deleteFriends(userIds: Array<string>, callback?: commonCallback): Promise<null>;

    createFriendListQuery(): FriendListQuery;

    markAsReadAll(callback?: commonCallback): Promise<null>;
    markAsReadWithChannelUrls(channelUrls: Array<string>, callback?: commonCallback): Promise<null>;

    markAsDelivered(channelUrl: String): void;

    getGroupChannelCount(memberStateFilter: string, callback?: commonCallback): Promise<number>;

    getUnreadItemCount(keys: Array<string>, callback?: commonCallback): Promise<Object>;
    getTotalUnreadMessageCount(
      groupChannelTotalUnreadMessageCountParams: GroupChannelTotalUnreadMessageCountParams,
      callback?: groupChannelCountCallback
    ): Promise<number>;
    getTotalUnreadMessageCount(channelCustomTypes: Array<string>, callback?: groupChannelCountCallback): Promise<number>;
    /**
     * @deprecated since version v3.0.80, please use {@link getTotalUnreadMessageCount()} instead
     */
    getTotalUnreadMessageCount(callback?: groupChannelCountCallback): Promise<number>;
    getTotalUnreadChannelCount(callback?: groupChannelCountCallback): Promise<number>;
    getTotalUnreadChannelCount(
      groupChannelTotalUnreadChannelCountParams: GroupChannelTotalUnreadChannelCountParams,
      callback?: groupChannelCountCallback
    ): Promise<number>;

    getSubscribedTotalUnreadMessageCount(): number;
    getSubscribedCustomTypeTotalUnreadMessageCount(): number;
    getSubscribedCustomTypeUnreadMessageCount(customType: string): number;

    getMyGroupChannelChangeLogsByToken(
      token: string,
      params: GroupChannelChangeLogsParams,
      callback?: getGroupChannelChangeLogsHandler
    ): Promise<groupChannelChangeLogs>;
    /**
     * @deprecated since version v3.0.125
     */
    getMyGroupChannelChangeLogsByToken(
      token: string,
      customTypes: Array<string>,
      includeEmpty?: boolean,
      callback?: getGroupChannelChangeLogsHandler
    ): Promise<groupChannelChangeLogs>;
    getMyGroupChannelChangeLogsByTimestamp(
      ts: number,
      params: GroupChannelChangeLogsParams,
      callback?: getGroupChannelChangeLogsHandler
    ): Promise<groupChannelChangeLogs>;
    /**
     * @deprecated since version v3.0.125
     */
    getMyGroupChannelChangeLogsByTimestamp(
      ts: number,
      customTypes: Array<string>,
      includeEmpty?: boolean,
      callback?: getGroupChannelChangeLogsHandler
    ): Promise<groupChannelChangeLogs>;

    getAllEmoji(callback?: getEmojiContainerHandler): Promise<EmojiContainer>;
    getEmojiCategory(categoryId: number, callback?: getEmojiCategoryHandler): Promise<EmojiCategory>;
    getEmoji(emojiKey: string, callback?: getEmojiHandler): Promise<Emoji>;

    getAllowFriendDiscovery(callback?: commonCallback): Promise<boolean>;
    setAllowFriendDiscovery(allowFriendDiscovery: boolean, callback?: commonCallback): Promise<boolean>;

    clearCachedMessages(channelUrls: string[]): Promise<void[]>;
    clearCachedData(): Promise<void>;

    useAsyncStorageAsDatabase(AsyncStorage: object): void;
    useMMKVAsDatabase(MMKV: object): void;

    /**
     * Set online listener to onlineDetector for mobile environment
     * */
    setOnlineListener(onlineListener: (onOnline: ListenerCallback) => Unsubscribe): void;
    /**
     * Set offline listener to onlineDetector for mobile environment
     * */
    setOfflineListener(offlineListener: (onOffline: ListenerCallback) => Unsubscribe): void;
  }
  interface Options {
    useMemberAsMessageSender: boolean;
    typingIndicatorThrottle: number;
    websocketResponseTimeout: number;
  }
  interface AppInfo {
    uploadSizeLimit: number;
    emojiHash: string;
    premiumFeatureList: Array<string>;
    applicationAttributes: Array<string>;
    isUsingReaction: boolean;
  }

  interface FriendListQuery {
    hasMore: boolean;
    isLoading: boolean;
    limit: number;
    next(callback?: userListQueryCallback): Promise<Array<User>>;
  }
  interface MessageSearchQuery {
    hasNext: boolean;
    isLoading: boolean;
    next(callback?: messageListCallback): Promise<Array<AdminMessage | UserMessage | FileMessage>>;
  }
  interface MessageSearchQueryOptions {
    limit?: number;
    reverse?: boolean;
    exactMatch?: boolean;
    channelUrl?: string;
    channelCustomType?: string;
    messageTimestampFrom?: number;
    messageTimestampTo?: number;
    order?: 'score' | 'ts';
    advancedQuery?: boolean;
    targetFields?: Array<string>;
  }

  interface SessionHandlerStatic {
    new(): SessionHandler;
  }
  interface SessionHandler {
    /**
     * @deprecated since v3.0.160
     */
    onSessionExpired(): void;
    onSessionTokenRequired(onSuccess: (accessToken: string) => void, onFail: () => void): void;
    onSessionRefreshed(): void;
    onSessionError(err: SendBirdError): void;
    onSessionClosed(): void;
  }

  interface UserEventHandlerStatic {
    new(): UserEventHandler;
  }
  interface UserEventHandler {
    onFriendsDiscovered(users: Array<User>): void;
    onTotalUnreadMessageCountUpdated(totalCount: Number, countByCustomTypes: Object): void;
  }

  interface ChannelHandlerStatic {
    new(): ChannelHandler;
  }
  interface ChannelHandler {
    onMessageReceived(channel: OpenChannel | GroupChannel, message: AdminMessage | UserMessage | FileMessage): void;
    onMessageUpdated(channel: OpenChannel | GroupChannel, message: AdminMessage | UserMessage | FileMessage): void;
    onMessageDeleted(channel: OpenChannel | GroupChannel, messageId: number): void;
    onReadReceiptUpdated(channel: GroupChannel): void;
    onTypingStatusUpdated(channel: GroupChannel): void;
    onUserJoined(channel: GroupChannel, user: User): void;
    onUserLeft(channel: GroupChannel, user: User): void;
    onOperatorUpdated(channel: BaseChannel, operators: Array<User>): void;
    onUserEntered(channel: OpenChannel, user: User): void;
    onUserExited(channel: OpenChannel, user: User): void;
    onUserMuted(channel: OpenChannel | GroupChannel, user: User): void;
    onUserUnmuted(channel: OpenChannel | GroupChannel, user: User): void;
    onUserBanned(channel: OpenChannel | GroupChannel, user: User): void;
    onUserUnbanned(channel: OpenChannel | GroupChannel, user: User): void;
    onChannelFrozen(channel: OpenChannel | GroupChannel): void;
    onChannelUnfrozen(channel: OpenChannel | GroupChannel): void;
    onChannelChanged(channel: OpenChannel | GroupChannel): void;
    onChannelDeleted(channelUrl: string, channelType: string): void;
    onUserReceivedInvitation(channel: GroupChannel, inviter: User, invitees: Array<User>): void;
    onUserDeclinedInvitation(channel: GroupChannel, inviter: User, invitee: Member): void;
    onMetaDataCreated(channel: OpenChannel | GroupChannel, metaData: Object): void;
    onMetaDataUpdated(channel: OpenChannel | GroupChannel, metaData: Object): void;
    onMetaDataDeleted(channel: OpenChannel | GroupChannel, metaDataKeys: Array<string>): void;
    onMetaCountersCreated(channel: OpenChannel | GroupChannel, metaCounter: Object): void;
    onMetaCountersUpdated(channel: OpenChannel | GroupChannel, metaCounter: Object): void;
    onMetaCountersDeleted(channel: OpenChannel | GroupChannel, metaCounterKeys: Array<string>): void;
    onChannelHidden(channel: GroupChannel): void;
    onReactionUpdated(channel: OpenChannel | GroupChannel, event: ReactionEvent): void;
    onDeliveryReceiptUpdated(channel: OpenChannel | GroupChannel): void;
    onMentionReceived(channel: OpenChannel | GroupChannel, message: AdminMessage | UserMessage | FileMessage): void;
    onThreadInfoUpdated(channel: OpenChannel | GroupChannel, event: ThreadInfoUpdateEvent): void;
    onChannelMemberCountChanged(channels: Array<GroupChannel>): void;
    onChannelParticipantCountChanged(channels: Array<OpenChannel>): void;
  }

  interface ConnectionHandlerStatic {
    new(): ConnectionHandler;
  }
  interface ConnectionHandler {
    onReconnectStarted(): void;
    onReconnectSucceeded(): void;
    onReconnectFailed(): void;
  }

  interface MessageFilter {
    messageType: string;
    customTypes: string[];
    senderUserIds: string[];
    sendingStatus: string;

    clone(): MessageFilter;
    match(message: BaseMessageInstance): boolean;
  }

  interface MessageFilterStatic {
    new(): MessageFilter;
  }

  /**
   * Message
   */
  interface BaseMessageInstance {
    channelUrl: string;
    channelType: string | null;
    messageId: number;
    messageType: 'base' | 'user' | 'file' | 'admin';
    data: string | null;
    customType: string | null;
    metaArrays: Array<MessageMetaArray>;
    reactions: Array<Reaction>;
    mentionType: string | null;
    mentionedMessageTemplate: string | null;
    mentionedUsers: Array<User>;
    sendingStatus: MessageSendingStatus[keyof MessageSendingStatus] | null;
    silent: boolean;
    createdAt: number;
    updatedAt: number;
    parentMessageId: number;
    parentMessageText: string | null;
    threadInfo: ThreadInfo | null;
    ogMetaData: OGMetaData | null;
    appleCriticalAlertOptions: AppleCriticalAlertOptions | null;
    isReplyToChannel: boolean;
    parentMessage: UserMessage | FileMessage | AdminMessage | null;

    isEqual(target: BaseMessageInstance): boolean;
    isIdentical(target: BaseMessageInstance): boolean;
    isOpenChannel(): boolean;
    isGroupChannel(): boolean;
    isUserMessage(): this is UserMessage;
    isFileMessage(): this is FileMessage;
    isAdminMessage(): this is AdminMessage;
    serialize(): Object;
    getMetaArraysByKeys(keys: Array<string>): Array<MessageMetaArray>;
    applyReactionEvent(event: ReactionEvent): void;
    getThreadedMessagesByTimestamp(
      timestamp: number,
      params: ThreadedMessageListParams,
      callback?: threadedMessageCallback
    ): Promise<ThreadedMessageListInfo>;
    applyThreadInfoUpdateEvent(event: ThreadInfoUpdateEvent): boolean;

    /**
     * @deprecated
     */
    metaArray: Object;
    /**
     * @deprecated
     */
    getMetaArrayByKeys(keys: Array<string>): Object;
    applyParentMessage(updatedParentMessage: UserMessage | FileMessage | AdminMessage): boolean;
  }

  interface AdminMessage extends BaseMessageInstance {
    messageType: 'admin';
    message: string;
    translations: Object;
  }
  interface AdminMessageStatic {
    buildFromSerializedData(serializedObject: Object): AdminMessage;
    getMessage(params: MessageRetrievalParams, callback?: messageCallback<AdminMessage>): Promise<AdminMessage>;
  }

  interface GroupChannelTotalUnreadMessageCountParams {
    new(): GroupChannelTotalUnreadMessageCountParams;
    channelCustomTypesFilter: Array<string>;
    superChannelFilter: 'all' | 'super' | 'nonsuper' | 'broadcast_only';
  }

  interface GroupChannelTotalUnreadChannelCountParams {
    new(): GroupChannelTotalUnreadChannelCountParams;
    channelCustomTypesFilter: Array<string>;
    superChannelFilter: 'all' | 'super' | 'nonsuper' | 'broadcast_only';
  }

  interface Emoji {
    key: string;
    url: string;
  }

  interface EmojiCategory {
    id: number;
    name: string;
    url: string;
    emojis: Array<Emoji>;
  }

  interface EmojiContainer {
    emojiHash: string;
    emojiCategories: Array<EmojiCategory>;
  }

  interface BaseMessageParams {
    mentionType: 'users' | 'channel';
    mentionedUserIds: Array<string>;
    mentionedUsers: Array<User>;
    mentionedMessageTemplate: string | null;
    metaArrays: Array<MessageMetaArray>;
    /**
     * @deprecated since version v3.0.122, please use {@link metaArrays} instead
     */
    metaArrayKeys: Array<string>;
    data: string;
    customType: string;
    pushNotificationDeliveryOption: 'default' | 'suppress';
    parentMessageId: number;
    appleCriticalAlertOptions: AppleCriticalAlertOptions;
    isReplyToChannel: boolean;

    serialize(): Object;
  }

  interface UserMessageParams extends BaseMessageParams {
    new(): UserMessageParams;
    message: string;
    /**
     * @deprecated since version v3.0.84, please use {@link translationTargetLanguages} instead
     */
    targetLanguages: Array<string>;
    translationTargetLanguages: Array<string>;
  }
  interface UserMessage extends BaseMessageInstance {
    messageType: 'user';
    message: string | null;
    sender: Sender | null;
    reqId: string;
    translations: Object;
    /**
     * @deprecated since version v3.0.119, please use {@link BaseMessageInstance.sendingStatus} instead
     */
    requestState: 'none' | 'pending' | 'failed' | 'succeeded' | null;
    requestedMentionUserIds: Array<string>;
    errorCode: number;
    messageSurvivalSeconds: number;
    plugins: Array<Plugin>;

    readonly messageParams: UserMessageParams | null;

    isResendable(): boolean;
    serialize(): Object;
  }
  interface UserMessageStatic {
    buildFromSerializedData(serializedObject: Object): UserMessage;
    getMessage(params: MessageRetrievalParams, callback?: messageCallback<UserMessage>): Promise<UserMessage>;
  }

  interface FileMessageParams extends BaseMessageParams {
    new(): FileMessageParams;
    file: FileType;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    thumbnailSizes: Array<ThumbnailSize>;
  }
  interface FileMessage extends BaseMessageInstance {
    messageType: 'file';
    sender: Sender | null;
    reqId: string;
    plainUrl: string | null;
    url: string;
    name: string;
    size: number;
    type: string | null;
    thumbnails: Array<ThumbnailObject>;
    /**
     * @deprecated since version v3.0.119, please use {@link BaseMessageInstance.sendingStatus} instead
     */
    requestState: 'none' | 'pending' | 'failed' | 'succeeded' | null;
    requestedMentionUserIds: Array<string>;
    errorCode: number;
    messageSurvivalSeconds: number;

    readonly messageParams: FileMessageParams | null;

    isResendable(): boolean;
    serialize(): Object;
  }
  interface FileMessageStatic {
    buildFromSerializedData(serializedObject: Object): FileMessage;
    getMessage(params: MessageRetrievalParams, callback?: messageCallback<FileMessage>): Promise<FileMessage>;
  }

  interface MessageRetrievalParams {
    new(): MessageRetrievalParams;
    channelUrl: string;
    channelType: string;
    messageId: number;
    includeMetaArray: boolean;
    includeReactions: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link includeParentMessageInfo} instead
     */
    includeParentMessageText: boolean;
    includeThreadInfo: boolean;
    includeParentMessageInfo: boolean;
  }
  interface MessageListParams {
    new(): MessageListParams;
    prevResultSize: number;
    nextResultSize: number;
    isInclusive: boolean;
    reverse: boolean;
    messageType: string;
    /**
     * @deprecated since version v3.0.142, please use {@link customTypes} instead
     */
    customType: string;
    customTypes: Array<string>;
    senderUserIds: Array<string>;
    includeMetaArray: boolean;
    /**
     * @deprecated since version v3.0.125, please use {@link includeReactions} instead
     */
    includeReaction: boolean;
    includeReactions: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link replyType} instead
     */
    includeReplies: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link includeParentMessageInfo} instead
     */
    includeParentMessageText: boolean;
    includeThreadInfo: boolean;
    showSubchannelMessagesOnly: boolean;
    replyType: ReplyType[keyof ReplyType];
    includeParentMessageInfo: boolean;

    belongsTo(messageParams: UserMessageParams | FileMessageParams): boolean;
  }
  interface ThreadedMessageListParams {
    new(): ThreadedMessageListParams;
    prevResultSize: number;
    nextResultSize: number;
    isInclusive: boolean;
    reverse: boolean;
    messageType: string;
    /**
     * @deprecated since version v3.0.142, please use {@link customTypes} instead
     */
    customType: string;
    customTypes: Array<string>;
    senderUserIds: Array<string>;
    includeMetaArray: boolean;
    /**
     * @deprecated since version v3.0.125, please use {@link includeReactions} instead
     */
    includeReaction: boolean;
    includeReactions: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link includeParentMessageInfo} instead
     */
    includeParentMessageText: boolean;
    includeParentMessageInfo: boolean;
  }
  interface MessageChangeLogsParams {
    new(): MessageChangeLogsParams;
    includeMetaArray: boolean;
    /**
     * @deprecated since version v3.0.125, please use {@link includeReactions} instead
     */
    includeReaction: boolean;
    includeReactions: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link replyType} instead
     */
    includeReplies: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link includeParentMessageInfo} instead
     */
    includeParentMessageText: boolean;
    includeThreadInfo: boolean;
    replyType: ReplyType[keyof ReplyType];
    includeParentMessageInfo: boolean;
  }

  interface ThumbnailObject {
    url: string;
    plainUrl: string;
    height: number;
    width: number;
    real_height: number;
    real_width: number;
  }
  interface ThumbnailSize {
    maxWidth: number;
    maxHeight: number;
  }

  /**
   * File interface for React Native
   * @see {@link https://github.com/facebook/react-native/blob/main/Libraries/Network/FormData.js#L73-L85} for further information about interface.
   * For the reason that the name and type properties are not optional, refer {@link module:utils/FileConverter#isFileLikeObject}
   */
  interface ReactNativeFileLikeObject {
    uri: string;
    name: string;
    type: string
    size?: number;
  }

  type FileType = File | Blob | ReactNativeFileLikeObject;

  /**
   * User
   */
  interface User {
    userId: string;
    nickname: string;
    profileUrl: string;
    plainProfileUrl: string;
    metaData: Object;
    connectionStatus: string;
    lastSeenAt: number;
    isActive: boolean;
    requireAuth: boolean;
    friendDiscoveryKey: string | null;
    friendName: string | null;
    preferredLanguages: Array<string>;

    getOriginalProfileUrl(): string;
    createMetaData(metaDataMap: Object, callback?: commonCallback): Promise<Object>;
    updateMetaData(metaDataMap: Object, upsert?: boolean, callback?: commonCallback): void;
    deleteMetaData(metaDataKey: string, callback?: commonCallback): Promise<null>;
    deleteAllMetaData(callback?: commonCallback): Promise<null>;

    serialize(): Object;
  }
  interface UserStatic {
    buildFromSerializedData(serializedObject: Object): User;
  }

  interface Sender extends User {
    isBlockedByMe: boolean;
  }

  interface Member extends User {
    state: 'invited' | 'joined';
    role: 'none' | 'operator';
    isMuted: boolean;
    isBlockedByMe: boolean;
    isBlockingMe: boolean;
    restrictionInfo: RestrictionInfo;
  }
  interface MemberStatic {
    buildFromSerializedData(serializedObject: Object): Member;
  }

  interface RestrictionInfo {
    restrictionType: RestrictionType[keyof RestrictionType];
    description: string;
    endAt: number;
  }
  interface RestrictedUser extends User {
    restrictionInfo: RestrictionInfo;
  }
  interface RestrictedUserStatic {
    RestrictionType: RestrictionType;
  }

  /**
   * Channel
   */
  type fileMessagesCallbackObject = {
    progress: (event: ProgressEvent, messageRequestId: string) => void;
    sent: (message: FileMessage, error: SendBirdError) => void;
    complete: (error: SendBirdError) => void;
  };
  type messageCallback<T = UserMessage | FileMessage | AdminMessage> = (message: T, error: SendBirdError) => void;
  type reactionEventCallback = (event: ReactionEvent, error: SendBirdError) => void;
  type cancelUploadingFileMessageCallback = (isSuccess: boolean, error: SendBirdError) => void;
  type fileUploadprogressHandler = (event: ProgressEvent) => void;
  type messageChangeLogs = {
    updatedMessages: Array<UserMessage | FileMessage | AdminMessage>;
    deletedMessageIds: Array<number>;
    hasMore: boolean;
    token: string;
  };
  type getMessageChangeLogsHandler = (data: messageChangeLogs, error: SendBirdError) => void;
  type mutedInfo = {
    isMuted: boolean;
    startAt: number;
    endAt: number;
    remainingDuration: number;
    description: string;
  };
  type getMyMutedInfoHandler = (info: mutedInfo, error: SendBirdError) => void;

  interface BaseChannel {
    url: string;
    name: string;
    coverUrl: string;
    data: string | null;
    customType: string | null;
    isFrozen: boolean;
    isEphemeral: boolean;
    creator: User | null;
    createdAt: number;

    isGroupChannel(): this is GroupChannel;
    isOpenChannel(): this is OpenChannel;
    serialize(): Object;

    /**
     * @deprecated since version v3.0.123, please use {@link getMessageChangeLogsSinceToken()} instead
     */
    getMessageChangeLogsByToken(token: string, callback?: getMessageChangeLogsHandler): Promise<messageChangeLogs>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessageChangeLogsSinceToken()} instead
     */
    getMessageChangeLogsByToken(token: string, includeMetaArray: boolean, callback?: getMessageChangeLogsHandler): Promise<messageChangeLogs>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessageChangeLogsSinceToken()} instead
     */
    getMessageChangeLogsByToken(
      token: string,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: getMessageChangeLogsHandler
    ): Promise<messageChangeLogs>;

    /**
     * @deprecated since version v3.0.123, please use {@link getMessageChangeLogsSinceTimestamp()} instead
     */
    getMessageChangeLogsByTimestamp(ts: number, callback?: getMessageChangeLogsHandler): Promise<messageChangeLogs>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessageChangeLogsSinceTimestamp()} instead
     */
    getMessageChangeLogsByTimestamp(ts: number, includeMetaArray: boolean, callback?: getMessageChangeLogsHandler): Promise<messageChangeLogs>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessageChangeLogsSinceTimestamp()} instead
     */
    getMessageChangeLogsByTimestamp(
      ts: number,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: getMessageChangeLogsHandler
    ): Promise<messageChangeLogs>;

    getMessageChangeLogsSinceToken(
      token: string,
      params: MessageChangeLogsParams,
      callback?: getMessageChangeLogsHandler
    ): Promise<messageChangeLogs>;
    getMessageChangeLogsSinceTimestamp(
      timestamp: number,
      params: MessageChangeLogsParams,
      callback?: getMessageChangeLogsHandler
    ): Promise<messageChangeLogs>;

    getMyMutedInfo(callback?: getMyMutedInfoHandler): void;
    createOperatorListQuery(): OperatorListQuery;

    /** Message  */
    /**
     * @deprecated since version v3.0.36, please use {@link createPreviousMessageListQuery()} instead
     */
    createMessageListQuery(): MessageListQuery;
    createPreviousMessageListQuery(): PreviousMessageListQuery;

    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getNextMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getNextMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getNextMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getNextMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousAndNextMessagesByTimestamp(
      ts: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousAndNextMessagesByTimestamp(
      ts: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousAndNextMessagesByTimestamp(
      ts: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByTimestamp()} instead
     */
    getPreviousAndNextMessagesByTimestamp(
      ts: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getNextMessagesByID(
      messageId: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getNextMessagesByID(
      messageId: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getNextMessagesByID(
      messageId: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getNextMessagesByID(
      messageId: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousMessagesByID(
      messageId: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousMessagesByID(
      messageId: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousMessagesByID(
      messageId: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousMessagesByID(
      messageId: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousAndNextMessagesByID(
      messageId: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousAndNextMessagesByID(
      messageId: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousAndNextMessagesByID(
      messageId: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    /**
     * @deprecated since version v3.0.123, please use {@link getMessagesByMessageId()} instead
     */
    getPreviousAndNextMessagesByID(
      messageId: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      includeMetaArray: boolean,
      includeReactions: boolean,
      callback?: messageListCallback
    ): Promise<Array<UserMessage | FileMessage | AdminMessage>>;

    getMessagesByTimestamp(timestamp: number, params: MessageListParams, callback?: messageListCallback): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    getMessagesByMessageId(messageId: number, params: MessageListParams, callback?: messageListCallback): Promise<Array<UserMessage | FileMessage | AdminMessage>>;

    /** FileMessage  */
    sendFileMessage(fileMessageParams: FileMessageParams, callback: messageCallback): FileMessage;
    sendFileMessage(file: FileType, callback: messageCallback): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(file: FileType, data: string, callback: messageCallback): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(file: FileType, data: string, customType: string, callback: messageCallback): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      data: string,
      customType: string,
      thumbnailSizes: Array<ThumbnailSize>,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      name: string,
      type: string,
      size: number,
      data: string,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      name: string,
      type: string,
      size: number,
      data: string,
      customType: string,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    sendFileMessage(
      file: FileType,
      name: string,
      type: string,
      size: number,
      data: string,
      customType: string,
      thumbnailSizes: Array<ThumbnailSize>,
      callback: messageCallback<FileMessage>
    ): FileMessage;

    sendFileMessage(
      fileMessageParams: FileMessageParams,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    sendFileMessage(file: FileType, progressHandler: fileUploadprogressHandler, callback: messageCallback): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      data: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      data: string,
      customType: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      data: string,
      customType: string,
      thumbnailSizes: Array<ThumbnailSize>,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      name: string,
      type: string,
      size: number,
      data: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: FileType,
      name: string,
      type: string,
      size: number,
      data: string,
      customType: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    sendFileMessage(
      file: FileType,
      name: string,
      type: string,
      size: number,
      data: string,
      customType: string,
      thumbnailSizes: Array<ThumbnailSize>,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;

    sendFileMessage(file: string, callback: messageCallback<FileMessage>): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(file: string, data: string, callback: messageCallback<FileMessage>): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(file: string, data: string, customType: string, callback: messageCallback<FileMessage>): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: string,
      name: string,
      type: string,
      size: number,
      data: string,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    sendFileMessage(
      file: string,
      name: string,
      type: string,
      size: number,
      data: string,
      customType: string,
      callback: messageCallback<FileMessage>
    ): FileMessage;

    /**
     * @deprecated
     */
    sendFileMessage(file: string, progressHandler: fileUploadprogressHandler, callback: messageCallback<FileMessage>): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: string,
      data: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: string,
      data: string,
      customType: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: string,
      name: string,
      type: string,
      size: number,
      data: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;
    /**
     * @deprecated
     */
    sendFileMessage(
      file: string,
      name: string,
      type: string,
      size: number,
      data: string,
      customType: string,
      progressHandler: fileUploadprogressHandler,
      callback: messageCallback<FileMessage>
    ): FileMessage;

    sendFileMessages(
      fileMessageParamsList: Array<FileMessageParams>,
      callbackObject: fileMessagesCallbackObject
    ): Array<FileMessage>;

    /** UserMessage  */
    sendUserMessage(userMessageParams: UserMessageParams, callback: messageCallback<UserMessage>): UserMessage;
    sendUserMessage(message: string, callback: messageCallback<UserMessage>): UserMessage;
    /**
     * @deprecated
     */
    sendUserMessage(message: string, data: string, callback: messageCallback<UserMessage>): UserMessage;
    /**
     * @deprecated
     */
    sendUserMessage(message: string, data: string, customType: string, callback: messageCallback<UserMessage>): UserMessage;
    sendUserMessage(
      message: string,
      data: string,
      customType: string,
      translationTargetLanguages: Array<string>,
      callback: messageCallback<UserMessage>
    ): UserMessage;

    resendUserMessage(userMessage: UserMessage, callback?: messageCallback): Promise<UserMessage>;
    resendFileMessage(fileMessage: FileMessage, callback?: messageCallback): Promise<FileMessage>;
    resendFileMessage(fileMessage: FileMessage, file: FileType, callback?: messageCallback): Promise<FileMessage>;

    translateUserMessage(
      message: UserMessage,
      translationTargetLanguages: Array<string>,
      callback?: messageCallback<UserMessage>
    ): Promise<UserMessage>;

    /** Edit Message  */
    updateFileMessage(messageId: number, data: string, customType: string, callback?: messageCallback<FileMessage>): Promise<FileMessage>;
    updateFileMessage(messageId: number, fileMessageParams: FileMessageParams, callback?: messageCallback<FileMessage>): Promise<FileMessage>;
    updateUserMessage(
      messageId: number,
      message: string,
      data: string,
      customType: string,
      callback?: messageCallback<UserMessage>
    ): Promise<UserMessage>;
    updateUserMessage(messageId: number, userMessageParams: UserMessageParams, callback?: messageCallback<UserMessage>): Promise<UserMessage>;
    deleteMessage(message: FileMessage, callback?: commonCallback): Promise<Object>;
    deleteMessage(message: UserMessage, callback?: commonCallback): Promise<Object>;
    cancelUploadingFileMessage(messageReqId: string, callback: cancelUploadingFileMessageCallback): boolean;

    /** Copy Message */
    copyUserMessage(channel: BaseChannel, message: UserMessage, callback: messageCallback<UserMessage>): UserMessage;
    copyFileMessage(channel: BaseChannel, message: FileMessage, callback: messageCallback<FileMessage>): FileMessage;

    /** Operators */
    addOperators(operatorUserIds: Array<string>, callback?: commonCallback): Promise<Object>;
    removeOperators(operatorUserIds: Array<string>, callback?: commonCallback): Promise<Object>;

    /** Reaction */
    addReaction(message: UserMessage | FileMessage | AdminMessage, key: string, callback?: reactionEventCallback): Promise<ReactionEvent>;
    deleteReaction(
      message: UserMessage | FileMessage | AdminMessage,
      key: string,
      callback?: reactionEventCallback
    ): Promise<ReactionEvent>;

    /** MetaData */
    createMetaData(metaDataMap: Object, callback?: commonCallback): Promise<Object>;
    updateMetaData(metaDataMap: Object, upsert?: boolean, callback?: commonCallback): Promise<Object>;
    getMetaData(keys: Array<string>, callback?: commonCallback): Promise<Object>;
    getAllMetaData(callback?: commonCallback): Promise<Object>;
    deleteMetaData(key: string, callback?: commonCallback): Promise<Object>;
    deleteAllMetaData(callback?: commonCallback): Promise<Object>;
    getCachedMetaData(): object;

    /** MetaCounter */
    createMetaCounters(metaCounterMap: Object, callback?: commonCallback): Promise<Object>;
    updateMetaCounters(metaCounterMap: Object, upsert?: boolean, callback?: commonCallback): Promise<Object>;
    increaseMetaCounters(metaCounterMap: Object, callback?: commonCallback): Promise<Object>;
    decreaseMetaCounters(metaCounterMap: Object, callback?: commonCallback): Promise<Object>;
    getMetaCounters(keys: Array<string>, callback?: commonCallback): Promise<Object>;
    getAllMetaCounters(callback?: commonCallback): Promise<Object>;
    deleteMetaCounter(key: string, callback?: commonCallback): Promise<Object>;
    deleteAllMetaCounters(callback?: commonCallback): Promise<Object>;

    /** MessageMetaArray */
    createMessageMetaArrayKeys(
      message: UserMessage | FileMessage | AdminMessage,
      keys: Array<string>,
      callback?: commonCallback
    ): Promise<UserMessage | FileMessage | AdminMessage>;
    deleteMessageMetaArrayKeys(
      message: UserMessage | FileMessage | AdminMessage,
      keys: Array<string>,
      callback?: commonCallback
    ): Promise<UserMessage | FileMessage | AdminMessage>;
    addMessageMetaArrayValues(
      message: UserMessage | FileMessage | AdminMessage,
      data: Array<MessageMetaArray>,
      callback?: commonCallback
    ): Promise<UserMessage | FileMessage | AdminMessage>;
    /**
     * @deprecated since version v3.0.105
     */
    addMessageMetaArrayValues(
      message: UserMessage | FileMessage | AdminMessage,
      data: Object,
      callback?: commonCallback
    ): Promise<UserMessage | FileMessage | AdminMessage>;
    removeMessageMetaArrayValues(
      message: UserMessage | FileMessage | AdminMessage,
      data: Array<MessageMetaArray>,
      callback?: commonCallback
    ): Promise<UserMessage | FileMessage | AdminMessage>;
    /**
     * @deprecated since version v3.0.105
     */
    removeMessageMetaArrayValues(
      message: UserMessage | FileMessage | AdminMessage,
      data: Object,
      callback?: commonCallback
    ): Promise<UserMessage | FileMessage | AdminMessage>;

    /** Report */
    report(category: string, description: string, callback?: commonCallback): Promise<Object>;
    reportUser(user: User, category: string, description: string, callback?: commonCallback): Promise<Object>;
    reportMessage(
      message: UserMessage | FileMessage | AdminMessage,
      category: string,
      description: string,
      callback?: commonCallback
    ): Promise<Object>;
  }

  type messageListCallback = (
    messageList: Array<UserMessage | FileMessage | AdminMessage>,
    error: SendBirdError
  ) => void;

  /**
   * @deprecated since version v3.0.36, please use {@link PreviousMessageListQuery} instead
   */
  interface MessageListQuery {
    next(messageTimestamp: number, limit: number, reverse: boolean, callback?: messageListCallback): void;
    prev(messageTimestamp: number, limit: number, reverse: boolean, callback?: messageListCallback): void;
    load(
      messageTimestamp: number,
      prevLimit: number,
      nextLimit: number,
      reverse: boolean,
      callback?: messageListCallback
    ): void;
  }

  type ThreadedMessageListInfo = {
    parentMessage: UserMessage | FileMessage | AdminMessage;
    threadedReplies: Array<UserMessage | FileMessage | AdminMessage>;
  };
  /**
   * @deprecated since version v3.0.27, please use {@link SendBirdInstance.setErrorFirstCallback}
   */
  type threadedMessageErrorLastCallback = (threadedMessageListInfo: ThreadedMessageListInfo, error: SendBirdError) => void;
  type threadedMessageErrorFirstCallback = (error: SendBirdError, threadedMessageListInfo: ThreadedMessageListInfo) => void;
  type threadedMessageCallback = threadedMessageErrorFirstCallback | threadedMessageErrorLastCallback;

  interface PreviousMessageListQuery {
    hasMore: boolean;
    isLoading: boolean;
    limit: number;
    reverse: boolean;
    messageTypeFilter: 0 | 1 | 2 | 3 | '' | 'MESG' | 'FILE' | 'ADMM';
    /**
     * @deprecated since version v3.0.142, please use {@link customTypesFilter} instead
     */
    customTypeFilter: string;
    customTypesFilter: Array<string>;
    senderUserIdsFilter: Array<string>;
    includeMetaArray: boolean;
    /**
     * @deprecated since version v3.0.129, please use {@link includeReactions} instead
     */
    includeReaction: boolean;
    includeReactions: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link replyType} instead
     */
    includeReplies: boolean;
    /**
     * @deprecated since version v3.0.159, please use {@link includeParentMessageInfo} instead
     */
    includeParentMessageText: boolean;
    includeThreadInfo: boolean;
    showSubchannelMessagesOnly: boolean;
    replyType: ReplyType[keyof ReplyType];
    includeParentMessageInfo: boolean;

    load(limit: number, reverse: boolean, messageType?: number | string, callback?: messageListCallback): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
    load(callback?: messageListCallback): Promise<Array<UserMessage | FileMessage | AdminMessage>>;
  }

  /**
   * OpenChannel
   */
  type commonCallback = (response: Object, error: SendBirdError) => void;
  type openChannelCallback = (openChannel: OpenChannel, error: SendBirdError) => void;

  interface OpenChannelParams {
    new(): OpenChannelParams;
    channelUrl: string;
    name: string;
    coverUrlOrImage: string | FileType;
    data: string;
    customType: string;
    operatorUserIds: Array<string>;
  }

  interface OpenChannel extends BaseChannel {
    participantCount: number;
    operators: Array<User>;

    refresh(callback?: openChannelCallback): Promise<OpenChannel>;
    delete(callback?: commonCallback): Promise<Object>;
    enter(callback?: openChannelCallback): Promise<null>;
    exit(callback?: openChannelCallback): Promise<null>;

    createParticipantListQuery(): ParticipantListQuery;
    createMutedUserListQuery(): MutedUserListQuery;
    createBannedUserListQuery(): BannedUserListQuery;

    updateChannel(params: OpenChannelParams, callback?: openChannelCallback): Promise<OpenChannel>;
    updateChannel(name: string, coverUrlOrImageFile: string | FileType, data: string, callback?: openChannelCallback): Promise<OpenChannel>;
    /**
     * @deprecated
     */
    updateChannel(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;
    updateChannel(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      customType: string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;

    updateChannelWithOperatorUserIds(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;
    updateChannelWithOperatorUserIds(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      customType: string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;

    banUser(user: User, seconds?: number, callback?: commonCallback): Promise<null>;
    banUserWithUserId(userId: string, seconds?: number, callback?: commonCallback): Promise<null>;
    unbanUser(user: User, callback?: commonCallback): Promise<null>;
    unbanUserWithUserId(userId: string, callback?: commonCallback): Promise<null>;

    muteUser(user: User, callback?: commonCallback): Promise<null>;
    muteUser(user: User, seconds: number, description: string, callback?: commonCallback): Promise<null>;
    muteUserWithUserId(userId: string, callback?: commonCallback): Promise<null>;
    muteUserWithUserId(userId: string, seconds: number, description: string, callback?: commonCallback): Promise<null>;
    unmuteUser(user: User, callback?: commonCallback): Promise<null>;
    unmuteUserWithUserId(userId: string, callback?: commonCallback): Promise<null>;

    isOperator(user: User): boolean;
    isOperatorWithUserId(userId: string): boolean;
  }

  type userListQueryCallback = (userList: Array<User>, error: SendBirdError) => void;
  /**
   * @deprecated since version v3.0.86, please use {@link ApplicationUserListQuery} instead
   */
  interface UserListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;
    metaDataKey: string;
    metaDataValues: Array<string>;

    next(callback?: userListQueryCallback): Promise<Array<User>>;
  }

  interface ApplicationUserListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;
    userIdsFilter: Array<string>;
    metaDataKeyFilter: string;
    metaDataValuesFilter: Array<string>;
    nicknameStartsWithFilter: string;

    next(callback?: userListQueryCallback): Promise<Array<User>>;
  }

  interface BlockedUserListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;
    userIdsFilter: Array<string>;

    next(callback?: userListQueryCallback): Promise<Array<User>>;
  }

  interface ParticipantListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;

    next(callback?: userListQueryCallback): Promise<Array<User>>;
  }

  interface MutedUserListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;

    next(callback?: userListQueryCallback): Promise<Array<RestrictedUser>>;
  }

  interface BannedUserListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;

    next(callback?: userListQueryCallback): Promise<Array<RestrictedUser>>;
  }

  interface OperatorListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;
    next(callback?: userListQueryCallback): Promise<Array<User>>;
  }

  interface OpenChannelStatic {
    buildFromSerializedData(serializedObject: Object): OpenChannel;

    getChannel(channelUrl: string, callback?: openChannelCallback): Promise<OpenChannel>;
    getChannelWithoutCache(channelUrl: string, callback?: openChannelCallback): Promise<OpenChannel>;

    createChannel(callback?: openChannelCallback): Promise<OpenChannel>;
    createChannel(params: OpenChannelParams, callback?: openChannelCallback): Promise<OpenChannel>;

    /**
     * @deprecated
     */
    createChannel(name: string, coverUrlOrImageFile: string | FileType, data: string, callback?: openChannelCallback): Promise<OpenChannel>;

    /**
     * @deprecated
     */
    createChannel(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;
    createChannel(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      customType: string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;

    createChannelWithOperatorUserIds(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;
    createChannelWithOperatorUserIds(
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      operatorUserIds: Array<string> | string,
      customType: string,
      callback?: openChannelCallback
    ): Promise<OpenChannel>;

    createOpenChannelListQuery(): OpenChannelListQuery;
  }

  type openChannelListQueryCallback = (openChannelList: Array<OpenChannel>, error: SendBirdError) => void;
  interface OpenChannelListQuery {
    limit: number;
    hasNext: boolean;
    nameKeyword: string;
    urlKeyword: string;
    customTypes: Array<string>;
    includeFrozen: boolean;

    next(callback?: openChannelListQueryCallback): Promise<Array<OpenChannel>>;
  }

  /**
   * ScheduledUserMessage
   */
  interface ScheduledUserMessage {
    scheduledId: number;
    scheduledDateTimeString: string;
    scheduledTimezone: string;
    status: 'scheduled' | 'sent' | 'canceled' | 'failed';
    createdAt: number;
    updatedAt: number;
    channelUrl: string;
    sender: User;
    message: string;
    customType: string;
    data: string;
    /**
     * @deprecated
     */
    metaArray: Object;
    metaArrays: Array<MessageMetaArray>;
    mentionType: 'users' | 'channel';
    mentionedUsers: Array<User>;
    pushNotificationDeliveryOption: 'default' | 'suppress';
    translationTargetLanguages: Array<string>;
    errorMessage: string;
    errorCode: number;
    appleCriticalAlertOptions: AppleCriticalAlertOptions;

    isGroupChannel(): boolean;
    isOpenChannel(): boolean;
  }

  type scheduledUserMessageCallback = (scheduledUserMessage: ScheduledUserMessage, error: SendBirdError) => void;

  /**
   * GroupChannel
   */
  interface GroupChannelParams {
    new(): GroupChannelParams;
    isDistinct: boolean;
    isSuper: boolean;
    isBroadcast: boolean;
    isPublic: boolean;
    isDiscoverable: boolean;
    isStrict: boolean;
    isEphemeral: boolean;
    channelUrl: string;
    name: string;
    data: string;
    customType: string;
    coverUrl: string;
    coverImage: FileType;
    operators: Array<User>;
    operatorUserIds: Array<string>;
    accessCode: string;
    messageSurvivalSeconds: number;

    addUser(user: User): void;
    addUsers(user: Array<User>): void;
    addUserId(userId: string): void;
    addUserIds(userId: Array<string>): void;
  }

  interface ScheduledUserMessageParams {
    new(): ScheduledUserMessageParams;
    message: string;
    data: string;
    customType: string;
    translationTargetLanguages: Array<string>;
    metaArrayKeys: Array<string>;
    mentionType: 'users' | 'channel';
    mentionedUserIds: Array<string>;
    mentionedUsers: Array<User>;
    pushNotificationDeliveryOption: 'default' | 'suppress';
    year: number;
    month: number;
    day: number;
    hour: number;
    min: number;
    timezone: string;
    scheduledDateTimeString: string;
    appleCriticalAlertOptions: AppleCriticalAlertOptions;

    setSchedule(year: number, month: number, day: number, hour: number, min: number, timezone: string): void;
  }

  interface GroupChannelChangeLogsParams {
    new(): GroupChannelChangeLogsParams;
    customTypes: Array<string>;
    includeEmpty: boolean;
    includeFrozen: boolean;
  }

  interface DistinctGroupChannelResponse {
    channel: GroupChannel;
    isCreated: boolean;
  }

  interface MessageMetaArray {
    new(key: string, value: Array<string>): MessageMetaArray;
    key: string;
    value: Array<string>;
  }
  interface Reaction {
    key: string;
    userIds: Array<string>;
    updatedAt: number;
  }
  interface ReactionEvent {
    messageId: number;
    userId: string;
    key: string;
    operation: 'add' | 'delete';
    updatedAt: number;
  }

  interface ThreadInfo {
    replyCount: number;
    mostRepliedUsers: Array<User>;
    lastRepliedAt: number;
    updatedAt: number;
  }
  interface ThreadInfoUpdateEvent {
    threadInfo: ThreadInfo;
    targetMessageId: number;
    channelUrl: string;
    channelType: string;
  }

  interface OGMetaData {
    title: string;
    url: string;
    description: string;
    defaultImage: OGImage;
  }
  interface OGImage {
    url: string;
    secureUrl: string;
    type: string;
    width: number;
    height: number;
    alt: string;
  }

  interface Plugin {
    type: string;
    vendor: string;
    detail: {};
  }

  interface AppleCriticalAlertOptions {
    name: string;
    volume: number;

    serialize(): Object;
  }

  type groupChannelCallback = (groupChannel: GroupChannel, error: SendBirdError) => void;
  type distinctGroupChannelCallback = (response: DistinctGroupChannelResponse, error: SendBirdError) => void;
  type getPushPreferenceCallback = (isPushOn: boolean, error: SendBirdError) => void;
  type getPushTriggerOptionCallback = (
    pushTriggerOption: 'all' | 'mention_only' | 'off' | 'default',
    error: SendBirdError
  ) => void;
  interface GroupChannel extends BaseChannel {
    isHidden: boolean;
    isDistinct: boolean;
    isSuper: boolean;
    isBroadcast: boolean;
    isPublic: boolean;
    /**
     * @deprecated since version v3.0.93, please use {@link myPushTriggerOption} instead
     */
    isPushEnabled: boolean;
    myPushTriggerOption: 'default' | 'all' | 'mention_only' | 'off';
    myCountPreference: string;
    lastMessage: UserMessage | FileMessage | AdminMessage | null;
    unreadMessageCount: number;
    unreadMentionCount: number;
    members: Array<Member>;
    memberCount: number;
    joinedMemberCount: number;
    myMemberState: 'none' | 'joined' | 'invited';
    myRole: 'operator' | 'none';
    myMutedState: 'muted' | 'unmuted';
    inviter: User | null;
    invitedAt: number;
    joinedAt: number;
    isAccessCodeRequired: boolean;
    hiddenState: 'unhidden' | 'hidden_allow_auto_unhide' | 'hidden_prevent_auto_unhide';
    isDiscoverable: boolean;
    myLastRead: number;
    messageOffsetTimestamp: number;
    messageSurvivalSeconds: number;

    isEqual(target: GroupChannel): boolean;
    isIdentical(target: GroupChannel): boolean;
    refresh(callback?: groupChannelCallback): Promise<GroupChannel>;
    delete(callback?: commonCallback): Promise<Object>;

    updateChannel(groupChannelParams: GroupChannelParams, callback?: groupChannelCallback): Promise<GroupChannel>;
    updateChannel(name: string, coverUrlOrImageFile: string | FileType, data: string, callback?: groupChannelCallback): Promise<GroupChannel>;
    /**
     * @deprecated
     */
    updateChannel(
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      callback?: groupChannelCallback
    ): Promise<GroupChannel>;
    updateChannel(
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      customType: string,
      callback?: groupChannelCallback
    ): Promise<GroupChannel>;

    resetMyHistory(callback?: commonCallback): Promise<Object>;

    invite(users: Array<User>, callback?: groupChannelCallback): Promise<GroupChannel>;
    inviteWithUserIds(userIds: Array<string>, callback?: groupChannelCallback): Promise<GroupChannel>;
    acceptInvitation(accessCode?: string, callback?: groupChannelCallback): Promise<GroupChannel>;
    declineInvitation(callback?: commonCallback): Promise<GroupChannel>;

    join(accessCode?: string, callback?: groupChannelCallback): Promise<GroupChannel>;
    leave(callback?: commonCallback): Promise<null>;

    hide(hidePreviousMessages?: boolean, callback?: commonCallback): Promise<Object>;
    hide(hidePreviousMessages: boolean, allowAutoUnhide: boolean, callback?: commonCallback): Promise<Object>;
    unhide(callback?: commonCallback): Promise<Object>;

    markAsRead(callback?: voidCallback): Promise<void>;
    /**
     * @deprecated since version v3.0.156
     */
    markAsRead(): void;
    /**
     * @deprecated since version v3.0.127, please use {@link getUnreadMemberCount()} instead
     */
    getReadReceipt(message: UserMessage | FileMessage | AdminMessage): number;
    getReadStatus(includeAllMembers?: boolean): Object;
    getUnreadMembers(message: UserMessage | FileMessage, includeAllMembers?: boolean): Array<Member>;
    getReadMembers(message: UserMessage | FileMessage, includeAllMembers?: boolean): Array<Member>;
    getUnreadMemberCount(message: UserMessage | FileMessage | AdminMessage): number;

    /**
     * @deprecated since version v3.0.143, please use {@link SendBirdInstance.markAsDelivered()} instead
     */
    markAsDelivered(): void;
    /**
     * @deprecated since version v3.0.127, please use {@link getUndeliveredMemberCount()} instead
     */
    getDeliveryReceipt(message: UserMessage | FileMessage | AdminMessage): number;
    getUndeliveredMemberCount(message: UserMessage | FileMessage | AdminMessage): number;

    startTyping(): void;
    endTyping(): void;
    isTyping(): boolean;
    getTypingMembers(): Array<Member>; // DEPRECATE
    getTypingUsers(): Array<User>;

    /**
     * @deprecated since version v3.0.93, please use {@link getMyPushTriggerOption()} instead
     */
    setPushPreference(pushOn: boolean, callback?: commonCallback): Promise<Object>;
    /**
     * @deprecated since version v3.0.93, please use {@link getMyPushTriggerOption()} instead
     */
    getPushPreference(callback?: getPushPreferenceCallback): Promise<boolean>;
    setMyPushTriggerOption(
      pushTriggerOption: 'all' | 'mention_only' | 'off' | 'default',
      callback?: getPushTriggerOptionCallback
    ): Promise<string>;
    getMyPushTriggerOption(callback?: getPushTriggerOptionCallback): Promise<string>;
    setMyCountPreference(
      preference: 'all' | 'unread_message_count_only' | 'unread_mention_count_only' | 'off',
      callback?: commonCallback
    ): Promise<string>;

    createMemberListQuery(): GroupChannelMemberListQuery;
    createBannedUserListQuery(): BannedUserListQuery;

    banUser(user: User, seconds: number, description: string, callback?: commonCallback): Promise<null>;
    banUserWithUserId(userId: string, seconds: number, description: string, callback?: commonCallback): Promise<null>;
    unbanUser(User: User, callback?: commonCallback): Promise<null>;
    unbanUserWithUserId(userId: string, callback?: commonCallback): Promise<null>;

    muteUser(user: User, callback?: commonCallback): Promise<null>;
    muteUser(user: User, seconds: number, description: string, callback?: commonCallback): Promise<null>;
    muteUserWithUserId(userId: string, callback?: commonCallback): Promise<null>;
    muteUserWithUserId(userId: string, seconds: number, description: string, callback?: commonCallback): Promise<null>;
    unmuteUser(user: User, callback?: commonCallback): Promise<null>;
    unmuteUserWithUserId(userId: string, callback?: commonCallback): Promise<null>;

    freeze(callback?: commonCallback): Promise<null>;
    unfreeze(callback?: commonCallback): Promise<null>;

    createMessageCollection(): MessageCollectionBuilder;

    registerScheduledUserMessage(
      scheduledUserMessageParams: ScheduledUserMessageParams,
      callback?: scheduledUserMessageCallback
    ): Promise<ScheduledUserMessage>;
  }

  type groupChannelCountCallback = (count: number, error: SendBirdError) => void;

  type SearchFilterParams = {
    searchQuery: string,
    searchFields: SearchField[]
  };

  type UserIdsFilterParams = {
    userIds: string[],
    includeMode: boolean,
    queryType: QueryType
  };

  interface GroupChannelFilter {
    includeEmpty: boolean;
    nicknameContainsFilter: string;
    nicknameStartsWithFilter: string;
    nicknameExactMatchFilter: string;
    channelNameContainsFilter: string;
    memberStateFilter: MemberStateFilter;
    customTypesFilter: string[];
    channelUrlsFilter: string[];
    superChannelFilter: SuperChannelFilter;
    publicChannelFilter: PublicChannelFilter;
    customTypeStartsWithFilter: string;
    unreadChannelFilter: UnreadChannelFilter;
    hiddenChannelFilter: HiddenChannelFilter;
    includeFrozen: boolean;
    includeMetaData: boolean;

    searchFilter: SearchFilterParams;
    userIdsFilter: UserIdsFilterParams;

    setSearchFilter(fields: SearchField[], query: string): void;
    setUserIdsFilter(userIds: string[], includeMode: boolean, queryType: QueryType): void;

    match(channel: GroupChannel): boolean;
  }

  interface GroupChannelFilterStatic {
    new(): GroupChannelFilter;

    QueryType: typeof QueryType;
    SearchField: typeof SearchField;
    MemberStateFilter: typeof MemberStateFilter;
    SuperChannelFilter: typeof SuperChannelFilter;
    PublicChannelFilter: typeof PublicChannelFilter;
    UnreadChannelFilter: typeof UnreadChannelFilter;
    HiddenChannelFilter: typeof HiddenChannelFilter;
  }

  type MessageCollectionInitResultHandler = (err: Error, messages: BaseMessageInstance[]) => void;

  interface MessageCollectionInitHandler {
    onCacheResult(handler: MessageCollectionInitResultHandler): MessageCollectionInitHandler;
    onApiResult(handler: MessageCollectionInitResultHandler): MessageCollectionInitHandler;
  }

  interface GroupChannelContext {
    readonly source: CollectionEventSource;
    readonly isFromEvent: boolean;
  }

  interface GroupChannelCollectionHandler {
    onChannelsAdded: (context: GroupChannelContext, channels: BaseChannel[]) => void;
    onChannelsUpdated: (context: GroupChannelContext, channels: BaseChannel[]) => void;
    onChannelsDeleted: (context: GroupChannelContext, channelUrls: string[]) => void;
  }

  interface GroupChannelCollection {
    readonly hasMore: boolean;
    readonly channelList: GroupChannel[];

    loadMore(): Promise<GroupChannel[]>;
    dispose(): void;
    setGroupChannelCollectionHandler(handler: GroupChannelCollectionHandler): void;
  }

  interface GroupChannelCollectionStatic {
    GroupChannelOrder: typeof GroupChannelOrder;
  }

  interface GroupChannelCollectionBuilder {
    setFilter(filter: GroupChannelFilter): GroupChannelCollectionBuilder;
    setOrder(order: GroupChannelOrder): GroupChannelCollectionBuilder;
    setLimit(limit: number): GroupChannelCollectionBuilder;
    build(): GroupChannelCollection;
  }

  interface MessageContext {
    readonly source: CollectionEventSource;
    readonly isFromEvent: boolean;
    readonly sendingStatus: MessageSendingStatus[keyof MessageSendingStatus];
  }

  interface MessageCollectionHandler {
    onMessagesAdded: (context: MessageContext, channel: BaseChannel, messages: BaseMessageInstance[]) => void;
    onMessagesUpdated: (context: MessageContext, channel: BaseChannel, messages: BaseMessageInstance[]) => void;
    onMessagesDeleted: (context: MessageContext, channel: BaseChannel, messages: BaseMessageInstance[]) => void;
    onChannelUpdated: (context: GroupChannelContext, channel: BaseChannel) => void;
    onChannelDeleted: (context: GroupChannelContext, channelUrl: string) => void;
    onHugeGapDetected: () => void;
  }

  interface MessageCollection {
    readonly channel: BaseChannel;
    readonly succeededMessages: BaseMessageInstance[];
    readonly pendingMessages: BaseMessageInstance[];
    readonly failedMessages: BaseMessageInstance[];
    readonly startingPoint: number;
    readonly hasPrevious: boolean;
    readonly hasNext: boolean;

    initialize(initPolicy: MessageCollectionInitPolicy): MessageCollectionInitHandler;
    loadPrevious(): Promise<BaseMessageInstance[]>;
    loadNext(): Promise<BaseMessageInstance[]>;
    removeFailedMessages(messages: BaseMessageInstance[]): Promise<string[]>;
    removeAllFailedMessages(): Promise<void>;
    dispose(): void;
    setMessageCollectionHandler(handler: MessageCollectionHandler): void;
  }

  interface MessageCollectionStatic {
    MessageCollectionInitPolicy: typeof MessageCollectionInitPolicy;
  }

  interface MessageCollectionBuilder {
    setFilter(filter: MessageFilter): MessageCollectionBuilder;
    setStartingPoint(startingPoint: number): MessageCollectionBuilder;
    setLimit(limit: number): MessageCollectionBuilder;
    build(): MessageCollection;
  }

  interface GroupChannelStatic {
    buildFromSerializedData(serializedObject: Object): GroupChannel;

    createMyGroupChannelListQuery(): GroupChannelListQuery;
    createPublicGroupChannelListQuery(): PublicGroupChannelListQuery;

    /**
     * @deprecated since version v3.0.80, please use {@link SendBirdInstance.getUnreadItemCount()} instead
     */
    getUnreadItemCount(keys: Array<string>, callback?: commonCallback): Promise<Object>;
    /**
     * @deprecated since version v3.0.80, please use {@link SendBirdInstance.getTotalUnreadMessageCount()} instead
     */
    getTotalUnreadMessageCount(
      groupChannelTotalUnreadMessageCountParams?: GroupChannelTotalUnreadMessageCountParams,
      callback?: groupChannelCountCallback
    ): Promise<number>;
    /**
     * @deprecated since version v3.0.80, please use {@link SendBirdInstance.getTotalUnreadMessageCount()} instead
     */
    getTotalUnreadMessageCount(channelCustomTypes: Array<string>, callback?: groupChannelCountCallback): Promise<number>;
    /**
     * @deprecated since version v3.0.80, please use {@link SendBirdInstance.getTotalUnreadChannelCount()} instead
     */
    getTotalUnreadChannelCount(callback?: groupChannelCountCallback): Promise<number>;

    createChannel(groupChannelParams: GroupChannelParams, callback?: groupChannelCallback): Promise<GroupChannel>;
    createChannel(users: Array<User>, callback?: groupChannelCallback): Promise<GroupChannel>;
    /**
     * @deprecated
     */
    createChannel(users: Array<User>, isDistinct: boolean, callback?: groupChannelCallback): Promise<GroupChannel>;
    /**
     * @deprecated
     */
    createChannel(users: Array<User>, isDistinct: boolean, customType: string, callback?: groupChannelCallback): Promise<GroupChannel>;
    /**
     * @deprecated
     */
    createChannel(
      users: Array<User>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      callback?: groupChannelCallback
    ): Promise<GroupChannel>;
    createChannel(
      users: Array<User>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      customType: string,
      callback?: groupChannelCallback
    ): Promise<GroupChannel>;
    createDistinctChannelIfNotExist(
      groupChannelParams: GroupChannelParams,
      callback?: distinctGroupChannelCallback
    ): Promise<GroupChannel>;

    createChannelWithUserIds(userIds: Array<string>, callback?: groupChannelCallback): Promise<GroupChannel>;
    /**
     * @deprecated
     */
    createChannelWithUserIds(userIds: Array<string>, isDistinct: boolean, callback?: groupChannelCallback): Promise<GroupChannel>;
    /**
     * @deprecated
     */
    createChannelWithUserIds(
      userIds: Array<string>,
      isDistinct: boolean,
      customType: string,
      callback?: groupChannelCallback
    ): Promise<GroupChannel>;
    /**
     * @deprecated
     */
    createChannelWithUserIds(
      userIds: Array<string>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      callback?: groupChannelCallback
    ): Promise<GroupChannel>;
    createChannelWithUserIds(
      userIds: Array<string>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | FileType,
      data: string,
      customType: string,
      callback?: groupChannelCallback
    ): Promise<GroupChannel>;

    getChannel(channelUrl: string, callback?: groupChannelCallback): Promise<GroupChannel>;
    getChannelWithoutCache(channelUrl: string, callback?: groupChannelCallback): Promise<GroupChannel>;

    /**
     * @deprecated since version v3.0.50, please use {@link SendBirdInstance.markAsReadAll()} instead
     */
    markAsReadAll(callback?: commonCallback): Promise<null>;

    createGroupChannelCollection(): GroupChannelCollectionBuilder;
  }

  type groupChannelMemberListQueryCallback = (groupChannelList: Array<Member>, error: SendBirdError) => void;
  interface GroupChannelMemberListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;
    order: 'member_nickname_alphabetical' | 'operator_then_member_alphabetical';
    mutedMemberFilter: 'all' | 'muted' | 'unmuted';
    /**
     * @deprecated
     */
    operatorFilter: 'all' | 'operator' | 'nonoperator';
    memberStateFilter: 'all' | 'joined_only' | 'invited_only' | 'invited_by_friend' | 'invited_by_non_friend';
    nicknameStartsWithFilter: string;

    next(callback?: groupChannelMemberListQueryCallback): Promise<Array<Member>>;
  }

  type groupChannelListQueryCallback = (groupChannelList: Array<GroupChannel>, error: SendBirdError) => void;
  interface GroupChannelListQueryStatic {
    buildFromSerializedData(serializedObject: object): GroupChannelListQuery;
  }
  interface GroupChannelListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;
    includeEmpty: boolean;
    order: 'latest_last_message' | 'chronological' | 'channel_name_alphabetical' | 'metadata_value_alphabetical';
    /**
     * @deprecated
     */
    userIdsFilter: Array<string>;
    /**
     * @deprecated
     */
    userIdsFilterExactMatch: boolean;
    /**
     * @deprecated
     */
    queryType: 'AND' | 'OR';
    userIdsExactFilter: Array<string>;
    userIdsIncludeFilter: Array<string>;
    userIdsIncludeFilterQueryType: 'AND' | 'OR';
    nicknameContainsFilter: string;
    nicknameStartWithFilter: string;
    nicknameExactMatchFilter: string;
    channelNameContainsFilter: string;
    /**
     * @deprecated since version v3.0.49, please use {@link customTypesFilter} instead
     */
    customTypeFilter: string;
    customTypesFilter: Array<string>;
    customTypeStartsWithFilter: string;
    channelUrlsFilter: Array<string>;
    superChannelFilter: 'all' | 'super' | 'nonsuper' | 'broadcast_only';
    publicChannelFilter: 'all' | 'public' | 'private';
    metadataOrderKeyFilter: string;
    metadataKey: string;
    metadataValues: Array<string>;
    metadataValueStartsWith: string;
    memberStateFilter: 'all' | 'joined_only' | 'invited_only' | 'invited_by_friend' | 'invited_by_non_friend';
    hiddenChannelFilter: 'all' | 'unhidden_only' | 'hidden_only' | 'hidden_allow_auto_unhide' | 'hidden_prevent_auto_unhide';
    unreadChannelFilter: 'all' | 'unread_message';
    includeFrozen: boolean;

    setSearchFilter(fields: Array<string>, queryString: string): void;
    serialize(): object;
    next(callback?: groupChannelListQueryCallback): Promise<Array<GroupChannel>>;
  }

  interface PublicGroupChannelListQuery {
    limit: number;
    hasNext: boolean;
    isLoading: boolean;
    includeEmpty: boolean;
    order: 'chronological' | 'channel_name_alphabetical' | 'metadata_value_alphabetical';
    channelNameContainsFilter: string;
    channelUrlsFilter: Array<string>;
    customTypesFilter: Array<string>;
    customTypeStartsWithFilter: string;
    superChannelFilter: 'all' | 'super' | 'nonsuper' | 'broadcast_only';
    membershipFilter: 'all' | 'joined';
    metadataOrderKeyFilter: string;
    metadataKey: string;
    metadataValues: Array<string>;
    metadataValueStartsWith: string;
    includeFrozen: boolean;

    next(callback?: groupChannelListQueryCallback): Promise<Array<GroupChannel>>;
  }
}
