# Security policy

## Supported code

Security fixes target the latest code on `main` and the site built from it at
[design.zeyadomran.com](https://design.zeyadomran.com). Older commits, archived
research bundles, and preview deployments are not maintained as separate
supported releases.

This policy covers this repository, its build and automation, and its published
site. Websites studied or linked by the research library belong to their
respective owners; report vulnerabilities in those services to their owners.

## Report a vulnerability privately

Use GitHub's [private vulnerability reporting form](https://github.com/zeyadomran/behind-the-interface/security/advisories/new).
You can also open the repository's **Security** tab and choose **Report a
vulnerability**. A GitHub account is required to use this process.

Please include:

- The affected page, file, dependency, or workflow, and the relevant commit or
  deployment URL if known.
- Clear reproduction steps and a minimal proof of concept.
- The expected security impact and any conditions required to reproduce it.
- Relevant logs or screenshots with credentials and personal data removed.

For dependency vulnerabilities, include the advisory identifier and the affected
dependency path when available.

For an exposed secret, report its location and type without copying the live
credential into the report. If you control the credential, revoke or rotate it
promptly; deleting it from a file does not invalidate it.

Keep suspected vulnerabilities out of public issues, pull requests, and commit
messages until disclosure has been coordinated through the private report.
Share only the information needed to reproduce the issue. Use a local copy
where possible and avoid accessing other people's data or disrupting services.

The maintainer will use the private report to discuss reproduction, impact,
remediation, and disclosure. This is a personally maintained project, so no
fixed response or remediation timeline is promised.

## Other reports

Ordinary bugs, accessibility issues, and feature requests can use
[GitHub Issues](https://github.com/zeyadomran/behind-the-interface/issues).

See [repository security and contribution checks](docs/github-security.md) for
the enforced branch rules, automated scans, and local validation workflow.
