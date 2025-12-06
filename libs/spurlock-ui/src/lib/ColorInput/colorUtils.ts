// Color utility functions for ColorInput component

export type ColorFormat = 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSLA extends HSL {
  a: number;
}

// Parse color string to RGBA
export function parseColor(color: string): RGBA | null {
  if (!color || color.trim() === '') return null;

  const trimmed = color.trim();

  // Hex formats
  if (trimmed.startsWith('#')) {
    return parseHex(trimmed);
  }

  // RGB/RGBA formats
  if (trimmed.startsWith('rgb')) {
    return parseRgb(trimmed);
  }

  // HSL/HSLA formats
  if (trimmed.startsWith('hsl')) {
    return parseHsl(trimmed);
  }

  return null;
}

function parseHex(hex: string): RGBA | null {
  const hexMatch = hex.match(
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i
  );
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      a: hexMatch[4] ? parseInt(hexMatch[4], 16) / 255 : 1,
    };
  }

  const shortHexMatch = hex.match(/^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i);
  if (shortHexMatch) {
    return {
      r: parseInt(shortHexMatch[1] + shortHexMatch[1], 16),
      g: parseInt(shortHexMatch[2] + shortHexMatch[2], 16),
      b: parseInt(shortHexMatch[3] + shortHexMatch[3], 16),
      a: shortHexMatch[4]
        ? parseInt(shortHexMatch[4] + shortHexMatch[4], 16) / 255
        : 1,
    };
  }

  return null;
}

function parseRgb(rgb: string): RGBA | null {
  const match = rgb.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;

  const values = match[1].split(',').map((v) => v.trim());
  if (values.length < 3) return null;

  const r = parseInt(values[0], 10);
  const g = parseInt(values[1], 10);
  const b = parseInt(values[2], 10);
  const a = values[3] ? parseFloat(values[3]) : 1;

  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null;

  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, b)),
    a: Math.max(0, Math.min(1, a)),
  };
}

function parseHsl(hsl: string): RGBA | null {
  const match = hsl.match(/hsla?\(([^)]+)\)/i);
  if (!match) return null;

  const values = match[1].split(',').map((v) => v.trim());
  if (values.length < 3) return null;

  const h = parseFloat(values[0]);
  const s = parseFloat(values[1].replace('%', '')) / 100;
  const l = parseFloat(values[2].replace('%', '')) / 100;
  const a = values[3] ? parseFloat(values[3]) : 1;

  if (isNaN(h) || isNaN(s) || isNaN(l) || isNaN(a)) return null;

  return hslToRgb({
    h: Math.max(0, Math.min(360, h)),
    s: Math.max(0, Math.min(1, s)),
    l: Math.max(0, Math.min(1, l)),
    a: Math.max(0, Math.min(1, a)),
  });
}

// Convert HSL to RGB
export function hslToRgb(hsla: HSLA): RGBA {
  const { h, s, l, a } = hsla;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a,
  };
}

// Convert RGB to HSL
export function rgbToHsl(rgba: RGBA): HSLA {
  const { r, g, b, a } = rgba;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100) / 100,
    l: Math.round(l * 100) / 100,
    a,
  };
}

// Format color to string
export function formatColor(rgba: RGBA, format: ColorFormat): string {
  switch (format) {
    case 'hex':
      return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
    case 'hexa':
      return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}${toHex(
        Math.round(rgba.a * 255)
      )}`;
    case 'rgb':
      return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
    case 'rgba':
      return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    case 'hsl': {
      const hsl = rgbToHsl(rgba);
      return `hsl(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(
        hsl.l * 100
      )}%)`;
    }
    case 'hsla': {
      const hsl = rgbToHsl(rgba);
      return `hsla(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(
        hsl.l * 100
      )}%, ${hsl.a})`;
    }
    default:
      return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
  }
}

function toHex(value: number): string {
  const hex = Math.round(value).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

// Get color format from string
export function detectFormat(color: string): ColorFormat {
  if (color.startsWith('#')) {
    return color.length === 9 ? 'hexa' : 'hex';
  }
  if (color.startsWith('rgba')) return 'rgba';
  if (color.startsWith('rgb')) return 'rgb';
  if (color.startsWith('hsla')) return 'hsla';
  if (color.startsWith('hsl')) return 'hsl';
  return 'hex';
}
