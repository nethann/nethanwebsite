# Git History Cleanup Script (PowerShell)
# This script removes .env file from ALL git history
#
# ⚠️ WARNING: This rewrites git history!
# - Coordinate with collaborators before running
# - All team members will need to re-clone the repository
# - Backup your repo before running this script
#
# Usage: .\cleanup-git-history.ps1

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Git History Cleanup - Remove .env File" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  WARNING: This will rewrite git history!" -ForegroundColor Yellow
Write-Host ""
Write-Host "This script will:"
Write-Host "  1. Remove .env from all commits in history"
Write-Host "  2. Force push to remote (rewrites history)"
Write-Host "  3. Require all collaborators to re-clone"
Write-Host ""

$confirm = Read-Host "Do you want to continue? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Aborted." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Step 1: Creating backup..." -ForegroundColor Green
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = "..\nethanwebsite-backup-$timestamp"
Copy-Item -Path . -Destination $backupDir -Recurse -Force
Write-Host "✅ Backup created at: $backupDir" -ForegroundColor Green

Write-Host ""
Write-Host "Step 2: Checking for .env in git history..." -ForegroundColor Green
$envHistory = git log --all --full-history -- .env 2>&1
if ($envHistory -match "commit") {
    Write-Host "✅ Found .env in git history" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env not found in git history - nothing to clean" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Step 3: Removing .env from git history..." -ForegroundColor Green
Write-Host "This may take a few minutes..." -ForegroundColor Yellow

# Check if git-filter-repo is available
$filterRepoExists = Get-Command git-filter-repo -ErrorAction SilentlyContinue

if ($filterRepoExists) {
    Write-Host "Using git-filter-repo..." -ForegroundColor Cyan
    git filter-repo --path .env --invert-paths --force
    Write-Host "✅ Removed .env using git-filter-repo" -ForegroundColor Green
} else {
    Write-Host "git-filter-repo not found, using git filter-branch..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 For better performance, install git-filter-repo:" -ForegroundColor Cyan
    Write-Host "   pip install git-filter-repo" -ForegroundColor Cyan
    Write-Host ""

    # Fallback to git filter-branch
    git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

    Write-Host "✅ Removed .env using git filter-branch" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 4: Cleaning up repository..." -ForegroundColor Green
git reflog expire --expire=now --all
git gc --prune=now --aggressive
Write-Host "✅ Repository cleaned" -ForegroundColor Green

Write-Host ""
Write-Host "Step 5: Verifying .env is removed..." -ForegroundColor Green
$verifyHistory = git log --all --full-history -- .env 2>&1
if ($verifyHistory -match "commit") {
    Write-Host "❌ ERROR: .env still found in history!" -ForegroundColor Red
    Write-Host "Please try running the script again or use manual cleanup" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ .env successfully removed from all history" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Cleanup Complete!" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Force push to GitHub (this will rewrite remote history):"
Write-Host "   git push origin --force --all" -ForegroundColor Cyan
Write-Host "   git push origin --force --tags" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Notify all collaborators to re-clone the repository"
Write-Host ""
Write-Host "3. Verify on GitHub that .env is gone from history"
Write-Host ""
Write-Host "4. Rotate ALL API keys (see SECURITY_FIX_URGENT.md)"
Write-Host ""
Write-Host "⚠️  DO NOT proceed with force push until you have:" -ForegroundColor Yellow
Write-Host "   - Backed up your repository"
Write-Host "   - Notified all collaborators"
Write-Host "   - Prepared new API keys"
Write-Host ""

$pushConfirm = Read-Host "Push to remote now? (yes/no)"

if ($pushConfirm -eq "yes") {
    Write-Host ""
    Write-Host "Pushing to remote..." -ForegroundColor Green
    git push origin --force --all
    git push origin --force --tags
    Write-Host "✅ Pushed to remote" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 All done! Don't forget to rotate your API keys!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Skipped remote push." -ForegroundColor Yellow
    Write-Host "When ready, run:" -ForegroundColor Cyan
    Write-Host "  git push origin --force --all" -ForegroundColor Cyan
    Write-Host "  git push origin --force --tags" -ForegroundColor Cyan
}
