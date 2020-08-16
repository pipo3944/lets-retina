import imageCompression from 'browser-image-compression';

const defaultOption = {
  // maxSizeMB: 1, // 最大ファイルサイズ
  // maxWidthOrHeight: 800 // 最大画像幅もしくは高さ
}

const getCompressImageFileAsync = async (file: File, option?: any) => {
  const myOptions = option ?
    option :
    defaultOption;
  try {
    // 圧縮画像の生成
    return await imageCompression(file, myOptions);
  } catch (error) {
    console.error("getCompressImageFileAsync is error", error);
    throw error;
  }
}

export default getCompressImageFileAsync;