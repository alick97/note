# git worktree

{% tag 'created','20260908' %} {% endtag %} {% tag 'updated','20260908' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

> [https://git-scm.com/docs/git-worktree](https://git-scm.com/docs/git-worktree)

Git Worktree: Complete Tutorial & Practical Guide
git worktree allows you to check out multiple branches at the same time across different directories from a single local Git repository.
Unlike traditional branching (git checkout / git switch), where switching branches alters the contents of your current working directory, Worktree maintains independent filesystem directories sharing the same underlying .git database.

1. Core Architecture
~/projects/my-app/                 <-- Main Repository Directory (on 'main')
    ├── .git/                      <-- Shared Git Object Database & History
    └── src/ ...

~/projects/my-app-hotfix/          <-- Worktree Directory 1 (on 'hotfix-1.0.1')
    ├── .git (Pointer file referencing the main .git directory)
    └── src/ ...

~/projects/my-app-feat-auth/       <-- Worktree Directory 2 (on 'feature/auth')
    ├── .git (Pointer file)
    └── src/ ...
2. Common Workflows & Command Examples
Scenario A: Urgent Production Hotfix (Without Stashing)
You are in the middle of writing uncommitted code on feature/auth in ~/projects/my-app, and an urgent production bug arises.
# 1. Create a new worktree directory alongside your current repo and branch from 'main'
git worktree add -b hotfix-1.0.1 ../my-app-hotfix main

# 2. Navigate to the isolated hotfix directory
cd ../my-app-hotfix

# 3. Make changes, run tests, commit, and push
git commit -am "fix: resolve null pointer in payment gateway"
git push origin hotfix-1.0.1

# 4. Return to your primary working directory
cd ../my-app

# 5. Clean up the worktree directory once finished
git worktree remove ../my-app-hotfix
Scenario B: Parallel Review / Testing an Existing Remote Branch
When you need to test a colleague's PR or pull a remote branch without disrupting your local dev server:
# Fetch latest remote references
git fetch origin

# Check out remote branch 'feature/search' into a dedicated worktree directory
git worktree add ../my-app-search feat/search

cd ../my-app-search
# Run tests, install dependencies, or start an independent dev server
Scenario C: Detached Worktree for Safe Experiments / AI Agents
When running benchmark tests, LLM coding agents, or temporary refactors without polluting your branch list:
# Create an ephemeral detached worktree
git worktree add --detach ../my-app-experiment main

cd ../my-app-experiment
# Run experimental builds or AI modifications...

# Forcefully remove when done (discards uncommitted experiments)
cd ../my-app
git worktree remove --force ../my-app-experiment
3. Worktree Management & Housekeeping
List Active Worktrees
git worktree listSample Output:
/Users/user/projects/my-app          8f2a1b4 [main]
/Users/user/projects/my-app-hotfix   c4e8921 [hotfix-1.0.1]Lock / Protect a Worktree
Prevent accidental deletion or automatic pruning of a long-running worktree (e.g., on an external mount):
git worktree lock ../my-app-hotfix --reason "Waiting for QA approval"
git worktree unlock ../my-app-hotfixPrune Stale Metadata
If you deleted a worktree folder directly via rm -rf instead of git worktree remove:
git worktree prune
4. Key Rules & Pitfalls

Branch Exclusivity Rule:

A single local branch cannot be checked out in two worktrees simultaneously.
Attempting to checkout a branch already active elsewhere triggers:fatal: 'main' is already checked out at '/path/to/main-dir'
Fix: Create a new tracking/feature branch (git worktree add -b <new-branch> ...) or use --detach.

Dependency & Build Isolation:

Each worktree has its own filesystem state. Build artifacts, node_modules, virtual environments, or .env files must be installed/configured independently inside each new worktree folder.

5. Productivity Aliases (Add to ~/.gitconfig)
[alias]
    wl = worktree list
    wa = worktree add
    wd = worktree add --detach
    wr = worktree remove
    wp = worktree prune
