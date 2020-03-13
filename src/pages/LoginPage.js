import React, { useState } from 'react';
import { Button, Icon } from 'antd';
import axios from 'axios';
import randomItem from 'random-item';
import Chat from './Chat';

const ORG_ID = 'EmFSH0pDUW7KVCptYrWv';
const FIRST_NAMES = ['Bill', 'Norman', 'Matilda', 'Troy', 'Lula', 'Nancy', 'Elmer', 'Eric', 'Amanda', 'Clifford'];
const LAST_NAMES = ['Russell', 'Kelley', 'Wheeler', 'Patterson', 'Thomas', 'May', 'Roy', 'Elliott', 'Vaughn', 'Moran', 'Hunter'];

const LoginPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({});
  const [chatRoomId, setChatRoomId] = useState('');

  const createNewEngage = async () => {
    try {
      setIsLoading(true);
      const image = require(`../data/profiles/${randomItem(['profile_5.png', 'profile_6.jpeg'])}`);
      const body = {
        organizeId: ORG_ID,
        customerImage: image,
        firstName: randomItem(FIRST_NAMES),
        lastName: randomItem(LAST_NAMES),
        birthDate: new Date(),
        email: 'paiboon.tob@gmail.com',
        bookingStatus: 'booked',
        gender: randomItem(['Male', 'Female']),
      };
      const { data: customerId } = await axios.post('http://localhost:3000/connectx/api/customer/addCustomer', body);
      const { data: customer } = await axios.post('http://localhost:3000/connectx/api/customer/listdataprofile', { customerId, organizeId: ORG_ID });
      const { data: { chatRoomId } } = await axios.post('http://localhost:3000/connectx/api/engagement/chatRoom', { customerId, organizeId: ORG_ID });
      setCustomer({ ...customer, customerId });
      setChatRoomId(chatRoomId);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  };

  return (
    <div>
      {
        chatRoomId ? <Chat customer={customer} ORG_ID={ORG_ID} chatRoomId={chatRoomId} /> : (
          <div className="login-page">
            <div className="container">
              <img src="/krungsri.png" alt="connectX" height="180px" />
              <Button type="primary" className="login-button" style={{ marginTop: 50 }} onClick={createNewEngage} disabled={isLoading}>
                {isLoading && <Icon type="loading" />}
                <span>Start Chat</span>
                <Icon type="arrow-right" />
              </Button>
            </div >
          </div>
        )
      }
    </div >
  )
};

LoginPage.defaultProps = {
  history: () => { },
};

export default LoginPage;
