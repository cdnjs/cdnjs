Checklist for **Pull request** or **lib adding request issue** follows the conventions.

Note that if you are using a distribution purpose repository/package, please also provide the url and other related info like popularity of the source code repo/package.

# Profile of the lib
 * Git repository (required):
 * Official website (optional, not the repository):
 * NPM package url (optional):
 * GitHub / Bitbucket popularity (required):
   - Count of stars:
   - Count of watchers:
   - Count of forks:
 * NPM download stats (optional):
   - Downloads in the last day:
   - Downloads in the last week:
   - Downloads in the last month:

# Essential checklist
 * [ ] I'm the author of this library
   * [ ] I would like to add link to the page of this library on CDNJS on website / readme
 * [ ] This lib was not found on cdnjs repo
 * [ ] No already exist / duplicated issue and PR
 * [ ] The lib has notable popularity
   * [ ] More than 100 [Stars / Watchers / Forks] on [GitHub / Bitbucket]
   * [ ] More than 500 downloads stats per month on npm registry
 * [ ] Project has public repository on famous online hosting platform (or been hosted on npm)

# Auto-update checklist
 * [ ] Has valid tags for each versions (for git auto-update)
 * [ ] Auto-update setup
 * [ ] Auto-update target/source is valid.
 * [ ] Auto-update filemap is correct.

# Git commit checklist
 * [ ] The first line of commit message is less then 50 chars, be clean and clear, easy to understand.
 * [ ] The parent of the commit(s) in the PR is not old than 3 days.
 * [ ] Pull request is sending from a non-master branch with meaningful name.
 * [ ] Separate unrelated changes into different commits.
 * [ ] Use rebase to squash/fixup dummy/unnecessary commits into only one commit.
 * [ ] Close corresponding issue in commit message
 * [ ] Mention related issue(s), people in commit message, comment.
