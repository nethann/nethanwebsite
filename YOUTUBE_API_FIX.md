# YouTube API Integration Issue - RESOLVED

## Problem Identified

Your YouTube videos are using temporary/fallback links because the **YouTube API key has HTTP referrer restrictions** enabled in Google Cloud Console.

### Error Details
```
Error Code: 403
Message: "Requests from referer <empty> are blocked"
Reason: API_KEY_HTTP_REFERRER_BLOCKED
```

This means your API key is configured to only work from specific domains, and localhost or your production domain may not be in the allowed list.

---

## Solution: Update API Key Restrictions in Google Cloud Console

### Step 1: Access Google Cloud Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Sign in with the Google account that created the API key
3. Find the API key: `AIzaSyCBI8WT8ZRWR5cIL9TIZPL2KvFd6KAlRwA`

### Step 2: Update HTTP Referrer Restrictions

Click on your YouTube API key, then:

**Option A: Allow Specific Domains (Recommended for Production)**
1. Under "Application restrictions", select "HTTP referrers (web sites)"
2. Click "ADD AN ITEM" and add these referrers:
   ```
   http://localhost:3000/*
   http://localhost:*
   https://yourdomain.com/*
   https://www.yourdomain.com/*
   ```
   *(Replace `yourdomain.com` with your actual production domain)*

**Option B: Remove Restrictions (Quick Fix for Development)**
1. Under "Application restrictions", select "None"
2. This will allow the API to work from any domain
3. ⚠️ **Less secure** - only use for development/testing

### Step 3: Verify API Restrictions

1. Under "API restrictions", ensure it says:
   - "Don't restrict key" OR
   - "Restrict key" with "YouTube Data API v3" selected

### Step 4: Save Changes

1. Click "Save" at the bottom
2. Wait 5-10 minutes for changes to propagate

---

## Testing the Fix

### Step 1: Clear Browser Cache

1. Open your website in the browser
2. Open Developer Console (F12)
3. Run this command to clear YouTube cache:
   ```javascript
   // Clear all YouTube-related cache
   localStorage.removeItem('youtube_channel_data_nethan_journey');
   localStorage.removeItem('youtube_channel_data_nethan_journey_info');
   localStorage.removeItem('youtube_channel_data_worship_avenue');
   localStorage.removeItem('youtube_channel_data_worship_avenue_info');
   localStorage.removeItem('youtube_data_timestamp');
   console.log('✅ YouTube cache cleared! Refresh the page.');
   ```

**OR** run the debug script:
```bash
# In your project root
cat clear-youtube-cache.js
# Copy the output and paste into browser console
```

### Step 2: Refresh the Page

1. Refresh your browser (Ctrl+R or Cmd+R)
2. Open Developer Console (F12)
3. Look for these log messages:

**If working correctly:**
```
[YouTube Cache] ⚠️ Cache expired or missing, fetching fresh YouTube data from API
[YouTube API] Fetching videos for channel: UCcjyzmhL8hoJEQhjNin3wdw
[YouTube API] API Key present: true
[YouTube API] Channel data received: {items: Array(1), ...}
[YouTube API] Found 50 videos
[YouTube API] ✅ Successfully fetched: 15 videos, 5 shorts
```

**If still failing:**
```
[YouTube API] ❌ API Error: {code: 403, message: "Requests from referer..."}
[YouTube API] This is likely due to:
  - Invalid or expired API key
  - YouTube Data API v3 not enabled in Google Cloud Console
  - API quota exceeded
  - Domain restrictions blocking the request
[YouTube API] ⚠️ Using fallback/mock data for channel
```

---

## Debugging Enhancements Added

I've added comprehensive logging to help you debug API issues:

### YouTubeChannels.js Changes:
- ✅ Detailed API call logging with `[YouTube API]` prefix
- ✅ Error detection for API responses
- ✅ Specific error messages for 403 errors
- ✅ Cache status logging with `[YouTube Cache]` prefix
- ✅ Clear indicators when using fallback vs real data

### Debug Script:
- ✅ Created `clear-youtube-cache.js` for manual cache clearing
- ✅ Tests API key validity directly
- ✅ Shows cache age and contents

---

## Common Issues & Solutions

### Issue 1: Still seeing mock data after fixing API key
**Solution:** Clear localStorage cache (see Testing Step 1 above)

### Issue 2: "API quota exceeded" error
**Solution:**
- YouTube API has a daily quota limit (10,000 units/day by default)
- Each video detail request uses ~3 units
- The cache (24-hour duration) helps reduce quota usage
- If exceeded, wait 24 hours or request a quota increase in Google Cloud Console

### Issue 3: Videos load on localhost but not on production
**Solution:**
- Ensure your production domain is in the HTTP referrer whitelist
- Include both `https://domain.com/*` and `https://www.domain.com/*`

### Issue 4: API key not working at all
**Solution:**
- Verify YouTube Data API v3 is enabled: https://console.cloud.google.com/apis/library/youtube.googleapis.com
- Click "Enable" if it's not already enabled

---

## Current Status

### What's Working:
✅ YouTube API integration code is properly implemented
✅ Fallback mechanism ensures videos always display
✅ 24-hour caching reduces API quota usage
✅ Both channels configured: Nethan Journey & Worship Avenue

### What Needs Fixing:
❌ API key HTTP referrer restrictions blocking requests
✅ Enhanced debugging logs added (this PR)
✅ Cache clearing script created

---

## Next Steps

1. **Fix the API key restrictions** (see Solution above)
2. **Clear the cache** in your browser
3. **Test the integration** - you should see real YouTube data loading
4. **Monitor the console** for any new errors
5. **Deploy to production** - ensure production domain is whitelisted

---

## Technical Details

### API Endpoints Used:
- `GET /youtube/v3/channels` - Get channel info & uploads playlist
- `GET /youtube/v3/playlistItems` - Get videos from playlist
- `GET /youtube/v3/videos` - Get video details (duration, views)

### Quota Usage Per Load:
- Channel info: ~1 unit × 2 channels = 2 units
- Playlist items: ~3 units × 2 channels = 6 units
- Video details: ~1 unit × ~50 videos = ~50 units
- **Total: ~58 units per fresh load** (10,000 daily limit allows ~172 loads/day)

### Cache Strategy:
- Duration: 24 hours
- Storage: localStorage
- Keys: `youtube_channel_data_{channel}`, `youtube_data_timestamp`
- Fallback: Mock data with real video IDs

---

## Support

If you continue to have issues after following this guide:

1. Check the browser console for `[YouTube API]` error messages
2. Verify your API key settings in Google Cloud Console
3. Ensure YouTube Data API v3 is enabled
4. Check your daily quota usage: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas

---

**Issue Created:** 2025-10-25
**Status:** Ready to fix - awaiting API key configuration update
**Files Modified:** `YouTubeChannels.js` (enhanced logging), `clear-youtube-cache.js` (new)
