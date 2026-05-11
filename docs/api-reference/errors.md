# OpenWeatherMap API — Error Codes Reference

A reference guide for all HTTP error codes returned by the OpenWeatherMap API, including what they mean, why they occur, and how to resolve them.

> **Note:** All error responses from the OpenWeatherMap API return a JSON body in the following format:
> ```json
> {
>   "code": "401",
>   "message": "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
> }
> ```
> Always check the `message` field for a human-readable description of the error.

---

## Error Code Summary

| Code | Name | Meaning | Common Cause | How to Fix |
|------|------|---------|--------------|------------|
| `200` | OK | Request succeeded | — | No action needed |
| `400` | Bad Request | The request is malformed or missing required parameters | Missing `lat`/`lon`, invalid parameter format, or unsupported query parameter | Review your request structure against the API docs and ensure all required parameters are included |
| `401` | Unauthorized | API key is missing, invalid, or not yet activated | `appid` parameter not included, wrong API key, key not yet active (up to 2 hours after registration), or key does not have access to the requested API/plan | Verify the `appid` is correct and active; wait up to 2 hours after creating a new key |
| `403` | Forbidden | The API key does not have permission to access the requested endpoint | Calling a paid endpoint (e.g. 16-day forecast, One Call API 3.0) with a Free plan key | Upgrade your subscription or use only the endpoints included in your current plan |
| `404` | Not Found | The requested resource or location could not be found | Wrong city name, ZIP code, or city ID; incorrect `lat`/`lon` values; malformed request URL | Double-check location parameters; use the Geocoding API to resolve city names to coordinates |
| `429` | Too Many Requests | The API key has exceeded its rate limit or daily/monthly call quota | More than 60 calls/min on a Free plan; daily or monthly call limit reached | Wait and retry; reduce call frequency; upgrade your subscription plan or adjust the limit in your Billing settings |
| `500` | Internal Server Error | Unexpected error on the OpenWeatherMap server | Server-side bug or unexpected condition | Do not retry immediately; contact OpenWeatherMap support with your request details |
| `502` | Bad Gateway | The server received an invalid response from an upstream service | Temporary infrastructure issue | Retry after a short delay; contact support if the issue persists |
| `503` | Service Unavailable | The server is temporarily unable to handle the request | Server overload or scheduled maintenance | Retry after a short delay; check OpenWeatherMap status page |
| `504` | Gateway Timeout | The upstream server did not respond in time | Temporary infrastructure or network issue | Retry with exponential backoff; contact support if persistent |

---

## Detailed Error Descriptions

### `401` — Unauthorized

**Response body example:**
```json
{
  "code": 401,
  "message": "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
}
```

**Possible causes:**

| Cause | Details |
|-------|---------|
| `appid` not included in request | Every API call requires `?appid=YOUR_API_KEY` as a query parameter |
| API key not yet activated | New keys take up to 2 hours to activate after registration |
| Wrong or miscopied API key | Key contains a typo or was copied incorrectly |
| Key does not have access to the endpoint | Free plan keys cannot access paid endpoints such as One Call API 3.0 or the 16-day daily forecast |

---

### `404` — Not Found

**Response body example:**
```json
{
  "code": "404",
  "message": "city not found"
}
```

**Possible causes:**

| Cause | Details |
|-------|---------|
| Invalid city name | City name is misspelled or does not exist in the OpenWeatherMap database |
| Wrong ZIP code or city ID | ZIP code is for the wrong country or city ID is invalid |
| Malformed request URL | Extra characters, missing parameters, or wrong endpoint path |
| Unsupported location | Some very small or remote locations may not have coverage |

> **Tip:** Use the [Geocoding API](https://openweathermap.org/api/geocoding-api) (`api.openweathermap.org/geo/1.0/direct`) to first resolve a city name to `lat`/`lon` coordinates and then pass those to the weather endpoint for more reliable results.

---

### `429` — Too Many Requests

**Response body example:**
```json
{
  "code": 429,
  "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type."
}
```

**Rate limits by plan:**

| Plan | Call Limit |
|------|-----------|
| Free | 60 calls/min, 1,000 calls/day |
| Startup | 600 calls/min |
| Developer | 3,000 calls/min |
| Professional and above | Custom limits |

**How to resolve:**
- Wait before retrying — implement exponential backoff in your application.
- Check your usage in the [Billing Plans](https://home.openweathermap.org/subscriptions) tab and increase the daily limit if needed.
- Cache API responses locally to reduce redundant calls (weather data rarely needs to be refreshed more than once every 10 minutes).

---

### `5xx` — Server-Side Errors

OpenWeatherMap officially documents the following server errors: `500`, `502`, `503`, and `504`.

These are not caused by your request but by issues on the OpenWeatherMap infrastructure. If you receive any of these errors:

1. Do **not** retry immediately — use exponential backoff.
2. Contact OpenWeatherMap support at [info@openweathermap.org](mailto:info@openweathermap.org) and include the full API request that triggered the error.

---

## Key Parameters That Cause Errors

| Parameter | Required | Notes |
|-----------|----------|-------|
| `appid` | Yes | Your API key — missing or invalid value triggers `401` |
| `lat` / `lon` | Yes (for most endpoints) | Must be valid decimal coordinates — invalid values trigger `400` or `404` |
| `q` | Optional | City name for built-in geocoding endpoints — wrong values trigger `404` |
| `zip` | Optional | Format: `zip=10001,US` (ZIP code + country code) — wrong format triggers `400` |
| `id` | Optional | City ID from OpenWeatherMap city list — outdated or wrong IDs trigger `404` |
| `units` | Optional | `standard` (default), `metric`, or `imperial` — any other value triggers `400` |
| `lang` | Optional | Language code (e.g. `en`, `de`, `fr`) — unsupported codes may be ignored or trigger `400` |
| `cnt` | Optional | Number of results to return — must be a positive integer |

---

## Quick Troubleshooting Checklist

- [ ] Is the `appid` parameter present in every request?
- [ ] Was the API key created within the last 2 hours? (If so, wait and retry)
- [ ] Does your subscription plan include the endpoint you are calling?
- [ ] Are `lat` and `lon` within valid ranges (`-90` to `90` and `-180` to `180`)?
- [ ] Is the city name, ZIP code, or city ID correct and supported?
- [ ] Are you staying within your plan's rate limit (60 calls/min on Free)?
- [ ] Are you checking the `message` field in the error response body for specific details?