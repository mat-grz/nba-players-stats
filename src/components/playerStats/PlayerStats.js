import React, { useState, useEffect } from 'react';
import { getSeasonAveragesStats } from '../../api/api';
import PlayerStatsNav from '../playerStatsNav/PlayerStatsNav';
import PlayerStatsTable from '../playerStatsTable/PlayerStatsTable';

export default function PlayerStats({ playerId }) {
    let [stats, setStats] = useState({});
    let [season, setSeason] = useState(2019);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getSeasonAveragesStats(playerId, season)
            .then(seasonAveragesStats => {
                setStats(seasonAveragesStats[0]);
                setIsLoading(false);
            });
    }, [playerId, season]);

    return (
        <>
        <PlayerStatsNav stats={stats} onClick={setSeason} isLoading={isLoading} />
        {!isLoading && <PlayerStatsTable stats={stats} />}
        </>
    );
}