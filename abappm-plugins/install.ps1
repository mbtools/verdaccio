#!powershell

$packageName = $args[0]
if (-not $packageName) {
    Write-Error "Package name is required"
    exit 1
}

$tempdir = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "verdaccio-plugins/install-here/")
if (-not (Test-Path $tempdir)) {
    New-Item -ItemType Directory -Path $tempdir -Force
}

npm install --install-strategy=shallow --bin-links=false --save=false --package-lock=false --omit=dev --omit=optional --omit=peer --prefix $tempdir $packageName

Move-Item $tempdir/node_modules/$packageName .
Remove-Item -Recurse -Force $tempdir
