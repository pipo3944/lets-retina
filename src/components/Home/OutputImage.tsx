import React, { useState, useEffect, useRef } from "react";
import { Placeholder } from 'semantic-ui-react';
import styled from '@emotion/styled';
import getCompressImageFileAsync from "util/getCompressImageFileAsync";
import { FileType } from "models/FileType";
import { ExtensionOutputSetting, allowExtentions, horizonValues, verticalValues, EX } from "models/OutputSettingType";

const VIEWER_WIDTH = 204;
const VIEWER_HEIGHT = 204;

const isComp = false;

const Wrapper = styled.div`
  width: ${VIEWER_WIDTH}px;
  margin-bottom: 20px;
  margin-right: 13px;
`;

const ViewerCanvasWrap = styled.div`
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  * {
    transition: all .3s;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 1;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f7ed8e;
    opacity: 0;
    transition: all .3s;
  }

  &::after {
    content: 'DOWNLOAD';
    color: #444;
    font-weight: bold;
    position: absolute;
    z-index: 1;

    display: inline-block;
    width: fit-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 0;
    transition: all .3s;
  }

  &:hover {
    &::before {
      opacity: .6;
    }
    &::after {
      opacity: 1;
    }

    * {
      transform: scale(1.1);
    }
  }
`;

const ViewerCanvas = styled.canvas`
  background-color: #fff;

  display: none;
  &.active {
    display: block;
  }
`;

const ViewerInfo = styled.span`
  display: inline-block;
  color: #666;
  margin-top: 8px;
`;

const MyPlaceholder = styled(Placeholder)`
  border-radius: 8px;
  overflow: hidden;
`;

type OutputImageProps = {
  inputFile: File;
  exSetting: EX;
  extendSettings: ExtensionOutputSetting[];
  handleNewFile: (newFile: FileType) => void;
};

