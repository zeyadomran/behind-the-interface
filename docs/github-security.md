# GitHub Actions and repository protection

Reviewed against the repository and GitHub documentation on September 20, 2026.
This repository is public, uses `main`, and currently has one maintainer.

## Automation

The workflows in `.github/workflows/` provide these checks on every pull request
to `main`, including documentation changes:

| Check                            | What it verifies                                                                                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Site validation`                | Node.js 22, bundled Yarn 1.22.22, frozen dependency installation, Oxlint, production build with typechecking, and the existing Node test suite against the generated site. |
| `Dependency review`              | Newly introduced dependencies with known high or critical vulnerabilities. Existing dependency vulnerabilities need Dependabot alerts separately.                          |
| `CodeQL (javascript-typescript)` | CodeQL analysis of application and build code.                                                                                                                             |
| `CodeQL (actions)`               | CodeQL analysis of GitHub Actions workflows.                                                                                                                               |

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
Minor and patch version updates are grouped; major version updates remain
separate. npm/Yarn security updates have their own group. Dependabot alerts and
automatic security updates are enabled in repository settings, in addition to
the weekly version updates. Dependency review uses `high` as its failure
threshold. Update PRs must satisfy the same branch rules as other contributions;
they are not automatically merged.

The existing Vercel Git integration owns deployments. These workflows do not
need a Vercel token or duplicate deployment steps. A passing build is not a
browser accessibility or visual review.

Sources: [secure workflow use](https://docs.github.com/en/actions/reference/security/secure-use),
[dependency review](https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/customize-dependency-review-action),
[CodeQL setup](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning),
[Dependabot configuration](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file).

## Enforced default-branch ruleset

The active [Protect main ruleset](https://github.com/zeyadomran/behind-the-interface/rules/23731338)
targets both `main` and the default branch. It was enabled on September 20, 2026,
after the workflow PR and first main-branch CI/CodeQL runs passed. Direct pushes
are blocked, including pushes by the repository administrator. Public personal
repositories support these rulesets on GitHub Free.

| Setting                           | Enforced setting                                                                                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Require a pull request            | On, with zero required approvals while there is one maintainer.                                                       |
| Require conversation resolution   | On.                                                                                                                   |
| Require status checks             | All seven existing PR checks listed below, each bound to its producing GitHub App.                                    |
| Require branches to be up to date | On, so checks cover changes already merged into `main`.                                                               |
| Require code scanning results     | CodeQL must report results; block newly introduced high/critical security findings and error-level ordinary findings. |
| Block force pushes                | On.                                                                                                                   |
| Restrict deletions                | On.                                                                                                                   |
| Bypass list                       | Empty for routine work, including administrator roles and automation apps.                                            |
| Restrict updates/creation         | Off; these broad restrictions can prevent normal PR merges.                                                           |

Required checks are `Site validation`, `Dependency review`,
`CodeQL (javascript-typescript)`, and `CodeQL (actions)` from GitHub Actions;
`CodeQL` from GitHub Advanced Security; and `Vercel` and `Vercel Preview Comments`
from Vercel. The PR branch must be up to date with `main` before merging.
No actor has bypass permission.

GitHub records required checks by name; this is not a wildcard covering checks
added later. Add any new check to this ruleset before relying on it as a merge
gate. GitHub treats successful, neutral, or skipped conclusions as satisfying a
required check, so keep required validation jobs unconditional and do not use
`continue-on-error` to suppress failures. The workflows currently run every
validation job on every PR to `main`.

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
adds little value for this site. Merged feature branches are deleted
automatically. Keep merge methods flexible initially. Squash merges can simplify
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

## Enabled repository security settings

Verified in repository settings on September 20, 2026:

- Secret scanning and repository push protection are enabled. Review findings and
  rotate exposed credentials if any are found; a scan is not proof that the
  repository never contained a secret.
- Dependabot alerts and security updates are enabled, in addition to the weekly
  version-update configuration. Review high/critical alerts promptly, including
  vulnerable development dependencies used during builds.
- Private vulnerability reporting is enabled. [SECURITY.md](../SECURITY.md)
  explains the reporting process and supported scope.
- Merged feature branches are deleted automatically.

The Actions policy enforces:

- Restricted workflow token permissions; workflow PR creation/approval is
  disabled. CodeQL receives its explicitly scoped upload permission.
- Approval for all external contributors.
- An explicit allowlist: `actions/checkout`, `actions/setup-node`,
  `actions/dependency-review-action`, `actions/upload-artifact`, `github/codeql-action/init`, and
  `github/codeql-action/analyze`. Broad GitHub-owned and verified-marketplace
  action allowances are disabled. Add new actions deliberately before using
  them in workflows. GitHub's generated security workflow needs the artifact
  uploader; it remains subject to the same SHA requirement.
- Full commit-SHA pins for actions. Dependabot maintains these pins, and its
  PRs still need review.

Public PR validation uses hosted runners. Deployment remains with the existing
Vercel integration, with no deployment credentials in PR workflows.

These enabled features do not require purchasing a paid security plan for this
public repository. Generic/non-provider secret scanning and partner-token
validity checks are not enabled: their documented eligibility requires an
organization with the appropriate paid Secret Protection plan. GitHub's own
token validity checking is handled separately by the service.

Account security should use strong two-factor authentication or a passkey,
with recovery methods kept available. Account authentication was not inspected
or changed.

Sources: [feature availability](https://docs.github.com/en/code-security/getting-started/github-security-features),
[Actions repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository),
[generic secret patterns](https://docs.github.com/en/code-security/how-tos/secure-your-secrets/detect-secret-leaks/enabling-secret-scanning-for-generic-patterns),
[validity checks](https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/evaluating-alerts).

## Local commit checks

Install dependencies using the bundled Yarn to activate Husky. Before a commit,
lint-staged formats supported staged files with Prettier, then the hook runs
linting, a fresh build with typechecking, and the tests against generated output.
Build-before-test matters because the tests read `dist/`; stale output must not
stand in for current code. These local checks inspect the working tree, which
can include unstaged changes. CI validates the pushed PR revision independently.

Oxlint checks the maintained application, build scripts, and tests. Archived
research, vendored files, and generated output are outside the lint target.
The lint configuration retains intentional ARIA groups/status roles and allows
named scroll regions to receive keyboard focus; it still enforces the configured
accessibility and React hook correctness checks.
CI repeats lint/build/test in the required `Site validation` job. Local hooks
can be bypassed on a developer's machine; the server-side PR rules remain the
enforcement boundary.

## Rollout and verification

1. Workflow setup was merged in [PR #1](https://github.com/zeyadomran/behind-the-interface/pull/1)
   after all seven PR checks passed. Main-branch CI and CodeQL also passed.
2. The `Protect main` ruleset is active. A harmless empty-commit direct push by
   the administrator was rejected by GitHub with repository rule violations.
3. [PR #5](https://github.com/zeyadomran/behind-the-interface/pull/5) verified the
   failure case: six checks passed, the deliberate test failed, and GitHub
   disabled merging. The temporary test was then removed, all seven checks
   passed, and the documentation-only final change merged. Force-push,
   deletion, and empty-bypass settings were inspected without attempting
   destructive operations.
4. If releases are introduced later, add a separate `v*` tag ruleset to prevent
   updates and deletions. Treat tag-creation permissions separately, so a
   release actor does not gain permission to rewrite existing release tags.

Dependency graph, the documented branch rules, and the repository security
settings above are enabled. Local hook and lint configuration is versioned with
the repository. Review the GitHub Security tab for findings; enabling scanners
does not establish that every existing finding has been remediated.
