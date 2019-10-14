param([string]$Path)


$defaultTemplate = "./templates/post-template.html"
$defaultReplaceMatch = "{{REPLACEMATCH}}"
$defaultOutput = "./posts/"

$postContent = (Get-Content -Path $Path -Raw | ConvertFrom-Markdown).Html

$templateContent = (Get-Content $defaultTemplate -Raw)

$pathFile = (Get-Item -Path $Path | Select-Object -Property Name, Extension)
$postName = $pathFile.Name -replace $pathFile.Extension,".html"

Set-Content -Path ($defaultOutput + $postName) ($templateContent -replace $defaultReplaceMatch,$postContent)
