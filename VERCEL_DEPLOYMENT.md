# 🚀 Deploying IdeaFlow Frontend to Vercel

This guide explains how to deploy the IdeaFlow (React + Vite) frontend to Vercel and connect it to your Render backend.

## Prerequisites
- A [Vercel](https://vercel.com) account.
- Your code pushed to a GitHub, GitLab, or Bitbucket repository.
- The Render backend URL: `https://ideaflow-backend-xerc.onrender.com`.

## Deployment Steps

### 1. Import Project
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project**.
3. Import your repository.
4. If your project is in a monorepo (like `ideaflow/frontend`), set the **Root Directory** to `ideaflow/frontend`.

### 2. Configure Build Settings
Vercel usually detects Vite automatically, but ensure these settings are correct:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build` or `vite build`
- **Output Directory**: `dist`

### 3. Set Environment Variables
This is the most critical step to connect to your backend.
1. Expand the **Environment Variables** section.
2. Add the following key-value pair:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://ideaflow-backend-xerc.onrender.com`
3. Click **Add**.

### 4. Deploy
1. Click **Deploy**.
2. Once the build is finished, Vercel will provide you with a production URL (e.g., `ideaflow-frontend.vercel.app`).

## Handling Client-Side Routing (Crucial)
Since this is a Single Page Application (SPA), you need to tell Vercel to redirect all requests to `index.html` so that `react-router-dom` can handle them.

### Create `vercel.json`
I have already pre-configured this for you. Ensure a `vercel.json` file exists in your `frontend` root with the following content:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Post-Deployment Checklist
- [ ] **CORS**: Ensure your backend (Render) has your Vercel URL in its `ALLOW_ORIGINS` list.
- [ ] **Authentication**: Test login/signup on the live Vercel URL.
- [ ] **HTTPS**: Vercel provides SSL by default, so ensure your API calls use `https`.

---
**Note:** If you make changes to your code and push to GitHub, Vercel will automatically trigger a new deployment.
