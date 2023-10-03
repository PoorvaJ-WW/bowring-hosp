# Firebase Library Organization

This directory contains Firebase-related utilities organized by client/server compatibility.

## 🔴 CRITICAL: Client vs Server Imports

**Generated sites use both Firebase Client SDK and Firebase Admin SDK. Keep them separate!**

### File Structure

```
lib/
├── firebase-admin.ts    # ⚠️  Server-only Firebase Admin initialization
├── posts.ts             # ⚠️  Server-only post database operations
├── postUtils.ts         # ✅ Client-safe post utilities
├── blog.ts              # ⚠️  Server-only blog database operations
├── blogUtils.ts         # ✅ Client-safe blog utilities
├── events.ts            # ⚠️  Server-only event database operations
├── eventUtils.ts        # ✅ Client-safe event utilities
├── podcasts.ts          # ⚠️  Server-only podcast database operations
└── podcastUtils.ts      # ✅ Client-safe podcast utilities
```

## Import Rules

### ⚠️ Server-Only Files (uses `firebase-admin`)

**Files:** `posts.ts`, `blog.ts`, `events.ts`, `podcasts.ts`, `firebase-admin.ts`

**Imports:** `import { getAdminDb } from './firebase-admin'`

**Can be imported in:**
- ✅ API Routes (`app/api/**/route.ts`)
- ✅ Server Components (async functions in `page.tsx`)

**Cannot be imported in:**
- ❌ Client Components (files with `'use client'`)
- ❌ Any component that runs in the browser

**Contains:**
- Database queries (`getPosts`, `getBlogPosts`, `getEvents`, `getPodcasts`)
- Firebase Admin operations
- Server-side authentication checks

---

### ✅ Client-Safe Files (no firebase-admin)

**Files:** `postUtils.ts`, `blogUtils.ts`, `eventUtils.ts`, `podcastUtils.ts`

**Imports:** No Firebase imports, or only `firebase/firestore` (client SDK)

**Can be imported in:**
- ✅ Client Components (`'use client'`)
- ✅ Server Components
- ✅ API Routes
- ✅ **Anywhere!**

**Contains:**
- Data transformations (`transformToPostItems`)
- Formatting utilities (`formatDate`, `generateExcerpt`)
- Slug generators (`generatePostSlug`)
- Pure functions with no database access

---

## Examples

### ❌ Wrong - Will Cause Build Errors

```typescript
// ClientComponent.tsx
'use client';

import { transformToPostItems } from '@/lib/posts'; // ❌ ERROR!
// This imports firebase-admin into the browser bundle!
```

**Error you'll see:**
```
Module not found: Can't resolve 'fs'
Module not found: Can't resolve 'net'
Critical dependency: require function is used in a way...
```

### ✅ Correct - Client Component

```typescript
// ClientComponent.tsx
'use client';

import { transformToPostItems } from '@/lib/postUtils'; // ✅ Correct
import type { UserPost } from '@/types/posts';         // ✅ Type import safe
```

### ✅ Correct - API Route

```typescript
// app/api/posts/route.ts

import { getPosts } from '@/lib/posts';                // ✅ Server-side
import { transformToPostItems } from '@/lib/postUtils'; // ✅ Also works here
```

### ✅ Correct - Server Component

```typescript
// app/blog/page.tsx (Server Component - no 'use client')

import { getBlogPosts } from '@/lib/blog';    // ✅ Server-side
import { formatDate } from '@/lib/blogUtils'; // ✅ Also works here
```

---

## Common Functions Reference

### Posts

| Function | File | Where to Import |
|----------|------|-----------------|
| `getPosts()` | `posts.ts` | API routes, Server Components |
| `getPostBySlug()` | `posts.ts` | API routes, Server Components |
| `transformToPostItems()` | `postUtils.ts` | **Anywhere** |
| `formatDate()` | `postUtils.ts` | **Anywhere** |
| `generatePostSlug()` | `postUtils.ts` | **Anywhere** |

### Blog

| Function | File | Where to Import |
|----------|------|-----------------|
| `getBlogPosts()` | `blog.ts` | API routes, Server Components |
| `getBlogPostBySlug()` | `blog.ts` | API routes, Server Components |
| `formatDate()` | `blogUtils.ts` | **Anywhere** |
| `generateExcerpt()` | `blogUtils.ts` | **Anywhere** |
| `generateBlogSlug()` | `blogUtils.ts` | **Anywhere** |

### Events

| Function | File | Where to Import |
|----------|------|-----------------|
| `getEvents()` | `events.ts` | API routes, Server Components |
| `getEventBySlug()` | `events.ts` | API routes, Server Components |
| `getRelatedEvents()` | `events.ts` | API routes, Server Components |
| `formatEventDate()` | `eventUtils.ts` | **Anywhere** |
| `formatEventTime()` | `eventUtils.ts` | **Anywhere** |
| `generateEventSlug()` | `eventUtils.ts` | **Anywhere** |

### Podcasts

| Function | File | Where to Import |
|----------|------|-----------------|
| `getPodcasts()` | `podcasts.ts` | API routes, Server Components |
| `formatDuration()` | `podcastUtils.ts` | **Anywhere** |
| `formatFileSize()` | `podcastUtils.ts` | **Anywhere** |
| `generatePodcastSlug()` | `podcastUtils.ts` | **Anywhere** |

---

## TypeScript Type Imports

Type imports are **always safe** in client components (types are removed at compile time):

```typescript
'use client';

// All of these are safe:
import type { UserPost } from '@/types/posts';
import type { BlogPost } from '@/types/blog';
import type { Event } from '@/lib/events';
import type { Podcast } from '@/lib/podcasts';
```

---

## When Adding New Functions

**Decision Tree:**

1. **Does it query Firebase/database?** → Put in `lib/*.ts` (server-only)
2. **Is it a pure transformation/formatting function?** → Put in `lib/*Utils.ts` (client-safe)
3. **Unsure?** → Default to `lib/*Utils.ts` if possible

---

## Quick Troubleshooting

**Build error mentioning `fs`, `net`, `child_process`, etc.?**
→ You're importing a server-only file in a client component!

**Error: "Module not found: Can't resolve 'firebase-admin'"?**
→ Check your imports - use `*Utils.ts` files in client components

**Want to use a function in a client component?**
→ Check if it exists in `*Utils.ts` first, or move it there if it's safe
