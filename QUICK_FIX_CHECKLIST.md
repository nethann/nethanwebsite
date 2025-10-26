# 🚨 Quick Action Checklist - API Key Exposure

## ⏰ DO THIS NOW (15-20 minutes)

### ✅ Step 1: Rotate YouTube API Key (5 min)
**This is the key that triggered GitHub's alert**

1. Go to https://console.cloud.google.com/apis/credentials
2. **DELETE** key: `AIzaSyCBI8WT8ZRWR5cIL9TIZPL2KvFd6KAlRwA`
3. Click "Create Credentials" → "API Key"
4. Copy the new key
5. Add HTTP referrer restrictions:
   ```
   http://localhost:3000/*
   http://localhost:*
   https://*.vercel.app/*
   https://yourdomain.com/*
   ```
6. Restrict to: "YouTube Data API v3"
7. Save

**Update your .env:**
```bash
REACT_APP_YOUTUBE_API_KEY=YOUR_NEW_KEY_HERE
```

---

### ✅ Step 2: Rotate Firebase API Key (5 min)

1. Go to https://console.firebase.google.com/
2. Project Settings → General
3. Under "Your apps", add domain restrictions
4. OR create a new Firebase project (safer)

**Update your .env:**
```bash
REACT_APP_FIREBASE_API_KEY=YOUR_NEW_KEY_HERE
```

---

### ✅ Step 3: Rotate EmailJS Credentials (3 min)

1. Go to https://dashboard.emailjs.com/
2. Email Services → Create new service (or note existing ID)
3. Email Templates → Create new template
4. Account → Regenerate public key

**Update your .env:**
```bash
REACT_APP_EMAILJS_SERVICE_ID=YOUR_NEW_SERVICE_ID
REACT_APP_EMAILJS_TEMPLATE_ID=YOUR_NEW_TEMPLATE_ID
REACT_APP_EMAILJS_PUBLIC_KEY=YOUR_NEW_PUBLIC_KEY
```

---

### ✅ Step 4: Clean Git History (5 min)

**Windows (PowerShell):**
```powershell
.\cleanup-git-history.ps1
```

**Mac/Linux (Bash):**
```bash
bash cleanup-git-history.sh
```

**Manual (if scripts don't work):**
```bash
# Remove .env from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: rewrites history)
git push origin --force --all
git push origin --force --tags
```

---

### ✅ Step 5: Verify Everything Works (2 min)

1. **Test YouTube integration:**
   - Open browser console
   - Clear cache: Run the commands from `clear-youtube-cache.js`
   - Refresh page
   - Look for: `[YouTube API] ✅ Successfully fetched`

2. **Test Firebase:** (check if auth/database works)

3. **Test EmailJS:** (send a test contact form)

---

## 📋 Current Exposed Keys

| Service | Key/ID | Risk Level | Status |
|---------|--------|------------|--------|
| YouTube API | `AIzaSyCBI8...KAlRwA` | 🔴 HIGH | ⏳ Needs rotation |
| Firebase API | `AIzaSyBaND...ouWsVw` | 🟡 MEDIUM | ⏳ Needs rotation |
| EmailJS Service | `service_ll8kobo` | 🟢 LOW | ⏳ Needs rotation |
| EmailJS Template | `template_i3gb2es` | 🟢 LOW | ⏳ Needs rotation |
| EmailJS Public | `CIjfNKb1U...FlNTVl` | 🟢 LOW | ⏳ Needs rotation |

---

## 🎯 Priority Order

1. **YouTube API** (triggering GitHub alerts, high quota cost risk)
2. **Firebase API** (database access risk)
3. **EmailJS** (spam risk, but less critical)
4. **Git History Cleanup** (prevent future access)

---

## 📞 Support Links

- **YouTube/Google Cloud:** https://console.cloud.google.com/apis/credentials
- **Firebase:** https://console.firebase.google.com/
- **EmailJS:** https://dashboard.emailjs.com/
- **GitHub Security:** https://github.com/settings/security

---

## ✅ After Everything is Done

- [ ] All API keys rotated
- [ ] `.env` removed from git history
- [ ] Force pushed to GitHub
- [ ] Tested YouTube integration
- [ ] Tested Firebase
- [ ] Tested EmailJS
- [ ] Updated production environment variables (Vercel/Netlify/etc.)
- [ ] Verified no `.env` in `git ls-files`
- [ ] GitHub security alert dismissed

---

**Created:** 2025-10-25
**Time Required:** ~20 minutes
**Read SECURITY_FIX_URGENT.md for detailed instructions**
