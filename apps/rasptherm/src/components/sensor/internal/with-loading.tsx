import { ReactNode } from 'react';
import { Skeleton } from '@mui/material';

interface WithLoadingProps {
  children: ReactNode;
  visible?: boolean;
  pulse?: boolean;
  width?: string | number;
}

function WithLoading({ children, visible, pulse, width }: WithLoadingProps) {
  return visible ? (
    <Skeleton width={width} animation={pulse ? 'pulse' : false} />
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
}

export default WithLoading;
