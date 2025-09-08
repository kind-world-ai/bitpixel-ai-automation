import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import ThemeToggle from './ThemeToggle';

export default function ThemeDemo() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          BitPixel Updated Theme
        </h1>
        <p className="text-muted-foreground text-lg">
          Modern shadcn/ui components with BitPixel branding
        </p>
      </div>

      {/* Theme Toggle Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Theme Toggle
            <ThemeToggle />
          </CardTitle>
          <CardDescription>Animated dark/light mode toggle with smooth transitions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click the toggle above to switch between light and dark modes. The theme persists across page reloads.
          </p>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Various button styles with the updated theme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Cards & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Card Component
              <Badge>New</Badge>
            </CardTitle>
            <CardDescription>
              Enhanced card styling with improved shadows and spacing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This card showcases the updated design system with better contrast and modern aesthetics.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input fields and progress indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter your email..." />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Colors</CardTitle>
          <CardDescription>Semantic colors that adapt to light/dark mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Primary</h4>
              <div className="w-16 h-16 rounded-lg bg-primary border shadow-sm"></div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Secondary</h4>
              <div className="w-16 h-16 rounded-lg bg-secondary border shadow-sm"></div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Accent</h4>
              <div className="w-16 h-16 rounded-lg bg-accent border shadow-sm"></div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Muted</h4>
              <div className="w-16 h-16 rounded-lg bg-muted border shadow-sm"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
