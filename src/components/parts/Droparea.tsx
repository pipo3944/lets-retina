import React, { useRef } from 'react';
import styled from '@emotion/styled';

const INPUT_LIMIT = 20;

const DropArea = styled.div`
  height: 300px;
  margin: 0 auto 30px;
  background-color: rgb(247, 237, 142);
  background: linear-gradient(to top, #f7ed8e, #FED78A);
  color: #fd9d2c;
  font-weight: bold;
  position: relative;
  transition: all .6s;

  &.ondrag {
    background: linear-gradient(to top, #F4E666, #FECF72);
    font-size: 15px;
  }

  &:before {
    content: 'Drop images here (up to 20)';
    position: absolute;

    display: inline-block;
    width: fit-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

type DropareaProps = {
  handleInputFiles: (files: File[]) => void;
};

const Droparea: React.FC<DropareaProps> = ({
  handleInputFiles,
}) => {
  const dropareaRef = useRef<HTMLDivElement>(null);

  const onDropAction = (e: React.DragEvent<HTMLDivElement>) => {
    const dropFiles = e.dataTransfer.files;
    dropareaRef.current?.classList.remove('ondrag');

    let inputFiles: File[] = [];
    for (let i = 0; i < dropFiles.length; i++) {
      inputFiles.push(dropFiles[i]);
      if(i > INPUT_LIMIT-1) {
        break;
      }
    }

    handleInputFiles(inputFiles);
  };

  return (
    <DropArea
      ref={dropareaRef}
      onDrop={e => {
        e.preventDefault();
        onDropAction(e);
      }}
      onDragEnter={() => {
        dropareaRef.current?.classList.add('ondrag');
      }}
      onDragLeave={() => {
        dropareaRef.current?.classList.remove('ondrag');
      }}
      onDragOver={e => {
        e.preventDefault();
      }}
    />
  );
};

export default Droparea;
