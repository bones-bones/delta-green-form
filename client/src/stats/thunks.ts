import { RootState } from '../store';
import { actions } from './reducer';

export const takeDamage =
    ({ value }: { value: number }) =>
    (dispatch: any, getState: () => RootState) => {
        dispatch(
            actions.setHp(getState().stats.derivedStats.hp.current - value)
        );
    };

export const takeWillDamage =
    ({ value }: { value: number }) =>
    (dispatch: any, getState: () => RootState) => {
        dispatch(
            actions.setWp(getState().stats.derivedStats.wp.current - value)
        );
        // dispatch disorder
        // set new breaking
    };
