import React from 'react'
import PropTypes from 'prop-types';

const Error = ({mensaje}) => {
    return (
    <p className="red dark-4 error">{mensaje}</p>
    )
}

Error.protoTypes = {
    mensaje: PropTypes.string.isRequired,
}
export default Error
