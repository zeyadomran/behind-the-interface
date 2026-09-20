# GitHub Actions and repository protection

Reviewed against the repository and GitHub documentation on September 20, 2026.
This repository is public, uses `main`, and currently has one maintainer.

## Automation

The workflows in `.github/workflows/` provide these checks on every pull request
to `main`, including documentation changes:

| Check                            | What it verifies                                                                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Site validation`                | Node.js 22, bundled Yarn 1.22.22, frozen dependency installation, production build with typechecking, and the existing Node test suite against the generated site. |
| `Dependency review`              | Newly introduced dependencies with known high or critical vulnerabilities. Existing dependency vulnerabilities need Dependabot alerts separately.                  |
| `CodeQL (javascript-typescript)` | CodeQL analysis of application and build code.                                                                                                                     |
| `CodeQL (actions)`               | CodeQL analysis of GitHub Actions workflows.                                                                                                                       |

CI and CodeQL also run on pushes to `main`. CodeQL runs weekly, and CI and
CodeQL support manual dispatch after their workflow files reach the default
branch. Dependency review runs on PRs because it needs a base/head comparison.
CodeQL schedules also become active only after merge.

Dependency graph was enabled as a prerequisite for dependency review. CodeQL
uses the advanced workflow in this repository; do not enable default setup
alongside it. Default setup overrides the advanced configuration.

All referenced actions are pinned to full upstream commit SHAs. Checkout does
not persist Git credentials. Ordinary jobs receive only `contents: read`;
CodeQL alone receives `security-events: write` to upload results. Public PRs run
on GitHub-hosted runners using `pull_request`, with no deployment secrets.
Timeouts bound each job; a newer PR revision cancels its older runs.

`.github/dependabot.yml` checks npm/Yarn dependencies and action pins weekly.
Minor and patch updates are grouped; major updates remain separate. Its default
branch configuration activates after merge. This file configures version
updates; Dependabot alerts and security updates require separate repository
settings. Dependency review uses `high` as its initial failure threshold.

The existing Vercel Git integration owns deployments. These workflows do not
need a Vercel token or duplicate deployment steps. A passing build is not a
browser accessibility or visual review.

Sources: [secure workflow use](https://docs.github.com/en/actions/reference/security/secure-use),
[dependency review](https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/customize-dependency-review-action),
[CodeQL setup](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning),
[Dependabot configuration](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file).

## Proposed default-branch ruleset

These settings are recommendations, not settings applied by adding the workflow
files. In Settings > Rules > Rulesets, create one active branch ruleset named
`Protect main`, targeting the default branch. Public personal repositories
support these rulesets on GitHub Free.

| Setting                           | Recommendation                                                                                                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Require a pull request            | On, with zero required approvals while there is one maintainer.                                                                   |
| Require conversation resolution   | On.                                                                                                                               |
| Require status checks             | Require `Site validation` and `Dependency review` after confirming successful runs. Select GitHub Actions as the expected source. |
| Require branches to be up to date | On, so checks cover changes already merged into `main`.                                                                           |
| Require code scanning results     | Add CodeQL after its first baseline completes; block high/critical security findings and error-level ordinary findings.           |
| Block force pushes                | On.                                                                                                                               |
| Restrict deletions                | On.                                                                                                                               |
| Bypass list                       | Empty for routine work, including administrator roles and automation apps.                                                        |
| Restrict updates/creation         | Off; these broad restrictions can prevent normal PR merges.                                                                       |

Keep the CI job names stable and unique. A successful CodeQL analysis job means
the scanner completed; use the code-scanning results rule to enforce finding
severity. Required-check workflows must not skip whole PRs through path filters.
The expected-source setting prevents another integration from submitting a
required status, but it does not make changes to workflow files trustworthy.
Review `.github/`, build scripts, and dependency changes before merging.

Requiring an approval while working alone would block the maintainer's own PRs:
authors cannot approve their own changes. Once there is a second trusted
reviewer, require one approval, dismiss stale approvals, require approval of the
latest reviewable push, and add CODEOWNERS for `.github/`, `scripts/`, dependency
manifests, and hosting configuration. Activate required code-owner review only
when another eligible reviewer can approve those changes.

Use short-lived feature branches into `main`; a long-lived development branch
adds little value for this site. Enable automatic deletion of merged feature
branches. Keep merge methods flexible initially. Squash merges can simplify
history, but verify Dependabot merges with CodeQL before enforcing squash-only
and linear history. Defer signed-commit requirements until the maintainer and
automation signing paths have been tested. Merge queues are not available to
this personally owned repository.

Rulesets cover routine repository updates; an administrator can still edit the
rules themselves. Stronger separation of duties would require additional
trusted maintainers or organization governance.

Sources: [rulesets and availability](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets),
[available rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets),
[required checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches),
[approval limitations](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews),
[code scanning merge protection](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/manage-your-configuration/set-merge-protection),
[Dependabot CodeQL permissions](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible),
[merge queue availability](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue).

## Proposed repository security settings

In Settings > Advanced Security:

- Enable secret scanning and repository push protection. Review findings and
  rotate exposed credentials if any are found; a scan is not proof that the
  repository never contained a secret.
- Enable Dependabot alerts and security updates, in addition to the weekly
  version-update configuration. Review high/critical alerts promptly, including
  vulnerable development dependencies used during builds.
- Enable private vulnerability reporting and add a `SECURITY.md` that points to
  the private reporting form once it is active.

In Settings > Actions > General:

- Keep restricted workflow token permissions and keep workflow PR
  creation/approval disabled. Both were already configured this way at review.
- Require approval for all external contributors, rather than first-time
  contributors only.
- Allow only the required GitHub actions (`actions/checkout`,
  `actions/setup-node`, `actions/dependency-review-action`, and
  `github/codeql-action`), expanding the allowlist deliberately when needed.
- Require full commit-SHA pins after confirming the workflows pass. Dependabot
  maintains the pins, but its PRs still need review.
- Keep public PR validation on hosted runners. Keep deployment credentials out
  of PR workflows and grant production access only to the deployment system.

Secret scanning and push protection are available for this public repository;
the proposal does not require buying a paid security plan. Account security
should use strong two-factor authentication or a passkey, with recovery methods
kept available. Account authentication was not inspected.

Sources: [feature availability](https://docs.github.com/en/code-security/getting-started/github-security-features),
[Actions repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository).

## Rollout and verification

1. Merge the workflow PR after its CI, dependency review, and CodeQL runs pass.
   Confirm the first default-branch CodeQL baseline completes.
2. Apply the proposed security settings and activate the default-branch
   ruleset using the check names actually reported by GitHub.
3. Use a disposable PR to confirm a failing test blocks merging, then fix it
   and verify the merge becomes available. Inspect the ruleset for force-push,
   deletion, and bypass settings without attempting destructive operations.
4. If releases are introduced later, add a separate `v*` tag ruleset to prevent
   updates and deletions. Treat tag-creation permissions separately, so a
   release actor does not gain permission to rewrite existing release tags.

Workflow execution and branch-rule enforcement are separate verification
steps. Passing workflows do not block merges until the corresponding rules are
enabled.
