import React from 'react';
import styled from '@emotion/styled';
import HamburgerMenu from 'components/common/menu/HambugerMenu';
import { Header } from 'semantic-ui-react';
import ShareButtons from 'components/common/share/ShareButtons';

const MyHeaderMenu = styled.div`
  padding: 8px 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  border-bottom: solid 1px rgba(34,36,38,.05);
  position: relative;
`;

const MyHeader = styled(Header)`
  &.ui.header {
    margin: 0;
  }
`;

const ShareButtonsWrap = styled.div`
  position: absolute;

  top: 50%;
  right: 20px;
  transform: translateY(-50%);
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

        <ShareButtonsWrap>
          <ShareButtons
            url={"https://lets-retina.site/"}
            title="Let's Retina!"
            hashtags={["みんなでRetina"]}
          />
        </ShareButtonsWrap>

        {/* <ShareButtons>
          <ShareButton className="twitter" href="http://twitter.com/share?text=＼全国の中高生が入室中／%0aいつでも、みんなと勉強ができる%0aオンライン自習室はこちら！%0ahttps%3A%2F%2Fchu.benesse.co.jp%2Fsupport_site%2F%3Fs_oid%3D_chu_01630%0a%23みんなの自習室%0a%23進研ゼミ%0a%23スタキャス%0a%23StudyCast"></ShareButton>
          <a href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(location.href),'sharewindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!');">Facebook</a>
          <ShareButton className="facebook" href=""></ShareButton>
          <ShareButton className="line" href=""></ShareButton>
        </ShareButtons> */}
      </MyHeaderMenu>
    </>
  );
};

export default MainHeader;
