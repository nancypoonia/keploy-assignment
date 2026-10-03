export const site = {
  title: "Record & replay Go API tests with Keploy",
  description:
    "A beginner-friendly, tested walkthrough of Keploy's Go Mux + MySQL quickstart: record real API traffic, then replay it as tests with the database switched off.",
  // Public source repository for this site.
  repoUrl: "https://github.com/nancypoonia/keploy-assignment",
  author: "Nancy Poonia",
};

/** Environment the tutorial was actually run in (3 Oct 2026). */
export const runFacts: [string, string][] = [
  ["Keploy", "3.6.87 (open source)"],
  ["Sample", "samples-go/mux-mysql @ 2b0a034"],
  ["Go", "1.24.7"],
  ["MySQL", "8.0.46"],
  ["OS", "Ubuntu 24.04, Linux 6.18"],
  ["Tested", "3 October 2026"],
];

export type Section = { id: string; title: string; step?: number };

/** Table of contents. Ids are generated from the headings by rehype-slug. */
export const sections: Section[] = [
  { id: "what-youll-build", title: "What you'll build" },
  { id: "what-is-keploy", title: "What is Keploy?" },
  { id: "prerequisites", title: "Prerequisites" },
  { id: "step-1-install-keploy", title: "Install Keploy", step: 1 },
  { id: "step-2-run-the-sample-app", title: "Run the sample app", step: 2 },
  { id: "step-3-record-test-cases", title: "Record test cases", step: 3 },
  { id: "step-4-see-what-keploy-captured", title: "See what was captured", step: 4 },
  { id: "step-5-replay-the-tests-without-mysql", title: "Replay without MySQL", step: 5 },
  { id: "step-6-catch-a-regression", title: "Catch a regression", step: 6 },
  { id: "what-just-happened", title: "What just happened?" },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "wrapping-up", title: "Wrapping up" },
];

export const stepIds = sections.filter((s) => s.step).map((s) => s.id);
