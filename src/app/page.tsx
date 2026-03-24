import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1240px] mx-auto">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-surface-container-highest text-primary text-xs font-bold px-2 py-1 rounded">
                Stage 4
              </span>
              <span className="text-on-surface-variant text-sm font-medium">Execution Engine</span>
            </div>
            <h1 className="font-sans text-[2.25rem] font-bold tracking-tight text-on-surface">
              Q4 Enterprise Expansion
            </h1>
            <p className="text-on-surface-variant text-sm mt-1 max-w-lg leading-relaxed">
              Orchestrating the n8n pipeline for automated market penetration and lead qualification.
            </p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors bg-surface-container-lowest shadow-sm">
               <span className="material-symbols-outlined text-[18px]">pause_circle</span>
               Pause Sequence
             </button>
             <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors bg-surface-container-lowest shadow-sm">
               <span className="material-symbols-outlined text-[18px]">download</span>
               Export Report
             </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Main KPI */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-6 shadow-lift relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
             <div className="text-[0.75rem] font-bold tracking-wider uppercase text-on-surface-variant mb-2">
               Meetings Booked
             </div>
             <div className="flex items-baseline gap-3">
               <span className="font-sans text-[2.5rem] font-bold text-on-surface">42</span>
               <span className="bg-[#e2f5e9] text-[#0f7d41] text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                 <span className="material-symbols-outlined text-[14px]">trending_up</span>
                 +12.5%
               </span>
             </div>
          </div>
          {/* Secondary KPIs */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-6 shadow-ghost flex flex-col justify-center">
             <div className="text-[0.75rem] font-bold tracking-wider uppercase text-on-surface-variant mb-2">
               Reply Rate
             </div>
             <div className="font-sans text-[2rem] font-bold text-on-surface">18.4%</div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-6 shadow-ghost flex flex-col justify-center">
             <div className="text-[0.75rem] font-bold tracking-wider uppercase text-on-surface-variant mb-2">
               Open Rate
             </div>
             <div className="font-sans text-[2rem] font-bold text-on-surface">64.2%</div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-6 shadow-ghost">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-sans text-lg font-bold text-on-surface">Execution Velocity</h2>
            <span className="text-xs font-medium text-on-surface-variant bg-surface px-2 py-1 rounded">Last 7 Days</span>
          </div>
          {/* Mock Bar Chart */}
          <div className="flex items-end gap-3 h-[180px] p-2">
             {[30, 45, 80, 50, 65, 30, 20].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col justify-end items-center gap-3">
                 <div 
                   className="w-full max-w-[32px] bg-primary rounded-t-md opacity-90 hover:opacity-100 transition-opacity cursor-pointer relative group" 
                   style={{ height: `${h}%` }}
                 >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {h * 2} emails
                    </div>
                 </div>
                 <span className="text-xs text-on-surface-variant font-medium">
                   {['M','T','W','T','F','S','S'][i]}
                 </span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar Area */}
      <div className="w-full lg:w-[380px] space-y-6">
        
        {/* Workflow Pipeline */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-6 shadow-ghost">
          <h2 className="font-sans text-lg font-bold text-on-surface mb-6">Workflow Pipeline</h2>
          
          <div className="relative border-l-2 border-surface-container-highest ml-[11px] space-y-8 pb-4">
            {/* Step 1 */}
            <div className="relative pl-6">
              <div className="absolute -left-[11px] top-0 bg-primary w-5 h-5 rounded-full flex items-center justify-center border-[3px] border-surface-container-lowest shadow-sm">
                <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
              </div>
              <div className="text-[0.65rem] font-bold text-primary mb-1 uppercase tracking-widest">Trigger</div>
              <div className="font-bold text-on-surface text-sm mb-1 leading-tight">New Lead Identified</div>
              <div className="text-xs text-on-surface-variant mb-3 leading-relaxed">Filtered via Apollo.io Integration</div>
              <span className="bg-surface text-on-surface-variant text-[0.65rem] font-bold px-2 py-1 rounded inline-block uppercase tracking-wider">Completed</span>
            </div>

            {/* Step 2 */}
            <div className="relative pl-6">
              <div className="absolute -left-[11px] top-0 bg-primary w-5 h-5 rounded-full flex items-center justify-center border-[3px] border-surface-container-lowest shadow-sm">
                <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
              </div>
              <div className="text-[0.65rem] font-bold text-primary mb-1 uppercase tracking-widest">Action</div>
              <div className="font-bold text-on-surface text-sm mb-1 leading-tight">LinkedIn Connection</div>
              <div className="text-xs text-on-surface-variant mb-3 leading-relaxed">Automated reach-out with personalized note</div>
              <span className="bg-surface text-on-surface-variant text-[0.65rem] font-bold px-2 py-1 rounded inline-block uppercase tracking-wider">Completed</span>
            </div>

            {/* Step 3 */}
            <div className="relative pl-6">
              <div className="absolute -left-[11px] top-0 bg-surface-container-lowest w-5 h-5 rounded-full flex items-center justify-center border-[3px] border-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
              <div className="text-[0.65rem] font-bold text-primary mb-1 uppercase tracking-widest">Execution</div>
              <div className="font-bold text-on-surface text-sm mb-1 leading-tight">AI Personalization</div>
              <div className="text-xs text-on-surface-variant mb-3 leading-relaxed">Drafting unique follow-up sequences</div>
              <span className="bg-[#f0f4ff] text-primary text-[0.65rem] font-bold px-2 py-1 rounded inline-block uppercase tracking-wider border border-primary/20">Running</span>
            </div>
          </div>
        </div>

        {/* Recent Conversions */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-6 shadow-ghost">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-lg font-bold text-on-surface">Recent Conversions</h2>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 hover:bg-surface rounded-xl transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-primary font-bold text-sm">
                SJ
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-sm text-on-surface">Sarah Jenkins</div>
                  <div className="text-[10px] font-medium text-on-surface-variant">2m ago</div>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">VP Ops @ MetaScale</div>
                <span className="text-[10px] bg-[#e2f5e9] text-[#0f7d41] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-1 border border-[#0f7d41]/20">
                  <span className="material-symbols-outlined text-[12px]">event_available</span>
                  Meeting Booked
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 hover:bg-surface rounded-xl transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-primary font-bold text-sm">
                MR
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-sm text-on-surface">Michael Ross</div>
                  <div className="text-[10px] font-medium text-on-surface-variant">15m ago</div>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">Director of IT @ CloudSync</div>
                <span className="text-[10px] bg-[#eef3ff] text-primary font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-1 border border-primary/20">
                  <span className="material-symbols-outlined text-[12px]">mark_email_read</span>
                  Replied Positive
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-surface rounded-xl transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-primary font-bold text-sm group">
                <span className="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">add</span>
              </div>
              <div className="flex-1 flex items-center h-10">
                 <span className="text-sm font-semibold text-primary">View all conversions</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
