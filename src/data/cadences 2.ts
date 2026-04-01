import type { Cadence } from "./types";

export const cadences: Cadence[] = [
  // --- Jeff Pinner (CTO) - Standard 14-day ---
  {
    contactId: "jeff-pinner",
    contactName: "Jeff Pinner",
    contactTitle: "CTO",
    company: "Robinhood",
    classification: "Technical Buyer (Score: 85)",
    cadenceType: "Standard, 14 days, 8 touches",
    tone: "Tactical. Engineering challenges, platform reliability, infrastructure scaling.",
    touchpoints: [
      {
        day: 1,
        channel: "linkedin",
        type: "Profile View",
        note: "View Jeff Pinner's profile. No action. Creates visibility before outreach.",
      },
      {
        day: 2,
        channel: "email",
        type: "Value-First Email",
        subject: "superapp testing",
        htmlBody: `<div>Jeff,<br /><br />Robinhood's expansion into prediction markets, Cortex AI, and expanded crypto means your engineering team is shipping across more product surfaces than ever. Each one needs to work flawlessly on real devices and networks before it reaches 27M funded customers handling real money.<br /><br />Applause provides on-demand crowdtesting with real people on real devices across real networks and locations. Companies like PayPal and Western Union use us to catch the issues automated scripts miss, especially in high-stakes financial flows.<br /><br />Would it be useful to see how other fintech engineering teams are handling QA across multiple product lines simultaneously?</div>`,
      },
      {
        day: 4,
        channel: "linkedin",
        type: "Connection Request",
        linkedinText: "Jeff, impressed by the Python-to-Go migration at Robinhood. Would enjoy connecting on platform engineering challenges at scale.",
        note: "Under 300 characters. No pitch. No Applause mention.",
      },
      {
        day: 6,
        channel: "email",
        type: "Case Study Email",
        subject: "prediction markets QA",
        htmlBody: `<div>Jeff,<br /><br />When PayPal launched new payment surfaces across multiple geographies, they found that 23% of critical transaction failures only appeared on real devices in real network conditions. Their internal automation missed them entirely.<br /><br />Applause is a crowdtesting platform that deploys real testers on real devices to catch what automation can't. For a platform like Robinhood, where a failed trade or broken deposit flow has immediate financial consequences, this gap matters.<br /><br />Happy to share how their engineering team integrated crowdtesting into their release cycle without slowing velocity.</div>`,
      },
      {
        day: 8,
        channel: "phone",
        type: "Discovery Call",
        talkTrack: "Jeff, Aaron Wolf from Applause. I've been following Robinhood's expansion into prediction markets and Cortex. As you ship across more product surfaces, I'm curious how your QA strategy is scaling with it. Are you finding gaps between what automation catches and what real users experience on real devices?",
        voicemail: "Jeff, Aaron Wolf from Applause. We help fintech engineering teams like PayPal test across real devices and networks. Given everything Robinhood is shipping right now, thought it'd be worth a quick conversation. I'll follow up by email.",
      },
      {
        day: 10,
        channel: "linkedin",
        type: "InMail",
        linkedinText: "Jeff, Robinhood's pace of product launches is impressive. Prediction markets, Cortex, expanded crypto. Curious how your QA approach is keeping up across all those surfaces. Applause helps fintech teams test on real devices at scale. Worth a conversation?",
        note: "Under 75 words.",
      },
      {
        day: 11,
        channel: "email",
        type: "ROI Framework Email",
        subject: "device coverage",
        htmlBody: `<div>Jeff,<br /><br />One pattern we see with fast-scaling fintech platforms: the gap between what automated tests cover and what real users experience widens as product lines multiply. Especially on Android, where device fragmentation means your top 10 devices represent less than 40% of your user base.<br /><br />Applause is a crowdtesting platform that gives engineering teams on-demand access to real testers on thousands of real devices, networks, and locations. No hardware lab. No staffing headcount.<br /><br />Worth 20 minutes to see if there's a fit?</div>`,
      },
      {
        day: 14,
        channel: "phone",
        type: "Breakup Call",
        talkTrack: "Jeff, Aaron Wolf from Applause. I've reached out a few times about how fintech teams handle QA as they scale product lines. If the timing isn't right, no problem. If device coverage or real-world testing is something your team is thinking about, I'd still welcome the conversation.",
        voicemail: "Jeff, Aaron Wolf, Applause. Last voicemail from me. If real-device testing across your product lines becomes a priority, I'm here. Take care.",
      },
    ],
  },

  // --- Vlad Tenev (CEO) - Extended 21-day ---
  {
    contactId: "vlad-tenev",
    contactName: "Vlad Tenev",
    contactTitle: "CEO & Co-Founder",
    company: "Robinhood",
    classification: "Economic Buyer (Score: 90)",
    cadenceType: "Extended, 21 days, 12 touches",
    tone: "Strategic. Business outcomes, risk reduction, brand trust, growth enablement.",
    touchpoints: [
      { day: 1, channel: "linkedin", type: "Profile View", note: "View Vlad Tenev's profile. No action." },
      {
        day: 2,
        channel: "email",
        type: "Value-First Email",
        subject: "superapp quality",
        htmlBody: `<div>Vlad,<br /><br />Robinhood's transformation into a Financial SuperApp means your brand promise now spans trading, crypto, prediction markets, Gold banking, and AI advisory. Each new surface is a trust moment with 27M funded customers who expect flawless execution with their money.<br /><br />Applause provides on-demand crowdtesting across real devices, networks, and locations. We help companies like PayPal and Western Union ensure every financial flow works perfectly for real users before launch.<br /><br />Would it be useful to see how other fintech leaders are protecting brand trust while shipping at speed?</div>`,
      },
      {
        day: 4,
        channel: "linkedin",
        type: "Connection Request",
        linkedinText: "Vlad, the Financial SuperApp vision is compelling. Would enjoy connecting on the intersection of speed-to-market and quality at scale.",
        note: "Under 300 characters. No Applause mention.",
      },
      {
        day: 6,
        channel: "email",
        type: "Risk Angle Email",
        subject: "launch risk",
        htmlBody: `<div>Vlad,<br /><br />Every new product surface at Robinhood is a trust moment. A failed prediction market trade or a broken Cortex recommendation doesn't just frustrate users. It creates regulatory exposure and erodes the brand trust you've rebuilt since 2021.<br /><br />Applause is a crowdtesting platform that deploys real testers on real devices before launch. We catch the issues that automated testing misses, particularly in complex financial flows across fragmented mobile ecosystems.<br /><br />Happy to share how other fintech CEOs are thinking about quality as a growth enabler, not just a cost center.</div>`,
      },
      {
        day: 8,
        channel: "phone",
        type: "Discovery Call",
        talkTrack: "Vlad, Aaron Wolf from Applause. As Robinhood scales into more product lines, each one carries your brand and your customers' money. I work with fintech leaders who use crowdtesting to ensure every new launch works on real devices before it reaches users. Worth a quick conversation?",
        voicemail: "Vlad, Aaron Wolf from Applause. We help fintech companies ensure new product launches work on real devices for real users. Given everything Robinhood is shipping, thought it'd be worth connecting. I'll follow up by email.",
      },
      {
        day: 10,
        channel: "linkedin",
        type: "InMail",
        linkedinText: "Vlad, as Robinhood adds prediction markets, Cortex, and expanded crypto, each launch carries real financial risk for 27M users. Applause helps fintech leaders test across real devices at scale before launch. Worth a conversation?",
        note: "Under 75 words.",
      },
      {
        day: 12,
        channel: "email",
        type: "Social Proof Email",
        subject: "fintech quality",
        htmlBody: `<div>Vlad,<br /><br />PayPal discovered that nearly a quarter of critical transaction failures only surfaced on real devices in real network conditions. Their automation suite missed them. For a platform where users are trading, depositing, and investing real money, that gap is unacceptable.<br /><br />Applause is a crowdtesting platform that closes that gap with real testers on thousands of devices and networks. No hardware lab, no headcount expansion. Just coverage where automation falls short.<br /><br />Would 15 minutes to explore the fit make sense?</div>`,
      },
      {
        day: 14,
        channel: "phone",
        type: "Follow-Up Call",
        talkTrack: "Vlad, Aaron Wolf again from Applause. Wanted to circle back. We're working with several fintech platforms navigating the same challenge: shipping fast across multiple product lines while maintaining the quality that keeps users trusting the platform. If that's on your radar, I'd welcome the conversation.",
        voicemail: "Vlad, Aaron Wolf, Applause. Following up on real-device testing for your product launches. Happy to share what we're seeing across fintech. I'll send one more note by email.",
      },
      {
        day: 16,
        channel: "email",
        type: "New Angle Email",
        subject: "Gold growth",
        htmlBody: `<div>Vlad,<br /><br />4.18M Gold subscribers is a strong recurring revenue engine. Each Gold user expects premium reliability across every feature, from banking to margin trading to AI insights. A single broken flow at that tier erodes willingness to pay.<br /><br />Applause is a crowdtesting platform that helps fintech companies validate premium experiences across real devices and networks. We make sure the experience matches the promise, especially for your highest-value users.<br /><br />Worth a quick conversation about how this fits your quality strategy?</div>`,
      },
      {
        day: 18,
        channel: "linkedin",
        type: "LinkedIn Message",
        linkedinText: "Vlad, one more thought. As Gold subscribers hit 4.18M, the quality bar for that premium experience keeps rising. Happy to share how other fintech companies use crowdtesting to protect their highest-value user segments.",
        note: "Under 75 words.",
      },
      {
        day: 19,
        channel: "phone",
        type: "Breakup Call",
        talkTrack: "Vlad, Aaron Wolf from Applause. Last outreach from me. If real-device testing and quality across your product launches becomes a priority, I'd be glad to connect. Either way, best of luck with the SuperApp buildout.",
        voicemail: "Vlad, Aaron Wolf, Applause. Last message from me. If crowdtesting becomes relevant as you scale, my door's open. Take care.",
      },
      {
        day: 21,
        channel: "email",
        type: "Breakup Email",
        subject: "closing the loop",
        htmlBody: `<div>Vlad,<br /><br />I've reached out a few times about how Applause helps fintech platforms ensure new product launches work on real devices for real users. Sounds like the timing may not be right.<br /><br />If real-world testing across your expanding product lines becomes a priority, I'm here. Wishing Robinhood continued success with the SuperApp vision.</div>`,
      },
    ],
  },

  // --- Jason Warnick (CFO) - Extended 21-day ---
  {
    contactId: "jason-warnick",
    contactName: "Jason Warnick",
    contactTitle: "CFO",
    company: "Robinhood",
    classification: "Economic Buyer (Score: 82)",
    cadenceType: "Extended, 21 days, 12 touches",
    tone: "Strategic. Cost efficiency, ROI, risk reduction, operational leverage.",
    touchpoints: [
      { day: 1, channel: "linkedin", type: "Profile View", note: "View Jason Warnick's profile. No action." },
      {
        day: 3,
        channel: "email",
        type: "Value-First Email",
        subject: "testing costs",
        htmlBody: `<div>Jason,<br /><br />As Robinhood scales into prediction markets, Cortex AI, and expanded crypto, the QA burden multiplies with every new product line. Building internal device labs and staffing test teams for each surface is expensive and slow.<br /><br />Applause provides on-demand crowdtesting across real devices, networks, and locations. It's variable cost, not fixed headcount. Companies like PayPal use us to scale testing coverage without scaling their QA org.<br /><br />Would it be useful to see how the cost model compares to internal alternatives?</div>`,
      },
      {
        day: 5,
        channel: "linkedin",
        type: "Connection Request",
        linkedinText: "Jason, your Amazon finance background plus Robinhood's growth story is a strong combination. Would enjoy connecting.",
        note: "Under 300 characters. No pitch.",
      },
      {
        day: 7,
        channel: "email",
        type: "OpEx Angle Email",
        subject: "QA leverage",
        htmlBody: `<div>Jason,<br /><br />With $2.6B+ in planned OpEx and multiple new product lines launching, every dollar of engineering spend needs to deliver maximum coverage. Building internal QA for prediction markets, crypto, Cortex, and Gold simultaneously means hiring, hardware, and long ramp times.<br /><br />Applause is a crowdtesting platform that provides real-device testing on demand. Pay for coverage when you need it, scale down when you don't. No lab capex, no permanent headcount.<br /><br />Happy to walk through the unit economics for a platform at Robinhood's scale.</div>`,
      },
      {
        day: 9,
        channel: "phone",
        type: "Discovery Call",
        talkTrack: "Jason, Aaron Wolf from Applause. With Robinhood launching across so many product lines, I'm curious how you're thinking about QA costs. We help fintech companies replace fixed testing infrastructure with on-demand crowdtesting. Variable cost model, no hardware labs. Worth a quick conversation?",
        voicemail: "Jason, Aaron Wolf from Applause. We help fintech companies scale testing without scaling headcount. Given Robinhood's product expansion, thought it'd be worth connecting. I'll follow up by email.",
      },
      {
        day: 11,
        channel: "linkedin",
        type: "InMail",
        linkedinText: "Jason, given your Amazon finance background, you'll appreciate this: Applause replaces fixed QA infrastructure costs with variable, on-demand crowdtesting. As Robinhood's product lines multiply, that cost flexibility matters. Worth a conversation?",
        note: "Under 75 words.",
      },
      {
        day: 13,
        channel: "email",
        type: "Risk/Cost Email",
        subject: "defect costs",
        htmlBody: `<div>Jason,<br /><br />In fintech, a production defect in a transaction flow isn't just a bug. It's potential regulatory exposure, customer churn, and support cost escalation. The cost of finding these issues after launch is orders of magnitude higher than catching them before.<br /><br />Applause is a crowdtesting platform that catches real-device, real-network defects before they reach production. For a platform handling real money across 27M funded accounts, the ROI math is straightforward.<br /><br />Worth 15 minutes to run the numbers together?</div>`,
      },
      {
        day: 15,
        channel: "phone",
        type: "Follow-Up Call",
        talkTrack: "Jason, Aaron Wolf from Applause again. Wanted to follow up on how Robinhood is managing QA costs across your expanding product portfolio. We've helped fintech CFOs shift from fixed testing infrastructure to a variable model. If that's interesting, I'd welcome the conversation.",
        voicemail: "Jason, Aaron Wolf, Applause. Following up on testing cost efficiency for your product launches. Happy to share the ROI framework. I'll send one more email.",
      },
      {
        day: 17,
        channel: "email",
        type: "Operational Leverage Email",
        subject: "testing scale",
        htmlBody: `<div>Jason,<br /><br />Here's the math that resonates with most fintech finance leaders: a single device lab covers maybe 50-100 devices. Robinhood's users are on thousands of device and network combinations. Applause gives you on-demand access to that full coverage without the capital or staffing commitment.<br /><br />Applause is a crowdtesting platform that fintech companies use to scale quality assurance with product growth, not ahead of it. The spend scales with your launch calendar, not your headcount plan.<br /><br />Worth exploring if this fits your 2026 OpEx strategy?</div>`,
      },
      {
        day: 19,
        channel: "linkedin",
        type: "LinkedIn Message",
        linkedinText: "Jason, last thought. As Robinhood's product lines grow, QA spend doesn't have to grow linearly with them. Happy to share how other fintech CFOs are approaching this. Let me know if the timing works.",
        note: "Under 75 words.",
      },
      {
        day: 20,
        channel: "phone",
        type: "Breakup Call",
        talkTrack: "Jason, Aaron Wolf from Applause. Last outreach from me. If testing cost efficiency or real-device coverage becomes a conversation at Robinhood, I'm here. Either way, best of luck with the growth ahead.",
        voicemail: "Jason, Aaron Wolf, Applause. Last message. If on-demand testing costs become a priority, my door is open. Take care.",
      },
      {
        day: 21,
        channel: "email",
        type: "Breakup Email",
        subject: "closing the loop",
        htmlBody: `<div>Jason,<br /><br />I've reached out a few times about how Applause helps fintech companies scale testing coverage without scaling costs. Sounds like the timing may not be right.<br /><br />If on-demand crowdtesting becomes relevant as Robinhood's product portfolio grows, I'm here. Wishing you and the team continued success.</div>`,
      },
    ],
  },
];

export function getCadenceByContact(contactId: string) {
  return cadences.find((c) => c.contactId === contactId);
}

export function getCadencesByAccount(accountId: string) {
  // Get contact IDs for this account, then find matching cadences
  return cadences.filter((c) => {
    const contactAccountMap: Record<string, string> = {
      "vlad-tenev": "robinhood",
      "jeff-pinner": "robinhood",
      "jason-warnick": "robinhood",
      "sasan-goodarzi": "intuit",
      "alex-balazs": "intuit",
      "sandeep-aujla": "intuit",
      "evan-spiegel": "snap",
      "bobby-murphy": "snap",
      "jerry-hunter": "snap",
    };
    return contactAccountMap[c.contactId] === accountId;
  });
}
