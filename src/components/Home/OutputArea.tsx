import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import OutputImage from './OutputImage';
import { FileType } from 'models/FileType';
import { ExtensionOutputSetting, EX } from 'models/OutputSettingType';

const OutputList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 40px 20px;
  box-sizing: border-box;
`;

type OutputAreaProps = {
  inputFiles: File[];
  exSetting: EX;
  extendSettings: ExtensionOutputSetting[];
  handleNewFile: (newBlob: FileType) => void;
};

const OutputArea: React.FC<OutputAreaProps> = ({
  inputFiles,
  exSetting,
  extendSettings,
  handleNewFile,
}) => {
  return (
    <OutputList>
      {inputFiles.map((inputFile, index) => {
        return <OutputImage
          key={index}
          inputFile={inputFile}
          exSetting={exSetting}
          extendSettings={extendSettings}
          handleNewFile={handleNewFile}
          />
      })}
    </OutputList>
  );
};

export default OutputArea;
