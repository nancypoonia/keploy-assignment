export const site = {
  title: "Record & replay Go API tests with Keploy",
  description:
    "A beginner-friendly, tested walkthrough of Keploy's Go Mux + MySQL quickstart: record real API traffic, then replay it as tests with the database switched off.",
  // Public source repository for this site.
  repoUrl: "https://github.com/nancypoonia/keploy-go-mux-mysql-tutorial",
  author: "Nancy Poonia",
};

/** Environment the tutorial was actually run in (3 Oct 2026). */
export const runFacts: [string, string][] = [
  ["Keploy", "3.6.87, open-source build"],
  ["Sample", "samples-go/mux-mysql @ 2b0a034"],
  ["Go", "1.24.7"],
  ["MySQL", "8.0.46"],
  ["OS", "Ubuntu 24.04, Linux 6.18"],
  ["Tested on", "3 October 2026"],
  ["Result", "4/4 passed, MySQL stopped"],
];

/** Table of contents. Ids are generated from the headings by rehype-slug. */
export const sections: { id: string; title: string }[] = [
  { id: "what-youll-build", title: "What you'll build" },
  { id: "what-is-keploy", title: "What is Keploy?" },
  { id: "prerequisites", title: "Prerequisites" },
  { id: "step-1-install-keploy", title: "1. Install Keploy" },
  { id: "step-2-run-the-sample-app", title: "2. Run the sample app" },
  { id: "step-3-record-test-cases", title: "3. Record test cases" },
  { id: "step-4-see-what-keploy-captured", title: "4. See what was captured" },
  { id: "step-5-replay-the-tests-without-mysql", title: "5. Replay without MySQL" },
  { id: "step-6-catch-a-regression", title: "6. Catch a regression" },
  { id: "what-just-happened", title: "What just happened?" },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "wrapping-up", title: "Wrapping up" },
];
