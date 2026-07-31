param([switch]$SkipBuild)

# Credenciales desde variables de entorno (no hardcodear)
$FTP_HOST = $env:BULLWEB_FTP_HOST
$FTP_USER = $env:BULLWEB_FTP_USER
$FTP_PASS = $env:BULLWEB_FTP_PASS
$REMOTE   = ""   # Hostinger: la raíz del FTP es el document root (no public_html)

# Validación temprana: abortar si falta alguna variable de entorno FTP
if (-not $FTP_HOST -or -not $FTP_USER -or -not $FTP_PASS) {
    Write-Error "Faltan variables de entorno FTP (BULLWEB_FTP_HOST, BULLWEB_FTP_USER, BULLWEB_FTP_PASS)."
    exit 1
}

$ErrorActionPreference = "Stop"
$landingPath = "C:\Users\Francisco\OneDrive\Escritorio\Bullweb3.0\bullweb-landing"
Set-Location $landingPath
$DIST = ".\dist"

$curlCmd = Get-Command curl.exe -ErrorAction SilentlyContinue
if (-not $curlCmd) {
  Write-Host "ERROR: curl.exe no encontrado" -ForegroundColor Red
  exit 1
}

if (-not $SkipBuild) {
  Write-Host "[BUILD] Compilando..." -ForegroundColor Cyan
  npm run build
  if ($LASTEXITCODE -ne 0) { exit 1 }
}

if (-not (Test-Path "$DIST\index.html")) {
  Write-Host "ERROR: No existe dist\index.html" -ForegroundColor Red
  exit 1
}

$script:hasErrors = $false

function normPath($p) {
  # Elimina slash inicial para evitar doble-slash en la URL FTP
  return $p.TrimStart('/')
}

function doDelete($remotePath) {
  $rp  = normPath $remotePath
  $url = "ftp://$FTP_HOST/"
  # DELE borra el archivo antes de subir (fuerza invalidar caché LiteSpeed)
  # Silenciar stderr: si el archivo no existe en el servidor, curl devuelve 550
  # y $ErrorActionPreference='Stop' lanzaría excepción — lo ignoramos.
  $out = curl.exe --silent --ftp-pasv --user "${FTP_USER}:${FTP_PASS}" --quote "DELE $rp" "$url" 2>$null
}

function doUpload($localFile, $remotePath) {
  $rp  = normPath $remotePath
  $url = "ftp://$FTP_HOST/$rp"
  $out = curl.exe --silent --ftp-pasv --ftp-create-dirs --user "${FTP_USER}:${FTP_PASS}" --upload-file "$localFile" "$url" 2>&1
  if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK  /$rp" -ForegroundColor Green
  } else {
    Write-Host "  ERR /$rp -- $out" -ForegroundColor Red
    $script:hasErrors = $true
  }
}

Write-Host ""
Write-Host "[FTP] $FTP_HOST -> /$REMOTE" -ForegroundColor Cyan
Write-Host ""

$assets = Get-ChildItem "$DIST\assets\*" -File
$total  = $assets.Count
$i      = 0
foreach ($f in $assets) {
  $i++
  Write-Host -NoNewline "  [$i/$total] " -ForegroundColor DarkGray
  doUpload $f.FullName "$REMOTE/assets/$($f.Name)"
}

if (Test-Path "$DIST\.htaccess") {
  doDelete "$REMOTE/.htaccess"
  doUpload "$DIST\.htaccess" "$REMOTE/.htaccess"
}

# Subir subdirectorio images/ si existe
if (Test-Path "$DIST\images") {
  $imgs = Get-ChildItem "$DIST\images\*" -File
  foreach ($img in $imgs) {
    doUpload $img.FullName "$REMOTE/images/$($img.Name)"
  }
}

# Subir assets estáticos de raíz (favicon, og-image, etc.)
$rootAssets = Get-ChildItem "$DIST\*" -File -Include "*.svg","*.png","*.ico","*.webmanifest"
foreach ($f in $rootAssets) {
  doDelete "$REMOTE/$($f.Name)"
  doUpload $f.FullName "$REMOTE/$($f.Name)"
}

# Borrar index.html antes de subir — fuerza a LiteSpeed a invalidar caché
Write-Host "  [cache] Borrando index.html del servidor..." -ForegroundColor DarkGray
doDelete "$REMOTE/index.html"
doUpload "$DIST\index.html" "$REMOTE/index.html"

Write-Host ""
if (-not $script:hasErrors) {
  Write-Host "DEPLOY COMPLETADO" -ForegroundColor Green
  Write-Host "-> hPanel -> LiteSpeed Cache -> Flush All"
  Write-Host "-> Verificar: https://www.bullwebchile.com"
} else {
  Write-Host "DEPLOY CON ERRORES" -ForegroundColor Red
}
Write-Host ""