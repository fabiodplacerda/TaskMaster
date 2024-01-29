import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface CalendarProps {
  dueDate: Dayjs | null;
  setDueDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export default function Calendar({ dueDate, setDueDate }: CalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={newDate => {
            setDueDate(newDate);
          }}
          disablePast
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
