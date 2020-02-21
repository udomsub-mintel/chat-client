import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

const LoginPage = props => {
  const [isLoading, setIsLoading] = useState(false);
  const createNewEngage = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000)
  };

  return (
    <div className="login-page">
      <div className="container">
        <img src="https://www.hoteljob.in.th/mm/9f8b2d231d36cf58903811aa08f635e220190930113721.png" alt="connectX" height="150px" />
        <Button type="primary" className="login-button" style={{ marginTop: 40 }} onClick={createNewEngage} disabled={isLoading}>
          {isLoading && <Icon type="loading" />}
          <span>New engagement</span>
          <Icon type="arrow-right" />
        </Button>
      </div >
    </div >
  )
};

export default LoginPage;
