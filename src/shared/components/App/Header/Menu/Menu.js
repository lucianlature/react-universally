/* @flow */

import React from 'react';
import { styled } from 'styletron-react';
import { Link } from 'react-router';

const MenuWrapper = styled('ul', {
  marginTop: '1rem',
  marginBottom: '2rem',
  backgroundColor: '#EAEAEA',
  padding: '10px'
});

function Menu() {
  return (
    <MenuWrapper>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </MenuWrapper>
  );
}

export default Menu;
