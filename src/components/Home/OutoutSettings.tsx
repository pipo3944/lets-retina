import React, { useState, useCallback, useRef, SyntheticEvent, useEffect } from 'react';
import Droparea from 'components/Home/Droparea';
import { FileType } from 'models/FileType';
import BunchDownloadBtn from 'components/parts/BunchDownloadBtn';
import { Divider, Container, Form, Grid, Label, Header } from 'semantic-ui-react';
import OutputProgress from './OutputProgress';
import OutputArea from './OutputArea';
import { ExtensionOutputSetting, horizonOptions, verticalOptions, horizonValues, verticalValues, EX } from 'models/OutputSettingType';
import styled from '@emotion/styled';
import { jsx, css, keyframes } from '@emotion/core'

import extendIcon from '../../assets/img/extend.svg';
import expandIcon from '../../assets/img/expand.svg';

const expandAnim = keyframes`
  0% {
    width: 10%;
    height: 10%;
  }
  70% {
    width: 100%;
    height: 100%;
  }
  100% {
    width: 100%;
    height: 100%;
  }
`;
const extendAnim = keyframes`
0% {
  width: 60%;
  height: 60%;
}
70% {
  width: 100%;
  height: 100%;
}
100% {
  width: 100%;
  height: 100%;
}
`;

const SettingIcon = styled.i`
  display: inline-block;
  width: 200px;
  height: 200px;

  /* background-color: rgba(0,0,0,.1); */
  position: relative;
  z-index: 1;

  &.expand {
    background-image: url(${expandIcon});
  }
  &.expand:hover::before {
    content: '';

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: solid 13px rgba(0,0,0,.1);

    background-color: rgba(0,0,0,.1);

    animation: ${expandAnim} 2s ease infinite;
  }
  &.extend {
    background-image: url(${extendIcon});
  }
  &.extend:hover::before {
    content: '';

    position: absolute;
    width: 47%;
    height: 47%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: solid 11px rgba(0,0,0,.1);
    background-color: rgba(0,0,0,.1);
  }
  &.extend:hover::after {
    content: '';

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: solid 13px rgba(0,0,0,.1);

    background-color: rgba(255,255,255,.1);

    animation: ${extendAnim} 2s ease infinite;
  }
`;

const ExWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  transition: all .3s;

  opacity: .3;
  &.active {
    opacity: 1;
  }
  &:hover {
    & .ui.medium.header {
      text-decoration: underline;
    }
  }
  &:not(.active):hover {
    opacity: 0.5;
  }
`;

type OutputSettingsProps = {
  exSetting: EX;
  extendSettings: ExtensionOutputSetting[];
  handleUpdateExSettings: (newEx: EX) => void;
  handleUpdateExtendSettings: (newSettings: ExtensionOutputSetting[]) => void;
}

const OutputSettings: React.FC<OutputSettingsProps> = ({
  exSetting,
  extendSettings,
  handleUpdateExSettings,
  handleUpdateExtendSettings,
}) => {
  const [myExSetting, setMyExSetting] = useState<EX>(exSetting);
  const [myExtendSettings, setMyExtendSettings] = useState<ExtensionOutputSetting[]>(extendSettings);

  const ExpandRef = useRef({} as HTMLDivElement);
  const ExtendRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    switch (myExSetting) {
      case EX.EXPANTION:
        ExpandRef.current.classList.add('active');
        ExtendRef.current.classList.remove('active');
        handleUpdateExSettings(EX.EXPANTION);
        break;
      case EX.EXTENTION:
        ExpandRef.current.classList.remove('active');
        ExtendRef.current.classList.add('active');
        handleUpdateExSettings(EX.EXTENTION);
      default:
        break;
    }
  }, [myExSetting]);

  return (
    <>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <ExWrapper ref={ExpandRef} className="active" onClick={() => setMyExSetting(EX.EXPANTION)}>
              <Header size='medium'>拡大/縮小</Header>
              <SettingIcon className={EX.EXPANTION} />
            </ExWrapper>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <ExWrapper ref={ExtendRef} onClick={() => setMyExSetting(EX.EXTENTION)}>
              <Header size='medium'>拡張/切り抜き</Header>
              <SettingIcon className={EX.EXTENTION} />
            </ExWrapper>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {(() => {
        if(myExSetting === EX.EXTENTION) {
          return (
            <Grid columns={3} divided>
              <Grid.Row>
                {myExtendSettings.map(mySetting => (
                  <Grid.Column>
                    <Header size='medium'>{mySetting.extentionName}</Header>
                    <Form>
                      <Form.Select
                        fluid
                        label='左右の扱い'
                        options={horizonOptions}
                        defaultValue={mySetting.value.horizon}
                        onChange={(e, { value }) => {
                          const newSettings: ExtensionOutputSetting[] = myExtendSettings.map(setting => {
                            if(setting.extention === mySetting.extention) {
                              return {
                                ...setting,
                                value: {
                                  ...setting.value,
                                  horizon: value as horizonValues,
                                },
                              };
                            }
                            return setting;
                          });
                          setMyExtendSettings(newSettings);
                          handleUpdateExtendSettings(newSettings);
                        }}
                      />
                      <Form.Select
                        fluid
                        label='上下の扱い'
                        options={verticalOptions}
                        defaultValue={mySetting.value.vertical}
                        onChange={(e, { value }) => {
                          const newSettings: ExtensionOutputSetting[] = myExtendSettings.map(setting => {
                            if(setting.extention === mySetting.extention) {
                              return {
                                ...setting,
                                value: {
                                  ...setting.value,
                                  vertical: value as verticalValues,
                                },
                              };
                            }
                            return setting;
                          });
                          setMyExtendSettings(newSettings);
                          handleUpdateExtendSettings(newSettings);
                        }}
                      />
                    </Form>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          )
        }
      })()}
    </>
  );
};

export default OutputSettings;
