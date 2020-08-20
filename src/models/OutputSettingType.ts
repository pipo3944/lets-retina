export enum EX {
  EXPANTION = 'expand',
  EXTENTION = 'extend',
}

export enum allowExtentions {
  JPG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
};

export type OutputSetting = {
  key: string;
  text: string;
  value: string;
};

export enum horizonValues {
  AL = 'horizonValue/AL',
  AR = 'horizonValue/AR',
  RL = 'horizonValue/RL',
  RR = 'horizonValue/RR',
}
export enum verticalValues {
  AT = 'verticalValue/AT',
  AB = 'verticalValue/AB',
  RT = 'verticalValue/RT',
  RB = 'verticalValue/RB',
}

export const horizonOptions: OutputSetting[] = [
  { key: horizonValues.AL, text: '左を+1px', value: horizonValues.AL },
  { key: horizonValues.AR, text: '右を+1px', value: horizonValues.AR },
  { key: horizonValues.RL, text: '左を-1px', value: horizonValues.RL },
  { key: horizonValues.RR, text: '右を-1px', value: horizonValues.RR },
]
export const verticalOptions: OutputSetting[] = [
  { key: verticalValues.AT, text: '上を+1px', value: verticalValues.AT },
  { key: verticalValues.AB, text: '下を+1px', value: verticalValues.AB },
  { key: verticalValues.RT, text: '上を-1px', value: verticalValues.RT },
  { key: verticalValues.RB, text: '下を-1px', value: verticalValues.RB },
]

export type ExtensionOutputSetting = {
  extention: string,
  extentionName: string,
  value: {
    horizon: horizonValues,
    vertical: verticalValues,
  },
}