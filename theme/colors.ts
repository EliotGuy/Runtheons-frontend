const colors = {
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  blue: {
    50: '#EDFBFF',
    100: '#D6F4FF',
    200: '#B5EDFF',
    300: '#83E4FF',
    400: '#48D2FF',
    500: '#1EB5FF',
    600: '#0699FF',
    700: '#0085FF',
    800: '#0865C5',
    900: '#0D579B',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2A37',
    900: '#111928',
  },
  red: {
    50: '#FDF2F2',
    100: '#FDE8E8',
    200: '#FBD5D5',
    300: '#F8B4B4',
    400: '#F98080',
    500: '#F05252',
    600: '#E02424',
    700: '#C81E1E',
    800: '#9B1C1C',
    900: '#771D1D',
  },
  orange: {
    50: '#FFF8F1',
    100: '#FEECDC',
    200: '#FCD9BD',
    300: '#FDBA8C',
    400: '#FF8A4C',
    500: '#FF5A1F',
    600: '#D03801',
    700: '#B43403',
    800: '#8A2C0D',
    900: '#771D1D',
  },
  yellow: {
    50: '#FDFDEA',
    100: '#FDF6B2',
    200: '#FCE96A',
    300: '#FACA15',
    400: '#E3A008',
    500: '#C27803',
    600: '#9F580A',
    700: '#8E4B10',
    800: '#723B13',
    900: '#633112',
  },
  green: {
    50: '#F3FAF7',
    100: '#DEF7EC',
    200: '#BCF0DA',
    300: '#84E1BC',
    400: '#31C48D',
    500: '#0E9F6E',
    600: '#057A55',
    700: '#046C4E',
    800: '#03543F',
    900: '#014737',
  },
  teal: {
    50: '#EDFAFA',
    100: '#D5F5F6',
    200: '#AFECEF',
    300: '#7EDCE2',
    400: '#16BDCA',
    500: '#0694A2',
    600: '#047481',
    700: '#036672',
    800: '#05505C',
    900: '#014451',
  },
  indigo: {
    50: '#F0F5FF',
    100: '#E5EDFF',
    200: '#CDDBFE',
    300: '#B4C6FC',
    400: '#8DA2FB',
    500: '#6875F5',
    600: '#5850EC',
    700: '#5145CD',
    800: '#42389D',
    900: '#362F78',
  },
  purple: {
    50: '#F6F5FF',
    100: '#EDEBFE',
    200: '#DCD7FE',
    300: '#CABFFD',
    400: '#AC94FA',
    500: '#9061F9',
    600: '#7E3AF2',
    700: '#6C2BD9',
    800: '#5521B5',
    900: '#4A1D96',
  },
  pink: {
    50: '#FDF2F8',
    100: '#FCE8F3',
    200: '#FAD1E8',
    300: '#F8B4D9',
    400: '#F17EB8',
    500: '#E74694',
    600: '#D61F69',
    700: '#BF125D',
    800: '#99154B',
    900: '#751A3D',
  },
} as const;

type ColorObject = keyof typeof colors;
const colorList: string[] = ['white', 'black'];
const colorKeyArray = Object.keys(colors);
colorKeyArray.map(color => {
  if (!['current', 'transparent', 'black', 'white'].includes(color)) {
    const valueList = Object.keys(colors[color as ColorObject]);
    valueList.map(value => {
      colorList.push(`${color}-${value}`);

      return;
    });
  }

  return;
});

type ColorObjectType = typeof colors;
type GetColorList<T> = {
  readonly [P in keyof T]: `${P extends number | string ? P : never}-${keyof T[P] extends string | number
    ? keyof T[P]
    : never}`;
}[keyof T];

export const colorArray = colorList;

export type ColorList = GetColorList<ColorObjectType>;

export default colors;
