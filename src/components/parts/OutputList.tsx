import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import OutputImage from './OutputImage';

const OutputList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 40px 20px;
  box-sizing: border-box;
  border-top: solid 1px #999;

  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
`;

type OutputAreaProps = {
  inputFiles: File[];
};

const OutputArea: React.FC<OutputAreaProps> = ({
  inputFiles,
}) => {
  return (
    <OutputList>
      {inputFiles.map((inputFile, index) => {
        return <OutputImage
          key={index}
          inputFile={inputFile}
          />
      })}
    </OutputList>
  );
};

export default OutputArea;
