import { Meta, StoryFn } from '@storybook/vue3';
import DataTable from './dataTable.vue';
import { http, HttpResponse } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { typeFieldData } from '@autogestion/general';
import { dummyData } from './dummyData';
import { useRouter } from 'vue-router';

initialize();
const router = useRouter();

export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    msw: {
      handlers: [
        http.post(
          '/mock-api/data',
          async ({ request }: { request: Request }) => {
            return new Promise((resolve) => {
              setTimeout(async () => {
                const requestData = await request.json();
                const { page, pageSize, sortField, sortOrder, filterGroups } =
                  requestData as {
                    page: number;
                    pageSize: number;
                    sortField: keyof (typeof dummyData)[0];
                    sortOrder: number;
                    filterGroups: {
                      filters: {
                        field: string;
                        filterType: number;
                        value: string | number | boolean | null;
                        logicalOperator: number;
                      }[];
                      logicalOperator: number;
                    }[];
                  };
                const sortFieldUncap =
                  String(sortField).charAt(0).toLowerCase() +
                  String(sortField).slice(1);

                let records = dummyData;

                // Aplicar filtros
                if (filterGroups && filterGroups.length > 0) {
                  filterGroups.forEach((group) => {
                    let groupFilteredRecords = [...records];

                    group.filters.forEach((filter) => {
                      groupFilteredRecords = groupFilteredRecords.filter(
                        (item) => {
                          const fieldValue = (
                            item as Record<
                              string,
                              string | number | boolean | null
                            >
                          )[filter.field];

                          // Detectar si el campo es de tipo fecha
                          const isDateField =
                            typeof fieldValue === 'string' &&
                            /\d{4}-\d{2}-\d{2}/.test(fieldValue);

                          if (isDateField) {
                            const fieldDate = new Date(fieldValue).getTime();
                            const filterDate = new Date(
                              filter.value as string
                            ).getTime();

                            switch (filter.filterType) {
                              case 1: // Igual
                                return fieldDate === filterDate;
                              case 3: // Mayor que
                                return fieldDate > filterDate;
                              case 4: // Menor que
                                return fieldDate < filterDate;
                              case 5: // Diferente
                                return fieldDate !== filterDate;
                              default:
                                return true;
                            }
                          } else {
                              // (null = 11),
                              // (notNull = 12),
                              // (empty = 13),
                              // (NotEmpty = 14);

                            switch (filter.filterType) {
                              case 1: // Contiene
                                return fieldValue
                                  ?.toString()
                                  .toLowerCase()
                                  .includes(String(filter.value).toLowerCase());
                              case 2: // No Contiene
                                return !fieldValue
                                  ?.toString()
                                  .toLowerCase()
                                  .includes(String(filter.value).toLowerCase());
                              case 3: // Igual
                                return fieldValue == filter.value;
                              case 4: // Diferente
                                return fieldValue != filter.value;
                              case 5: // Mayor que
                                return (
                                  Number(fieldValue) > Number(filter.value)
                                );
                              case 6: // Mayor o igual que
                                return (
                                  Number(fieldValue) >= Number(filter.value)
                                );
                              case 7: // Menor que
                                return (
                                  Number(fieldValue) < Number(filter.value)
                                );
                              case 8: // Menor o igual que
                                return (
                                  Number(fieldValue) <= Number(filter.value)
                                );
                              case 9: //Empieza con
                                return (
                                  fieldValue?.toString().charAt(0) ==
                                  String(filter.value)
                                );
                              case 10: //Termina con
                                return (
                                  fieldValue?.toString().charAt(fieldValue?.toString().length-1) ==
                                  String(filter.value)
                                );
                              default:
                                return true;
                            }
                          }
                        }
                      );
                    });

                    // Aplicar operador lógico (AND = 0, OR = 1)
                    if (group.logicalOperator === 0) {
                      records = records.filter((item) =>
                        groupFilteredRecords.includes(item)
                      );
                    } else if (group.logicalOperator === 1) {
                      records = [
                        ...new Set([...records, ...groupFilteredRecords]),
                      ];
                    }
                  });
                }

                // Aplicar ordenamiento
                if (sortFieldUncap) {
                  records.sort(
                    (a: Record<string, any>, b: Record<string, any>) => {
                      if (
                        a[sortFieldUncap] != null &&
                        b[sortFieldUncap] != null &&
                        a[sortFieldUncap] < b[sortFieldUncap]
                      )
                        return sortOrder === 1 ? -1 : 1;
                      if (
                        a[sortFieldUncap] != null &&
                        b[sortFieldUncap] != null &&
                        a[sortFieldUncap] > b[sortFieldUncap]
                      )
                        return sortOrder === 1 ? 1 : -1;
                      return 0;
                    }
                  );
                }

                // Paginación
                const totalRecords = records.length;
                records = records.slice(
                  (page - 1) * pageSize,
                  (page - 1) * pageSize + pageSize
                );

                resolve(HttpResponse.json({ records, totalRecords }));
                // return HttpResponse.json({ records, totalRecords });
              }, 0);
            });
          }
        ),
      ],
    },
  },
  loaders: [mswLoader],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { DataTable },
  setup() {
    return { args };
  },
  template: '<DataTable v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  headers: [
    {
      key: 'politicaVacacionesNombre',
      label: 'policy',
      sortable: true,
      filterPlaceholder: 'filtro',
    },
    {
      key: 'solicitudVacacionesId',
      label: 'requestNumber',
      sortable: true,
    },
    {
      key: 'fecha',
      label: 'registrationDate',
      sortable: true,
      typeField: typeFieldData.date,
    },
    { key: 'estado', label: 'state', sortable: true },
    {
      key: 'fechaInicial',
      label: 'initialDate',
      sortable: true,
      typeField: typeFieldData.date,
    },
    {
      key: 'fechaFinal',
      label: 'finalDate',
      sortable: true,
      typeField: typeFieldData.date,
    },
    {
      key: 'diasDevengados',
      label: 'accruedDays',
      sortable: true,
      typeField: typeFieldData.number,
    },
    {
      key: 'diasDisfrutados',
      label: 'consumedDays',
      sortable: true,
      typeField: typeFieldData.number,
    },
    {
      key: 'diasAjuste',
      label: 'adjustmentDays',
      sortable: true,
      typeField: typeFieldData.number,
    },
    {
      key: 'diasReservados',
      label: 'reservationDays',
      sortable: true,
      typeField: typeFieldData.number,
    },
    {
      key: 'diasDisponibles',
      label: 'availableDays',
      sortable: true,
      typeField: typeFieldData.number,
    },
    {
      key: 'solicitudVacacionesActions',
      label: 'action',
      sortable: false,
      typeField: typeFieldData.button,
      title: 'edit',
      url: '/vacations/request/edit/',
    },
  ],
  perPageOptions: [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 25, label: '25' },
  ],
  itemsPerPage: 5,
  endpoint: '/mock-api/data',
  router: router,
  filtersEnabled: false,
  autofit: true,
};
