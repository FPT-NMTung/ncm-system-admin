import React, { Component } from 'react';
import { AutoComplete } from 'antd';

const AutoCompleteCustomer = ({listUser}) => {
    return (
        <div className="my-select-container">
            <AutoComplete 
            style={{ width: 200 }} 
            options={listUser}
            placeholder="Input email"
            filterOption={(inputValue, option) =>
                option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
        </div>
    );
};

export default AutoCompleteCustomer;
