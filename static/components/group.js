import React from 'react';
import {connect} from 'react-redux';

const Group = ({children}) => {
    const onClick = () => {
        console.log('execute group')
        for (let child in children) {
            let sub = child.props.execute;
            sub && sub();
        }
    }

    return (
        <a href="javascript:void(0)" onClick={onClick}>
            {children}
        </a>
    );
}

export default connect()(Group)