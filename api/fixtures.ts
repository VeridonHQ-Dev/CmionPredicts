import type { VercelRequest, VercelResponse } from "@vercel/node";

export const maxDuration = 60;

export type MatchRegion =
  | 'England'
  | 'Spain'
  | 'Italy'
  | 'Brazil'
  | 'South America'
  | 'Asia'
  | 'Netherlands'
  | 'Poland'
  | 'Scotland'
  | 'Germany'
  | 'France'
  | 'Europe'
  | 'Other';

export interface FixtureItem {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeScore?: string;
  awayScore?: string;
  league: string;
  country: string;
  region: MatchRegion;
  kickoffDate: string; // YYYY-MM-DD
  kickoffTime: string; // 24h e.g. "19:45"
  timeFormatted: string; // 12h e.g. "7:45pm"
  versusLabel: string; // e.g. "West Ham United vrs Fulham - 7:45pm"
  status: string;
  stadium?: string;
  rawKickoffUtc?: string;
  source?: string;
}

/**
 * Complete worldwide league catalog supported by ESPN public scoreboard API
 */
export const LEAGUE_CATALOG: Array<{
  id: string;
  name: string;
  region: MatchRegion;
  country: string;
}> = [
  // England
  { id: "eng.league_cup", name: "Carabao Cup", region: "England", country: "England" },
  { id: "eng.1", name: "Premier League", region: "England", country: "England" },
  { id: "eng.2", name: "Championship", region: "England", country: "England" },
  { id: "eng.3", name: "League One", region: "England", country: "England" },
  { id: "eng.4", name: "League Two", region: "England", country: "England" },
  { id: "eng.fa", name: "FA Cup", region: "England", country: "England" },
  { id: "eng.trophy", name: "EFL Trophy", region: "England", country: "England" },

  // Spain
  { id: "esp.1", name: "La Liga", region: "Spain", country: "Spain" },
  { id: "esp.copa_del_rey", name: "Copa del Rey", region: "Spain", country: "Spain" },
  { id: "esp.2", name: "LaLiga 2", region: "Spain", country: "Spain" },

  // Italy
  { id: "ita.1", name: "Serie A", region: "Italy", country: "Italy" },
  { id: "ita.coppa_italia", name: "Coppa Italia", region: "Italy", country: "Italy" },

  // Germany
  { id: "ger.1", name: "Bundesliga", region: "Germany", country: "Germany" },
  { id: "ger.dfb_pokal", name: "DFB-Pokal", region: "Germany", country: "Germany" },

  // France
  { id: "fra.1", name: "Ligue 1", region: "France", country: "France" },
  { id: "fra.coupe_de_france", name: "Coupe de France", region: "France", country: "France" },

  // Europe Continental
  { id: "uefa.champions", name: "UEFA Champions League", region: "Europe", country: "Europe" },
  { id: "uefa.europa", name: "UEFA Europa League", region: "Europe", country: "Europe" },
  { id: "uefa.europa.conf", name: "UEFA Conference League", region: "Europe", country: "Europe" },

  // South America
  { id: "conmebol.libertadores", name: "Copa Libertadores", region: "South America", country: "South America" },
  { id: "conmebol.sudamericana", name: "Copa Sudamericana", region: "South America", country: "South America" },
  { id: "bra.1", name: "Brasileirão Série A", region: "Brazil", country: "Brazil" },
  { id: "bra.2", name: "Brasileirão Série B", region: "Brazil", country: "Brazil" },
  { id: "arg.1", name: "Liga Profesional", region: "South America", country: "Argentina" },

  // Other European Leagues
  { id: "por.1", name: "Primeira Liga", region: "Other", country: "Portugal" },
  { id: "ned.1", name: "Eredivisie", region: "Netherlands", country: "Netherlands" },
  { id: "bel.1", name: "Belgian Pro League", region: "Other", country: "Belgium" },
  { id: "sco.1", name: "Scottish Premiership", region: "Scotland", country: "Scotland" },
  { id: "pol.1", name: "Ekstraklasa", region: "Poland", country: "Poland" },
  { id: "tur.1", name: "Süper Lig", region: "Other", country: "Turkey" },

  // Asia & Americas
  { id: "afc.champions", name: "AFC Champions League", region: "Asia", country: "Asia" },
  { id: "ksa.1", name: "Saudi Pro League", region: "Asia", country: "Saudi Arabia" },
  { id: "jpn.1", name: "J-League", region: "Asia", country: "Japan" },
  { id: "mex.1", name: "Liga MX", region: "Other", country: "Mexico" },
  { id: "usa.1", name: "MLS", region: "Other", country: "USA" }
];

