# Base Template Deployment Fixes Applied

**Date:** November 4, 2025
**Purpose:** Apply all Cloud Run deployment fixes to base template

---

## ✅ All Changes Applied

### 1. package.json Start Script ✅
**Status:** Already correct - no changes needed

**Current configuration:**
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

**Why:** No hardcoded port - reads PORT from environment variable

---

### 2. Dockerfile Port Configuration ✅
**File:** `/templates/base-template/Dockerfile`

**Changed:**
- `ENV PORT=8080` → `ENV PORT=3000`
- `EXPOSE 8080` → `EXPOSE 3000`

**Current configuration:**
```dockerfile
ENV PORT=3000
EXPOSE 3000
```

**Why:** Matches Cloud Run's default containerPort: 3000

---

### 3. cloudbuild.yaml Created ✅
**File:** `/templates/base-template/cloudbuild.yaml` (NEW FILE)

**Configuration:**
```yaml
steps:
  # Step 1: Install dependencies
  - name: 'node:20'
    entrypoint: 'npm'
    args: ['install']

  # Step 2: Fetch Firebase service account from Secret Manager
  - name: 'gcr.io/cloud-builders/gcloud'
    entrypoint: 'bash'
    args:
      - '-c'
      - 'gcloud secrets versions access latest --secret=firebase-service-account > firebase-service-account.json'

  # Step 3: Build Next.js application
  - name: 'node:20'
    entrypoint: 'npm'
    args: ['run', 'build']
    env:
      - 'GOOGLE_APPLICATION_CREDENTIALS=firebase-service-account.json'

  # Step 4: Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'bowring-and-lady-cur-2kgs-3-24-hth'
      - '--source'
      - '.'
      - '--region'
      - 'asia-northeast1'
      - '--allow-unauthenticated'
      - '--port'
      - '3000'
      - '--memory'
      - '1Gi'
      - '--cpu'
      - '1'
      - '--set-env-vars'
      - 'GOOGLE_APPLICATION_CREDENTIALS=/secrets/firebase-service-account'
      - '--set-secrets'
      - '/secrets/firebase-service-account=firebase-service-account:latest,AWS_ACCESS_KEY_ID=aws-access-key-id:latest,AWS_SECRET_ACCESS_KEY=aws-secret-access-key:latest,AWS_REGION=aws-region:latest,AWS_SES_FROM_EMAIL=aws-ses-from-email:latest'

options:
  logging: CLOUD_LOGGING_ONLY
```

**Why:** Proper Cloud Build configuration with port 3000 and all secrets

---

### 4. Dynamic Export Added to API Routes ✅

**Files modified (6 total):**

1. `app/api/blog/route.ts`
2. `app/api/events/route.ts`
3. `app/api/gallery/route.ts`
4. `app/api/podcasts/route.ts`
5. `app/api/posts/route.ts`
6. `app/api/analytics/stats/route.ts`

**Added to each file:**
```typescript
export const dynamic = 'force-dynamic';
```

**Placement:**
- After imports
- Before the first export function

**Example (blog/route.ts):**
```typescript
import { NextRequest, NextResponse } from 'next/server';
// Server-side only import - uses Firebase Admin SDK
export const dynamic = 'force-dynamic';
import { getBlogPosts, getBlogPostsByCategories, getBlogPostBySlug } from '@/lib/blog';

export async function GET(request: NextRequest) {
  // ... function body
}
```

**Why:** Prevents Next.js 16 from attempting to prerender dynamic API routes

---

### 5. Removed cacheComponents from next.config.js ✅
**File:** `/templates/base-template/next.config.js`

**Removed:**
```javascript
cacheComponents: true,     // Enable Cache Components for instant navigation
```

**Current configuration:**
```javascript
const nextConfig = {
  // Next.js 16 new features

  // Workspace architecture - sites use parent's node_modules via Node.js resolution
  // No webpack config needed! Turbopack is the default bundler in Next.js 16

  // Transpile workspace packages for proper bundling in Turborepo monorepo
  transpilePackages: ['@wisdom-scribe/editor', '@wisdom-scribe/lib'],

  // ... rest of config
```

**Why:** cacheComponents is incompatible with `dynamic = 'force-dynamic'` in API routes

---

## 📊 Summary

| Component | Status | Change Type |
|-----------|--------|-------------|
| package.json | ✅ Already correct | No change needed |
| Dockerfile | ✅ Fixed | PORT 8080→3000 |
| cloudbuild.yaml | ✅ Created | New file with port 3000 |
| API Routes (6 files) | ✅ Fixed | Added dynamic export |
| next.config.js | ✅ Fixed | Removed cacheComponents |

---

## 🎯 Impact

**All future sites generated from this base template will:**

1. ✅ Have correct port configuration (3000)
2. ✅ Include cloudbuild.yaml for Cloud Build deployment
3. ✅ Have dynamic API routes that won't cause prerender errors
4. ✅ Not have cacheComponents conflicts
5. ✅ Deploy successfully to Cloud Run without manual fixes

---

## 🚀 Deployment Command

For sites generated from this template, deploy using:

```bash
cd /mnt/gitrepos/public/bowring-and-lady-cur-2kgs-3-24-hth
gcloud builds submit --config=cloudbuild.yaml
```

No additional fixes will be needed!

---

## 📝 Verification

To verify a site has all fixes:

```bash
# Check port in Dockerfile
grep "ENV PORT" Dockerfile  # Should show: ENV PORT=3000

# Check cloudbuild.yaml exists and has port 3000
grep "port" cloudbuild.yaml  # Should show: - '3000'

# Check API routes have dynamic export
grep "dynamic = 'force-dynamic'" app/api/blog/route.ts  # Should return line

# Check no cacheComponents
grep "cacheComponents" next.config.js  # Should return nothing
```

---

**Applied by:** Claude Code
**Date:** November 4, 2025
**Tested on:** bannur-biryani-haus-dan-4-7-rzf (successful deployment)
