@echo off
REM Firebase Deployment Script for ADYAANANT
REM This script deploys the project to Firebase Hosting

echo ====================================
echo Firebase Deployment Script
echo Project: adyaanant-494318
echo ====================================
echo.

echo [1/3] Checking Firebase CLI installation...
where firebase >nul 2>nul
if %errorlevel% neq 0 (
    echo Firebase CLI not found. Installing...
    npm install -g firebase-tools
)

echo [2/3] Authenticating with Firebase...
firebase login

echo [3/3] Deploying to Firebase...
firebase deploy --project adyaanant-494318

if %errorlevel% equ 0 (
    echo.
    echo ====================================
    echo Deployment successful!
    echo Your site is now live at:
    echo https://adyaanant-494318.web.app
    echo ====================================
) else (
    echo.
    echo Deployment failed. Check the error above.
)

pause
