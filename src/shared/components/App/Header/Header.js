/* @flow */

import React from 'react';
import { styled } from 'styletron-react';
import Logo from './Logo';
import Menu from './Menu';

const HeaderWrapper = styled('div', {
  backgroundColor: 'honeydew',
  fontSize: '16px',
  textAlign: 'center',
  marginBottom: '1rem'
});

function Header() {
  return (
    <HeaderWrapper>
      <Logo />
      <h1>React, Universally</h1>
      <strong>
        A starter kit giving you the minimum requirements for a modern universal react application.
      </strong>
      <Menu />
    </HeaderWrapper>
  );
}

export default Header;
