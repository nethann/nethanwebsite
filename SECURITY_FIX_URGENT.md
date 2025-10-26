# 🚨 URGENT SECURITY ISSUE - API KEYS EXPOSED

## ⚠️ What Happened

Your `.env` file containing sensitive API keys was committed to your **public GitHub repository** and is visible in the git history. Even though you removed it in commit `9c77fbf`, the keys are still accessible in previous commits.

**Repository:** https://github.com/nethann/nethanwebsite.git

### Exposed API Keys (MUST BE ROTATED):

1. **Firebase API Key:** `AIzaSyBaND8mY7IO_i2BkFIc6S5cy1WmgouWsVw`
2. **YouTube API Key:** `AIzaSyCBI8WT8ZRWR5cIL9TIZPL2KvFd6KAlRwA` ⚠️ This is the one triggering GitHub's alert
3. **EmailJS Service ID:** `service_ll8kobo`
4. **EmailJS Template ID:** `template_i3gb2es`
5. **EmailJS Public Key:** `CIjfNKb1UjuFlNTVl`

---

## 🔥 IMMEDIATE ACTIONS REQUIRED

### Step 1: Rotate ALL API Keys (DO THIS FIRST!)

#### A. Rotate YouTube API Key

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find the key: `AIzaSyCBI8WT8ZRWR5cIL9TIZPL2KvFd6KAlRwA`
3. **Delete it** (don't just restrict it - it's compromised)
4. Click "Create Credentials" → "API Key"
5. Note the new key
6. Configure restrictions:
   - Application restrictions: "HTTP referrers"
   - Add your domains:
     ```
     http://localhost:3000/*
     http://localhost:*
     https://yourdomain.com/*
     ```
   - API restrictions: "Restrict key" → Select "YouTube Data API v3"
7. Click "Save"

#### B. Rotate Firebase API Key

1. Go to: https://console.firebase.google.com/
2. Select your project
3. Go to Project Settings (gear icon)
4. **Option 1 (Recommended):** Create a new Firebase project and migrate
5. **Option 2:** Add domain restrictions:
   - Go to "Authentication" → "Settings" → "Authorized domains"
   - Ensure only your domains are listed
   - Go to Google Cloud Console → "API Credentials" → Restrict the key

#### C. Rotate EmailJS Credentials

1. Go to: https://dashboard.emailjs.com/
2. Sign in
3. Go to "Email Services" → Select your service
4. **Service ID:** Create a new service or note the existing one is public
5. **Template ID:** Create a new template
6. Go to "Account" → "API Keys"
7. **Regenerate** your public key
8. Update your code with new credentials

---

### Step 2: Remove .env from Git History

⚠️ **WARNING:** This will rewrite git history. Coordinate with any collaborators first!

#### Option A: Using git filter-repo (Recommended)

```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove .env from entire git history
git filter-repo --path .env --invert-paths --force

# Force push to GitHub (this rewrites history)
git push origin --force --all
git push origin --force --tags
```

#### Option B: Using BFG Repo-Cleaner (Alternative)

```bash
# Download BFG
# Visit: https://rtyley.github.io/bfg-repo-cleaner/

# Run BFG to remove .env
java -jar bfg.jar --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

#### Option C: Manual removal (if the above tools aren't available)

```bash
# Remove .env from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
git push origin --force --tags
```

---

### Step 3: Update Your Local .env File

After rotating all keys, update your `.env` file:

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=YOUR_NEW_FIREBASE_KEY

# YouTube API Configuration
REACT_APP_YOUTUBE_API_KEY=YOUR_NEW_YOUTUBE_KEY

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=YOUR_NEW_SERVICE_ID
REACT_APP_EMAILJS_TEMPLATE_ID=YOUR_NEW_TEMPLATE_ID
REACT_APP_EMAILJS_PUBLIC_KEY=YOUR_NEW_PUBLIC_KEY
```

---

### Step 4: Verify .env is Not Tracked

```bash
# Confirm .env is in .gitignore
cat .gitignore | grep .env

# Confirm .env is not tracked
git ls-files .env
# (should return nothing)

# If it returns the file, remove it:
git rm --cached .env
git commit -m "Remove .env from tracking"
```

---

### Step 5: Deploy with New Keys

```bash
# Rebuild your project
npm run build

# Deploy to production with new environment variables
# Make sure to update environment variables in your hosting platform:
# - Vercel: Project Settings → Environment Variables
# - Netlify: Site Settings → Environment Variables
# - AWS/Other: Update your deployment configuration
```

---

## 📋 Why This Happened

1. ✅ `.env` is in `.gitignore` (line 15)
2. ❌ `.env` was committed **before** being added to `.gitignore`
3. ❌ Git history contains the old commits with exposed keys
4. ❌ Repository is public on GitHub
5. ✅ GitHub detected the Google API key and sent you an alert

**Timeline:**
- Jul 15, 2025: `.env` first committed (commit `61d892c`)
- Sep 10, 2025: Updated `.env` (commit `c648c53`)
- Oct 10, 2025: Updated `.env` again (commit `e284258`)
- Oct 12, 2025: **Removed `.env` from tracking** (commit `9c77fbf`)
- Today: **GitHub detected exposed key in history**

---

## 🔒 Best Practices Going Forward

### 1. Never Commit Secrets
- Always add `.env` to `.gitignore` **before** first commit
- Use `.env.example` as a template with placeholder values
- Commit `.env.example`, never `.env`

### 2. Use Environment-Specific Files
```
.env                  # Local development (gitignored)
.env.example          # Template (committed)
.env.production       # Production (gitignored, deployed separately)
```

### 3. Pre-commit Hooks
Consider adding a pre-commit hook to prevent committing secrets:

```bash
# Install git-secrets
brew install git-secrets  # macOS
# or download from: https://github.com/awslabs/git-secrets

# Set up
git secrets --install
git secrets --register-aws
```

### 4. Use Secret Scanning Tools
- GitHub now scans for secrets automatically (this is how you got the alert)
- Consider using tools like `truffleHog` or `gitleaks` locally

### 5. API Key Restrictions (Already in .env now)
- **Always** restrict API keys by:
  - Domain/HTTP referrer
  - IP address
  - Specific APIs they can access

---

## ✅ Checklist

- [ ] Rotate YouTube API Key
- [ ] Rotate Firebase API Key
- [ ] Rotate EmailJS credentials
- [ ] Remove `.env` from git history using one of the methods above
- [ ] Force push cleaned history to GitHub
- [ ] Update local `.env` with new keys
- [ ] Update production environment variables
- [ ] Test all API integrations (YouTube, Firebase, EmailJS)
- [ ] Verify `.env` is not in `git ls-files`
- [ ] Consider enabling 2FA on all API provider accounts

---

## 🆘 If You Need Help

1. **GitHub Support:** https://support.github.com/
2. **Google Cloud Support:** https://console.cloud.google.com/support
3. **Firebase Support:** https://firebase.google.com/support
4. **EmailJS Support:** https://www.emailjs.com/docs/

---

## 📊 Damage Assessment

### Low Risk:
- ✅ EmailJS public key (designed to be public, but good to rotate)

### Medium Risk:
- ⚠️ EmailJS service/template IDs (can lead to email spam)
- ⚠️ Firebase API key (with domain restrictions, less dangerous)

### High Risk:
- 🚨 **YouTube API Key** (can be abused, quota theft, costs money)
- 🚨 **Firebase API Key** (if no domain restrictions, database access)

---

**Created:** 2025-10-25
**Status:** URGENT - Requires immediate action
**Affected Repository:** https://github.com/nethann/nethanwebsite.git
