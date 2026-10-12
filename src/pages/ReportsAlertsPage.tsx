import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { SitRepGenerator } from '../components/reports/SitRepGenerator';
import { AlertStream } from '../components/reports/AlertStream';
import { SatelliteTelemetryFeed } from '../components/reports/SatelliteTelemetryFeed';
import { getActiveSatellitePasses } from '../services/satelliteFeedService';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const ReportsAlertsPage: React.FC = () => {
  const { activeZone, incidents, isolatedCommunities, alerts, acknowledgeAlert } = useDisaster();
  const passes = getActiveSatellitePasses();

  return (
    <div className="space-y-8 pb-12">
      <DisclaimerBanner compact />

      {/* SitRep Generator */}
      <SitRepGenerator
        zone={activeZone}
        incidents={incidents}
        isolatedCommunities={isolatedCommunities}
        satellitePasses={passes}
      />

      {/* Real-Time Alerts Feed */}
      <div className="p-5 rounded-2xl bg-space-900/80 border border-cyan-500/20 shadow-lg">
        <AlertStream
          alerts={alerts}
          onAcknowledge={acknowledgeAlert}
        />
      </div>

      {/* Constellation Passes */}
      <div className="p-5 rounded-2xl bg-space-900/80 border border-slate-800 shadow-lg">
        <SatelliteTelemetryFeed passes={passes} />
      </div>
    </div>
  );
};
