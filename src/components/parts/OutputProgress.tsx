import React from 'react';
import { Progress } from 'semantic-ui-react';
import styled from '@emotion/styled';

const MyProgress = styled(Progress)`
  &.ui.progress .bar {
    /* min-width: 0; */
    /* border-radius: 0; */
  }

  &.ui.active.progress .bar::after {
    /* border-radius: 0; */
  }
`;

type OutputProgressProps = {
  inputFileCount: number;
  outputFileCount: number;
}

const OutputProgress: React.FC<Readonly<OutputProgressProps>> = ({
  inputFileCount,
  outputFileCount,
}) => {
  return (
    <>
      <MyProgress value={outputFileCount} total={inputFileCount} indicating progress='ratio' />
    </>
  );
};

export default OutputProgress;
