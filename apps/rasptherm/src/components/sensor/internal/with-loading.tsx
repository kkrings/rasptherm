import { ReactNode } from 'react';
import { Skeleton } from '@mui/material';

interface WithLoadingProps {
  children: ReactNode;
  loading?: boolean;
  width?: string | number;
}

function WithLoading({ children, loading, width }: WithLoadingProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return loading ? <Skeleton width={width} /> : <>{children}</>;
}

export default WithLoading;
