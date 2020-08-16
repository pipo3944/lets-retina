import React, { useState, useCallback, useRef } from 'react';
import Droparea from 'components/parts/Droparea';
import OutputArea from 'components/parts/OutputArea';
import OutputProgress from 'components/parts/OutputProgress';
import { FileType } from 'models/FileType';
import BunchDownloadBtn from 'components/parts/BunchDownloadBtn';
import { Divider, Container } from 'semantic-ui-react';

const HomeMain: React.FC = () => {
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  
  const [outputFiles, setOutputFiles] = useState<FileType[]>([]);
  const outputFilesRef = useRef<FileType[]>([]);

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

  return (
    <main>
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

        {inputFiles && <OutputArea inputFiles={inputFiles} handleNewFile={handleNewFile} />}
      </Container>
    </main>
  );
};

export default HomeMain;
