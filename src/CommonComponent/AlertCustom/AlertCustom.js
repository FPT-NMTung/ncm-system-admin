import React from 'react';
import { Alert} from 'antd';

const AlertCustom = (props) => {
    return (
        <Alert 
            message={props.message}
            type={props.type}
            showIcon
            closable
            afterClose={props.onClose}
        />
    );
};

export default AlertCustom;
