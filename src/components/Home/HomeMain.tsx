import React, { useState, useCallback, useRef } from 'react';
import Droparea from 'components/Home/Droparea';
import { FileType } from 'models/FileType';
import BunchDownloadBtn from 'components/parts/BunchDownloadBtn';
import { Divider, Container, Form, Header } from 'semantic-ui-react';
import OutputProgress from './OutputProgress';
import OutputArea from './OutputArea';
import OutputSettings from './OutoutSettings';
import { OutputSetting, horizonValues, verticalValues, ExtensionOutputSetting, EX } from 'models/OutputSettingType';
import styled from '@emotion/styled';

const HeadContainer = styled(Container)`
  padding: 36px 0;
`;

const HeadParagrapf = styled.p`
  line-height: 1.5;
`;

const defaultExtensitonOutputSetting: ExtensionOutputSetting[]  = [
  {
    extention: 'image/jpeg',
    extentionName: 'JPG',
    value: {
      horizon: horizonValues.RR,
      vertical: verticalValues.RB,
    }
  },
  {
    extention: 'image/png',
    extentionName: 'PNG',
    value: {
      horizon: horizonValues.AR,
      vertical: verticalValues.AB,
    }
  },
  {
    extention: 'image/gif',
    extentionName: 'GIF',
    value: {
      horizon: horizonValues.AR,
      vertical: verticalValues.AB,
    }
  },
];

const HomeMain: React.FC = () => {
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [outputFiles, setOutputFiles] = useState<FileType[]>([]);
  const outputFilesRef = useRef<FileType[]>([]);

  const [outputExSetting, setOuputExSetting] = useState<EX>(EX.EXPANTION);
  const [outputExtendSettings, setOuputExtendSettings] = useState<ExtensionOutputSetting[]>(defaultExtensitonOutputSetting);

  const handleInputFiles = (files: File[]) => {
    setInputFiles([
      ...inputFiles,
      ...files,
    ]);
  };

  const handleNewFile = useCallback((newFile: FileType) => {
    outputFilesRef.current.push(newFile);
    setOutputFiles(outputFiles => [
      ...outputFiles,
      newFile,
    ]);
  }, [inputFiles]);

  const handleUpdateExSettings = (newEx: EX) => {
    setOuputExSetting(newEx);
  }

  const handleUpdateExtendSettings = (newSettings: ExtensionOutputSetting[]) => {
    setOuputExtendSettings(newSettings);
  }

  return (
    <>
      <HeadContainer textAlign="center">
        <Header as="h2">Welcome to Let's Retina!</Header>
        <HeadParagrapf>
          このページでは、Retinaページ制作に必要な偶数サイズの画像を生成します。<br/>
          偶数化したい画像を下のエリアにドラッグ＆ドロップすると、画像が奇数サイズだった場合に1px調整してリサイズします。
        </HeadParagrapf>
      </HeadContainer>

      <Droparea handleInputFiles={handleInputFiles} />

      <OutputProgress
        inputFileCount={inputFiles.length}
        outputFileCount={outputFiles.length} />

      <Container>
        <Divider />

        {
          inputFiles.length > 0 && inputFiles.length === outputFiles.length
          && <BunchDownloadBtn outputFiles={outputFiles} />
        }

        {inputFiles &&　<OutputArea
          inputFiles={inputFiles}
          exSetting={outputExSetting}
          extendSettings={outputExtendSettings}
          handleNewFile={handleNewFile} />
        }
      </Container>

      <Container textAlign="left">
        <Header as='h2'>出力設定</Header>
        <OutputSettings
          exSetting={outputExSetting}
          extendSettings={outputExtendSettings}
          handleUpdateExSettings={handleUpdateExSettings}
          handleUpdateExtendSettings={handleUpdateExtendSettings} />
      </Container>
        
    </>
  );
};

export default HomeMain;
