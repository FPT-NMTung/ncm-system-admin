import React from 'react';
import { AutoComplete } from 'antd';

const AutoCompleteCustom = (props) => {
    return (
            <AutoComplete
                style={props.style}
                allowClear={props.allowClear}
                backfill
                notFoundContent={props.notFoundContent}
                options={props.listUser}
                placeholder={props.placeholder}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={props.onSelect}
                onClear={props.onClear}
                status={props.status}
                disabled={props.disabled}
            />
    );
};

export default AutoCompleteCustom;
