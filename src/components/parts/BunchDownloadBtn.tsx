import React, { SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import { Button, Icon } from 'semantic-ui-react';
import JsZip from "jszip";
import FileSaver from "file-saver";
import { FileType } from 'models/FileType';

type BunchDownloadBtnProps = {
  outputFiles: FileType[];
}

const MyButton = styled(Button)`
  &.ui.button {
    color: #fff;
    background-color: #fd9d2c;
  }
`;

const BunchDownloadBtn: React.FC<Readonly<BunchDownloadBtnProps>> = ({
  outputFiles,
}) => {

  const bunchDownloadAction = () => {
    let zip = new JsZip();
    outputFiles.forEach(file => {
      if(file.blob) {
        zip.file(file.name, file.blob);
      }
    })
    zip.generateAsync({type: 'blob'})
    .then(function(content){
      FileSaver.saveAs(content, 'images.zip');
    });
  }

  return (
    <MyButton icon labelPosition='left' onClick={() => bunchDownloadAction()}>
      <Icon name='download' />
      一括ダウンロード
    </MyButton>
  );
};

export default BunchDownloadBtn;
