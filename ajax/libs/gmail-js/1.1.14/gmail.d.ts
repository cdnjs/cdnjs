
// gmail.d.ts
// ==========
//
// This code is MIT licensed.


////////////////////////////////////////////////////////////////////////////////
//
// General utility types
//
////////////////////////////////////////////////////////////////////////////////

declare type StringDict = {
    [key: string]: string
};



////////////////////////////////////////////////////////////////////////////////
//
// gmail.tracker
//
////////////////////////////////////////////////////////////////////////////////

interface GmailTracker<T extends string = never> {
    dom_observers: { [observer in GmailDomObserver | T]?: DomObserverConfig };
    globals: any[];
    view_data: any[];
    ik: string;
    hangouts: any;
    events: {}[];
    actions: {}[];
    watchdog: {
        before: { [action in GmailBindAction | T]?: Function[] };
        on: { [action in GmailBindAction | T]?: Function[] };
        after: { [action in GmailBindAction | T]?: Function[] };
        dom: { [observer in GmailDomObserver | T]?: Function[] };
    };
}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.get
//
////////////////////////////////////////////////////////////////////////////////

declare type GmailPageType =
    'sent' | 'inbox' | 'starred' | 'drafts' | 'imp' | 'chats' | 'all' | 'spam'
    | 'trash' | 'settings' | 'label' | 'category' | 'circle' | 'search';

/**
   First element is name. Second element is smtp-address.
   */
declare type GmailEmailAddress = string[];

declare type GmailDomComposeRecipients = {
    to: string[];
    cc: string[];
    bcc: string[];
}

declare type GmailAttachmentDetails = {
    attachment_id: string,
    name: string,
    type: string,
    size: number,
    url: string
};

declare type GmailEmailDetails = {
    is_deleted: boolean,
    reply_to: string,
    reply_to_id: string,
    from: string,
    from_email: string,
    timestamp: number,
    datetime: string,
    attachments: string[],
    attachments_details: GmailAttachmentDetails[],
    subject: string,
    content_html: string,
    content_plain: string,
    to: string[],
    cc: string[],
    bcc: string[]
};

declare type GmailEmailData = {
    thread_id: string,
    first_email: string,
    last_email: string,
    total_emails: number,
    total_threads: string[],
    people_involved: GmailEmailAddress[];
    subject: string;
    threads: {
        [id: string]: GmailEmailDetails
    };
};

declare type GmailLastActive = {
    time: string,
    ip: string,
    mac_address: string,
    time_relative: string
};

declare type GmailLoggedInAccount = {
    name: string,
    email: string,
    index: number
};

declare type GmailStorageInfo = {
    used: string,
    total: string,
    percent: number
};

interface GmailGet {
    /**
       Gets user's account activity data
    */
    last_active(): GmailLastActive;

    /**
       Returns a list of signed-in accounts (multiple user accounts
       setup in gmail)
     */
    loggedin_accounts(): GmailLoggedInAccount[];

    /**
       Returns the current user's email address
     */
    user_email(): string;
    /**
       Returns the email address of the user currently managing the
       account (if the inbox is used by the owner, this function
       returns the same value as gmail.get.user_email())
     */
    manager_email(): string;
    /**
       Returns the email address of the user the account is currently
       delegated to (if the inbox is used by the owner, this function
       returns null)
     */
    delegated_to_email(): string;
    /**
       Returns the Gmail localization, e.g. 'US'.
     */
    localization(): string;

    /**
       Returns current user's file storage stats
     */
    storage_info(): GmailStorageInfo;

