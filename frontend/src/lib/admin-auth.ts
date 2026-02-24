const ADMIN_TOKEN_KEY = "lb_admin_token";

export const setAdminToken = (token: string) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const isAdminAuthenticated = () => Boolean(getAdminToken());

export const clearAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};
