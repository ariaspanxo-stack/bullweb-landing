# Hotfix #147 — wrapper de deploy: carga .env (sin imprimir) y ejecuta deploy-hostinger.ps1 -SkipBuild
$envFile = Join-Path $PSScriptRoot '.env'
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$') {
        $k = $Matches[1]; $v = $Matches[2]
        Set-Item -Path ("Env:" + $k) -Value $v
    }
}
& (Join-Path $PSScriptRoot 'deploy-hostinger.ps1') -SkipBuild