    email_ids(): string[];
    /**
       Returns the latest/last email id of emails that have been saved
       as drafts (currently open)
     */
    compose_ids(): string[];
    /**
       Gets current email-thread's ID
     */
    thread_id(): string;
    /**
       Gets current email-thread's ID
     */
    email_id(): string;
    /**
       Returns the opened email's subject from the DOM
    */
    email_subject(): string;
    /**
       Returns the search bar data
     */
    search_query(): string;
    unread_inbox_emails(): number;
    unread_draft_emails(): number;
    unread_spam_emails(): number;
    unread_forum_emails(): number;
    unread_update_emails(): number;
    unread_promotion_emails(): number;
    unread_social_emails(): number;
    /**
       Although hand picked, this method returns the checks on beta
       features and deployments
    */
    beta(): { [feature: string]: boolean; };
    /**
       Returns a count of total unread emails for the current account.

       You can also request the data individually using:

       gmail.get.unread_inbox_emails()
       gmail.get.unread_draft_emails()
       gmail.get.unread_spam_emails()
       gmail.get.unread_forum_emails()
       gmail.get.unread_update_emails()
       gmail.get.unread_promotion_emails()
       gmail.get.unread_social_emails()
     */
    unread_emails(): {
        inbox: boolean;
        drafts: boolean;
        spam: boolean;
        forum: boolean;
        update: boolean;
        promotions: boolean;
        social: boolean;
    };

    /**
       Returns a list of emails from the server that are currently
       visible in the inbox view.  The data does not come from the DOM
     */
    visible_emails(): string[];
    /**
       Does the same as visible_emails, but with a callback instead.
     */
    visible_emails_async(callback: (emails: string[]) => void): void;
    /**
       Returns a list of object representation from emails that are
       currently selected in the inbox view.  The data does not come
       from the DOM
    */
    selected_emails_data(): GmailEmailData[];
    /**
       Returns what page of gmail the user is currently on.
     */
    current_page(): GmailPageType;
    /**
       Returns an object representation of the opened email contents
       and metadata. It takes the optional thread_id parameter where
       the data for the specified id is returned instead of the email
       currently visible in the dom.

       thread_id is added for updated gmail thread behaviour which adds
       support for emails created in inbox. first_email remains as the first
       message in the thread.
     */
    email_data(thread_id?: string): GmailEmailData;
    /**
       Does the same as email_data but accepts a callback function
    */
    email_data_async(email_id: string, callback: (email_data: GmailEmailData) => void): void;
    /**
       Deprecated function. Migrate to `email_source_async` or `email_source_promise`!
    */
    email_source(identifier: GmailEmailIdentifier): string;
    /**
       Retrieves raw MIME message source from the gmail server for the
       specified email id. It takes the optional email_id parameter
       where the data for the specified id is returned instead of the
       email currently visible in the dom.

       The `callback` is invoked with the resulting data in either
       string or binary format depending on the value of the
       `preferBinary`-parameter.
    */
    email_source_async(identifier: GmailEmailIdentifier, callback: (email_source: string | Uint8Array) => void, error_callback?: (jqxhr: JQueryXHR, textStatus: string, errorThrown: string) => void, preferBinary?: boolean): void;
    /**
       Does the same as email_source_async, but uses ES6 promises.
    */
    email_source_promise(identifier: GmailEmailIdentifier): Promise<string>;
    email_source_promise(identifier: GmailEmailIdentifier, preferBinary: boolean): Promise<Uint8Array>;
    /**
     Retrieves the a email/thread data from the server that is currently
     visible.  The data does not come from the DOM.
     */
    displayed_email_data(): GmailEmailData;
    /**
     Does the same as displayed_email_data, but with a callback instead.
     */
    displayed_email_data_async(callback: (gmailEmailData: GmailEmailData) => void): void;

}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.check
//
////////////////////////////////////////////////////////////////////////////////

