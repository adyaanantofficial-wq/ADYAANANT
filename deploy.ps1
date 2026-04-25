# Firebase Deployment Script for ADYAANANT PowerShell Version
# This script deploys the project to Firebase Hosting

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Firebase Deployment Script" -ForegroundColor Cyan
Write-Host "Project: adyaanant-494318" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Firebase CLI
Write-Host "[1/3] Checking Firebase CLI installation..." -ForegroundColor Yellow
try {
    $firebaseVersion = & npm list -g firebase-tools --depth=0 2>$null
    if ($firebaseVersion -like "*firebase-tools*") {
        Write-Host "✓ Firebase CLI found" -ForegroundColor Green
    } else {
        Write-Host "Firebase CLI not found. Installing..." -ForegroundColor Yellow
        & npm install -g firebase-tools
    }
} catch {
    Write-Host "Installing Firebase CLI..." -ForegroundColor Yellow
    & npm install -g firebase-tools
}

Write-Host ""

# Step 2: Firebase Login
Write-Host "[2/3] Firebase Authentication" -ForegroundColor Yellow
Write-Host "Please ensure you are logged in to Firebase." -ForegroundColor Gray
Write-Host "If not logged in, run: firebase login" -ForegroundColor Gray
Write-Host ""

# Step 3: Deploy
Write-Host "[3/3] Deploying to Firebase..." -ForegroundColor Yellow
& firebase deploy --project adyaanant-494318

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host "Your site is now live at:" -ForegroundColor Green
    Write-Host "https://adyaanant-494318.web.app" -ForegroundColor Cyan
    Write-Host "====================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Deployment failed. Check the error above." -ForegroundColor Red
}
