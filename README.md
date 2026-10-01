# Khadijetou

End-to-end test for `https://aouzgaga.github.io/formation-gh-api/`.

Install the browser once with `npx playwright install chromium`, then run the
test with `npm test`.

Playwright captures a screenshot after every test, whether it passes or fails.
Locally, find the screenshots in `test-results/`. In GitHub Actions, download
the `playwright-test-evidence` artifact from the workflow run; it is uploaded
even when a test fails.

Playwright also generates an HTML test report in `playwright-report/`. Open it
locally with `npx playwright show-report`. In GitHub Actions, download the
`playwright-test-report` artifact, including when a test fails.
