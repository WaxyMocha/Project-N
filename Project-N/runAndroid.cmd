@echo off

IF "%~1"=="" (
  goto HELP
)

IF NOT "%~1"=="" (
goto RUN
)

:HELP
echo "Usage: %~nx0 <architecture>"
echo.
echo "Example: %~nx0 arm64"
echo.
echo.
echo "Available architectures: arm64, armeabi, armv7, x86, x86_64"
exit /B

:RUN
echo.
echo "==COMPILING APKS=="
powershell "cordova build android"
echo.
echo "==INSTALLING APK=="
powershell "adb install -r .\platforms\android\app\build\outputs\apk\%~1\debug\app-%~1-debug.apk"
echo.
echo "==LAUNCHING APK=="
powershell "adb shell am start -n io.project.n/io.project.n.MainActivity"
