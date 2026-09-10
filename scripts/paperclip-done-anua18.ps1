param(
  [string]$ApiUrl = $env:PAPERCLIP_API_URL,
  [string]$ApiKey = $env:PAPERCLIP_API_KEY,
  [string]$RunId = $env:PAPERCLIP_RUN_ID
)

$body = @'
{
  "status": "done",
  "comment": "## ANUA-18 Phase 1 — Complete\n\nAll scope delivered across 2 commits:\n\n- `lib/funnel.ts` — shared Gemini -> Resend -> Sheets engine\n- `app/funnels/page.tsx` — hub listing all 4 funnels with value props\n- LinkedIn funnel polish: see-a-sample link, social proof section, ThankYouState with 3-step next-steps guide\n- YouTube Retention Audit funnel (`/youtube-audit` + API) — channel URL -> top-3 fixes -> email\n- Reel/Shorts Hook Swipe File (`/reel-hooks` + API) — niche -> 30 hooks -> email\n- Ad Creative ROI Calculator (`/ad-roi-calculator` + API) — client-side ROAS/CPA/revenue + personalized tips + Sheets logging\n- `lib/nurture.ts` — 3-email nurture sequence (Day 2/5/9) via Firestore queue\n\nBuild passes (23 routes, 0 errors). Commits: `3d52bf5` (funnel library) and `a88b361` (LinkedIn polish). Ready for board review."
}
'@

$base = $ApiUrl.TrimEnd('/')
if ($base.EndsWith('/api')) { $base = $base.Substring(0, $base.Length - 4) }
$uri = "$base/api/issues/ANUA-18"
Write-Host "URI: $uri"

try {
  $headers = @{
    'Content-Type' = 'application/json'
    'Authorization' = "Bearer $ApiKey"
    'X-Paperclip-Run-Id' = $RunId
  }
  $resp = Invoke-RestMethod -Method PATCH -Uri $uri -Headers $headers -Body $body
  Write-Host "Issue updated to done."
  $resp | ConvertTo-Json -Depth 5
} catch {
  Write-Host "ERROR: $($_.Exception.Message)"
  if ($_.Exception.Response) {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host "Response: $($reader.ReadToEnd())"
  }
}
