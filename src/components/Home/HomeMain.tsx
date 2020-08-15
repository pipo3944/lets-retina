import React, { useState } from 'react';
import styled from '@emotion/styled';
import Droparea from 'components/parts/Droparea';
import OutputArea from 'components/parts/OutputList';

const HomeMain: React.FC = () => {

  const [inputFiles, setInputFiles] = useState<File[]>([]);

  const handleFiles = (files: File[]) => {
    console.dir(files);
    setInputFiles(files);
  };

  return (
    <main>
      <Droparea handleFiles={handleFiles} />

      {inputFiles && <OutputArea inputFiles={inputFiles} />}
    </main>
  );
};

export default HomeMain;