// In-memory server cache (60s TTL)
interface CacheEntry {
  timestamp: number;
  data: FixtureItem[];
}
const FIXTURES_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 1000;

/**
 * Convert any time string (e.g. "7:45pm", "19:45", "07:45 PM", "11:45pm", "23:45") into minutes from midnight (0 - 1439).
 */
export function timeStringToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.trim().toLowerCase();
  const isPM = clean.includes("pm");
  const isAM = clean.includes("am");
  const numeric = clean.replace(/[^\d:]/g, "");
  const parts = numeric.split(":");
  let hours = parseInt(parts[0], 10) || 0;
  const minutes = parts[1] ? parseInt(parts[1], 10) || 0 : 0;

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return (hours % 24) * 60 + minutes;
}

/**
 * Format minutes or 24h string into standard 12-hour display e.g. "7:45pm"
 */
export function formatTo12Hour(timeStrOrMinutes: string | number): string {
  let minutes: number;
  if (typeof timeStrOrMinutes === "string") {
    minutes = timeStringToMinutes(timeStrOrMinutes);
  } else {
    minutes = timeStrOrMinutes;
  }

  const hours24 = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  const period = hours24 >= 12 ? "pm" : "am";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const paddedMins = mins < 10 ? `0${mins}` : `${mins}`;

  return `${hours12}:${paddedMins}${period}`;
}

/**
 * Calculate the calendar date (YYYY-MM-DD) for a kickoff in the user's timezone.
 */
export function getLocalDateString(utcIsoString: string, timeZone: string = "Europe/London"): string {
  const d = new Date(utcIsoString);
  if (isNaN(d.getTime())) return "";
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return formatter.format(d);
  } catch {
    return utcIsoString.split("T")[0] || "";
  }
}

/**
 * Format UTC ISO string into target timezone format (defaults to Europe/London or client timezone)
 */
export function formatKickoffTime(
  utcIsoString: string,
  timeZone: string = "Europe/London"
): { time24: string; time12: string; minutes: number } {
  const d = new Date(utcIsoString);
  if (isNaN(d.getTime())) {
    return { time24: "19:45", time12: "7:45pm", minutes: 1185 };
  }

  try {
    const formatter12 = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    const parts = formatter12.formatToParts(d);
    const hourPart = parts.find((p) => p.type === "hour")?.value || "12";
    const minPart = parts.find((p) => p.type === "minute")?.value || "00";
    const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value?.toLowerCase() || "pm";
    const time12 = `${hourPart}:${minPart}${dayPeriod}`;

    const formatter24 = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const time24 = formatter24.format(d);
    const [h24, m24] = time24.split(":").map(Number);
    const minutes = (h24 || 0) * 60 + (m24 || 0);

    return { time24, time12, minutes };
  } catch {
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const time24 = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const period = h >= 12 ? "pm" : "am";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const time12 = `${h12}:${String(m).padStart(2, "0")}${period}`;
    return { time24, time12, minutes: h * 60 + m };
  }
}

/**
 * Check if match kickoff minutes fall within [startMinutes, endMinutes].
 */
export function isTimeInRange(matchMinutes: number, startStr: string, endStr: string): boolean {
  if (!startStr && !endStr) return true;

  const startMinutes = startStr ? timeStringToMinutes(startStr) : 0;
  const endMinutes = endStr ? timeStringToMinutes(endStr) : 1439;

  if (startMinutes <= endMinutes) {
    return matchMinutes >= startMinutes && matchMinutes <= endMinutes;
  } else {
    // Range wraps past midnight (e.g. 22:00 to 02:00)
    return matchMinutes >= startMinutes || matchMinutes <= endMinutes;
  }
}

/**
 * Deprecated helper retained for backwards compatibility; returns empty array to prevent injecting mock fixtures.
 */
export function getCuratedDateFixtures(_targetDate: string, _timeZone: string = "Europe/London"): FixtureItem[] {
  return [];
}

/**
 * Fetch real-time authentic live matches from ESPN Scoreboard API.
 * Strictly verifies and filters matches to ensure ONLY legitimate scheduled fixtures
 * for the requested date and timezone are returned.
 */
