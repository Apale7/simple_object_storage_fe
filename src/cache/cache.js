function set(k, v) {
  localStorage.setItem(`object_storage_${k}`, v);
}

function get(k) {
  const v = localStorage.getItem(`object_storage_${k}`);
  if (!v) return "";
  return v;
}

function storeLanguage(language) {
  set(`language`, `${language}`);
}

function getLanguage() {
  const l = get("language");
  if (l === "" || isNaN(Number(l))) return 0;
  return Number(l);
}

function storeCode(language, code) {
  set(String(language), code);
}

function getCode(language) {
  return get(String(language));
}

function setTokens(
  accessToken,
  accessExp,
) {
  // console.log('setTokens called');
  set("access_token", accessToken);
  set("access_exp", String(accessExp));
}

function getTokens() {
  const accessToken = get("access_token");
  const accessExp = Number(get("access_exp"));
  return [accessToken, accessExp];
}

function getAccessToken() {
  const accessToken = get("access_token");
  return accessToken;
}


function getAuth() {
  if (get("auths") === "") return [];
  let auths;
  auths = JSON.parse(get("auths"));
  return auths;
}

function setAuth(auths) {
  set("auths", JSON.stringify(auths));
}

function setUserID(userID) {
  set("user_id", userID.toString());
}

function getUserID() {
  return Number(get("user_id"));
}

export {
  storeLanguage,
  getLanguage,
  storeCode,
  getCode,
  setTokens,
  getTokens,
  getAccessToken,
  getAuth,
  setAuth,
  setUserID,
  getUserID,
};
