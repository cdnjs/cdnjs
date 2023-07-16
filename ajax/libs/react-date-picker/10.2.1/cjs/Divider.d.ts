import React from 'react';
import PropTypes from 'prop-types';
type DividerProps = {
    children: React.ReactNode;
};
declare function Divider({ children }: DividerProps): JSX.Element;
declare namespace Divider {
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
}
export default Divider;
