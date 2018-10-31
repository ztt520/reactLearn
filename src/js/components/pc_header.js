import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  }
  // 显示模态框
  setModalVisible(value){
    this.setState({modalVisible:value});
  };
  // 导航栏点击事件
  handleClick(e){
    console.log(e.key)
    if (e.key == "register") {
      this.setState({current:'register'});
      this.setModalVisible(true);
    } else {
      this.setState({current:e.key});
    }
  };
  // 注册表单提交
  handleSubmit(e){
    console.log(1111111)
    // 页面向api进行提交数据
    e.preventDefault();
    var myFetchOptions = {
      method:'GET'
    }
    var formData = this.props.form.getFieldsValue();
    console.log(formData)
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+ this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName +
    "&r_password=" + formData.r_password + "&r_confirmPassword=" +
    formData.r_confirmPassword, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({userNickName:json.NickName,userid:json.UserId});
    });
    message.success("请求成功！");
    this.setModalVisible(false);

  };
  render() {
    let  {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined
    ? 
    <Menu.Item key="logout" class="register">
      <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
      &nbsp;&nbsp;
      <Link target="_blank">
      <Button type="dashed" htmlType="button">个人中心</Button>
      &nbsp;&nbsp;
      <Button type="ghost" htmlType="button">退出</Button>
      </Link>
    </Menu.Item>
    :
    <Menu.Item key="register" class="register">
      <Icon type="appstore" />注册/登录
    </Menu.Item>
    return (
      <div>
        <header>
          <Row>
            <Col span={2}></Col>
            <Col span={4}>
              <a href="/" class="logo">
                <img src="./src/images/logo.png" />
                <span>reactNews</span>
              </a>
            </Col>
            <Col span={16}>
              <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="top">
                  <Icon type="book" />头条
                </Menu.Item>
                <Menu.Item key="shehui">
                  <Icon type="appstore" />社会
                </Menu.Item>
                <Menu.Item key="guonei">
                  <Icon type="appstore" />国内
                </Menu.Item>
                <Menu.Item key="guoji">
                  <Icon type="appstore" />国际
                </Menu.Item>
                <Menu.Item key="yule">
                  <Icon type="appstore" />娱乐
                </Menu.Item>
                <Menu.Item key="tiyu">
                  <Icon type="appstore" />体育
                </Menu.Item>
                <Menu.Item key="keji">
                  <Icon type="appstore" />科技
                </Menu.Item>
                <Menu.Item key="shishang">
                  <Icon type="appstore" />时尚
                </Menu.Item>
                {userShow}
              </Menu>
              <Modal title="用户中心" warpClassName="vertival-center-modal" visible={this.state.modalVisible}
              onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
              <Tabs type="card">
                <TabPane tab="注册" key="2">
                  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="账户">
                      <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                    </FormItem>
                    <FormItem label="密码">
                      <Input placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                    </FormItem>
                    <FormItem label="确认密码">
                      <Input placeholder="请再次输入您的密码" {...getFieldProps('r_configPassword')}/>
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
              </Modal>
            </Col>
            <Col span={2}></Col>
          </Row>
        </header>
      </div>
    );
  };
}
export default PCHeader = Form.create({})(PCHeader);
