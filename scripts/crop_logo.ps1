Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\WELCOME\Desktop\web mission 4\client\public\images\web-mission-logo.jpg"
$outEmblemPath = "c:\Users\WELCOME\Desktop\web mission 4\client\public\images\web-mission-emblem.png"
$outEmblemTransparent = "c:\Users\WELCOME\Desktop\web mission 4\client\public\images\web-mission-emblem-transparent.png"

$srcBmp = New-Object System.Drawing.Bitmap($srcPath)

# 1. Precise bounding box of the Golden Diamond Crest
# The crest is located from X ~190 to ~834 (width ~644) and Y ~95 to ~640 (height ~545)
$cropRect = New-Object System.Drawing.Rectangle(190, 95, 644, 545)
$emblemBmp = $srcBmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save standard cropped emblem
$emblemBmp.Save($outEmblemPath, [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Create Transparent PNG version
$transBmp = New-Object System.Drawing.Bitmap($emblemBmp.Width, $emblemBmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $emblemBmp.Width; $x++) {
    for ($y = 0; $y -lt $emblemBmp.Height; $y++) {
        $c = $emblemBmp.GetPixel($x, $y)
        # Calculate brightness / luminance
        $luma = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        
        if ($luma -le 16) {
            # Completely black background
            $transBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($luma -le 55) {
            # Smooth feathering edge between black and gold
            $alpha = [int](($luma - 16) / (55 - 16) * 255)
            $transBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            # Pure gold / metallic highlight
            $transBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
        }
    }
}

$transBmp.Save($outEmblemTransparent, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Transparent emblem saved successfully: $outEmblemTransparent"

$transBmp.Dispose()
$emblemBmp.Dispose()
$srcBmp.Dispose()
