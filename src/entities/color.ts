export type HSL = {
  H: number; // 0 ~ 360 色相 Hue
  S: number; // 0 ~ 100 彩度 Saturation
  L: number; // 0 ~ 100 輝度 Lightness
};

export type RGB = {
  R: number; // 0 ~ 255
  G: number; // 0 ~ 255
  B: number; // 0 ~ 255
};

export type HSV = {
  H: number; // 0 ~ 360 色相 Hue
  S: number; // 0 ~ 100 彩度 Saturation
  V: number; // 0 ~ 100 明度 Value
};

/**
 * a = b * q + r
 * rを返す
 */
const mod = (a: number, q: number): number => {
  return ((a % q) + q) % q;
};

export const rgb2hsl = ({ R, G, B }: RGB): HSL => {
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const hsl: HSL = { H: 0, S: 0, L: (max + min) / 2 };

  // RGBが3つとも同じ値の時、色相と彩度は0
  if (max !== min) {
    // 色相を求める
    if (max === R) {
      hsl.H = 60 * ((G - B) / (max - min));
    } else if (max === G) {
      hsl.H = 60 * ((B - R) / (max - min)) + 120;
    } else {
      hsl.H = 60 * ((R - G) / (max - min)) + 240;
    }
    hsl.H = mod(hsl.H, 360);

    // 彩度を求める
    if (hsl.L <= 127) {
      hsl.S = (max - min) / (max + min);
    } else {
      hsl.S = (max - min) / (510 - max - min);
    }
  }

  // 彩度と輝度を0~100に
  hsl.H = Math.round(hsl.H);
  hsl.S = Math.round(hsl.S * 100);
  hsl.L = Math.round((hsl.L / 255) * 100);

  return hsl;
};

export const hsl2rgb = ({ H, S, L }: HSL): RGB => {
  const max: number = 2.55 * (L + (50 - Math.abs(L - 50)) * (S / 100));
  const min: number = 2.55 * (L - (50 - Math.abs(L - 50)) * (S / 100));
  const rgb: RGB = { R: 0, G: 0, B: 0 };

  if (0 <= H && H < 60) {
    rgb.R = max;
    rgb.G = (H / 60) * (max - min) + min;
    rgb.B = min;
  } else if (60 <= H && H < 120) {
    rgb.R = ((120 - H) / 60) * (max - min) + min;
    rgb.G = max;
    rgb.B = min;
  } else if (120 <= H && H < 180) {
    rgb.R = min;
    rgb.G = max;
    rgb.B = ((H - 120) / 60) * (max - min) + min;
  } else if (180 <= H && H < 240) {
    rgb.R = min;
    rgb.G = ((240 - H) / 60) * (max - min) + min;
    rgb.B = max;
  } else if (240 <= H && H < 300) {
    rgb.R = ((H - 240) / 60) * (max - min) + min;
    rgb.G = min;
    rgb.B = max;
  } else {
    rgb.R = max;
    rgb.G = min;
    rgb.B = ((360 - H) / 60) * (max - min) + min;
  }

  rgb.R = Math.round(rgb.R);
  rgb.G = Math.round(rgb.G);
  rgb.B = Math.round(rgb.B);

  return rgb;
};

export const rgb2hsv = ({ R, G, B }: RGB): HSV => {
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const hsv = { H: 0, S: ((max - min) / max) * 100, V: (max / 255) * 100 };

  if (max !== min) {
    // 色相を求める
    if (max === R) {
      hsv.H = 60 * ((G - B) / (max - min));
    } else if (max === G) {
      hsv.H = 60 * ((B - R) / (max - min)) + 120;
    } else {
      hsv.H = 60 * ((R - G) / (max - min)) + 240;
    }
    hsv.H = mod(hsv.H, 360);
  }

  hsv.H = Math.round(hsv.H);
  hsv.S = Math.round(hsv.S);
  hsv.V = Math.round(hsv.V);

  return hsv;
};

