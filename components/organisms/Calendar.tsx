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
dayjs.extend(utc);
dayjs.extend(timezone);
type RouterInput = inferRouterOutputs<AppRouter>;
type PostCreateInput = RouterInput["proposta"]["getPropostaByDay"];
// const customTheme = createTheme({
//   components: {
//     Mui: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#1A202E", // Cor de fundo geral do calendário
//         },
//         week: {
//           // Estilos para a linha da semana
//           color: "white", // Cor de texto branca
//         },
//         day: {
//           // Estilos para os dias do calendário
//           color: "white", // Cor de texto branca
//         },
//         daySelected: {
//           // Estilos para o dia selecionado
//           backgroundColor: "purple", // Cor de fundo roxa
//           color: "white", // Cor de texto branca
//         },
//         current: {
//           // Estilos para o dia atual
//           color: "white", // Cor de texto branca
//         },
//       },
//     },
//   },
// });

export const DateCalendarServerRequest = () => {
  const BRAZIL_TIMEZONE = "America/Sao_Paulo";
  const [client, setClient] = React.useState<PostCreateInput>();
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
        setClient(clientFromServer);
      }
    } else {
      console.log("Data inválida");
    }
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <ThemeProvider theme={customTheme}> */}
        <DateCalendar
          sx={{
            text: "white",
            backgroundColor: "white",
            textDecorationColor: "white",
          }}
          renderLoading={() => <DayCalendarSkeleton />}
          onChange={handleDayChange}
        />
        {/* </ThemeProvider> */}
      </LocalizationProvider>
      <div className="container">
        {client?.map((proposta) => {
          return (
            <div
              className="card grid  w-full grid-cols-3 grid-rows-1  px-2 py-4 shadow-xl"
              key={proposta.id}
            >
              <div className="col-span-2 col-start-1 flex flex-col gap-1">
                <div className="flex gap-2 text-[19px] font-bold">
                  <div className="w-[22px]">
                    <User size={22} color="white" />
                  </div>
                  <h1 className="text-slate-50">{proposta.firstName}</h1>
                </div>
                <div className="calendar flex h-auto items-end gap-2">
                  <CalendarBlank size={22} color="white" />
                  <h3 className="text-[14px] text-slate-200">{`${"20/04/2023"}`}</h3>
                </div>
                <div className="flex items-end gap-2">
                  <Phone size={22} color="white" />
                  <h3 className="text-[14px] text-slate-200">{`${"86 9 8161-8474"}`}</h3>
                </div>
              </div>
              <div className="col-start-3 flex w-full flex-col items-center justify-center gap-3">
                <div className="badge-secondary badge">{`${proposta.Proposta.length} propostas`}</div>
                <div className="btn-accent btn-xs btn flex gap-2">
                  Ver
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