interface GmailCheck {
    /**
       Returns True if the user is running Gmail with the new 2018 data-layer
     */
    is_new_data_layer(): boolean;
    /**
       Returns True if the user is running Gmail with the new 2018 GUI
     */
    is_new_gui(): boolean;
    /**
       Returns True if the compose UI uses new UI as announced [here](https://workspaceupdates.googleblog.com/2021/10/visual-updates-for-composing-email-in-gmail.html)
    */
    is_peoplekit_compose(composeElement: JQuery | HTMLElement): boolean;
    /**
       Returns True if the conversation is threaded False otherwise
     */
    is_thread(): boolean;
    /**
       Returns True if gmail is in split pane mode (vertical or
       horizontal) False otherwise
     */
    is_preview_pane(): boolean;
    /**
       Returns True if user has multiple inbox lab enabled, False otherwise
     */
    is_multiple_inbox(): boolean;
    /**
       Returns True if the pane split mode is horiontal False otherwise
     */
    is_horizontal_split(): boolean;
    /**
       Returns True if the pane mode is vertical False otherwise
     */
    is_vertical_split(): boolean;
    /**
       Returns True if tabbed inbox view is enabled False otherwise
     */
    is_tabbed_inbox(): boolean;
    /**
       Returns True if chat is on the right sidebar False otherwise
     */
    is_right_side_chat(): boolean;
    /**
       Returns True if compose is in fullscreen mode False otherwise
     */
    should_compose_fullscreen(): boolean;
    /**
       Returns True if the current user is google apps user (email not
       ending in gmail.com) False otherwise
       gmail.check.is_inside_email()
     */
    is_google_apps_user(): boolean;
    /**
       Returns True if you are currently inside an email conversation
       False otherwise
     */
    is_inside_email(): boolean;
    /**
       Returns True if compose is in plain text mode, False if in rich
       text mode
     */
    is_plain_text(): boolean;
    /**
       Returns True if priority inbox is enabled False otherwise
     */
    is_priority_inbox(): boolean;
    /**
       Returns True if rapportive chrome extension is installed False
       otherwise
     */
    is_rapportive_installed(): boolean;
    /**
       Returns True if streak chrome extension is installed False
       otherwise
     */
    is_streak_installed(): boolean;
    /**
       Returns True if any.do chrome extension is installed False
       otherwise
     */
    is_anydo_installed(): boolean;
    /**
       Returns True if boomerang chrome extension is installed False
       otherwise
     */
    is_boomerang_installed(): boolean;
    /**
       Returns True if xobni chrome extension is installed False
       otherwise
     */
    is_xobni_installed(): boolean;
    /**
       Returns True if Signal chrome extension is installed False
       otherwise
     */
    is_signal_installed(): boolean;
    /**
       Returns True if user has enabled mail action shortcuts, False
       otherwise
     */
    are_shortcuts_enabled(): boolean;
    /**
       Returns True if emails are displayed as threads, False
       otherwise (i.e. displayed individually)
     */
    is_conversation_view(): boolean;

    data: {
        is_email_id(email_id: string): boolean;
        is_thread_id(email_id: string): boolean;
        is_legacy_email_id(email_id: string): boolean;
    }
}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.dom
//
////////////////////////////////////////////////////////////////////////////////

interface GmailDomEmailEntry {
    el?: JQuery,
    email: string,
    name: string
}

declare type GmailDomThreadLookup = "opened_email" | "subject" | "labels";

interface GmailDomThread {
    $el: JQuery,
    /**
       Retrieve preconfigured dom elements for this email
    */
    dom(lookup?: GmailDomThreadLookup): JQuery,
}

interface GmailDomAttachment {
    $el: JQuery,
    type?: string,
    name: string,
    size: string,
    url?: string
}

declare type GmailDomEmailLookup =
    "body" | "from" | "to" | "to_wrapper" | "timestamp" | "star"
    | "reply_button" | "menu_button" | "details_button" | "attachments";

