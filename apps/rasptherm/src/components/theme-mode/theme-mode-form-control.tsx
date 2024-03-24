import * as React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ThemeMode } from '../../types/theme';

interface ThemeModeFormControlProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

function ThemeModeFormControl(props: ThemeModeFormControlProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onModeChange(event.target.value as ThemeMode);

  return (
    <FormControl sx={{ p: '0.75rem' }}>
      <FormLabel id="theme-mode-form-label">Mode</FormLabel>
      <RadioGroup
        value={props.mode}
        onChange={handleChange}
        aria-labelledby="theme-mode-form-label"
      >
        <FormControlLabel control={<Radio />} value="light" label="Light" />
        <FormControlLabel control={<Radio />} value="dark" label="Dark" />
        <FormControlLabel control={<Radio />} value="system" label="System" />
      </RadioGroup>
    </FormControl>
  );
}

export default ThemeModeFormControl;
