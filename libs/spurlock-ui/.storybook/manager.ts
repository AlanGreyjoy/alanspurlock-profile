import { addons } from '@storybook/manager-api';
import { spurlockTheme } from './theme';

addons.setConfig({
  theme: spurlockTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