interface GmailDomEmail {
    $el: JQuery,
    id: string,
    id_element: JQuery,
    /**
       Get/Set the full email body as it sits in the DOM
       If you want the actual DOM element use .dom('body');
       Note: This gets & sets the body html after it has been parsed & marked up by GMAIL. To retrieve it as it exists in the email message source, use a call to .data();
    */
    body(body?: string): string;
    /**
       Get/Set the sender
       Optionally receives email and name properties. If received updates the values in the DOM
       Returns an object containing email & name of the sender and dom element
    */
    from(email?: string, name?: string): GmailDomEmailEntry;
    /**
       Get/Set who the email is showing as To
       Optionally receives an object containing email and/or name properties. If received updates the values in the DOM.
       Optionally receives an array of these objects if multiple recipients
       Returns an array of objects containing email & name of who is showing in the DOM as the email is to
    */
    to(to_array: GmailDomEmailEntry | GmailDomEmailEntry[]): GmailDomEmailEntry[];
    /**
       Retries the DOM elements which represents the emails attachments
       Returns undefined if UI-elements are not yet ready for parsing.
       */
    attachments(): GmailDomAttachment[];
    /**
       Retrieve relevant email from the Gmail servers for this email
       Makes use of the gmail.get.email_data() method
       Returns an object
    */
    data(): GmailEmailData,
    /**
       Retrieve email source for this email from the Gmail servers
       Makes use of the gmail.get.email_source() method
       Returns string of email raw source
    */
    source(): string,
    /**
      Retrieve preconfigured dom elements for this email
     */
    dom(lookup?: GmailDomEmailLookup): JQuery;
    /**
       An object for interacting with an email currently present in the DOM. Represents a conversation thread
       Provides a number of methods and properties to access & interact with it
       Expects a jQuery DOM element for the thread wrapper div (div.if as returned by the 'view_thread' observer)
    */
    thread(element: JQuery): GmailDomThread;
}

declare type GmailDomComposeLookup =
    'to' | 'cc' | 'bcc' | 'id' | 'draft' | 'subject' | 'subjectbox'
    | 'all_subjects' | 'body' | 'quoted_reply' | 'reply' | 'forward' | 'from' | 'send_button' | 'show_cc' | 'show_bcc';

interface GmailMessageRow {
    summary: string;
    from: {
        name: string,
        email: string,
    };
    $el: JQuery;
    thread_id: string;
    legacy_email_id: string | undefined;
}

interface GmailDomCompose {
    $el: JQuery,
    /**
       Retrieve the compose id
    */
    id(): string,
    /**
       Retrieve the draft email id
    */
    email_id(): string,
    /**
       Retrieve the draft email id
    */
    thread_id(): string
    /**
       Is this compose instance inline (as with reply & forwards) or a popup (as with a new compose)
    */
    is_inline(): boolean,
    /**
        Compose type - reply / forward / compose (new)
     */
    type(): GmailComposeType,
    /**
       Retrieves to, cc, bcc and returns them in a hash of arrays
       Parameters:
       options.type  string  to, cc, or bcc to check a specific one
       options.flat  boolean if true will just return an array of all recipients instead of splitting out into to, cc, and bcc
    */
    recipients(options?: { type: 'to' | 'cc' | 'bcc' }): GmailDomComposeRecipients;
    recipients(options?: { flat: boolean }): string[];
    /**
       Retrieve the typing area for "to" recipients, not recipients.
       Either textarea or input, which can be empty if last recipient are typed and selected (by pressing ENTER)
     */
    to(to?: string): JQuery;
    /**
       Retrieve the typing area for "cc" recipients, not recipients.
       Either textarea or input, which can be empty if last recipient are typed and selected (by pressing ENTER)
     */
    cc(cc?: string): JQuery;
    /**
       Retrieve the typing area for "bcc" recipients, not recipients.
       Either textarea or input, which can be empty if last recipient are typed and selected (by pressing ENTER)
     */
    bcc(bcc?: string): JQuery;
    /**
       Get/Set the current subject
       Parameters:
       subject   string  set as new subject
    */
    subject(subject?: string): string;
    /**
       Get the from email
       if user only has one email account they can send from, returns that email address
    */
    from(): string;
    /**
       Get/Set the email html body
    */
    body(body?: string): string;
    /**
       Get the email attachments
    */
    attachments(): GmailDomAttachment[];
    /**
       Triggers the same action as clicking the "send" button would do.
    */
    send(): void;
    /**
       Map find through to jquery element
    */
    find(selector: string): JQuery;
    /**
       Close compose window
    */
    close(): void;
    /**
       Retrieve preconfigured dom elements for this compose window
    */
    dom(lookup?: GmailDomComposeLookup): JQuery;
}

