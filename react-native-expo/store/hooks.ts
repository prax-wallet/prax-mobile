import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '.';

/**
 * Prax-specific version of `useDispatch` that is bound to the typings of our
 * app's Redux store. Use this instead of `redux-react`'s `useDispatch`.
 *
 * @see https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Prax-specific version of `useSelector` that is bound to the typings of our
 * app's Redux store. Use this instead of `redux-react`'s `useSelector`.
 *
 * @see https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
 */
export const useAppSelector = useSelector.withTypes<RootState>();
