"use client"

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubContributionsProps {
  username: string
}

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

async function fetchGithubContributions(username: string): Promise<Contribution[]> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub contributions')
  }

  const data = await response.json()
  const calendar = data.data.user.contributionsCollection.contributionCalendar
  const contributions: Contribution[] = []

  calendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      const count = day.contributionCount
      let level: 0 | 1 | 2 | 3 | 4 = 0

      if (count > 0) {
        if (count >= 10) level = 4
        else if (count >= 7) level = 3
        else if (count >= 4) level = 2
        else level = 1
      }

      contributions.push({
        date: day.date,
        count,
        level,
      })
    })
  })

  return contributions
}

const levelColors = {
  0: 'bg-muted hover:bg-muted/80',
  1: 'bg-chart-1 hover:bg-chart-1/80',
  2: 'bg-chart-2 hover:bg-chart-2/80',
  3: 'bg-chart-3 hover:bg-chart-3/80',
  4: 'bg-chart-4 hover:bg-chart-4/80',
}

export function GithubContributions({ username }: GitHubContributionsProps) {
  const { data: contributions, isLoading, error } = useQuery({
    queryKey: ['github-contributions', username],
    queryFn: () => fetchGithubContributions(username),
  })

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-destructive">Failed to load GitHub contributions</p>
      </Card>
    )
  }

  const totalContributions = contributions?.reduce((sum, day) => sum + day.count, 0) || 0
  const today = new Date()
  const lastYear = new Date(today)
  lastYear.setFullYear(today.getFullYear() - 1)

  return (
    <Card className="col-span-full overflow-hidden p-6">
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">GitHub Activity</h3>
          <span className="text-sm text-muted-foreground">
            {totalContributions.toLocaleString()} contributions in the last year
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {lastYear.toLocaleDateString()} - {today.toLocaleDateString()}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-52 gap-1">
          {Array.from({ length: 52 * 7 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-3" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-52 gap-1">
            {contributions?.map((day, i) => (
              <div
                key={i}
                className={`h-3 w-3 rounded-sm transition-colors ${levelColors[day.level]}`}
                title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                role="gridcell"
                aria-label={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 text-sm">
            <span className="text-muted-foreground">Less</span>
            {Object.entries(levelColors).map(([level, className]) => (
              <div
                key={level}
                className={`h-3 w-3 rounded-sm ${className}`}
                role="img"
                aria-label={`Level ${level} contributions`}
              />
            ))}
            <span className="text-muted-foreground">More</span>
          </div>
        </>
      )}
    </Card>
  )
}
