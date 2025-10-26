#!/bin/bash

# Git History Cleanup Script
# This script removes .env file from ALL git history
#
# ⚠️ WARNING: This rewrites git history!
# - Coordinate with collaborators before running
# - All team members will need to re-clone the repository
# - Backup your repo before running this script
#
# Usage: bash cleanup-git-history.sh

set -e  # Exit on error

echo "=================================================="
echo "  Git History Cleanup - Remove .env File"
echo "=================================================="
echo ""
echo "⚠️  WARNING: This will rewrite git history!"
echo ""
echo "This script will:"
echo "  1. Remove .env from all commits in history"
echo "  2. Force push to remote (rewrites history)"
echo "  3. Require all collaborators to re-clone"
echo ""
read -p "Do you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "Step 1: Creating backup..."
BACKUP_DIR="../nethanwebsite-backup-$(date +%Y%m%d-%H%M%S)"
cp -r . "$BACKUP_DIR"
echo "✅ Backup created at: $BACKUP_DIR"

echo ""
echo "Step 2: Checking for .env in git history..."
if git log --all --full-history -- .env | grep -q "commit"; then
    echo "✅ Found .env in git history"
else
    echo "⚠️  .env not found in git history - nothing to clean"
    exit 0
fi

echo ""
echo "Step 3: Removing .env from git history..."
echo "This may take a few minutes..."

# Method 1: Try git filter-repo (recommended)
if command -v git-filter-repo &> /dev/null; then
    echo "Using git-filter-repo..."
    git filter-repo --path .env --invert-paths --force
    echo "✅ Removed .env using git-filter-repo"
else
    echo "git-filter-repo not found, using git filter-branch..."

    # Method 2: Fallback to git filter-branch
    git filter-branch --force --index-filter \
        "git rm --cached --ignore-unmatch .env" \
        --prune-empty --tag-name-filter cat -- --all

    echo "✅ Removed .env using git filter-branch"
fi

echo ""
echo "Step 4: Cleaning up repository..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive
echo "✅ Repository cleaned"

echo ""
echo "Step 5: Verifying .env is removed..."
if git log --all --full-history -- .env | grep -q "commit"; then
    echo "❌ ERROR: .env still found in history!"
    echo "Please try running the script again or use manual cleanup"
    exit 1
else
    echo "✅ .env successfully removed from all history"
fi

echo ""
echo "=================================================="
echo "  Cleanup Complete!"
echo "=================================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Force push to GitHub (this will rewrite remote history):"
echo "   git push origin --force --all"
echo "   git push origin --force --tags"
echo ""
echo "2. Notify all collaborators to re-clone the repository"
echo ""
echo "3. Verify on GitHub that .env is gone from history"
echo ""
echo "4. Rotate ALL API keys (see SECURITY_FIX_URGENT.md)"
echo ""
echo "⚠️  DO NOT proceed with force push until you have:"
echo "   - Backed up your repository"
echo "   - Notified all collaborators"
echo "   - Prepared new API keys"
echo ""
read -p "Push to remote now? (yes/no): " push_confirm

if [ "$push_confirm" = "yes" ]; then
    echo ""
    echo "Pushing to remote..."
    git push origin --force --all
    git push origin --force --tags
    echo "✅ Pushed to remote"
    echo ""
    echo "🎉 All done! Don't forget to rotate your API keys!"
else
    echo ""
    echo "Skipped remote push."
    echo "When ready, run:"
    echo "  git push origin --force --all"
    echo "  git push origin --force --tags"
fi
