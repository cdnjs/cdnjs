export declare enum UpdateErrorType {
    UnauthorizedAction = "update/unauthorized_action",
    MatchNotFound = "update/match_not_found",
    PatchFailed = "update/patch_failed"
}
export declare enum ActionErrorType {
    StaleStateId = "action/stale_state_id",
    UnavailableMove = "action/unavailable_move",
    InvalidMove = "action/invalid_move",
    InactivePlayer = "action/inactive_player",
    GameOver = "action/gameover",
    ActionDisabled = "action/action_disabled",
    ActionInvalid = "action/action_invalid",
    PluginActionInvalid = "action/plugin_invalid"
}
