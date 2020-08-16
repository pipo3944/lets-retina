import React, { useState, useEffect, useRef } from "react";
import { Placeholder, Segment } from 'semantic-ui-react';
import styled from '@emotion/styled';
import getCompressImageFileAsync from "util/getCompressImageFileAsync";

const VIEWER_WIDTH = 208;
const VIEWER_HEIGHT = 208;

const isComp = false;

const Wrapper = styled.div`
  width: ${VIEWER_WIDTH}px;
  margin-bottom: 10px;
  margin-right: 16px;
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

const DownloadBtn = styled.button`
  cursor: pointer;
  display: block;
  width: 100%;
  border: none;
  outline: none;

  color: #fff;
  font-size: 12px;
  font-weight: bold;
  background-color: #333;
  padding: 6px 0 7px;
`;

type OutputImageProps = {
  inputFile: File,
};

const OutputImage: React.FC<Readonly<OutputImageProps>> = ({
  inputFile,
}) => {
  const [compFile, setCompFile] = useState<File | Blob>();
  const [blob, setBlob] = useState<Blob>();

  const [newWidth, setNewWidth] = useState<number | undefined>();
  const [newHeight, setNewHeight] = useState<number | undefined>();

  const outputCanvasRef = useRef({} as HTMLCanvasElement);
  const viewerCanvasRef = useRef({} as HTMLCanvasElement);

  /*
  * 画像を偶数化してcanvasに挿入したり
  * 
  */
  const imgToEven = async (file: File | Blob) => {
    var image = new Image();
    var reader = new FileReader();

    reader.onload = function (e) {
      image.onload = function () {

        if (outputCanvasRef && outputCanvasRef.current && viewerCanvasRef && viewerCanvasRef.current) {
          let outputWidth, outputHeight, viewerWidth, viewerHeight;

          /*
          * 偶数化
          *
          */
          if (image.width % 2 !== 0) {
            outputWidth = image.width + 1;
          } else {
            outputWidth = image.width;
          }

          if (image.height % 2 !== 0) {
            outputHeight = image.height + 1;
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
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, outputWidth, outputHeight);

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
          var blob = new Blob([barr], { type: inputFile.type });
          setBlob(blob);

          // 表示用の画像を当て込み
          const maxSize = Math.max(viewerWidth, viewerHeight);
          viewerCanvasRef.current.setAttribute('width', String(viewerWidth));
          viewerCanvasRef.current.setAttribute('height', String(viewerHeight));
          var viewerCtx = viewerCanvasRef.current.getContext('2d');
          if (!viewerCtx) return;
          // canvasに既に描画されている画像をクリア
          viewerCtx.clearRect(0, 0, maxSize, maxSize);
          // canvasにサムネイルを描画
          viewerCtx.drawImage(image, 0, 0, image.width, image.height, 0, 0, viewerWidth, viewerHeight);

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
          setCompFile(compedFile);
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