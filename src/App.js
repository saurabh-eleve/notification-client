import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const socket = io('https://rtnserver.herokuapp.com');
const socket = io("https://api.eleveglobal.com/");

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      notifications: []
    }

  }

  componentDidMount = () => {

    // let _ = this;
    socket.on('connection', () => {
      console.log('Client is Connected');
    });
    console.log('Hello World, Because it is working!')
    // emitting to get notifications count
    socket.emit(
      'getNotificationList',
      {
        userId:'5d2592aa7b276a1d15bc453f',
        platform: 'admin'
      });

    socket.on('updatedNotificationList', function(val){
      console.log('Logging All Notification List', val)
    });

    socket.emit(
      'getNewNotificationList',
      {
        userId:'5d2592aa7b276a1d15bc453f',
        platform: 'admin'
      });

    socket.on('updatedNewNotificationList', function(val){
      console.log('Logging New Notifications', val)
    });

    // // emitting to get notifications
    // socket.emit('notifications');
    // // listeing to get notitications
    // socket.on('allnotifications', function(val){
    //   _.handleNotifications(val);
    // });
    //
    // socket.on('notificationCreated', function(val){
    //   _.handleCreatedNotifications(val);
    // });
  }

  handleNotifications = (notifications) => {
    toast(notifications[notifications.length - 1].name);
    this.setState(prevState => ({
      notifications
    }))
  }

  handleCreatedNotifications = notification => {
    toast.success(notification.name);
    this.setState(prevState => ({
      notifications: [...prevState.notifications, notification]
    }))
  }

  createNotification = () => {
    socket.emit('createNotifications');
  }

  render = () => {
    const { notifications } = this.state;
    return (
      <div className="App">
        {/* <p>You have received {notifications.length} notifications.</p> */}
        {/* <button className="button" onClick={this.createNotification}>Create Notification</button> */}
        {
          notifications.map((n, i) => {
            return (
              <div key={n.id} className="notification-item">
                {n.name}
              </div>
            )
          })
        }
        <ToastContainer />
      </div>
    );
  }
}
