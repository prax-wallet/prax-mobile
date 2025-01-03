import AssetIcon from '@/components/AssetIcon';
import Box from '@/components/Box';
import List from '@/components/List';
import ListItem from '@/components/ListItem';
import TextInput from '@/components/TextInput';
import { loadGrpcEndpoints, setGrpcEndpointInput } from '@/store/grpcScreen';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setGrpcEndpoint } from '@/store/secureStore';
import { Trans, useLingui } from '@lingui/react/macro';
import { Sx, Text, View } from 'dripsy';
import ListItemIconSuffix from '@/components/ListItemIconSuffix';
import { Check } from 'lucide-react-native';
import { useEffect } from 'react';

export default function GrpcScreen() {
  const { t } = useLingui();
  const grpcEndpoint = useAppSelector(state => state.secureStore.grpcEndpoint);
  const grpcEndpoints = useAppSelector(state => state.grpcScreen.grpcEndpoints);
  const grpcEndpointInput = useAppSelector(state => state.grpcScreen.grpcEndpointInput);
  const isCustomGrpcEndpoint = !grpcEndpoints.some(endpoint => endpoint.url === grpcEndpoint);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadGrpcEndpoints());
  }, [dispatch]);

  return (
    <View sx={sx.root}>
      <Text variant='h4'>
        <Trans>RPC</Trans>
      </Text>

      <Box>
        <ListItem
          primaryText={t`Custom RPC`}
          secondaryText={
            isCustomGrpcEndpoint && !grpcEndpointInput ? grpcEndpoint : grpcEndpointInput
          }
          avatar={<AssetIcon />}
          onPress={() => dispatch(setGrpcEndpoint(grpcEndpointInput))}
          suffix={
            isCustomGrpcEndpoint && (!grpcEndpointInput || grpcEndpointInput === grpcEndpoint) ? (
              <ListItemIconSuffix IconComponent={Check} />
            ) : undefined
          }
        />

        <View sx={sx.textInputWrapper}>
          <TextInput
            value={grpcEndpointInput}
            onChangeText={text => dispatch(setGrpcEndpointInput(text))}
            keyboardType='url'
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
      </Box>

      {!!grpcEndpoints.length && (
        <List>
          {grpcEndpoints.map(endpoint => (
            <ListItem
              avatar={<AssetIcon />}
              key={endpoint.url}
              primaryText={endpoint.name}
              secondaryText={endpoint.url}
              onPress={() => dispatch(setGrpcEndpoint(endpoint.url))}
              suffix={
                grpcEndpoint === endpoint.url ? (
                  <ListItemIconSuffix IconComponent={Check} />
                ) : undefined
              }
            />
          ))}
        </List>
      )}
    </View>
  );
}

const sx = {
  root: {
    px: 'screenHorizontalMargin',
    flexDirection: 'column',
    gap: '$4',
  },

  textInputWrapper: {
    p: '$4',
    pt: 0,
  },
} satisfies Record<string, Sx>;
