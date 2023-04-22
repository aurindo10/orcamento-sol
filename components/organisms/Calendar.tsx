import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { api } from "utils/api";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "server/api/root";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ArrowRight, CalendarBlank, Phone, User } from "@phosphor-icons/react";
import { green } from "@mui/material/colors";
import { useStore } from "bearStore";
dayjs.extend(utc);
dayjs.extend(timezone);
type RouterInput = inferRouterOutputs<AppRouter>;
export type PostCreateInput = RouterInput["proposta"]["getPropostaByDay"];
const customTheme = createTheme({
  palette: {
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    background: {
      paper: "#4dabf5",
      default: "#4dabf5",
    },
    success: {
      main: "#4dabf5",
    },
    primary: {
      main: green[400],
    },
    secondary: {
      main: green[400],
    },
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        color: "primary",
      },
    },
  },
});

export const DateCalendarServerRequest = () => {
  const [propostas, updatePropostas] = useStore((state) => [
    state.propostas,
    state.updatePropostas,
  ]);
  const BRAZIL_TIMEZONE = "America/Sao_Paulo";
  const { mutateAsync: getPropostaByDay } =
    api.proposta.getPropostaByDay.useMutation();
  const handleDayChange = async (date: Dayjs | null) => {
    if (date) {
      const localDate = date.tz(BRAZIL_TIMEZONE);
      const jsDate = localDate.toDate();
      const clientFromServer = await getPropostaByDay({
        date: jsDate,
      });
      if (clientFromServer) {
        updatePropostas(clientFromServer);
      }
    } else {
      console.log("Data inválida");
    }
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme}>
          <DateCalendar
            sx={{
              color: "white",
            }}
            renderLoading={() => <DayCalendarSkeleton />}
            onChange={handleDayChange}
          />
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
};