interface GmailDom {
    /**
      * Gets a jQuery object representing the inbox contents.
      */
    inbox_content(): JQuery;
    /**
      * Gets a jQuery object representing the inbox contents.
      */
    inboxes(): JQuery;
    /**
      * Gets a jQuery object representing the inboxes.
      */
    email_subject(): JQuery;
    /**
      * Gets a jQuery object representing the email-subject.
      */
    email_body(): JQuery;
    /**
      * Gets the DOM element representing the email body.
     */
    toolbar(): HTMLElement[];
    /**
      * Gets a jQuery object representing the toolbar.
      */
    email_contents(): HTMLElement[];
    /**
      * Gets a jQuery object representing the email contents.
      */
    get_left_sidebar_links(): JQuery;
    /**
      * Gets a jQuery object representing the main header.
      */
    header(): JQuery;
    /**
      * Gets a jQuery object representing the Search input from main header.
      */
    search_bar(): JQuery;
    /**
      * Get's all the visible email threads in the current folder.
      */
    visible_messages(): GmailMessageRow[];
    /**
      * Returns all known compose DOM elements.
      */
    composes(): GmailDomCompose[];
    /**
       A compose object. Represents a compose window in the DOM and provides a bunch of methods and properties to access & interact with the window
       Expects a jQuery DOM element for the compose div
    */
    compose(element: JQuery | HTMLElement | string): GmailDomCompose;
    /**
       An object for interacting with an email currently present in the DOM. Represents an individual email message within a thread
       Provides a number of methods and properties to access & interact with it
       Expects a jQuery DOM element for the email div (div.adn as returned by the 'view_email' observer), or an email_id
    */
    email(element: string | HTMLElement | JQuery): GmailDomEmail;
    /**
       An object for interacting with an email currently present in the DOM. Represents a conversation thread
       Provides a number of methods and properties to access & interact with it
       Expects a jQuery DOM element for the thread wrapper div (div.if as returned by the 'view_thread' observer)
    */
    thread(element: JQuery): GmailDomThread;
}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.tools
//
////////////////////////////////////////////////////////////////////////////////

declare type GmailHttpRequestMethod = "GET" | "POST";

interface GmailTools {
    error(str: string): void;
    parse_url(url: string): StringDict;
    sleep(milliseconds: number): void;
    multitry(delay: number, tries: number, func: Function, check: Function, counter?: number, retval?: any): any;
    deparam(params: string, coerce: boolean): StringDict;
    parse_actions(params: any, xhr: XMLHttpRequest): {};
    parse_response(response: any): any[];
    parse_request(params: any, xhr: XMLHttpRequest): {};
    xhr_watcher(): any;
    /**
       observes every element inserted into the DOM by Gmail and looks at the classes on those elements,
       checking for any configured observers related to those classes
    */
    insertion_observer(target: HTMLElement | string, dom_observers: { [observer: string]: DomObserverConfig }, dom_observer_map: { [className: string]: string[] }, sub?: string): void;

    make_request(link: string, method: GmailHttpRequestMethod, disable_cache: boolean): string;
    make_request_async(link: string, method: GmailHttpRequestMethod, callback: (data: string) => void, disable_cache: boolean): void;