export async function fetchLiveEspnFixtures(params: {
  targetDate: string; // YYYY-MM-DD
  includeNextMatchdays?: boolean;
  timeZone?: string;
}): Promise<FixtureItem[]> {
  const targetDate = params.targetDate;
  const cleanDateStr = targetDate.replace(/-/g, "");
  const timeZone = params.timeZone || "Europe/London";

  const cacheKey = `${cleanDateStr}_${params.includeNextMatchdays ? "all" : "day"}_${timeZone}`;
  const cached = FIXTURES_CACHE.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS && cached.data.length > 0) {
    return cached.data;
  }

  const allItems: FixtureItem[] = [];

  // Query ESPN scoreboard endpoints concurrently across worldwide leagues with 4s timeout
  const leaguePromises = LEAGUE_CATALOG.map(async (league) => {
    try {
      const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league.id}/scoreboard?dates=${cleanDateStr}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      if (!res.ok) return [];
      const data = await res.json();
      const events: any[] = data.events || [];

      const leagueName = data.leagues?.[0]?.name || league.name;
      const validForLeague: FixtureItem[] = [];

      for (const event of events) {
        const rawUtc = event.date;
        if (!rawUtc) continue;

        // Calculate kickoff calendar date in the user's selected timezone
        const matchLocalDate = getLocalDateString(rawUtc, timeZone);

        // STRICT DATE FILTERING:
        // By default, match MUST occur on the exact targetDate in the chosen timezone.
        // Never include yesterday, previous days, or future days unless explicitly requested.
        if (!params.includeNextMatchdays) {
          if (matchLocalDate !== targetDate) {
            continue;
          }
        } else {
          // If includeNextMatchdays is enabled, only allow dates >= targetDate (never previous days)
          if (matchLocalDate < targetDate) {
            continue;
          }
        }

        const comp = event.competitions?.[0];
        const homeComp = comp?.competitors?.find((c: any) => c.homeAway === "home");
        const awayComp = comp?.competitors?.find((c: any) => c.homeAway === "away");

        const homeTeam = homeComp?.team?.displayName || homeComp?.team?.name;
        const awayTeam = awayComp?.team?.displayName || awayComp?.team?.name;

        // Skip events without valid team names
        if (!homeTeam || !awayTeam) continue;

        const homeLogo = homeComp?.team?.logo || "";
        const awayLogo = awayComp?.team?.logo || "";
        const homeScore = homeComp?.score;
        const awayScore = awayComp?.score;

        const { time24, time12 } = formatKickoffTime(rawUtc, timeZone);
        const stadium = comp?.venue?.fullName || "";
        const statusDetail = event.status?.type?.detail || event.status?.type?.description || "Scheduled";

        validForLeague.push({
          id: `espn_${event.id || `${homeTeam}_${awayTeam}_${rawUtc}`}`,
          homeTeam,
          awayTeam,
          homeLogo,
          awayLogo,
          homeScore: homeScore !== undefined ? String(homeScore) : undefined,
          awayScore: awayScore !== undefined ? String(awayScore) : undefined,
          league: leagueName,
          country: league.country,
          region: league.region,
          kickoffDate: matchLocalDate,
          kickoffTime: time24,
          timeFormatted: time12,
          versusLabel: `${homeTeam} vrs ${awayTeam} - ${time12}`,
          status: statusDetail,
          stadium,
          rawKickoffUtc: rawUtc,
          source: "ESPN Live API"
        });
      }

      return validForLeague;
    } catch {
      return [];
    }
  });

  const settled = await Promise.allSettled(leaguePromises);
  for (const item of settled) {
    if (item.status === "fulfilled" && Array.isArray(item.value)) {
      allItems.push(...item.value);
    }
  }

  // Deduplicate by matchup (home_vs_away) and ID
  const seenMatchups = new Set<string>();
  const uniqueItems: FixtureItem[] = [];
  for (const item of allItems) {
    const key = `${item.homeTeam.toLowerCase().trim()}_vs_${item.awayTeam.toLowerCase().trim()}_${item.kickoffDate}`;
    if (!seenMatchups.has(key)) {
      seenMatchups.add(key);
      uniqueItems.push(item);
    }
  }

  if (uniqueItems.length > 0) {
    FIXTURES_CACHE.set(cacheKey, {
      timestamp: Date.now(),
      data: uniqueItems
    });
  }

  return uniqueItems;
}

/**
 * Main function to fetch upcoming matches filtered strictly by date, time window, and region.
 * Returns only genuine real fixtures from the official live scoreboard feeds.
 */