const OutputImage: React.FC<Readonly<OutputImageProps>> = ({
  inputFile,
  exSetting,
  extendSettings,
  handleNewFile,
}) => {
  const [compFile, setCompFile] = useState<File>();
  const [blob, setBlob] = useState<Blob>();

  const [newWidth, setNewWidth] = useState<number | undefined>();
  const [newHeight, setNewHeight] = useState<number | undefined>();

  const outputCanvasRef = useRef({} as HTMLCanvasElement);
  const viewerCanvasRef = useRef({} as HTMLCanvasElement);

  console.log(`ex: ${exSetting}`)

  /*
  * 画像を偶数化してcanvasに挿入したり
  * 
  */
  const imgToEven = async (file: File) => {
    var image = new Image();
    var reader = new FileReader();

    reader.onload = function (e) {
      image.onload = function () {

        if (outputCanvasRef && outputCanvasRef.current && viewerCanvasRef && viewerCanvasRef.current) {
          let outputWidth, outputHeight, viewerWidth, viewerHeight;
          let sx = 0, sy = 0, dx = 0, dy = 0;

          /*
          * 偶数化
          *
          */
          if (image.width % 2 !== 0) {
            if(exSetting === EX.EXPANTION) {
              outputWidth = image.width + 1;
            } else {
              const thisSetting = extendSettings.find(setting => setting.extention === file.type);
              if(thisSetting) {
                switch (thisSetting.value.horizon) {
                  case horizonValues.AL:
                    sx = 0;
                    dx = 1;
                    outputWidth = image.width + 1;
                    break;
                  case horizonValues.AR:
                    sx = 0;
                    dx = 0;
                    outputWidth = image.width + 1;
                    break;
                  case horizonValues.RL:
                    sx = 1;
                    dx = 0;
                    outputWidth = image.width - 1;
                    break;
                  case horizonValues.RR:
                    sx = 0;
                    dx = 0;
                    outputWidth = image.width - 1;
                    break;
                }
              } else {
                outputWidth = image.width + 1;
              }
            }
          } else {
            outputWidth = image.width;
          }
          if (image.height % 2 !== 0) {
            if(exSetting === EX.EXPANTION) {
              outputHeight = image.height + 1;
            } else {
              const thisSetting = extendSettings.find(setting => setting.extention === file.type);
              if(thisSetting) {
                switch (thisSetting.value.vertical) {
                  case verticalValues.AT:
                    sy = 0;
                    dy = 1;
                    outputHeight = image.height + 1;
                    break;
                  case verticalValues.AB:
                    sy = 0;
                    dy = 0;
                    outputHeight = image.height + 1;
                    break;
                  case verticalValues.RT:
                    sy = 1;
                    dy = 0;
                    outputHeight = image.height - 1;
                    break;
                  case verticalValues.RB:
                    sy = 0;
                    dy = 0;
                    outputHeight = image.height - 1;
                    break;
                }
              } else {
                outputHeight = image.height + 1;
              }
            }
          } else {
            outputHeight = image.height;
          }
          
          // 偶数化された画像を作成
          if (outputWidth > outputHeight) {
            // 横長の画像は横のサイズを指定値にあわせる
            const ratio = outputHeight / outputWidth;

            viewerWidth = VIEWER_WIDTH;
            viewerHeight = VIEWER_WIDTH * ratio;
          } else {
            // 縦長の画像は縦のサイズを指定値にあわせる
            const ratio = outputWidth / outputHeight;

            viewerWidth = VIEWER_HEIGHT * ratio;
            viewerHeight = VIEWER_HEIGHT;
          }

          // 出力用canvasのサイズを偶数化した値に変更
          outputCanvasRef.current.setAttribute('width', String(outputWidth));
          outputCanvasRef.current.setAttribute('height', String(outputHeight));

          const ctx = outputCanvasRef.current.getContext('2d');
          if (!ctx) return;

          // 出力用canvasに既に描画されている画像をクリア
          ctx.clearRect(0, 0, outputWidth, outputHeight);
          // 偶数化された画像を出力用canvasに描画
          if(exSetting === EX.EXPANTION) {
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, outputWidth, outputHeight);
          } else {
            ctx.drawImage(
              image,
              sx,
              sy,
              outputWidth,
              outputHeight,
              dx,
              dy,
              outputWidth,
              outputHeight
            );
          }

          setNewWidth(outputWidth);
          setNewHeight(outputHeight);

          /*
          * 表示用キャンバス
          *
          */
          // 出力用canvasからbase64画像データを取得
          var base64 = outputCanvasRef.current.toDataURL(inputFile.type);
          // base64からBlobデータを作成
          var barr, bin, i, len;
          bin = atob(base64.split('base64,')[1]);
          len = bin.length;
          barr = new Uint8Array(len);
          i = 0;
          while (i < len) {
            barr[i] = bin.charCodeAt(i);
            i++;
          }

          // 出力用のblobを作成
          const blob = new Blob([barr], { type: inputFile.type });
          setBlob(blob);
          handleNewFile({
            name: file.name,
            blob: blob,
          });

          // 表示用の画像を当て込み
          const maxSize = Math.max(viewerWidth, viewerHeight);
          viewerCanvasRef.current.setAttribute('width', String(viewerWidth));
          viewerCanvasRef.current.setAttribute('height', String(viewerHeight));
          const viewerCtx = viewerCanvasRef.current.getContext('2d');
          if (!viewerCtx) return;
          // canvasに既に描画されている画像をクリア
          viewerCtx.clearRect(0, 0, viewerWidth, viewerHeight);
          // canvasにサムネイルを描画
          // viewerCtx.drawImage(image, 0, 0, image.width, image.height, 0, 0, viewerWidth, viewerHeight);
          if(exSetting === EX.EXPANTION) {
            viewerCtx.drawImage(image, 0, 0, image.width, image.height, 0, 0, viewerWidth, viewerHeight);
          } else {
            viewerCtx.drawImage(
              image,
              sx,
              sy,
              outputWidth,
              outputHeight,
              dx * viewerWidth/outputWidth,
              dy * viewerHeight/outputHeight,
              viewerWidth,
              viewerHeight
            );
          }

          viewerCanvasRef.current.classList.add('active');
        }
      }
      if (!e || !e.target || !e.target.result) return;
      image.src = String(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    let cleanedUp = false;

    if(isComp && compFile === undefined) {
      // 圧縮する && 圧縮前

      const comp = async () => {
        const compedFile = await getCompressImageFileAsync(inputFile);

        if(!cleanedUp) {
          setCompFile(compedFile as File);
        }
      };
      comp();
    } else if(isComp && compFile !== undefined) {
      // 圧縮する && 圧縮後

      imgToEven(compFile);
    } else {
      // 圧縮しない

      imgToEven(inputFile);
    }
  }, [inputFile, compFile]);

  const downloadAction = (e: React.MouseEvent) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = inputFile.name;

    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <Wrapper>
      {/* 画像作成用キャンバス（表示はしない） */}
      <canvas ref={outputCanvasRef} width='0' height='0' style={{ display: "none" }} />
      
      {/* 表示用キャンバス */}
      <ViewerCanvasWrap
        onClick={(e: React.MouseEvent) => downloadAction(e)}
      >
        <ViewerCanvas ref={viewerCanvasRef}></ViewerCanvas>
      </ViewerCanvasWrap>
      
      {blob === undefined && (
        <MyPlaceholder style={{ height: `${VIEWER_HEIGHT}px`, width: `${VIEWER_WIDTH}px` }}>
          <Placeholder.Image />
        </MyPlaceholder>
      )}

      {(() => {
        if(newWidth && newHeight) {
          return <ViewerInfo><b>{newWidth}</b> x <b>{newHeight}</b></ViewerInfo>;
        }
      })()}
      
      {/* <DownloadBtn
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = inputFile.name;

          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
      >
        ダウンロード
      </DownloadBtn> */}

    </Wrapper>
  )
};

export default OutputImage;