    /**
       Creates a request to download user-content from Gmail.
       This can be used to download email_source or attachments.

       Set `preferBinary` to receive data as an Uint8Array which is unaffected
       by string-parsing or resolving of text-encoding.

       This is required in order to correctly download attachments!
    */
    make_request_download_promise(link: string, preferBinary?: boolean): Promise<string> | Promise<Uint8Array>;
    parse_view_data(view_data: any[]): any[];
    /**
       Adds the yellow info box on top of gmail with the given message
    */
    infobox(message: string, time?: number, html?: string): void;
    /**
     * Re-renders the UI using the available data.
     *
     * This method does _not_ cause Gmail to fetch new data. This method is useful
     * in circumstances where Gmail has data available but does not immediately
     * render it. `observe.after` may be used to detect when Gmail has fetched the
     * relevant data. For instance, to refresh a conversation after Gmail fetches
     * its data:
     *
     *     gmail.observe.after('refresh', function(url, body, data, xhr) {
     *       if (url.view === 'cv') {
     *         gmail.tools.rerender();
     *       }
     *     });
     *
     * If a callback is passed, it will be invoked after re-rendering is complete.
     */
    rerender(callback?: Function): void;
    get_reply_to(ms13: any[]): string[] | null;
    parse_email_data(email_data: any): GmailEmailData;
    extract_email_address(str: string): string;
    extract_name(str: string): string;
    i18n(label: string): string;
    add_toolbar_button(content_html: string, onClickFunction: Function, styleClass: string): JQuery;
    add_right_toolbar_button(content_html: string, onClickFunction: Function, styleClass: string): JQuery;
    add_compose_button(composeWindow: GmailDomCompose, content_html: string, onClickFunction: Function, styleClass?: string): JQuery;
    add_more_send_option(
        composeWindow: GmailDomCompose,
        buttonText: string,
        onClickFunction: Function,
        styleClass?: string | undefined,
        imgClass?: string | undefined
    ): JQuery;
    /**
       adds a button to an email attachment.

       'attachment'-parameter must be the object returned from api.dom.email().attachments().
       'contentHtml' should represent a 21x21 image of some kind. optional.
       'customCssClass' styling used on the buttons central area. optional.
       'tooltip' will be shown on hover.

       return-value is jQuery-instance representing the created button.
    */
    add_attachment_button(attachment: GmailDomAttachment, contentHtml: string | null, customCssClas: string | null, tooltip: string, onClickFunction: Function): JQuery;

    remove_modal_window(): void;
    add_modal_window(title: string, content_html: string, onClickOk: Function, onClickCancel?: Function, onClickClose?: Function, okText?: string, cancelText?: string): void;
    /**
     * Show/Hide compose window
     */
    toggle_minimize(): void;

}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.observe
//
////////////////////////////////////////////////////////////////////////////////

declare type GmailComposeType = "reply" | "forward" | "compose";
declare type GmailBindType = 'on' | 'before' | 'after';
declare type GmailBindAction =
    'http_event' | 'unread' | 'read' | 'delete' | 'mark_as_spam' | 'mark_as_not_spam'
    | 'label' | 'archive' | 'move_to_inbox' | 'delete_forver' | 'delete_message_in_thread'
    | 'restore_message_in_thread' | 'star' | 'unstar' | 'mark_as_important' | "load"
    | 'mark_as_not_important' | 'filter_messages_like_these' | 'mute' | 'unmute'
    | 'add_to_tasks' | 'move_label' | 'save_draft' | 'discard_draft' | 'send_message' | 'send_scheduled_message'
    | 'expand_categories' | 'delete_label' | 'show_newly_arrived_message' | 'poll'
    | 'new_email' | 'refresh' | 'open_email' | 'upload_attachment' | 'compose'
    | 'compose_cancelled' | 'recipient_change' | 'view_thread' | 'view_email'
    | 'load_email_menu';
declare type GmailDomObserver =
    'view_thread' | 'view_email' | 'load_email_menu' | 'recipient_change' | 'compose'

interface HttpEventRequestParams {
    url: object,
    url_raw: string;
    body: string;
    body_params: object;
    method: string;
}

interface DomObserverConfig {
    class: string | string[];
    selector?: string;
    sub_selector?: string;
    handler?: Function;
}

interface GmailObserve<T extends string = never> {
    /**
       After an observer has been bound through gmail.observe.bind() (via a
       call to events gmail.observe.before(), gmail.observe.on(), or
       gmail.observe.after()), this method keeps track of the last 50 http
       events. The items contain the sent requested parameterized data
    */
    http_requests(): {}[];
    /**
       Similar to gmail.observe.http_requests() this keeps track of
       the last 10 gmail actions (vs all http requests). Actions here
       correspond to things like clicking refres, archiving, deleting,
       starring etc.
     */
    actions(): {}[];
    /**
       Bind a specified callback to an array of callbacks against a specified type & action
    */
    bind(type: GmailBindType, action: GmailBindAction | T, callback: Function): void;

