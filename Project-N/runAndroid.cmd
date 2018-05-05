@echo off

IF "%~1"=="/h" (
  goto HELP
)

IF "%~1"=="" (
  goto HELP
)

IF "%~1"=="arm64" (
  SET arch=arm64
  goto RUN
)

IF "%~1"=="armeabi" (
  SET arch=armeabi
  goto RUN
)

IF "%~1"=="armv7" (
  SET arch=armv7
  goto RUN
)

IF "%~1"=="x86" (
  SET arch=x86
  goto RUN
)

IF "%~1"=="x86_64" (
  SET arch=x86_64
  goto RUN
)

:HELP
echo.
echo "Usage: %~nx0 <architecture>"
echo.
echo "Example: %~nx0 arm64"
echo.
echo.
echo "Available architectures: arm64, armeabi, armv7, x86, x86_64"
echo.
exit /B



:RUN
echo.
echo "==COMPILING APKS=="
powershell "cordova compile android"
echo.
echo "==INSTALLING APK=="
powershell "adb install .\platforms\android\app\build\outputs\apk\%arch%\debug\app-%arch%-debug.apk"
echo.
echo "==LAUNCHING APK=="
powershell "adb shell am start -n io.project.n/io.project.n.MainActivity"
