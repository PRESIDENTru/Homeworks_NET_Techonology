import companies from "../table";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function CompaniesGrid() {
  const rows: GridRowsProp = companies.map((item, index) => ({
    id: index,
    ...item
  }));

  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1 },
    { field: 'Отрасль', headerName: 'Отрасль', flex: 0.7 },
    { field: 'Выручка', headerName: 'Выручка', flex: 0.5, type: 'number' },
    { field: 'Сотрудники', headerName: 'Сотрудники', flex: 0.5, type: 'number' },
    { field: 'Основана', headerName: 'Основана', flex: 0.5, type: 'number' },
    { field: 'Прибыль', headerName: 'Прибыль', flex: 0.5, type: 'number' },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '700px', mt: '20px' }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        slotProps={{
          toolbar: { showQuickFilter: true }
        }}
      />
    </Container>
  );
}

export default CompaniesGrid;