    /**
      an on event is observed just after gmail sends an xhr request
    */
    on(action: "view_thread", callback: (obj: GmailDomThread) => void): void;
    on(action: "view_email", callback: (obj: GmailDomEmail) => void): void;
    on(action: "load_email_menu", callback: (obj: JQuery) => void): void;
    on(action: "compose", callback: (obj: GmailDomCompose, type: GmailComposeType) => void): void;
    on(action: "load", callback: () => void): void;
    on(action: "http_event", callback: (request: HttpEventRequestParams, xhr: XMLHttpRequest) => void): void;
    /**
       This is the key feature of gmail.js. This method allows you to
       add triggers to all of these actions so you can build your
       custom extension/tool with this library.

       You simply specify the action name and your function that the
       method will return data to when the actions are triggered and
       it does the rest. You can have multiple triggers

       Your callback will be fired directly after Gmail's XMLHttpRequest
       has been sent off the the Gmail servers.
    */
    on(action: GmailBindAction | T, callback: Function, response_callback?: Function): void;
    /**
      an before event is observed just prior to the gmail xhr request being sent
      before events have the ability to modify the xhr request before it is sent
     */
    before(action: GmailBindAction | T, callback: Function): void;
    /**
      an after event is observed when the gmail xhr request returns from the server
      with the server response
    */
    after(action: "send_message", callback: (url: string, body: string, data: any, response: any, xhr: XMLHttpRequest) => void): void;
    after(action: "http_event", callback: (request: HttpEventRequestParams, responseData: any, xhr: XMLHttpRequest) => void): void;
    after(action: GmailBindAction | T, callback: Function): void;
    /**
      Checks if a specified action & type has anything bound to it
      If type is null, will check for this action bound on any type
      If action is null, will check for any actions bound to a type
     */
    bound(action: GmailBindAction | T, type: GmailBindType): boolean;
    /**
      Clear all callbacks for a specific type (before, on, after, dom) and action
      If action is null, all actions will be cleared
      If type is null, all types will be cleared
     */
    off(action: GmailBindAction | T, type: GmailBindType): void;
    /**
      Trigger any specified events bound to the passed type
      Returns true or false depending if any events were fired
     */
    trigger(type: GmailBindType, events: { [action in GmailBindAction | T]?: any[] }, xhr: XMLHttpRequest): boolean;
    /**
      Trigger any specified DOM events passing a specified element & optional handler
     */
    trigger_dom(observer: GmailDomObserver | T, element: HTMLElement, handler?: Function): void;

    initialize_dom_observers(): void;

    /**
      Allow an application to register a custom DOM observer specific to their app.
      Adds it to the configured DOM observers and is supported by the dom insertion observer
      This method can be called two different ways:
      Args:
        action - the name of the new DOM observer
        className / args - for a simple observer, this arg can simply be the class on an inserted DOM element that identifies this event should be
          triggered. For a more complicated observer, this can be an object containing properties for each of the supported DOM observer config arguments
     */
    register(action: T, args: string | DomObserverConfig): void;
    /**
      Observe DOM nodes being inserted. When a node with a class defined in api.tracker.dom_observers is inserted,
      trigger the related event and fire off any relevant bound callbacks
      This function should return true if a dom observer is found for the specified action
     */
    on_dom(action: GmailBindAction | T, callback: Function): boolean;
}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.helper
//
////////////////////////////////////////////////////////////////////////////////

type GmailEmailIdentifier = string | GmailNewEmailData | GmailDomEmail | HTMLElement;
type GmailThreadIdentifier = string | GmailNewEmailData | GmailDomEmail | GmailDomThread;

interface GmailHelper {
    /**
     * Dispatch mousedown and mouseup event on passed element
     */
    trigger_mouse_click(element: HTMLElement): boolean;
    clean_thread_id(thread_id: string): string;

    get: {
        is_delegated_inbox(): boolean;
        visible_emails_pre(): string;
        visible_emails_post(get_data?: string): string[];
        email_data_pre(email_id?: string): string;
        email_data_post(get_data: string): GmailEmailData;
        email_source_pre(email_id?: string): string;
        email_legacy_id(identifier: GmailEmailIdentifier): string | null;
        email_new_id(identifier: GmailEmailIdentifier): string | null;
        thread_id(identifier: GmailThreadIdentifier): string | null;
    }
}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.chat
//
////////////////////////////////////////////////////////////////////////////////

