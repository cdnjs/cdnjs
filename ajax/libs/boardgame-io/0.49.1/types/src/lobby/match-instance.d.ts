import React from 'react';
import type { LobbyAPI } from '../types';
export declare type MatchOpts = {
    numPlayers: number;
    matchID: string;
    playerID?: string;
};
declare type Match = {
    gameName: string;
    matchID: string;
    players: LobbyAPI.Match['players'];
};
declare type MatchInstanceProps = {
    match: Match;
    playerName: string;
    onClickJoin: (gameName: string, matchID: string, playerID: string) => void;
    onClickLeave: (gameName: string, matchID: string) => void;
    onClickPlay: (gameName: string, matchOpts: MatchOpts) => void;
};
declare class LobbyMatchInstance extends React.Component<MatchInstanceProps> {
    _createSeat: (player: {
        name?: string;
    }) => string;
    _createButtonJoin: (inst: Match, seatId: number) => JSX.Element;
    _createButtonLeave: (inst: Match) => JSX.Element;
    _createButtonPlay: (inst: Match, seatId: number) => JSX.Element;
    _createButtonSpectate: (inst: Match) => JSX.Element;
    _createInstanceButtons: (inst: Match) => JSX.Element;
    render(): JSX.Element;
}
export default LobbyMatchInstance;
