// neu für refreshToken

import { backendUrl } from "../api";

function decodeTokenPayload(token) {
  // token: headerBase64.payloadBase64.signature
  if (typeof token !== "string")
    throw new Error("Token must be a valid string");

  // der Token soll in seine 3 Teile aufgeteilt werden, wobei wir nur die payload benötigen
  const [_, payloadBase64] = token.split(".");
  if (!payloadBase64) throw new Error("Invalid token format: No payload");

  const payloadJsonString = atob(payloadBase64);
  const payload = JSON.parse(payloadJsonString);
  return payload;
}

// Berechnung: Wann soll ein neuer Refresh-Token erzeugt werden
function calcRefreshTokenAfterMs(token) {
  const payload = decodeTokenPayload(token); // nimm die payload
  const expirationPeriodSeconds = payload.exp - payload.iat; // Subtrahiere Erstellzeit von Ablaufzeit --> ergibt die Dauer der Ablaufzeit in Sekunden
  const expirationMs = expirationPeriodSeconds * 1000; // wandele die Ablaufzeit in Millisekunden um
  const ONE_MINUTE = 30 * 1000; // Definition Dauer von einer Minute
  const refreshTokenAfterMs = expirationMs - ONE_MINUTE; // Nimm die Ablaufzeit in ms und ziehe davon 1 min ab --> dies ist die Zeit in ms, nach der (später - an anderer Stelle) ein neuer refreshToken erzeugt werden soll
  return refreshTokenAfterMs;
}

// Funktion für den eigentlichen SilentRefresh im Hintergrund
async function doSilentRefresh(refreshToken) {
  try {
    const response = await fetch(backendUrl + "/api/users/refreshToken", {
      method: "POST",
      headers: { authorization: `Bearer ${refreshToken}` },
    });

    const { success, result, error, message } = await response.json();
    console.log(success, result, error, message);
    if (!success) {
      console.log(error);
      console.log(message);
      throw new Error("Could not refresh token, please login");
    }

    return result.newAccessToken;
  } catch (error) {
    console.log(error);
    throw new Error("Could not refresh token, please login");
  }
}

export function silentRefreshLoop(
  currentAccessToken,
  refreshToken,
  onSilentRefreshDoneCb
) {
  // abwarten, zeit: calcRefreshTokenAfterMs(accessToken)
  const delay = calcRefreshTokenAfterMs(currentAccessToken);
  console.log("delaying silent refresh to ", delay, "ms");

  setTimeout(async () => {
    // fetch refresh endpoint mit refreshToken --> newAccessToken
    console.log("doing silent refresh...");
    const newAccessToken = await doSilentRefresh(refreshToken);
    console.log("done silent refresh: ", {
      currentAccessToken,
      newAccessToken,
      refreshToken,
    }); // diese Schreibweise bewirkt, dass die key und value in der Konsole zusammen ausgegeben werden --> Alternative zu: console.log("wert1: " + wert1)

    onSilentRefreshDoneCb(newAccessToken);

    // loop starten
    // doSilentRefresh auch für newAccessToken!
    silentRefreshLoop(newAccessToken, refreshToken, onSilentRefreshDoneCb);
  }, delay);
}
