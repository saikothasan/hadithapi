"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, Smartphone, Tablet, Code, Search, Database, BookOpen } from "lucide-react"

export function ResponsiveFeatures() {
  const [activeTab, setActiveTab] = useState("desktop")

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">Responsive Design for All Devices</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access authentic hadiths seamlessly across all your devices with our responsive interface.
          </p>
        </div>

        <Tabs defaultValue="desktop" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="desktop" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span className="hidden sm:inline">Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center gap-2">
                <Tablet className="h-4 w-4" />
                <span className="hidden sm:inline">Tablet</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="desktop" className="mt-0">
            <div className="relative border rounded-lg overflow-hidden shadow-lg aspect-video bg-muted/30">
              <div className="absolute top-0 left-0 right-0 h-8 bg-background border-b flex items-center px-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs text-muted-foreground">hadithapi.pages.dev</div>
              </div>
              <div className="pt-8 p-4 h-full flex flex-col">
                <div className="flex-1 grid grid-cols-12 gap-4">
                  <div className="col-span-3 bg-background rounded border p-2">
                    <div className="w-full h-6 bg-primary/10 rounded mb-2"></div>
                    <div className="space-y-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-full h-4 bg-muted rounded"></div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-9 bg-background rounded border p-4">
                    <div className="w-3/4 h-8 bg-primary/10 rounded mb-4"></div>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-full h-4 bg-muted rounded"></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="aspect-video bg-muted rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium mb-2">Optimized for Desktop</h3>
              <p className="text-muted-foreground">
                Take advantage of the full screen experience with multi-column layouts and advanced features.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="tablet" className="mt-0">
            <div
              className="relative border rounded-lg overflow-hidden shadow-lg mx-auto"
              style={{ maxWidth: "600px", aspectRatio: "4/3" }}
            >
              <div className="absolute top-0 left-0 right-0 h-6 bg-background border-b flex items-center px-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs text-muted-foreground">hadithapi.pages.dev</div>
              </div>
              <div className="pt-6 p-3 h-full flex flex-col bg-muted/30">
                <div className="flex-1">
                  <div className="bg-background rounded border p-3 mb-3">
                    <div className="w-full h-6 bg-primary/10 rounded mb-2"></div>
                    <div className="flex gap-2 mb-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex-1 h-4 bg-muted rounded"></div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-background rounded border p-2">
                        <div className="w-full h-4 bg-primary/10 rounded mb-2"></div>
                        <div className="w-full h-3 bg-muted rounded mb-1"></div>
                        <div className="w-3/4 h-3 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium mb-2">Perfect for Tablets</h3>
              <p className="text-muted-foreground">
                Enjoy a responsive layout that adapts perfectly to tablet screens with touch-friendly controls.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-0">
            <div
              className="relative border rounded-lg overflow-hidden shadow-lg mx-auto"
              style={{ maxWidth: "280px", aspectRatio: "9/16" }}
            >
              <div className="absolute top-0 left-0 right-0 h-5 bg-background border-b flex items-center px-2">
                <div className="w-full flex justify-between items-center">
                  <div className="w-10 h-2 bg-muted rounded-full"></div>
                  <div className="w-2 h-2 rounded-full bg-muted"></div>
                </div>
              </div>
              <div className="pt-5 h-full flex flex-col bg-muted/30">
                <div className="p-2 bg-background border-b flex items-center justify-between">
                  <div className="w-24 h-4 bg-primary/10 rounded"></div>
                  <div className="w-4 h-4 bg-muted rounded"></div>
                </div>
                <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                  <div className="w-full h-10 bg-primary/10 rounded mb-2"></div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-full bg-background rounded border p-2 mb-2">
                      <div className="w-full h-3 bg-muted rounded mb-1"></div>
                      <div className="w-3/4 h-3 bg-muted rounded mb-1"></div>
                      <div className="w-1/2 h-3 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium mb-2">Mobile Optimized</h3>
              <p className="text-muted-foreground">
                Access the full functionality of the API on the go with our mobile-first design.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Search className="h-6 w-6" />
              </div>
              <CardTitle>Responsive Search</CardTitle>
              <CardDescription>Search functionality optimized for all screen sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our search interface adapts to your device, providing the same powerful features whether you're on
                desktop, tablet, or mobile.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Readable Content</CardTitle>
              <CardDescription>Optimized typography for comfortable reading</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Text is sized appropriately for each device, ensuring hadiths are easy to read without zooming or
                straining your eyes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Database className="h-6 w-6" />
              </div>
              <CardTitle>Efficient Loading</CardTitle>
              <CardDescription>Fast performance on all connection types</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our API and website are optimized for speed, with efficient data loading that works well even on slower
                mobile connections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                <Code className="h-6 w-6" />
              </div>
              <CardTitle>Developer Friendly</CardTitle>
              <CardDescription>API documentation that works everywhere</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access our comprehensive API documentation on any device, with code examples that are easy to read and
                copy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

