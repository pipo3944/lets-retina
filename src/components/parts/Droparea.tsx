import React, { useRef, useCallback } from 'react';
import styled from '@emotion/styled';

const DropArea = styled.div`
  height: 300px;
  margin: 0 auto 30px;
  background-color: #E1F4F1;
  color: #ABBABD;
  position: relative;
  transition: all .3s;

  &.ondrag {
    font-weight: bold;
    background-color: #A6F4E6;
    color: #5C7C83;
  }

  &:before {
    content: '画像をドロップしてください（複数可）';
    position: absolute;

    display: inline-block;
    width: fit-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

type DropareaProps = {
  handleFiles: (files: File[]) => void;
};

const Droparea: React.FC<DropareaProps> = ({
  handleFiles,
}) => {
  const dropareaRef = useRef<HTMLDivElement>(null);

  const onDropAction = (e: React.DragEvent<HTMLDivElement>) => {
    const dropFiles = e.dataTransfer.files;
    dropareaRef.current?.classList.remove('ondrag');

    let inputFiles: File[] = [];
    for (let i = 0; i < dropFiles.length; i++) {
      inputFiles.push(dropFiles[i]);
    }

    handleFiles(inputFiles);
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
