Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\WELCOME\Desktop\web mission 4\client\public\images\web-mission-logo.jpg"
$outFullTransparent = "c:\Users\WELCOME\Desktop\web mission 4\client\public\images\web-mission-full-transparent.png"

$srcBmp = New-Object System.Drawing.Bitmap($srcPath)
$transFull = New-Object System.Drawing.Bitmap($srcBmp.Width, $srcBmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $srcBmp.Width; $x++) {
    for ($y = 0; $y -lt $srcBmp.Height; $y++) {
        $c = $srcBmp.GetPixel($x, $y)
        $luma = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        
        if ($luma -le 18) {
            $transFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($luma -le 55) {
            $alpha = [int](($luma - 18) / (55 - 18) * 255)
            $transFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            $transFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
        }
    }
}

$transFull.Save($outFullTransparent, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Full transparent logo saved to $outFullTransparent"

$transFull.Dispose()
$srcBmp.Dispose()

