#!/bin/bash
echo "Checking for interactive page images..."
echo ""

if [ -f "public/ai-agent-primary.jpg" ]; then
    echo "✅ Primary image found: public/ai-agent-primary.jpg"
else
    echo "❌ Primary image missing: public/ai-agent-primary.jpg"
    echo "   Save the professional photo with purple overlay as this file"
fi

if [ -f "public/ai-agent-reveal.jpg" ]; then
    echo "✅ Reveal image found: public/ai-agent-reveal.jpg"
else
    echo "❌ Reveal image missing: public/ai-agent-reveal.jpg"
    echo "   Save the holographic wireframe AI face as this file"
fi

if [ -f "public/logo.png" ]; then
    echo "✅ Logo found: public/logo.png"
else
    echo "❌ Logo missing: public/logo.png"
fi

echo ""
echo "Once all images are in place, the interactive page will be ready!"
