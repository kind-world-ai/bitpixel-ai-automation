#!/bin/bash
echo "Checking for interactive page images..."
echo ""

if [ -f "public/ai-agent-primary.png" ] || [ -f "public/ai-agent-primary.jpg" ]; then
    echo "✅ Primary image found: public/ai-agent-primary.png"
else
    echo "❌ Primary image missing: public/ai-agent-primary.png or .jpg"
    echo "   Save the professional photo with purple overlay as this file"
fi

if [ -f "public/ai-agent-reveal.png" ] || [ -f "public/ai-agent-reveal.jpg" ]; then
    echo "✅ Reveal image found: public/ai-agent-reveal.png"
else
    echo "❌ Reveal image missing: public/ai-agent-reveal.png or .jpg"
    echo "   Save the holographic wireframe AI face as this file"
fi

if [ -f "public/logo.png" ]; then
    echo "✅ Logo found: public/logo.png"
else
    echo "❌ Logo missing: public/logo.png"
fi

echo ""
echo "All images are ready! Visit /interactive to see the page."
