import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import svgConfig from './assets/svg/svg';

const Menu = lazy(svgConfig.menu);

function SvgGraphics(props) {
    const { iconType } = props;

    const switchFunction = () => {
        switch (iconType) {
            case 'menu': {
                return <Menu />;
            }
            default:
                return null;
        }
    };

    return <Suspense fallback={<div />}>{switchFunction()}</Suspense>;

}

SvgGraphics.defaultProps = {
    className: '',
    style: {},
};

SvgGraphics.propTypes = {
    iconType: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default SvgGraphics;