export async function fetchUpcomingMatches(params: {
  date?: string; // e.g. "2026-09-16"
  startTime?: string; // e.g. "7:45pm"
  endTime?: string; // e.g. "11:45pm"
  region?: string; // e.g. "All" or "England"
  includeNextMatchdays?: boolean;
  timeZone?: string;
}): Promise<{
  success: boolean;
  date: string;
  startTime: string;
  endTime: string;
  totalFound: number;
  filteredCount: number;
  matches: FixtureItem[];
  suggestedMatches?: FixtureItem[];
  isAiGenerated: boolean;
  source: string;
}> {
  const targetDate = params.date || new Date().toISOString().split("T")[0];
  const startTime = params.startTime?.trim() || "7:45pm";
  const endTime = params.endTime?.trim() || "11:45pm";
  const regionFilter = params.region?.trim() || "All";
  const timeZone = params.timeZone || "Europe/London";

  // Fetch real fixtures strictly from ESPN API
  let liveFixtures: FixtureItem[] = [];
  try {
    liveFixtures = await fetchLiveEspnFixtures({
      targetDate,
      includeNextMatchdays: params.includeNextMatchdays ?? false,
      timeZone
    });
  } catch (err) {
    console.error("[Fixtures Fetch Error]:", err);
    liveFixtures = [];
  }

  // Filter by Region
  let regionFiltered = liveFixtures;
  if (regionFilter && regionFilter.toLowerCase() !== "all") {
    const filterLower = regionFilter.toLowerCase();
    regionFiltered = regionFiltered.filter(
      (m) =>
        m.region.toLowerCase().includes(filterLower) ||
        m.country.toLowerCase().includes(filterLower) ||
        m.league.toLowerCase().includes(filterLower)
    );
  }

  // Filter by Kickoff Time Range
  const filtered = regionFiltered.filter((m) => {
    const minutes = timeStringToMinutes(m.timeFormatted || m.kickoffTime);
    return isTimeInRange(minutes, startTime, endTime);
  });

  // Sort chronologically by kickoff time
  filtered.sort((a, b) => {
    const minA = timeStringToMinutes(a.timeFormatted || a.kickoffTime);
    const minB = timeStringToMinutes(b.timeFormatted || b.kickoffTime);
    return minA - minB;
  });

  // If time window yields 0 results, suggest other authentic matches from the EXACT same date
  const suggestedMatches =
    filtered.length === 0
      ? (regionFiltered.length > 0 ? regionFiltered : liveFixtures).slice(0, 15)
      : undefined;

  return {
    success: true,
    date: targetDate,
    startTime,
    endTime,
    totalFound: liveFixtures.length,
    filteredCount: filtered.length,
    matches: filtered,
    suggestedMatches,
    isAiGenerated: false,
    source: "ESPN Live API"
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let date: string | undefined;
    let startTime: string | undefined;
    let endTime: string | undefined;
    let region: string | undefined;
    let includeNextMatchdays: boolean | undefined;
    let timeZone: string | undefined;

    if (req.method === "GET") {
      const q = req.query || {};
      date = typeof q.date === "string" ? q.date : undefined;
      startTime = typeof q.startTime === "string" ? q.startTime : undefined;
      endTime = typeof q.endTime === "string" ? q.endTime : undefined;
      region = typeof q.region === "string" ? q.region : undefined;
      includeNextMatchdays = q.includeNextMatchdays === "true" || q.includeNextMatchdays === "1";
      timeZone = typeof q.timeZone === "string" ? q.timeZone : undefined;
    } else {
      let bodyData = req.body;
      if (typeof bodyData === "string") {
        try {
          bodyData = JSON.parse(bodyData);
        } catch {
          bodyData = {};
        }
      }
      date = bodyData?.date;
      startTime = bodyData?.startTime;
      endTime = bodyData?.endTime;
      region = bodyData?.region;
      includeNextMatchdays = Boolean(bodyData?.includeNextMatchdays);
      timeZone = bodyData?.timeZone;
    }

    const result = await fetchUpcomingMatches({
      date,
      startTime,
      endTime,
      region,
      includeNextMatchdays,
      timeZone
    });

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("[UpcomingMatches API Error]:", error);
    const targetDate = typeof req.query?.date === "string" ? req.query.date : new Date().toISOString().split("T")[0];
    return res.status(200).json({
      success: true,
      date: targetDate,
      startTime: "7:45pm",
      endTime: "11:45pm",
      totalFound: 0,
      filteredCount: 0,
      matches: [],
      isAiGenerated: false,
      source: "ESPN Live API (Empty)"
    });
  }
}
