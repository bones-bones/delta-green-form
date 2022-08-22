import React from 'react';
import { PlayerDefinition } from './types';

type Props = {
    data: PlayerDefinition;
};

export const PlayerViewComponent = ({ data: val }: Props) => {
    return (
        <div>
            <h3>{val.personData.name}</h3>
            <div>{val.personData.profession}</div>
            <div>{val.personData.background}</div>
            <table>
                <tr>
                    <th>Stat</th>
                    <th>Values</th>
                </tr>
                <tbody>
                    <tr>
                        <td>HP</td>
                        <td>
                            {val.derivedStats.hp.current}/
                            {val.derivedStats.hp.max}
                        </td>
                    </tr>
                    <tr>
                        <td>WP</td>
                        <td>
                            {val.derivedStats.wp.current}/
                            {val.derivedStats.wp.current}
                        </td>
                    </tr>
                    <tr>
                        <td>SP</td>
                        <td>
                            {val.derivedStats.sp.current}/
                            {val.derivedStats.sp.max}
                        </td>
                    </tr>
                    <tr>
                        <td>BP</td>
                        <td>{val.derivedStats.bp}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
