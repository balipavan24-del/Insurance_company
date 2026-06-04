# Vercel Deploy Checklist (InsureEase)

Use this quick guide whenever you want to deploy manually from terminal.

## 1) One-time setup (first time on a machine)

```bash
vercel login
vercel link
```

- `vercel login`: connects CLI to your Vercel account.
- `vercel link`: links this local folder to a Vercel project.

## 2) Before deploy

```bash
npm run build
```

- Make sure local build passes before uploading.

## 3) Deploy types

### A) Preview deploy (for testing)

```bash
vercel
```

- Creates a preview URL.
- Safe for checking UI before production.

### B) Production deploy (live)

```bash
vercel --prod
```

- Pushes the current project state to production.

## 4) What each URL means

- **Production deployment URL**: exact deployed build URL (usually unique each deploy).
- **Aliased URL**: stable/friendly URL pointing to latest production deployment.
- **Deployment inspect URL**: Vercel dashboard page with logs and build details.

## 5) Useful commands

```bash
vercel ls
vercel inspect <deployment-url>
```

- `vercel ls`: list recent deployments.
- `vercel inspect`: see build logs/status for one deployment.

## 6) Recommended workflow (daily)

```bash
git add .
git commit -m "your message"
git push
npm run build
vercel --prod
```

## 7) Fast troubleshooting

- Build fails locally: fix code first, run `npm run build` again.
- Deploy succeeds but UI old: hard refresh browser (`Ctrl + Shift + R`).
- Wrong project deployed: run `vercel link` and select correct project.
- Need detailed logs: open the **Deployment inspect URL**.