export const hsv2rgb = ({ H, S, V }: HSV): RGB => {
  const max = (V / 100) * 255;
  const min = max - (S / 100) * max;
  const rgb: RGB = { R: 0, G: 0, B: 0 };

  if (0 <= H && H < 60) {
    rgb.R = max;
    rgb.G = (H / 60) * (max - min) + min;
    rgb.B = min;
  } else if (60 <= H && H < 120) {
    rgb.R = ((120 - H) / 60) * (max - min) + min;
    rgb.G = max;
    rgb.B = min;
  } else if (120 <= H && H < 180) {
    rgb.R = min;
    rgb.G = max;
    rgb.B = ((H - 120) / 60) * (max - min) + min;
  } else if (180 <= H && H < 240) {
    rgb.R = min;
    rgb.G = ((240 - H) / 60) * (max - min) + min;
    rgb.B = max;
  } else if (240 <= H && H < 300) {
    rgb.R = ((H - 240) / 60) * (max - min) + min;
    rgb.G = min;
    rgb.B = max;
  } else {
    rgb.R = max;
    rgb.G = min;
    rgb.B = ((360 - H) / 60) * (max - min) + min;
  }

  rgb.R = Math.round(rgb.R);
  rgb.G = Math.round(rgb.G);
  rgb.B = Math.round(rgb.B);

  return rgb;
};

export const hex2rgb = (hex: string): RGB => {
  if (!validateHex(hex)) {
    throw new Error('Invalid argument');
  }

  return {
    R: parseInt(hex.substr(1, 2), 16),
    G: parseInt(hex.substr(3, 2), 16),
    B: parseInt(hex.substr(5, 2), 16),
  };
};

export const rgb2hex = (rgb: RGB): string => {
  return (
    '#' +
    ('00' + rgb.R.toString(16)).slice(-2) +
    ('00' + rgb.G.toString(16)).slice(-2) +
    ('00' + rgb.B.toString(16)).slice(-2)
  );
};

export const hex2hsl = (hex: string): HSL => {
  return rgb2hsl(hex2rgb(hex));
};

export const hsl2hex = (hsl: HSL): string => {
  return rgb2hex(hsl2rgb(hsl));
};

export const hex2hsv = (hex: string): HSV => {
  return rgb2hsv(hex2rgb(hex));
};

export const hsv2hex = (hsv: HSV): string => {
  return rgb2hex(hsv2rgb(hsv));
};

/**
 * lighten color.
 * @param hex base color
 * @param amount 0 ~ 100%
 * @returns lightened color
 */
export const lighten = (hex: string, amount: number): string => {
  if (!valueInRange(amount, 0, 100)) {
    throw new Error('Invalid argument');
  }
  const rgb: RGB = hex2rgb(hex);
  const hsl: HSL = rgb2hsl(rgb);
  hsl.L = clamp(hsl.L + amount, 0, 100);
  return rgb2hex(hsl2rgb(hsl));
};

/**
 * darken color.
 * @param hex base color
 * @param amount 0 ~ 100%
 * @returns darkened color
 */
export const darken = (hex: string, amount: number): string => {
  if (!valueInRange(amount, 0, 100)) {
    throw new Error('Invalid argument');
  }
  const rgb = hex2rgb(hex);
  const hsl: HSL = rgb2hsl(rgb);
  hsl.L = clamp(hsl.L - amount, 0, 100);
  return rgb2hex(hsl2rgb(hsl));
};

/**
 * saturate color.
 * @param hex base color
 * @param amount 0 ~ 100%
 * @returns saturated color
 */
export const saturate = (hex: string, amount: number): string => {
  if (!valueInRange(amount, 0, 100)) {
    throw new Error('Invalid argument');
  }
  const rgb: RGB = hex2rgb(hex);
  const hsl: HSL = rgb2hsl(rgb);
  hsl.S = clamp(hsl.S + amount, 0, 100);
  return rgb2hex(hsl2rgb(hsl));
};

/**
 * desaturate color.
 * @param hex base color
 * @param amount 0 ~ 100%
 * @returns saturated color
 */
export const desaturate = (hex: string, amount: number): string => {
  if (!valueInRange(amount, 0, 100)) {
    throw new Error('Invalid argument');
  }
  const rgb: RGB = hex2rgb(hex);
  const hsl: HSL = rgb2hsl(rgb);
  hsl.S = clamp(hsl.S - amount, 0, 100);
  return rgb2hex(hsl2rgb(hsl));
};

export const valueInRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return min <= value && value <= max;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(value, min));
};

export const validateHex = (hex: string): boolean => {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
};
