# AI Interaction Guidelines

## Notes and Memory

- Do **not** use Claude's persistent memory for this project. Keep all working notes, decisions, and status in the `context/*.md` files so they live in the repo.
- Where things live: decisions and approved content → `context/phase-1-plan.md` (decision log); current status → `context/current-feature.md`; styling source of truth → `context/styling-reference.md` + `ahmed-portfolio-prototype.html`.

## Content Rules (approved in Phase 1 — apply to all copy in later phases)

- De-emphasize bilingualism: mention Arabic/English support at most once per section, as a plain capability, never as a selling theme.
- Never invent facts, metrics, years of experience, or client counts; every claim must be verifiable.
- Never present Ahmed as a 3D modeler/artist — models are Meshy AI-generated; the verified skill is building interactive 3D web experiences (React Three Fiber).
- First-person singular voice ("I" / «أبني»); brand "Ahmed Webcraft / أحمد لصناعة الويب" in navbar/footer/metadata; "Ahmed" in prose.
- Arabic copy is written natural, never a literal mirror of the English.

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification

## Workflow

This is the common workflow that we will use for every single feature/fix:

1. **Document** - Document the feature in @context/current-feature.md.
2. **Branch** - Create new branch for feature, fix, etc
3. **Implement** - Implement the feature/fix that I create in @context/current-feature.md
4. **Test** - Verify it works in the browser. Implement unit testing later. Run `npm run build` and fix any errors
5. **Iterate** - Iterate and change things if needed
6. **Commit** - Only after build passes and everything works
7. **Merge** - Merge to main
8. **Delete Branch** - Delete branch after merge
9. **Review** - Review AI-generated code periodically and on demand.
10. Mark as completed in @context/current-feature.md and add to history

Do NOT commit without permission and until the build passes. If build fails, fix the issues first.

## Branching

We will create a new branch for every feature/fix. Name branch **feature/[feature]** or **fix[fix]**, etc. Ask to delete the branch once merged.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages (feat:, fix:, chore:, etc.)
- Keep commits focused (one feature/fix per commit)
- Never put "Generated With Claude" in the commit messages

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase

## Code Review

Review AI-generated code periodically, especially for:

- Security (auth checks, input validation)
- Performance (unnecessary re-renders, N+1 queries)
- Logic errors (edge cases)
- Patterns (matches existing codebase?)
