"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const metrics = {
  impressions: {
    label: "Impressions",
    color: "#4F46E5",
  },
  uniqueImpressions: {
    label: "Unique Impressions",
    color: "#14B8A6",
  },
  clicks: {
    label: "Clicks",
    color: "#F59E0B",
  },
  likes: {
    label: "Likes",
    color: "#EF4444",
  },
  engagement: {
    label: "Engagement Rate",
    color: "#8B5CF6",
  },
};

export default function AnalyticsChart({ data }: { data: any[] }) {
  const [selectedMetric, setSelectedMetric] = useState("impressions");

  return (
    <Card className="w-full bg-gray-900 text-white shadow-lg border border-gray-700  ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">LinkedIn Analytics</CardTitle>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px] border-gray-600 bg-gray-800 text-white">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              {Object.entries(metrics).map(([key, { label }]) => (
                <SelectItem key={key} value={key} className="hover:bg-gray-700">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <ChartContainer
            config={{
              [selectedMetric]: metrics[selectedMetric as keyof typeof metrics],
            }}
          >
            <ResponsiveContainer width="100%" height="100%" className="h-[400px] p-4 bg-gray-800 rounded-lg">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#E5E7EB" }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis tick={{ fill: "#E5E7EB" }} />
                <ChartTooltip content={<ChartTooltipContent className="bg-gray-600 text-white shadow-md" />}  />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={metrics[selectedMetric as keyof typeof metrics].color}
                  fill={metrics[selectedMetric as keyof typeof metrics].color}
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
