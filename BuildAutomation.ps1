# Use NPM to build project
Set-Location $PSScriptRoot
npm run build

# Copy dist css and js to SF project
$distCssPath = $PSScriptRoot + "\dist\css\"
$distJsPath = $PSScriptRoot + "\dist\js\"

$sfWidgetPath = "C:\Users\letro\source\repos\CRA\SF-CRA-NEC\Widgets\GRAWidget\GRAWidget\"

$sfWidgetContentCssPath = $sfWidgetPath + "\Content\css\"
$sfWidgetContentJsPath = $sfWidgetPath + "\Content\js\"

xcopy $distCssPath $sfWidgetContentCssPath /y
xcopy $distJsPath $sfWidgetContentJsPath /y

# Use MSBuild.exe and rebuild project
Set-Location "C:\Program Files\Microsoft Visual Studio\2022\Preview\MSBuild\Current\Bin\"

.\MSBuild.exe $sfWidgetPath -t:rebuild

# Copy dll file to Widget installer folder and Local SF
$dllFilePath = $sfWidgetPath + "\bin\Debug\GRAWidget.dll"
$widgetInstallersPath = "C:\Users\letro\source\repos\CRA\SF-CRA-NEC\WidgetInstallers"
$localSfPath = "C:\Users\letro\source\repos\SitefinityWebApp2\Deploy\bin"

Copy-Item $dllFilePath $widgetInstallersPath
Copy-Item $dllFilePath $localSfPath