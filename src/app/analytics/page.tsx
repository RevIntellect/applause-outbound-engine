import { contacts } from "@/data/contacts";
import { cadences } from "@/data/cadences";
import { campaignMeta } from "@/data/campaign-meta";
import { accounts } from "@/data/accounts";
import StatCard from "@/components/shared/StatCard";

export default function AnalyticsPage() {
  const avgScore = Math.round(contacts.reduce((s, c) => s + c.score, 0) / contacts.length);
  const roleBreakdown = contacts.reduce(
    (acc, c) => { acc[c.role] = (acc[c.role] || 0) + 1; return acc; },
    {} as Record<string, number>
  );
  const totalTouchpoints = cadences.reduce((sum, c) => sum + c.touchpoints.length, 0);
  const channelBreakdown = cadences.reduce(
    (acc, c) => {
      c.touchpoints.forEach((tp) => { acc[tp.channel] = (acc[tp.channel] || 0) + 1; });
      return acc;
    },
    {} as Record<string, number>
  );

  const roleLabels: Record<string, string> = {
    "economic-buyer": "Economic Buyer",
    "technical-buyer": "Technical Buyer",
    champion: "Champion",
    influencer: "Influencer",
  };

  const channelLabels: Record<string, string> = {
    email: "Email",
    linkedin: "LinkedIn",
    phone: "Phone",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Pipeline metrics and scoring distributions across the {campaignMeta.vertical} vertical.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Contacts" value={String(contacts.length)} icon="people" />
        <StatCard label="Average Score" value={String(avgScore)} icon="speed" />
        <StatCard label="Cadences Complete" value={`${cadences.length} / ${contacts.length}`} icon="mail" />
        <StatCard label="Total Touchpoints" value={String(totalTouchpoints)} icon="touch_app" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Score Distribution</h2>
          <div className="space-y-3">
            {contacts
              .sort((a, b) => b.score - a.score)
              .map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-sm w-28 shrink-0 truncate">{c.name}</span>
                  <div className="flex-1 bg-surface-container-low rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70 flex items-center justify-end pr-2"
                      style={{ width: `${c.score}%` }}
                    >
                      <span className="text-[0.6rem] font-bold text-on-primary">{c.score}</span>
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant w-20 text-right capitalize">
                    {c.cadenceType}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Role Classification */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Role Classification</h2>
          <div className="space-y-4">
            {Object.entries(roleBreakdown).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor:
                      role === "economic-buyer" ? "#00579f" :
                      role === "technical-buyer" ? "#455e8c" :
                      role === "champion" ? "#50585d" : "#727782"
                  }} />
                  <span className="text-sm">{roleLabels[role] || role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-sans">{count}</span>
                  <span className="text-xs text-on-surface-variant">contacts</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Cadence Coverage by Account</h3>
            {campaignMeta.accounts.map((id) => {
              const acctContacts = contacts.filter((c) => c.accountId === id);
              const acctCadences = cadences.filter((c) =>
                acctContacts.some((ct) => ct.id === c.contactId)
              );
              const pct = acctContacts.length > 0
                ? Math.round((acctCadences.length / acctContacts.length) * 100)
                : 0;
              return (
                <div key={id} className="flex items-center gap-3 mb-2">
                  <span className="text-sm w-24 capitalize">{id}</span>
                  <div className="flex-1 bg-surface-container-low rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct === 100 ? "bg-primary" : pct > 0 ? "bg-secondary" : "bg-outline-variant"}`}
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                  <span className="text-xs text-on-surface-variant w-20 text-right">
                    {acctCadences.length}/{acctContacts.length} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Channel Mix */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Channel Mix</h2>
          {totalTouchpoints > 0 ? (
            <div className="space-y-4">
              {Object.entries(channelBreakdown).map(([channel, count]) => (
                <div key={channel} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
                      {channel === "email" ? "mail" : channel === "linkedin" ? "share" : "call"}
                    </span>
                    <span className="text-sm">{channelLabels[channel] || channel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-sans">{count}</span>
                    <span className="text-xs text-on-surface-variant">
                      ({Math.round((count / totalTouchpoints) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant">No touchpoint data yet.</p>
          )}
        </div>

        {/* Account Comparison */}
        <div className="bg-surface-container-lowest rounded-lg p-6 shadow-ghost">
          <h2 className="text-lg font-semibold mb-4">Account Snapshot</h2>
          <div className="space-y-4">
            {campaignMeta.accounts.map((id) => {
              const acct = accounts[id];
              const acctContacts = contacts.filter((c) => c.accountId === id);
              const topScore = acctContacts.length > 0 ? Math.max(...acctContacts.map((c) => c.score)) : 0;
              return (
                <div key={id} className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium">{acct.name.split(/,?\s+(Inc|Markets)/)[0]}</span>
                    <span className="text-xs text-on-surface-variant ml-2">({acct.ticker})</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                    <span>{acct.revenue}</span>
                    <span>{acct.revenueGrowth}</span>
                    <span>Top: {topScore}</span>
                    <span>{acctContacts.length} contacts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
