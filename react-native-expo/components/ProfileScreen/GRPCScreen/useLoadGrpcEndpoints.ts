import { setError, setGrpcEndpoints, setIsLoading } from '@/store/grpcScreen';
import { useAppDispatch } from '@/store/hooks';
import { ChainRegistryClient } from '@penumbra-labs/registry';
import { useEffect, useRef } from 'react';

/**
 * Fetches a list of gRPC endpoints that the user can select from, and loads
 * them into Redux state.
 */
export default function useLoadGrpcEndpoints() {
  const clientRef = useRef<ChainRegistryClient>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    clientRef.current = new ChainRegistryClient();

    dispatch(setIsLoading(true));

    clientRef.current.remote
      .globals()
      .then(data => dispatch(setGrpcEndpoints(data.rpcs)))
      .catch(error => dispatch(setError(error)))
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch]);
}
