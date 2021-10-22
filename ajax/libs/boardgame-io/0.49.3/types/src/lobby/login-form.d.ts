import React from 'react';
declare type LoginFormProps = {
    playerName?: string;
    onEnter: (playerName: string) => void;
};
declare type LoginFormState = {
    playerName?: string;
    nameErrorMsg: string;
};
declare class LobbyLoginForm extends React.Component<LoginFormProps, LoginFormState> {
    static defaultProps: {
        playerName: string;
    };
    state: {
        playerName: string;
        nameErrorMsg: string;
    };
    render(): JSX.Element;
    onClickEnter: () => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onChangePlayerName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default LobbyLoginForm;
