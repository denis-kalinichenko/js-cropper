# Releasing

1. Update the version number in these files:
    - `package.json`
    - `bower.json`
    - `README.md`

1. Update `CHANGELOG.md`. We follow the guidelines from [Keep a CHANGELOG].

1. Commit changes. Use the JIRA issue key in your commit message.

1. Run `npm test`. Check if any error/warning messages exists and fix.

1. Make new build, run `npm run dist && npm run lib`. Commit it.

1. Create a Pull Request.

1. Tag version (e. g. `git tag -a vX.X.X -m "Release version X.X.X"`).

1. Run `npm run dist && npm run lib && npm publish`, which publishes the new version to [our private npm’s registry] (if
   releasing a pre-release, run `npm publish --tag beta`).

[Keep a CHANGELOG]: http://keepachangelog.com
[our private npm’s registry]: http://confluence.code.g2a.com/x/RwAi
