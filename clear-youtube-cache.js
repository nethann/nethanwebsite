/**
 * YouTube Cache Clearer and API Tester
 *
 * This script helps debug YouTube API integration issues by:
 * 1. Testing the YouTube API key validity
 * 2. Clearing cached data from localStorage
 * 3. Providing diagnostic information
 *
 * Run in browser console: copy and paste this entire file
 */

console.log('=== YouTube API Debug Tool ===\n');

// Step 1: Check current cache state
console.log('1. Current Cache State:');
const cacheKeys = [
  'youtube_channel_data_nethan_journey',
  'youtube_channel_data_nethan_journey_info',
  'youtube_channel_data_worship_avenue',
  'youtube_channel_data_worship_avenue_info',
  'youtube_data_timestamp'
];

cacheKeys.forEach(key => {
  const value = localStorage.getItem(key);
  if (value) {
    if (key === 'youtube_data_timestamp') {
      const timestamp = parseInt(value);
      const date = new Date(timestamp);
      const age = Date.now() - timestamp;
      const hoursOld = (age / (1000 * 60 * 60)).toFixed(2);
      console.log(`   ${key}: ${date.toLocaleString()} (${hoursOld} hours old)`);
    } else {
      try {
        const data = JSON.parse(value);
        if (data.videos) {
          console.log(`   ${key}: ${data.videos.length} videos, ${data.shorts?.length || 0} shorts`);
        } else {
          console.log(`   ${key}: ${JSON.stringify(data).substring(0, 100)}...`);
        }
      } catch (e) {
        console.log(`   ${key}: ${value.substring(0, 100)}...`);
      }
    }
  } else {
    console.log(`   ${key}: (not set)`);
  }
});

// Step 2: Test API Key
console.log('\n2. Testing YouTube API Key:');
const API_KEY = 'AIzaSyCBI8WT8ZRWR5cIL9TIZPL2KvFd6KAlRwA';

fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCcjyzmhL8hoJEQhjNin3wdw&key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.log('   ❌ API Key Error:', data.error.message);
      console.log('   Error Code:', data.error.code);
      if (data.error.code === 403) {
        console.log('   → This usually means:');
        console.log('      - API key is invalid/expired');
        console.log('      - YouTube Data API v3 is not enabled');
        console.log('      - Domain restrictions are blocking the request');
      }
    } else if (data.items && data.items.length > 0) {
      console.log('   ✅ API Key is valid!');
      console.log('   Channel Title:', data.items[0].snippet.title);
      console.log('   Channel Description:', data.items[0].snippet.description.substring(0, 100) + '...');
    } else {
      console.log('   ⚠️ Unexpected response:', data);
    }
  })
  .catch(error => {
    console.log('   ❌ Network Error:', error.message);
  });

// Step 3: Clear cache
console.log('\n3. Clearing YouTube Cache:');
let clearedCount = 0;
cacheKeys.forEach(key => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
    clearedCount++;
    console.log(`   ✅ Cleared: ${key}`);
  }
});

if (clearedCount === 0) {
  console.log('   ℹ️ No cache to clear');
} else {
  console.log(`\n   Total cleared: ${clearedCount} items`);
  console.log('   🔄 Refresh the page to fetch fresh data from YouTube API');
}

console.log('\n=== End Debug Tool ===');
