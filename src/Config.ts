declare const process: any;

const get = (value, def) => (value ? value : def);

// NOTE: "transform-inline-environment-variables" requires writing with
// array-access style to transform properly. `process.env.API_URL` won't work
export const API_URL = get(process.env['API_URL'], 'https://localhost:8000');
