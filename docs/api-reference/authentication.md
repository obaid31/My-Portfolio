---
id: authentication
title: Authentication
sidebar_label: Authentication
---

# Authentication

To maintain service integrity and provide granular usage analytics, the OpenWeatherMap API requires a valid **API Key** (AppID) for every request. This key must be passed as a query parameter in your HTTP requests.



## Obtaining Your API Credentials

Access to the weather data ecosystem is gated via a unique identifier linked to your account. Follow these steps to provision your key:

###  Account Initialization
Navigate to the [OpenWeatherMap Portal](https://openweathermap.org/) and authenticate using your credentials. If you do not have an active account, you must complete the registration process to access the developer dashboard.

###  Accessing the API Management Console
Once authenticated, hover over your **Account Name** in the top navigation bar and select **"My API Keys"** from the dropdown menu. Alternatively, you can navigate directly to the `home/api_keys` route within your account settings.

###  Key Generation & Retrieval
By default, a "Default" key is generated upon account creation. 
* **To use an existing key:** Copy the 32-character hexadecimal string from the "Key" column.
* **To generate a unique key:** Provide a logical name (e.g., `Production-App-01`) in the "Create key" field and click **Generate**.

> [!IMPORTANT]
> **API Key Activation Latency:** Newly generated keys may require **10 to 60 minutes** to propagate through our global edge servers. If you receive a `401 Unauthorized` error immediately after generation, please allow for this propagation window.



## Security Best Practices

To prevent unauthorized quota consumption and potential account suspension, adhere to the following security protocols:

* **Environment Variables:** Never hard-code your API key in client-side code or public repositories. Use `.env` files or secret management services (e.g., Vault, AWS Secrets Manager).
* **Key Rotation:** Periodically regenerate keys to minimize the impact of accidental exposure.
* **Server-Side Proxy:** Whenever possible, make API calls from a backend server to keep the key hidden from end-user inspection.



## Implementation Example

Inject your key into the `appid` parameter as demonstrated below:

```http
GET [https://api.openweathermap.org/data/2.5/weather?lat=](https://api.openweathermap.org/data/2.5/weather?lat=){lat}&lon={lon}&appid={YOUR_API_KEY}