import React, { useState } from 'react';
import { Container, Header, List, Portal, Segment, Button, TransitionablePortal, Divider, Menu } from 'semantic-ui-react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import paths from 'paths';

const HamburgerBtn = styled.i`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20id%3D%22l1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%20%3Cdefs%3E%20%3Cstyle%3E%20.cls-1%7Bfill%3Anone%3B%7D.cls-3%7Bfill%3A%23a6a6a6%3B%7D%20%3C%2Fstyle%3E%20%3C%2Fdefs%3E%20%3Ctitle%3E%20sample3%20%3C%2Ftitle%3E%20%3Crect%20class%3D%22cls-1%22%20width%3D%2224%22%20height%3D%2224%22%2F%3E%20%3Cg%20class%3D%22cls-2%22%3E%20%3Cpath%20class%3D%22cls-3%22%20d%3D%22M4%207C4%206.44772%204.44772%206%205%206H19C19.5523%206%2020%206.44772%2020%207C20%207.55228%2019.5523%208%2019%208H5C4.44772%208%204%207.55228%204%207ZM4%2012C4%2011.4477%204.44772%2011%205%2011H19C19.5523%2011%2020%2011.4477%2020%2012C20%2012.5523%2019.5523%2013%2019%2013H5C4.44772%2013%204%2012.5523%204%2012ZM5%2016C4.44772%2016%204%2016.4477%204%2017C4%2017.5523%204.44772%2018%205%2018H19C19.5523%2018%2020%2017.5523%2020%2017C20%2016.4477%2019.5523%2016%2019%2016H5Z%22%2F%3E%20%3C%2Fg%3E%3C%2Fsvg%3E');
  background-position: center;
  background-repeat: no-repeat;

  margin-right: 24px;

  cursor: pointer;
  position: relative;

  &:hover:before {
    content: '';

    background-color: rgba(0, 0, 0, 0.04);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
  }
`;

const HamburgerOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  background-color: rgba(0,0,0,0.4);
`;

const HamburgerMenuContainer = styled(Container)`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px !important;
  height: 100vh;
  background-color: #fff;
  z-index: 1001;

  @media only screen and (max-width: 767px) {
    &.ui.container {
      margin: 0 !important;
    }
  }
`;

const HamburgerMenuHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 8px 20px;
  box-sizing: border-box;
`;

const MyHeader = styled(Header)`
  &.ui.header {
    margin-top: 0;
  }
`;

const MyHeaderDivider = styled(Divider)`
  &.ui.divider {
    margin: 0 20px 1em;
  }
`;

const MyLink = styled(Link)`
  display: inline-block;
  width: 100%;

  color: #7c7c7c;
  font-size: 14px;
  line-height: 1;
  padding: 13px 24px;
  box-sizing: border-box;

  &:hover {
    color: #7c7c7c;
    background: #f5f5f5;
  }
`;

const MyExternalLink = styled.a`
  display: inline-block;
  width: 100%;

  color: #7c7c7c;
  font-size: 14px;
  line-height: 1;
  padding: 13px 24px;
  box-sizing: border-box;

  &:hover {
    color: #7c7c7c;
    background: #f5f5f5;
  }
`;

const HamburgerMenu: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClose = (e:React.MouseEvent) => {
    e.preventDefault();

    setOpen(false);

    const body = document.body;
    if(body) {
      body.style.height = '';
      body.style.overflow = '';
    }
  }

  const handleOpen = (e:React.MouseEvent) => {
    e.preventDefault();

    setOpen(true);

    const body = document.body;
    if(body) {
      body.style.height = '100vh';
      body.style.overflow = 'hidden';
    }
  }

  return (
    <>
      <HamburgerBtn onClick={handleOpen}></HamburgerBtn>

      <Portal open={isOpen}>
        <HamburgerOverlay onClick={handleClose} />
      </Portal>

      <Portal onClose={handleClose} open={isOpen}>
        <HamburgerMenuContainer>

          <HamburgerMenuHeader>
            <HamburgerBtn onClick={handleClose}></HamburgerBtn>
            <MyHeader as='h1'>Let's Retina!</MyHeader>
          </HamburgerMenuHeader>

          <MyHeaderDivider />

          <List>
            <MyLink to={paths.home}>ホーム</MyLink>
            {/* <MyLink to={paths.policy}>利用規約</MyLink> */}
            <MyExternalLink href={'https://forms.gle/Zh1Y1egrBFHnBdvB9'} target="_blank">お問い合わせ</MyExternalLink>
          </List>

        </HamburgerMenuContainer>
      </Portal>
    </>
  );
};

export default HamburgerMenu;