interface GmailChat {
    /**
       Returns True if the account supports the new hangout UI for
       chat False otherwise (native chat window)
     */
    is_hangouts(): boolean | undefined;
}


////////////////////////////////////////////////////////////////////////////////
//
// gmail.compose
//
////////////////////////////////////////////////////////////////////////////////

interface GmailCompose {
    /**
     * Show a compose window
     * (Clicks on the compose button making the inbox compose view to popup)
     */
    start_compose(): boolean;
}

////////////////////////////////////////////////////////////////////////////////
//
// gmail.new.* - new gmail only!
//
////////////////////////////////////////////////////////////////////////////////

interface GmailNewEmailAddress {
    name: string;
    address: string;
}

interface GmailNewEmailData {
    id: string;
    legacy_email_id: string;
    thread_id: string;
    smtp_id: string;
    is_draft: boolean,
    subject: string;
    timestamp: number;
    date: Date;
    from: GmailNewEmailAddress;
    to: GmailNewEmailAddress[];
    cc: GmailNewEmailAddress[];
    bcc: GmailNewEmailAddress[];
    attachments: GmailAttachmentDetails[];
    content_html: string;
    $email_node?: any;
    $thread_node?: any;
}

interface GmailSentEmailData {
    1: string;
    id: string;
    subject: string;
    timestamp: number;
    date: Date;
    from: GmailNewEmailAddress;
    to: GmailNewEmailAddress[];
    cc: GmailNewEmailAddress[];
    bcc: GmailNewEmailAddress[];
    attachments: GmailAttachmentDetails[];
    content_html: string;
    ishtml: boolean;
    $email_node?: any;
}

interface GmailNewThreadData {
    thread_id: string;
    emails: GmailNewEmailData[];
}

interface GmailNewGet {
    /**
     * Returns the new-style email_id of the latest email visible in the DOM,
     * or for the provided email-node if provided.
     *
     * @param emailElem: Node to extract email-id from or DomEmail. Optional.
     */
    email_id(emailElem?: HTMLElement | GmailDomEmail): string;
    /**
     * Returns the new-style thread_id of the current thread visible in the DOM.
     */
    thread_id(): string;
    /**
     * Returns available information about a specific email.
     *
     * @param email_id: new style email id. Legacy IDs not supported. If empty, default to latest in view.
     */
    email_data(identifier?: GmailEmailIdentifier): GmailNewEmailData | null;
    /**
     * Returns available information about a specific thread.
     *
     * @param thread_id: new style thread id. Legacy IDs not supported. If empty, default to current.
     */
    thread_data(identifier?: GmailThreadIdentifier): GmailNewThreadData | null;
}

interface GmailNew {
    get: GmailNewGet;
}

interface GmailCache {
    debug_xhr_fetch: boolean;
    emailIdCache: { (emailId: string): GmailNewEmailData };
    emailLegacyIdCache: { (legacyEmailId: string): GmailNewEmailData };
    threadCache: { (threadId: string): GmailNewThreadData };
}

////////////////////////////////////////////////////////////////////////////////
//
// actual gmail-class
//
////////////////////////////////////////////////////////////////////////////////

declare class Gmail<T extends string = never> {
    constructor(localJQuery: JQueryStatic | false);

    version: string;
    /**
       These are some of the variables that are tracked and kept in
       memory while the rest of the methods are in use.
     */
    tracker: GmailTracker<T>;
    get: GmailGet;
    check: GmailCheck;
    /**
       These methods return the DOM data itself
     */
    dom: GmailDom;
    /**
       These are some helper functions that the rest of the methods
       use. See source for input params
     */
    tools: GmailTools;
    observe: GmailObserve<T>;
    helper: GmailHelper;
    chat: GmailChat;
    compose: GmailCompose;

    /** Methods for new gmail only! */
    new: GmailNew;
    old: {
        get: GmailGet;
    };

    cache: GmailCache;
}
