# Hotfix #147 — Fase 6: higiene FTP (SOLO assets/): listar, comparar contra referencias del index servido, borrar no-referenciados
# Carga .env sin imprimir credenciales
$envFile = Join-Path $PSScriptRoot '.env'
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$') {
        Set-Item -Path ("Env:" + $Matches[1]) -Value $Matches[2]
    }
}
$FTP_HOST = $env:BULLWEB_FTP_HOST
$FTP_USER = $env:BULLWEB_FTP_USER
$FTP_PASS = $env:BULLWEB_FTP_PASS

# 1) Listado completo de assets/ (con detalles: LIST normal)
Write-Host "=== LISTADO FTP assets/ ===" -ForegroundColor Cyan
$listing = curl.exe --silent --ftp-pasv --user "${FTP_USER}:${FTP_PASS}" "ftp://$FTP_HOST/assets/"
Write-Output $listing

# 2) Descargar index.html servido y extraer referencias
$tmpHtml = Join-Path $env:TEMP "_147_index.html"
curl.exe --silent -o $tmpHtml "https://bullwebchile.com/?v=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
$html = Get-Content $tmpHtml -Raw
$refs = [regex]::Matches($html, '/assets/([A-Za-z0-9._-]+)') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "`n=== REFERENCIADOS POR INDEX SERVIDO ===" -ForegroundColor Cyan
Write-Output $refs

# 3) Calcular huérfanos (presentes en FTP, NO referenciados)
$ftpFiles = $listing | Where-Object { $_ -match '\.(js|css|png|jpg|jpeg|svg|webp|woff2?|ico)$' } | ForEach-Object { ($_ -split '\s+')[-1] }
$orphans = $ftpFiles | Where-Object { $refs -notcontains $_ }
Write-Host "`n=== HUERFANOS A ELIMINAR (solo assets/) ===" -ForegroundColor Yellow
Write-Output $orphans
Write-Host ("TOTAL huerfanos: " + @($orphans).Count) -ForegroundColor Yellow

# 4) Eliminar huérfanos vía DELE
if ($orphans) {
    foreach ($f in $orphans) {
        $out = curl.exe --silent --ftp-pasv --user "${FTP_USER}:${FTP_PASS}" --quote "DELE assets/$f" "ftp://$FTP_HOST/" 2>$null
        Write-Host "  DELE assets/$f" -ForegroundColor DarkGray
    }
}

# 5) Verificación post-limpieza
Write-Host "`n=== POST-LIMPIEZA: index 200 + asset nuevo 200 ===" -ForegroundColor Cyan
$code1 = curl.exe -s -o NUL -w "%{http_code}" "https://bullwebchile.com/?v=post$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
$code2 = curl.exe -s -o NUL -w "%{http_code}" "https://bullwebchile.com/assets/index-nd-RDNQI.js"
Write-Output ("index => " + $code1)
Write-Output ("asset nuevo => " + $code2)

Remove-Item $tmpHtml -ErrorAction SilentlyContinue
