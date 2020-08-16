import React from 'react';
import styled from '@emotion/styled';
import HamburgerMenu from 'components/common/menu/HambugerMenu';
import { Header, Divider } from 'semantic-ui-react';

const MyHeaderMenu = styled.div`
  padding: 8px 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  border-bottom: solid 1px rgba(34,36,38,.05);
`;

const MyHeader = styled(Header)`
  &.ui.header {
    margin-top: 0;
  }
`;

const MainHeaderDivider = styled(Divider)`
  &.ui.divider {
    margin: 0;
  }
`;

const MainHeader: React.FC = () => {
  const handleFiles = (files: FileList) => {
    console.dir(files);
  };

  return (
    <>
      <MyHeaderMenu>
        <HamburgerMenu />
        <MyHeader as='h1'>Let's Retina!</MyHeader>
      </MyHeaderMenu>
    </>
  );
};

export default MainHeader;
