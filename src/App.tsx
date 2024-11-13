import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Home from "./components/Home";
import { Toaster } from "./components/ui/toaster";
import { DepartmentsProvider } from "./providers/DepartmentsProvider";
import { StatusesProvider } from "./providers/StatusesProvider";
import { SenioritiesProvider } from "./providers/SenioritiesProvider";
import { PositionsProvider } from "./providers/PositionsProvider";
import { EmployeesProvider } from "./providers/EmployeesProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusesProvider>
        <SenioritiesProvider>
          <PositionsProvider>
            <DepartmentsProvider>
              <EmployeesProvider>
                <Home />
              </EmployeesProvider>
            </DepartmentsProvider>
          </PositionsProvider>
        </SenioritiesProvider>
      </StatusesProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
