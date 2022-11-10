import React from 'react';
import type { Game } from '../types';
import type { GameComponent } from './connection';
declare type CreateMatchProps = {
    games: GameComponent[];
    createMatch: (gameName: string, numPlayers: number) => Promise<void>;
};
declare type CreateMatchState = {
    selectedGame: number;
    numPlayers: number;
};
declare class LobbyCreateMatchForm extends React.Component<CreateMatchProps, CreateMatchState> {
    state: {
        selectedGame: number;
        numPlayers: number;
    };
    constructor(props: CreateMatchProps);
    _createGameNameOption: (game: GameComponent, idx: number) => JSX.Element;
    _createNumPlayersOption: (idx: number) => JSX.Element;
    _createNumPlayersRange: (game: Game) => number[];
    render(): JSX.Element;
    onChangeNumPlayers: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeSelectedGame: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onClickCreate: () => void;
}
export default LobbyCreateMatchForm;
