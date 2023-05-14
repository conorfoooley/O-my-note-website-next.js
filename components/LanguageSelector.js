import React, { useContext } from 'react';
import {Button, Dropdown, Menu} from 'antd';
import { AppContext } from '../Context/AppContext';

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(AppContext);

  // set selected language by calling context method
  const handleLanguageChange = (e) => {
    userLanguageChange(e);
  };
  const menu = (
      <Menu>
          <Menu.Item>
              <Button
                  onClick={() => handleLanguageChange('en')}
                  style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                  shape='link'
              >
                  English
              </Button>
          </Menu.Item>
          <Menu.Divider/>
          <Menu.Item>
              <Button
                  onClick={() => handleLanguageChange('fr')}
                  style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
                  shape='link'
              >
                  Français
              </Button>
          </Menu.Item>
      </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu}>
          <Button
              onClick={e => e.preventDefault()}
              style={{fontFamily: 'Montserrat', color: '#1f2a56', fontWeight: 600, fontSize: 16}}
              shape='link'
          >
              Language
          </Button>
      </Dropdown>
    </>
    
  );
};
