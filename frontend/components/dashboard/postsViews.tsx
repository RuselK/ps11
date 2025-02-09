"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  PostViewsStatistics,
  getPostViewsStatistics,
} from "@/services/postService"

const chartConfig = {
  total_views: {
    label: "Общие просмотры",
    color: "hsl(var(--chart-2))",
  },
  total_unique_views: {
    label: "Уникальные просмотры",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function PostsViews() {
  const [timeRange, setTimeRange] = React.useState("30d")
  const [chartData, setChartData] = React.useState<PostViewsStatistics[]>([])

  React.useEffect(() => {
    const endDate = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7)
        break
      case "30d":
        startDate.setDate(endDate.getDate() - 30)
        break
      case "90d":
        startDate.setDate(endDate.getDate() - 90)
        break
      default:
        startDate.setDate(endDate.getDate() - 30)
        break
    }


    const startDateISO = startDate.toISOString().split("T")[0]
    const endDateISO = endDate.toISOString().split("T")[0]

    getPostViewsStatistics(startDateISO, endDateISO).then((res) => {
      setChartData(res.data)
    })
  }, [timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Количество просмотров</CardTitle>
          <CardDescription>
            Показывает количество просмотров за выбранный период
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="30 дней" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d">7 дней</SelectItem>
            <SelectItem value="30d">30 дней</SelectItem>
            <SelectItem value="90d">90 дней</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillTotalViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-total_views)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total_views)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillTotalUniqueViews"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-total_unique_views)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total_unique_views)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("ru-RU", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ru-RU", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total_views"
              type="monotone"
              fill="url(#fillTotalViews)"
              stroke="var(--color-total_views)"
            />
            <Area
              dataKey="total_unique_views"
              type="monotone"
              fill="url(#fillTotalUniqueViews)"
              stroke="var(--color-total_unique_views)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
