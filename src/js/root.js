import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import { Button } from 'antd';
import PCIndex from './components/pc_index';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component{
  render(){
    return (
      <div>
        {/* <MediaQuery query='(min-device-width:1224px)'> */}
          <PCIndex/>
        {/* </MediaQuery> */}
        {/* <MediaQuery query='(min-device-width:1224px)'>
          <PCIndex/>
        </MediaQuery> */}
    </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
