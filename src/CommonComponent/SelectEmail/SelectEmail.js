import React from 'react';
import { Select } from 'antd';

const SelectEmail = (props) => {
    return (
        <Select
            style={props.style}
            showSearch
            notFoundContent={props.notFoundContent}
            value={props.value}
            options={props.listItem}
            placeholder={props.placeholder}
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={props.onSelect}
            onChange={props.onChange}       
            status={props.status}
            disabled={props.disabled}
        />
    );
};

export default SelectEmail;
