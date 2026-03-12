# Git workflow (Clawd monorepo)

This repo is a **monorepo** (multiple projects under one `/clawd`).

## What we track vs ignore

Tracked:
- `sites/` (websites)
- `scripts/` (automation, utilities)
- docs (`docs/` and top-level `*.md`)

Ignored (by default):
- build outputs: `dist/`, `out/`, `.astro/`
- dependencies: `node_modules/`
- macOS junk: `.DS_Store`
- personal assistant context/memory: `memory/`, `MEMORY.md`, etc.
- root one-offs: `leads_masterplan_*.csv`, `nexo-digital-ops_v*.html`, root `package*.json`

Check `.gitignore` if you’re unsure.

## Day-to-day commands

See what changed:
```bash
git status
```

Review changes:
```bash
git diff
```

Stage and commit:
```bash
git add -A
# or stage only a folder
# git add sites/nexo-sites

git commit -m "Describe the change"
```

Sync (only if a remote is set up):
```bash
git pull --rebase
# work...
git push
```

## Commit message style

Use short, action-oriented messages:
- `Add FAQ section to home page`
- `Tighten hero copy`
- `Ignore local root artifacts`

If a change touches multiple areas, prefer multiple small commits.

## Using VS Code as the Git editor (recommended)

Set once:
```bash
git config --global core.editor "code --wait"
```

## Fixing author/email on commits (VS Code step-by-step)

### 1) Set your global identity
```bash
git config --global user.name "lauriano porras"
git config --global user.email "lauriano.porras@gmail.com"
```

Verify:
```bash
git config --global --get user.name
git config --global --get user.email
```

### 2) Rewrite commit authors (interactive rebase)

> Only do this **before** pushing to a shared remote, or coordinate with collaborators.

Start the rebase from the first commit:
```bash
git rebase -i --root
```

VS Code opens a todo list like:
```
pick <hash> message
pick <hash> message
```

Change `pick` → `edit` for commits you want to fix.

Then:
- Save (`Cmd+S`)
- Close the tab

Git will stop at the first `edit`. For each stop run:
```bash
git commit --amend --reset-author --no-edit
git rebase --continue
```

### If you get stuck (rebase already in progress)

Check state:
```bash
git status
```

Then choose one:
- Continue:
  ```bash
  git rebase --continue
  ```
- Abort and return to previous state:
  ```bash
  git rebase --abort
  ```

## Conflict quick basics

If Git reports a conflict:
1) Open conflicted files, search for `<<<<<<<` / `=======` / `>>>>>>>`
2) Decide what to keep
3) Mark resolved:
```bash
git add <file>
```
4) Continue:
```bash
git rebase --continue
```

## Recommended repo structure

- `sites/<project>/` — each website (Astro, Next, static, etc.)
- `scripts/` — one-off automation + utilities
- `docs/` — reusable notes (Git, deployment, copy frameworks, checklists)

