# Firebase Deployment Guide for ADYAANANT

## Error: HTTP 403 - Permission Denied

This error occurs when you don't have sufficient permissions to create or update Firebase Hosting sites in your project.

## Root Cause
- Your Google account doesn't have owner/editor permissions in the Firebase project
- The Firebase project doesn't have billing enabled
- The hosting site configuration is missing in the Firebase Console

## Solution - Complete Fix Guide

### Step 1: Check Firebase Console Access
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **adyaanant-494318**
3. Check that you are the **Owner** or have **Editor** role
   - Go to **Settings** (gear icon) → **Project Settings** → **Members**
   - Verify your email (adyaanant.official@gmail.com) has owner/editor access

### Step 2: Enable Billing (REQUIRED)
1. Firebase Hosting requires billing to be enabled
2. Go to **Settings** → **Billing**
3. Click **Enable Billing**
4. Follow the setup wizard to link your Google Cloud billing account

### Step 3: Create Hosting Site in Firebase Console
1. Go to **Build → Hosting**
2. Click **Get Started** or **Add Site**
3. Enter site ID: **adyaanant-494318**
4. Complete the setup

### Step 4: Verify Authentication is Enabled
1. Go to **Build → Authentication**
2. Click **Get Started**
3. Enable **Email/Password** authentication method

### Step 5: Update Firebase Configuration

**firebase.json** - Already updated ✓

**.firebaserc** - Verify it looks like this:
```json
{
  "projects": {
    "default": "adyaanant-494318"
  }
}
```

### Step 6: Deploy to Firebase

**Option A: Command Line (Recommended)**
```bash
firebase deploy --project adyaanant-494318
```

**Option B: Using Deploy Script**
```bash
deploy.bat
```

**Option C: PowerShell**
```powershell
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

## Expected Output on Success
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/adyaanant-494318
Hosting URL: https://adyaanant-494318.web.app
```

## Troubleshooting

### Error: "HTTP 403 - Permission Denied"
**Solution:** Check that:
- ✓ You are project owner
- ✓ Billing is enabled
- ✓ You have Editor/Owner role in IAM

### Error: "No Hosting site detected"
**Solution:**
- ✓ Create hosting site in Firebase Console
- ✓ Wait 1-2 minutes after creation
- ✓ Try deployment again

### Error: "auth/configuration-not-found"
**Solution:**
- ✓ Enable Firebase Authentication in Console
- ✓ Add authorized domain: adyaanant-494318.firebaseapp.com
- ✓ Add authorized domain: adyaanant-494318.web.app
- ✓ Go to **Authentication → Settings → Authorized domains**

## Important Notes

- **Project ID:** adyaanant-494318
- **Hosting Site ID:** adyaanant-494318
- **Primary URL:** https://adyaanant-494318.web.app
- **Secondary URL:** https://adyaanant-494318.firebaseapp.com
- **Firebase Console:** https://console.firebase.google.com/project/adyaanant-494318

## After Successful Deployment

Your site will be live at:
```
https://adyaanant-494318.web.app
```

All Firebase Authentication features (Sign In, Sign Up, Sign Out) will work automatically!

## Command Reference

| Command | Purpose |
|---------|---------|
| `firebase login` | Authenticate with Google |
| `firebase deploy` | Deploy to Firebase Hosting |
| `firebase logs` | View deployment logs |
| `firebase hosting:channel:list` | List all versions |
| `firebase open hosting:site` | Open site in browser |

## Support Resources

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Project Settings](https://console.firebase.google.com)

