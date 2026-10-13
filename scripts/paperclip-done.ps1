param(
  [string]$ApiUrl = $env:PAPERCLIP_API_URL,
  [string]$ApiKey = $env:PAPERCLIP_API_KEY,
  [string]$RunId = $env:PAPERCLIP_RUN_ID
)
Write-Host "API URL: $ApiUrl"
Write-Host "Run ID: $RunId"
Write-Host "API Key set: $([string]::IsNullOrEmpty($ApiKey) -eq $false)"

$body = @"
{"status":"done","comment":"Phase 2 conversion layer complete. Homepage: Free Tools strip with CTA to /funnels + bottom CTA pair. Services: 3 tiered packages (Starter 18K / Growth 42K / Scale 85K+) with Book a Call CTAs + FAQ accordion. Portfolio: Problem/Action/Result case studies linking to services. About: Work With Me CTA + client logos. Build: 23/23 pages, commit 60ee48a."}
"@

$base = $ApiUrl.TrimEnd('/')
if ($base.EndsWith('/api')) { $base = $base.Substring(0, $base.Length - 4) }
$uri = "$base/api/issues/ANUA-19"
Write-Host "URI: $uri"

try {
  $headers = @{
    'Content-Type' = 'application/json'
    'Authorization' = "Bearer $ApiKey"
    'X-Paperclip-Run-Id' = $RunId
  }
  Invoke-RestMethod -Method PATCH -Uri $uri -Headers $headers -Body $body
  Write-Host "Issue updated to done."
} catch {
  Write-Host "ERROR: $($_.Exception.Message)"
  if ($_.Exception.Response) {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host "Response: $($reader.ReadToEnd())"
  }
}
