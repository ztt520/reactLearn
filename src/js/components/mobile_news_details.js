import React from 'react';
import {Row,Col, BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';

export default class PCNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};
  	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
  };
  createMarkup(){
    return {__html: this.state.newsItem.pagecontent};
  };
	render() {
		return (
			<div id="mobileDetailsContainer">
				<MobileHeader></MobileHeader>
				 <Row>
           <Col span={2}></Col>
           <Col span={14} className="container">
            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<hr/>
						<CommonComments uniquekey={this.props.params.uniquekey}/>
					 </Col>
           <Col span={6}>
					 <PCNewsImageBlock count={20} type="guoji" width="100%" cartTitle="相关新闻" imageWidth="112px"/>					
					 </Col>
           <Col span={2}></Col>
         </Row>
				 <BackTop />
				<MobileFooter></MobileFooter>
			</div>
		);
	};
}
