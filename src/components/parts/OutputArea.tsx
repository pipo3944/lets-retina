import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import OutputImage from './OutputImage';
import { FileType } from 'models/FileType';

const OutputList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 40px 20px;
  box-sizing: border-box;
`;

type OutputAreaProps = {
  inputFiles: File[];
  handleNewFile: (newBlob: FileType) => void;
};

const OutputArea: React.FC<OutputAreaProps> = ({
  inputFiles,
  handleNewFile,
}) => {
  return (
    <OutputList>
      {inputFiles.map((inputFile, index) => {
        return <OutputImage
          key={index}
          inputFile={inputFile}
          handleNewFile={handleNewFile}
          />
      })}
    </OutputList>
  );
};

export default OutputArea;
