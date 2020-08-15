import React from 'react';
import styled from '@emotion/styled';

const Header = styled.div`
  padding: 8px 20px;
  box-sizing: border-box;
`;

const MainHeader: React.FC = () => {
  const handleFiles = (files: FileList) => {
    console.dir(files);
  };

  return (
    <Header>
      <h1>Let's Retina!</h1>
    </Header>
  );
};

export default MainHeader;
