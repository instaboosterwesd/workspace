---
name: Preview workflow runtime
description: Running an imported Bun/Vite repository through a managed preview workflow.
---

Managed preview workflows may not expose a repository's local `.bin` commands even when dependencies are installed. Invoke the exact local Vite entrypoint with Node when needed, and explicitly allow Replit proxy hosts in Vite server/preview settings. Imported Lovable projects may also contain `.asset.json` manifests whose hosted media must be mirrored under the manifest URL path for local preview.

**Why:** A workflow using the package script failed with `vite: command not found`, while the locked local Vite package and its direct entrypoint worked. Replit's proxy then blocked an unlisted host, and the migrated app showed broken images until its original hosted asset URLs were made available locally.

**How to apply:** Preserve the imported repository and lockfile; configure only the external workflow command to call `node node_modules/vite/bin/vite.js`. Set `server.allowedHosts` and `preview.allowedHosts` to `true` in Vite config. For each asset manifest, serve the original URL path from `public/` without changing app source imports.