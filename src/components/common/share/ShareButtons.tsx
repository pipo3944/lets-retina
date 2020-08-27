import React from 'react';
import styled from '@emotion/styled';

import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from 'react-share';

import twitterIcon from '../../assets/img/share-tw.png';
import facebookIcon from '../../assets/img/share-fb.png';
import lineIcon from '../../assets/img/share-line.png';
import { config } from 'process';

const shareConfig = {
  via: 'kara_d',
  size: 36,
  hashtags: [
    "let's-retina",
  ]
}

const Wrapper = styled.div`
  & button {
    outline: none;
    vertical-align: middle;

    width: ${shareConfig.size}px;
    height: ${shareConfig.size}px;

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

type ShareButtonsProps = {
  url: string;
  title: string;
  size?: number;
  via?: string;
  hashtags?: string[];
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  size,
  via,
  hashtags,
}) => {
  return (
    <Wrapper>
      <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={size ? size : shareConfig.size} round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={size ? size : shareConfig.size} round />
      </FacebookShareButton>
      <LineShareButton url={url} title={title}>
          <LineIcon size={size ? size : shareConfig.size} round />
      </LineShareButton>
    </Wrapper>
  );
};

export default ShareButtons;
